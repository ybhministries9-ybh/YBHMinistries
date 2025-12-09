import { z } from 'zod';

export const getInTouchSchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254).optional().or(z.literal('')).nullable().optional(),
  phone: z.string().min(7).max(30).regex(/^[0-9+()\-\.\s]+$/),
  message: z.string().min(10).max(4000),
  location: z.string().max(200).optional().nullable().or(z.literal('')).optional(),
});

export const storySchema = z.object({
  name: z.string().min(2).max(100),
  email: z.string().email().max(254).optional().or(z.literal('')).nullable().optional(),
  role: z.string().min(2).max(50),
  category: z.string().min(1).max(50),
  location: z.string().min(2).max(100),
  testimony: z.string().min(50).max(5000),
});

export const hmsStudentSchema = z.object({
  fullName: z.string().min(2).max(200),
  dateOfBirth: z.string().regex(/^\d{2}-\d{2}-\d{4}$/),
  gender: z.string().min(1).max(50),
  address: z.string().max(500).optional().or(z.literal('')),
  cityStateZip: z.string().max(200).optional().or(z.literal('')),
  phoneNumber: z.string().min(7).max(50).regex(/^[0-9+()\-\.\s]+$/).optional(),
  emailId: z.string().email().max(254).optional().or(z.literal('')),
  parentGuardianName: z.string().max(200).optional().or(z.literal('')),
  parentGuardianContact: z.string().max(50).optional().or(z.literal('')),

  programApplyingFor: z.array(z.string()).optional(),
  instrumentSpecialization: z.array(z.string()).optional(),
  instrumentOther: z.string().max(100).optional().or(z.literal('')),
  preferredClassType: z.array(z.string()).optional(),
  preferredSchedule: z.array(z.string()).optional(),
  courseType: z.array(z.string()).optional(),

  yearsOfExperience: z.number().optional().nullable(),
  previousTraining: z.string().max(500).optional().or(z.literal('')),
  musicExamCertifications: z.string().max(500).optional().or(z.literal('')),
  performanceExperience: z.array(z.string()).optional(),
  performanceOther: z.string().max(200).optional().or(z.literal('')),

  goals: z.string().max(2000).optional().or(z.literal('')),
  volunteerInterested: z.string().optional(),
  volunteerAreas: z.array(z.string()).optional(),

  emergencyName: z.string().min(2).max(200),
  emergencyRelationship: z.string().min(1).max(100),
  emergencyContact: z.string().min(7).max(50).regex(/^[0-9+()\-\.\s]+$/),
});

export type GetInTouchInput = z.infer<typeof getInTouchSchema>;
export type StoryInput = z.infer<typeof storySchema>;
export type HmsStudentInput = z.infer<typeof hmsStudentSchema>;
