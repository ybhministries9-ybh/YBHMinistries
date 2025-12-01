import { NextResponse } from 'next/server';
import { createHMSStudent } from '@/lib/db';
import { sanitizeInput, requireJson, checkBodySize, rateLimit } from '@/lib/security';
import { hmsStudentSchema } from '@/lib/schemas';

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
    const rl = await rateLimit(`hms-students:${ip}`, 10, 60 * 60 * 1000);
    if (!rl.ok) return NextResponse.json({ success: false, error: 'Too many requests' }, { status: 429 });

    const body = await request.json();

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
      emergencyName,
      emergencyRelationship,
      emergencyContact
    });
    if (!parsed.success) return NextResponse.json({ success: false, error: 'validation_error', details: parsed.error.format() }, { status: 400 });
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
      createdBy: 'public'
    });

    return NextResponse.json({ success: true, data: created }, { status: 201 });
  } catch (err) {
    console.error('POST /api/hms-students error', err);
    return NextResponse.json({ success: false, error: 'Failed to save enrolment' }, { status: 500 });
  }
}
