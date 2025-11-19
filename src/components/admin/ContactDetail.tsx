"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import HMSStudentForm from './HMSStudentFormAdmin';

function getAuthHeader() {
  try {
    const raw = localStorage.getItem('admin_token');
    if (!raw) return {};
    let token = raw;
    try { const parsed = JSON.parse(raw); token = parsed.token || token; } catch (e) {}
    return { Authorization: `Bearer ${token}` };
  } catch (e) {
    return {};
  }
}

export default function ContactDetail({ id }: { id: string }) {
  const [record, setRecord] = useState<any | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const router = useRouter();

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    (async () => {
      try {
        const resp = await fetch(`/api/admin/hms-students?id=${id}`, { headers: { ...(getAuthHeader() as any) } });
        if (resp.status === 401) {
          try { localStorage.removeItem('admin_token'); } catch (e) {}
          router.push('/admin');
          return;
        }
        const j = await resp.json();
        if (mounted) setRecord(j?.data || null);
      } catch (err) {
        console.error('Failed to load record', err);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, [id]);

  const formatDateForInput = (raw?: string | null) => {
    if (!raw) return '';
    try {
      const d = new Date(raw);
      if (Number.isNaN(d.getTime())) return String(raw).split('T')[0] || '';
      return d.toISOString().split('T')[0];
    } catch (e) { return String(raw).split('T')[0] || ''; }
  };

  const recordToInitial = (rec: any) => {
    if (!rec) return undefined;
    return {
      fullName: rec.full_name || '',
      dateOfBirth: (() => {
        const raw = rec.date_of_birth;
        if (!raw) return '';
        // If stored as DD-MM-YYYY convert to ISO YYYY-MM-DD for DatePicker
        if (/^\d{2}-\d{2}-\d{4}$/.test(raw)) {
          const [dd, mm, yyyy] = raw.split('-');
          return `${yyyy}-${mm}-${dd}`; // ISO-like string accepted by Controller
        }
        // If ISO with time or YYYY-MM-DD, try to normalize to YYYY-MM-DD
        if (/^\d{4}-\d{2}-\d{2}/.test(raw)) {
          return raw.slice(0, 10);
        }
        return raw;
      })(),
      gender: rec.gender || '',
      address: rec.address || '',
      cityStateZip: rec.city_state_zip || '',
      phoneNumber: rec.phone_number || '',
      emailId: rec.email || '',
      parentGuardianName: rec.parent_guardian_name || '',
      parentGuardianContact: rec.parent_guardian_contact || '',
      programApplyingFor: Array.isArray(rec.program_applying_for) ? rec.program_applying_for : (rec.program_applying_for ? String(rec.program_applying_for).split(',').map((s: string) => s.trim()) : []),
      instrumentSpecialization: Array.isArray(rec.instrument_specialization) ? rec.instrument_specialization : (rec.instrument_specialization ? String(rec.instrument_specialization).split(',').map((s: string) => s.trim()) : []),
      instrumentOther: rec.instrument_other || '',
      preferredClassType: Array.isArray(rec.preferred_class_type) ? rec.preferred_class_type : (rec.preferred_class_type ? String(rec.preferred_class_type).split(',').map((s: string) => s.trim()) : []),
      preferredSchedule: Array.isArray(rec.preferred_schedule) ? rec.preferred_schedule : (rec.preferred_schedule ? String(rec.preferred_schedule).split(',').map((s: string) => s.trim()) : []),
      courseType: Array.isArray(rec.course_type) ? rec.course_type : (rec.course_type ? String(rec.course_type).split(',').map((s: string) => s.trim()) : []),
      yearsOfExperience: rec.years_of_experience != null ? String(rec.years_of_experience) : '',
      previousTraining: rec.previous_training || '',
      musicExamCertifications: rec.music_exam_certifications || '',
      performanceExperience: Array.isArray(rec.performance_experience) ? rec.performance_experience : (rec.performance_experience ? String(rec.performance_experience).split(',').map((s: string) => s.trim()) : []),
      performanceOther: rec.performance_other || '',
      goals: rec.goals || '',
      volunteerInterested: rec.volunteer_interested ? 'yes' : 'no',
      volunteerAreas: Array.isArray(rec.volunteer_areas) ? rec.volunteer_areas : (rec.volunteer_areas ? String(rec.volunteer_areas).split(',').map((s: string) => s.trim()) : []),
      emergencyName: rec.emergency_name || '',
      emergencyRelationship: rec.emergency_relationship || '',
      emergencyContact: rec.emergency_contact || ''
    };
  };

  if (loading) return <div className="p-6 text-white">Loading...</div>;
  if (!record) return <div className="p-6 text-white">Record not found. <Link href="/admin/contacts">Back to list</Link></div>;

  return (
    <div className="w-full text-white px-0">
      {/* Back button aligned with form width */}
      <div className="max-w-6xl mx-auto mb-4 px-2">
        <button onClick={() => router.push('/admin/contacts')} className="inline-flex items-center px-4 py-2 bg-[#FDB813] hover:bg-[#e5a711] text-black rounded-lg shadow-sm">
          Back to list
        </button>
      </div>

      {/* Centered title and subtitle */}
      <div className="mb-6 text-center px-2">
        <h2 className="text-2xl font-bold">Enrollment #{record.id}</h2>
        <div className="text-sm text-gray-300 mt-1">View and edit the enrollment.</div>
      </div>

      <div>
        <div className="max-w-6xl mx-auto px-2">
          <HMSStudentForm
            initialData={recordToInitial(record)}
            submitUrl={'/api/admin/hms-students'}
            submitMethod={'PUT'}
            onClose={() => router.push('/admin/contacts')}
            onSubmitOverride={async (formData) => {
              // transform to DB column names and send to admin PUT
              const updates: any = { ...formData };
              // convert camelCase form fields to snake_case DB fields
              updates.full_name = formData.fullName;
              updates.date_of_birth = formData.dateOfBirth instanceof Date ? formData.dateOfBirth.toISOString() : formData.dateOfBirth;
              updates.city_state_zip = formData.cityStateZip;
              updates.phone_number = formData.phoneNumber;
              updates.email = formData.emailId;
              updates.parent_guardian_name = formData.parentGuardianName;
              updates.parent_guardian_contact = formData.parentGuardianContact;
              updates.program_applying_for = formData.programApplyingFor;
              updates.instrument_specialization = formData.instrumentSpecialization;
              updates.instrument_other = formData.instrumentOther;
              updates.preferred_class_type = formData.preferredClassType;
              updates.preferred_schedule = formData.preferredSchedule;
              updates.course_type = formData.courseType;
              updates.years_of_experience = formData.yearsOfExperience ? Number(formData.yearsOfExperience) : null;
              updates.previous_training = formData.previousTraining;
              updates.music_exam_certifications = formData.musicExamCertifications;
              updates.performance_experience = formData.performanceExperience;
              updates.performance_other = formData.performanceOther;
              updates.goals = formData.goals;
              updates.volunteer_interested = formData.volunteerInterested === 'yes';
              updates.volunteer_areas = formData.volunteerAreas;
              updates.emergency_name = formData.emergencyName;
              updates.emergency_relationship = formData.emergencyRelationship;
              updates.emergency_contact = formData.emergencyContact;

              try {
                const resp = await fetch('/api/admin/hms-students', {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json', ...(getAuthHeader() as any) },
                  body: JSON.stringify({ id: record.id, updates })
                });
                const j = await resp.json();
                if (!resp.ok || !j.success) return { success: false, error: j?.error };
                setRecord(j.data);
                return { success: true };
              } catch (err) {
                console.error('admin save error', err);
                return { success: false, error: 'network' };
              }
            }}
          />
        </div>
      </div>
    </div>
  );
}
