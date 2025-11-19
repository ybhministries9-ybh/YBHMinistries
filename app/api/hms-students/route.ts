import { NextResponse } from 'next/server';
import { createHMSStudent } from '@/lib/db';

function sanitizeString(input: any, maxLength = 2000) {
  if (!input && input !== 0) return null;
  let s = String(input || '');
  s = s.replace(/<[^>]*>/g, '');
  s = s.trim().replace(/\s+/g, ' ');
  if (maxLength) s = s.substring(0, maxLength);
  return s;
}

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
    const body = await request.json();

    const fullName = sanitizeString(body.fullName, 200);
    const dateOfBirthRaw = sanitizeString(body.dateOfBirth, 20);
    const gender = sanitizeString(body.gender, 50);
    const address = sanitizeString(body.address, 500);
    const cityStateZip = sanitizeString(body.cityStateZip, 200);
    const phoneNumber = sanitizeString(body.phoneNumber, 50);
    const email = sanitizeString(body.emailId, 254);
    const parentGuardianName = sanitizeString(body.parentGuardianName, 200);
    const parentGuardianContact = sanitizeString(body.parentGuardianContact, 50);

    const programApplyingFor = Array.isArray(body.programApplyingFor) ? body.programApplyingFor : body.programApplyingFor ? [body.programApplyingFor] : [];
    const instrumentSpecialization = Array.isArray(body.instrumentSpecialization) ? body.instrumentSpecialization : body.instrumentSpecialization ? [body.instrumentSpecialization] : [];
    const instrumentOther = sanitizeString(body.instrumentOther, 100);
    const preferredClassType = Array.isArray(body.preferredClassType) ? body.preferredClassType : body.preferredClassType ? [body.preferredClassType] : [];
    const preferredSchedule = Array.isArray(body.preferredSchedule) ? body.preferredSchedule : body.preferredSchedule ? [body.preferredSchedule] : [];
    const courseType = Array.isArray(body.courseType) ? body.courseType : body.courseType ? [body.courseType] : [];

    const yearsOfExperience = body.yearsOfExperience ? Number(body.yearsOfExperience) : null;
    const previousTraining = sanitizeString(body.previousTraining, 500);
    const musicExamCertifications = sanitizeString(body.musicExamCertifications, 500);
    const performanceExperience = Array.isArray(body.performanceExperience) ? body.performanceExperience : body.performanceExperience ? [body.performanceExperience] : [];
    const performanceOther = sanitizeString(body.performanceOther, 200);

    const goals = sanitizeString(body.goals, 2000);

    const volunteerInterested = sanitizeString(body.volunteerInterested, 10) === 'yes';
    const volunteerAreas = Array.isArray(body.volunteerAreas) ? body.volunteerAreas : body.volunteerAreas ? [body.volunteerAreas] : [];

    const emergencyName = sanitizeString(body.emergencyName, 200);
    const emergencyRelationship = sanitizeString(body.emergencyRelationship, 100);
    const emergencyContact = sanitizeString(body.emergencyContact, 50);

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
