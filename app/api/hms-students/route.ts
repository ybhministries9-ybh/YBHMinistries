import { NextResponse } from 'next/server';
import { createHMSStudent } from '@/lib/db';
import { sanitizeInput, requireJson, checkBodySize, rateLimit, verifyRecaptcha, isHoneypotFilled, getRateLimits } from '@/lib/security';
import { hmsStudentSchema } from '@/lib/schemas';
import { logger } from '@/lib/logger';

// Force Node.js runtime - nodemailer requires Node.js APIs (TCP sockets) not available in Edge runtime
export const runtime = 'nodejs';

function isValidEmail(email: string) {
  const re = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
  return re.test(email);
}

function isValidPhone(phone: string) {
  return /^[0-9+\-\s()]{7,20}$/.test(phone);
}

function isValidName(name: string) {
  return /^[a-zA-Z\s.'-]{2,200}$/.test(name);
}

export async function POST(request: Request) {
  try {
    if (!requireJson(request)) return NextResponse.json({ success: false, error: 'Content-Type must be application/json' }, { status: 400 });
    if (!checkBodySize(request, 256 * 1024)) return NextResponse.json({ success: false, error: 'Payload too large' }, { status: 413 });

    const ip = request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || request.headers.get('x-real-ip') || 'unknown';
    const { limit, windowMs } = getRateLimits(10, 60 * 60 * 1000);
    const rl = await rateLimit(`hms-students:${ip}`, limit, windowMs);
    if (!rl.ok) {
      const resetMs = rl.reset ?? (Date.now() + windowMs);
      const resetSeconds = Math.max(1, Math.ceil((resetMs - Date.now()) / 1000));
      return NextResponse.json({ success: false, error: 'Too many requests', reset: resetMs }, { status: 429, headers: { 'Retry-After': String(resetSeconds) } });
    }

    // Read raw body
    const body = await request.json();

    // Honeypot check
    if (isHoneypotFilled(body)) return NextResponse.json({ success: false, error: 'bot detected' }, { status: 400 });

    // reCAPTCHA verification when configured
    try {
      const token = body?.recaptchaToken || body?.recaptcha_token;
      const rc = await verifyRecaptcha(token);
      if (!rc.ok) return NextResponse.json({ success: false, error: 'recaptcha_failed', details: rc }, { status: 403 });
    } catch (e) {
      return NextResponse.json({ success: false, error: 'recaptcha_error' }, { status: 500 });
    }
    const fullName = sanitizeInput(body.fullName, 200);
    const dateOfBirthRaw = sanitizeInput(body.dateOfBirth, 20);
    const gender = sanitizeInput(body.gender, 50);
    const address = sanitizeInput(body.address, 500);
    const cityStateZip = sanitizeInput(body.cityStateZip, 200);
    const phoneNumber = sanitizeInput(body.phoneNumber, 50);
    const email = sanitizeInput(body.emailId, 254);
    const parentGuardianName = sanitizeInput(body.parentGuardianName, 200);
    const parentGuardianContact = sanitizeInput(body.parentGuardianContact, 50);

    const programApplyingFor = Array.isArray(body.programApplyingFor) ? body.programApplyingFor : body.programApplyingFor ? [body.programApplyingFor] : [];
    const instrumentSpecialization = Array.isArray(body.instrumentSpecialization) ? body.instrumentSpecialization : body.instrumentSpecialization ? [body.instrumentSpecialization] : [];
    const instrumentOther = sanitizeInput(body.instrumentOther, 100);
    const preferredClassType = Array.isArray(body.preferredClassType) ? body.preferredClassType : body.preferredClassType ? [body.preferredClassType] : [];
    const preferredSchedule = Array.isArray(body.preferredSchedule) ? body.preferredSchedule : body.preferredSchedule ? [body.preferredSchedule] : [];
    const courseType = Array.isArray(body.courseType) ? body.courseType : body.courseType ? [body.courseType] : [];

    const yearsOfExperience = body.yearsOfExperience ? Number(body.yearsOfExperience) : null;
    const previousTraining = sanitizeInput(body.previousTraining, 500);
    const musicExamCertifications = sanitizeInput(body.musicExamCertifications, 500);
    const performanceExperience = Array.isArray(body.performanceExperience) ? body.performanceExperience : body.performanceExperience ? [body.performanceExperience] : [];
    const performanceOther = sanitizeInput(body.performanceOther, 200);

    // Accept both camelCase and snake_case keys from clients to be robust
    const hearAboutUsRaw = body.hearAboutUs ?? body.hear_about_us ?? '';
    const otherHearAboutUsRaw = body.otherHearAboutUs ?? body.other_hear_about_us ?? '';
    const hearAboutUs = sanitizeInput(hearAboutUsRaw, 50);
    const otherHearAboutUs = sanitizeInput(otherHearAboutUsRaw, 20);

    const goals = sanitizeInput(body.goals, 2000);

    const volunteerInterested = sanitizeInput(body.volunteerInterested, 10) === 'yes';
    const volunteerAreas = Array.isArray(body.volunteerAreas) ? body.volunteerAreas : body.volunteerAreas ? [body.volunteerAreas] : [];

    const emergencyName = sanitizeInput(body.emergencyName, 200);
    const emergencyRelationship = sanitizeInput(body.emergencyRelationship, 100);
    const emergencyContact = sanitizeInput(body.emergencyContact, 50);

    // Server-side schema validation (basic fields). If validation fails, return structured error.
    const parsed = hmsStudentSchema.safeParse({
      fullName,
      dateOfBirth: dateOfBirthRaw,
      gender,
      address,
      cityStateZip,
      phoneNumber,
      emailId: email,
      parentGuardianName,
      parentGuardianContact,
      programApplyingFor,
      instrumentSpecialization,
      instrumentOther,
      preferredClassType,
      preferredSchedule,
      courseType,
      yearsOfExperience,
      previousTraining,
      musicExamCertifications,
      performanceExperience,
      performanceOther,
      goals,
      volunteerInterested: volunteerInterested ? 'yes' : 'no',
      volunteerAreas,
      hearAboutUs,
      otherHearAboutUs,
      emergencyName,
      emergencyRelationship,
      emergencyContact
    });
    if (!parsed.success) {
      try {
        logger.warn('hms-students validation failed', { errors: parsed.error.format() });
      } catch (e) {}
      return NextResponse.json({ success: false, error: 'validation_error', details: parsed.error.format() }, { status: 400 });
    }
    // reCAPTCHA removed: not enforced

    // Basic validation
    if (!fullName || !isValidName(fullName)) return NextResponse.json({ success: false, error: 'Invalid full name' }, { status: 400 });
    if (!dateOfBirthRaw || !/^\d{2}-\d{2}-\d{4}$/.test(dateOfBirthRaw)) return NextResponse.json({ success: false, error: 'Invalid DOB format (DD-MM-YYYY)' }, { status: 400 });

    // Parse DD-MM-YYYY into ISO date
    const parts = dateOfBirthRaw.split('-');
    const day = parseInt(parts[0], 10);
    const month = parseInt(parts[1], 10) - 1;
    const year = parseInt(parts[2], 10);
    const dob = new Date(year, month, day);
    if (dob.getFullYear() !== year || dob.getMonth() !== month || dob.getDate() !== day) {
      return NextResponse.json({ success: false, error: 'Invalid date of birth' }, { status: 400 });
    }

    const today = new Date();
    const age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    const dayDiff = today.getDate() - dob.getDate();
    if (age < 5 || (age === 5 && (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)))) {
      return NextResponse.json({ success: false, error: 'Applicant must be at least 5 years old' }, { status: 400 });
    }

    if (!gender) return NextResponse.json({ success: false, error: 'Gender is required' }, { status: 400 });
    if (!emergencyName || emergencyName.length < 2) return NextResponse.json({ success: false, error: 'Emergency contact name required' }, { status: 400 });
    if (!emergencyRelationship) return NextResponse.json({ success: false, error: 'Emergency relationship required' }, { status: 400 });
    if (!emergencyContact || !isValidPhone(emergencyContact)) return NextResponse.json({ success: false, error: 'Valid emergency contact phone required' }, { status: 400 });

    if (email && !isValidEmail(email)) return NextResponse.json({ success: false, error: 'Invalid email' }, { status: 400 });
    if (phoneNumber && !isValidPhone(phoneNumber)) return NextResponse.json({ success: false, error: 'Invalid phone number' }, { status: 400 });

    // Build payload for DB (ISO date string)
    const isoDob = dob.toISOString().split('T')[0];

    const created = await createHMSStudent({
      full_name: fullName,
      date_of_birth: isoDob,
      gender: gender,
      address: address,
      city_state_zip: cityStateZip,
      phone_number: phoneNumber,
      email: email,
      parent_guardian_name: parentGuardianName,
      parent_guardian_contact: parentGuardianContact,

      program_applying_for: programApplyingFor,
      instrument_specialization: instrumentSpecialization,
      instrument_other: instrumentOther,
      preferred_class_type: preferredClassType,
      preferred_schedule: preferredSchedule,
      course_type: courseType,

      years_of_experience: yearsOfExperience,
      previous_training: previousTraining,
      music_exam_certifications: musicExamCertifications,
      performance_experience: performanceExperience,
      performance_other: performanceOther,

      goals: goals,
      volunteer_interested: volunteerInterested,
      volunteer_areas: volunteerAreas,

      emergency_name: emergencyName,
      emergency_relationship: emergencyRelationship,
      emergency_contact: emergencyContact,
      hear_about_us: hearAboutUs || 'Unknown',
      other_hear_about_us: hearAboutUs === 'Other' ? otherHearAboutUs || null : null,
      createdBy: 'public'
    });

    // Log creation; make verbose logging optional to avoid console noise during normal runs
    try {
      const { logger } = await import('@/lib/logger');
      if (process.env.ENABLE_VERBOSE_LOGS === 'true') {
        logger.info('HMS student created', { id: (created as any)?.id || null });
      }
    } catch (e) {
      // ignore logging errors
    }

    // Send a confirmation/receipt email to the provided email address (if present).
    // Must await to ensure it completes before serverless function terminates.
    if (email) {
      try {
        const { sendMail } = await import('@/lib/smtpMailer');

        // Build a list of filled fields only, and format labels/values to title case
        const fields: Array<{ label: string; value: string }> = [];

        function titleCaseLabel(s: string) {
          if (!s) return s;
          return s
            .replace(/[_\-]/g, ' ')
            .split(/\s+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1))
            .join(' ')
            .trim();
        }

        function isEmailLike(s: string) {
          return /@/.test(s) && /\.[a-zA-Z]{2,}$/.test(s);
        }

        function isPhoneLike(s: string) {
          return /^[0-9+()\-\.\s]+$/.test(s);
        }

        function formatValue(val: any) {
          if (val === undefined || val === null) return '';
          if (Array.isArray(val)) return val.filter(Boolean).map(v => formatValue(v)).join(', ');
          const s = String(val).trim();
          if (!s) return '';
          // preserve email casing and phone numbers and dates
          if (isEmailLike(s) || isPhoneLike(s) || /^\d{2}-\d{2}-\d{4}$/.test(s)) return s;
          // split camelCase words into words
          const split = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_.\-]+/g, ' ');
          return split
            .split(/\s+/)
            .map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
            .join(' ');
        }

        const pushIf = (label: string, val: any) => {
          if (val === undefined || val === null) return;
          const formatted = formatValue(val);
          if (formatted && formatted.trim().length > 0) fields.push({ label: titleCaseLabel(label), value: formatted });
        };

        pushIf('Full name', fullName);
        pushIf('Date of birth', dateOfBirthRaw);
        pushIf('Gender', gender);
        pushIf('Address', address);
        pushIf('City / State / ZIP', cityStateZip);
        pushIf('Phone', phoneNumber);
        pushIf('Email', email);
        pushIf('Parent / Guardian', parentGuardianName);
        pushIf('Parent / Guardian contact', parentGuardianContact);
        pushIf('Program applying for', programApplyingFor);
        pushIf('Instrument specialization', instrumentSpecialization);
        pushIf('Other instrument', instrumentOther);
        pushIf('Preferred class type', preferredClassType);
        pushIf('Preferred schedule', preferredSchedule);
        pushIf('Course type', courseType);
        pushIf('Years of experience', yearsOfExperience);
        pushIf('Previous training', previousTraining);
        pushIf('Music exam certifications', musicExamCertifications);
        pushIf('Performance experience', performanceExperience);
        pushIf('Other performance', performanceOther);
        pushIf('Goals', goals);
        pushIf('Volunteer interested', volunteerInterested ? 'yes' : 'no');
        pushIf('Volunteer areas', volunteerAreas);
        pushIf('Emergency contact name', emergencyName);
        pushIf('Emergency relationship', emergencyRelationship);
        pushIf('Emergency contact', emergencyContact);
        // Include the 'How did you hear about us' field (show other text when provided)
        const hearVal = hearAboutUs ? (hearAboutUs === 'Other' ? `Other: ${otherHearAboutUs || ''}` : hearAboutUs) : '';
        pushIf('How did you hear about us?', hearVal);

        // Use public logo URL and MSO-safe header/footer so clients like Outlook render correctly
        const logoUrl = 'https://pub-4aa39e08f95c43bd82cfca8220114a91.r2.dev/logo/ybh.png';

        // Plain text
        const plainLines = [`Dear ${fullName || ''},`, '', 'Thank you for applying to HMS at YBH Ministries.', 'Below are the details you submitted:', ''];
        for (const f of fields) plainLines.push(`${f.label}: ${f.value}`);
        plainLines.push('', 'We will contact you soon with next steps.', '', 'Note:- This is a system-generated confirmation of your message. Please do not reply to this email.');
        const plain = plainLines.join('\n');

        // HTML
        const htmlFields = fields.map(f => `
                    <div style="margin-bottom:12px;">
                      <div style="font-weight:600; color:#333;">${f.label}</div>
                      <div style="color:#555;">${f.value}</div>
                    </div>`).join('');
        const html = `
          <div style="font-family: -apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif; color:#111; padding:9px;">
              <div style="text-align:center; background-color:#000000; padding:20px;">
                ${logoUrl ? `<img src="${logoUrl}" alt="YBH Ministries" width="140" style="display:block;margin:0 auto;border:0;"/>` : ''}
              </div>
              <div style="margin-top:24px;">
                <h2 style="margin:0 0 12px 0; color:#111; font-size:20px;">Dear ${fullName || ''},</h2>
                <p style="margin:0 0 12px 0;color:#333; font-size:15px; line-height:1.5;">Thank you for applying to HMS at <strong>YBH Ministries</strong>. Below are the details you submitted:</p>

                ${htmlFields}

                <p style="margin:12px 0 0 0;color:#333; font-size:15px;">We will contact you soon with next steps.</p>

                <p style="margin:18px 0 0 0;color:#333; font-size:15px;">Regards,<br/><span style="color:#333; font-size:15px;">YBH Ministries</span></p>
                <p style="margin:8px 0 0 0; color:#555; font-size:13px; font-style:italic;">Note:- This is a system-generated confirmation of your message. Please do not reply to this email.</p>
              </div>
          </div>`;

        const subject = `YBH Ministries — HMS Student Application Received`;

        const res = await sendMail({
          from: process.env.EMAIL_FROM || undefined,
          to: email,
          replyTo: process.env.SMTP_USER || undefined,
          subject,
          text: plain,
          html,
        });

        const { logger: emailLogger } = await import('@/lib/logger');
        if (res?.success) {
          emailLogger.info('HMS student email sent successfully', { to: email });
        } else {
          emailLogger.error('HMS student email send failed', { to: email, error: res?.error });
        }
      } catch (e) {
        try { logger.error('Failed to send HMS student email', { error: (e as any)?.message || e }); } catch (_) {}
      }
    }

    const resetEpoch = Math.ceil((rl.reset ?? (Date.now() + windowMs)) / 1000);
    return NextResponse.json({ success: true, data: created }, { status: 201, headers: { 'X-RateLimit-Limit': String(limit), 'X-RateLimit-Remaining': String(rl.remaining ?? 0), 'X-RateLimit-Reset': String(resetEpoch) } });
  } catch (err) {
    try { logger.error('POST /api/hms-students error', { error: (err as any)?.message || err }); } catch (e) {}
    return NextResponse.json({ success: false, error: 'Failed to save enrolment' }, { status: 500 });
  }
}
