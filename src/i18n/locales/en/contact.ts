export default {
  meta: {
    title: "Contact Us | YBH Ministries",
    description: "Get in touch with Yeshua Beth Hallel Ministries. Contact us for inquiries about our Bible college, music school, church services, or ministry programs."
  },
  title: "Contact Us",
  subtitle: "Get in touch with us",
  getInTouch: "We'd love to hear from you",
  
  hero: {
    title: "Contact",
    subtitle: "Get in touch with Yeshua Beth Hallel Ministries"
  },
  
  tabs: {
    guinnessAttempt: "Guinness World Records Attempt-2",
    studentForm: "HMS Student Form",
    getInTouch: "Get In Touch",
    worship24: "24 Hours Worship",
    conferenceRequest: "Offline Conference in Your City?",
    lsmStudent: "London School of Music Student?",
    sponsor: "Become a Sponsor for Event?",
    trustee: "Become a Trustee?"
  },

  contactForm: {
    title: "Get In Touch",
    subtitle: "Send us a message and we'll get back to you.",
    name: "Full Name",
    phone: "Phone Number",
    email: "Email-id",
    location: "Location",
    message: "Message",
    namePlaceholder: "Enter your name",
    phonePlaceholder: "e.g. 1234567890",
    emailPlaceholder: "yourname@example.com",
    locationPlaceholder: "City, State or Country (optional)",
    messagePlaceholder: "Write your message here",
    facebookPlaceholder: "https://facebook.com/yourpage",
    send: "Send",
    sending: "Sending...",
    sendMessage: "Send Message",
    resetButton: "Reset Form",
    sendAnother: "Send another message",
    selectDateLabel: "Select Date (2nd Saturday)",
    hearAboutUs: 'How did you hear about us?',
    selectOption: 'Select an option',
    hearOptions: {
      facebook: 'Facebook',
      instagram: 'Instagram',
      youtube: 'YouTube',
      tvProgram: 'TV Program',
      friend: 'Friend or Family',
      event: 'Event or Conference',
      flyer: 'Flyer or Poster',
      website: 'YBH Website',
      other: 'Other (Please specify)'
    },
    timeslot: "Timeslot",
    timeslotPlaceholder: "Select a timeslot",
    facebookLink: "Facebook Link",
    submitBooking: "Submit Booking",
    success: "Thanks — we'll get back to you soon!",
    error: "There was an error sending your message. Please try again."
    ,
    validation: {
      nameRequired: 'Name is required.',
      hearAboutUsRequired: 'This field is required.',
      otherHearAboutUsRequired: 'Please specify.',
      otherHearAboutUsMax: 'Maximum 20 characters allowed.',
      nameMin: 'Please enter at least 2 characters.',
      nameMax: 'Maximum 100 characters allowed.',
      emailRequired: 'Email is required.',
      emailInvalid: 'Please enter a valid email address.',
      emailMax: 'Maximum 254 characters allowed.',
      phoneRequired: 'Phone number is required.',
      phoneMin: 'Please enter at least 10 numbers for phone number.',
      phoneInvalid: 'Please enter a valid phone number.',
      phoneMax: 'Maximum 15 characters allowed for phone number.',
      messageRequired: 'Message is required.',
      messageMin: 'Please enter at least 10 characters.',
      messageMax: 'Maximum 1000 characters allowed.',
      locationMin: 'Please enter at least 2 characters for location',
      locationMax: 'Maximum 200 characters allowed for location',
      worship24_dateRequired: 'Please select a date (2nd Saturday of the month)',
      worship24_previousMonth: 'Previous months are not allowed',
      worship24_secondSaturday: 'Only the 2nd Saturday of the month is selectable',
      worship24_timeslotRequired: 'Please select a timeslot',
      worship24_timeslotInvalid: 'Invalid timeslot',
      worship24_facebookRequired: 'Facebook link is required',
      worship24_facebookInvalid: 'Please enter a valid Facebook URL',
      worship24_facebookTooLong: 'Facebook link is too long'
    }
    ,
    worship24_description: 'Book a slot for the {{name}} event (2nd Saturday of each month).'
  ,
  // worship24 UI labels
  worship24: {
    bookAnother: 'Book Another'
  },
  },
  
  guinnessAttempt: {
    title: "Guinness World Records Attempt-2",
    comingSoon: "Content coming soon..."
  },
  
  studentForm: {
    title: "Hallel Music School Student Application Form",
    sections: {
      personalInfo: "1. Personal Information",
      courseInfo: "2. Course Information",
      courseType: "3. Course Type / Certification Options",
      musicBackground: "4. Music Background (if any)",
      goalsInterests: "5. Goals & Interests",
      volunteer: "6. Volunteer Opportunity",
      emergencyContact: "7. Emergency Contact",
      referralInfo: "8. Referral Information"
    },
    fields: {
      fullName: "Full Name",
      dateOfBirth: "Date of Birth",
      gender: "Gender",
      address: "Address",
      cityStateZip: "City / State / ZIP",
      phoneNumber: "Phone Number",
      emailId: "Email ID",
      parentGuardianName: "Parent / Guardian Name (if under 18)",
      parentGuardianContact: "Parent / Guardian Contact",
      programApplyingFor: "Program Applying For",
      instrumentSpecialization: "Instrument / Specialization",
      preferredClassType: "Preferred Class Type",
      preferredSchedule: "Preferred Schedule",
      courseTypePrompt: "Please select the type of course you want to enroll in:",
      yearsOfExperience: "Years of Experience",
      previousTraining: "Previous Training / School",
      musicExamCertifications: "Music Exam Certifications (if any)",
      performanceExperience: "Performance Experience",
      goalsPrompt: "What do you hope to achieve by joining our music program?",
      goalsPlaceholder: "Share your musical goals and aspirations...",
      volunteerPrompt: "Would you like to be a volunteer for school events, concerts, or workshops?",
      volunteerDetailsPrompt: "If yes, please specify your area of interest (e.g., stage setup, helping younger students, event coordination):",
      emergencyName: "Name",
      emergencyRelationship: "Relationship",
      emergencyContact: "Contact Number"
    },
    placeholders: {
      fullName: "Enter your full name",
      dateOfBirth: "dd-mm-yyyy",
      selectGender: "Select your gender",
      address: "Enter your street address",
      cityStateZip: "Enter city, state, and ZIP code",
      phone: "1234567890",
      email: "example@email.com",
      parentGuardianName: "Enter parent/guardian name",
      parentGuardianContact: "1234567890",
      instrumentOther: "Specify",
      yearsOfExperience: "Enter years of experience (0-100)",
      previousTraining: "Describe your previous music training",
      musicExamCertifications: "List any certifications or exams completed",
      performanceOther: "Specify",
      emergencyName: "Enter emergency contact name",
      emergencyRelationship: "Enter relationship (e.g., Parent, Spouse)",
      emergencyContact: "1234567890"
    },
    helpers: {
      maxChars: "Max {{count}} characters",
      dateRequired: "Date is required",
      selectFromOptions: "Select from options",
      validNumberNoCountry: "Valid number without country code",
      range0to100: "Range: 0–100"
    },
    options: {
      beginner: "Beginner",
      intermediate: "Intermediate",
      advanced: "Advanced",
      piano: "Piano",
      guitar: "Guitar",
      violin: "Violin",
      drums: "Drums",
      vocal: "Vocal",
      other: "Other",
      individual: "Individual",
      group: "Group",
      online: "Online",
      inPerson: "In-Person",
      weekdays: "Weekdays",
      weekends: "Weekends",
      morning: "Morning",
      evening: "Evening",
      freeBasicMusic: "I want to learn Free Basic Music",
      hmsWithCertificate: "I want to learn Professional Music with HMS Certificate (Paid)",
      lcmWithCertificate: "I want to learn Professional Music with LCM Certificate (Paid)",
      schoolEvents: "School events",
      competitions: "Competitions",
      choir: "Choir",
      volunteerOnlineTeacher: "Volunteer as online music teacher",
      volunteerOfflineConferences: "Volunteer as offline hallel Conferences",
      volunteerSummerKids: "Volunteer for Summer Kids training sessions",
      volunteerEvents: "Volunteer for HMS / YBH Events",
      yes: "Yes",
      no: "No",
      male: "Male",
      female: "Female",
      preferNotToSay: "Prefer not to say"
      ,
      parent: "Parent",
      spouse: "Spouse",
      child: "Child",
      sibling: "Sibling"
    },
    buttons: {
      submit: "Submit Application",
      submitting: "Submitting...",
      reset: "Reset Form"
      ,
      submitAnother: "Submit Another Application"
    },
    messages: {
      success: "Application submitted successfully! We will contact you soon.",
      error: "There was an error submitting your application. Please try again."
    },
    validation: {
      // Personal Information
      fullNameRequired: "Full name is required",
      fullNameMin: "Full name must be at least 2 characters",
      fullNameMax: "Full name cannot exceed 100 characters",
      fullNamePattern: "Full name can only contain letters, spaces, dots, hyphens, and apostrophes",
      dateOfBirthRequired: "Date of birth is required",
      ageMinimum: "Student must be at least 5 years old",
      genderRequired: "Gender is required",
      addressRequired: "Address is required",
      addressMin: "Address must be at least 5 characters",
      addressMax: "Address cannot exceed 200 characters",
      cityStateZipRequired: "City / State / ZIP is required",
      cityStateZipMax: "City / State / ZIP cannot exceed 100 characters",
      phoneRequired: "Phone number is required",
      phonePattern: "Please enter a valid phone number (10-15 digits)",
      emailRequired: "Email is required",
      emailMax: "Email cannot exceed 100 characters",
      emailPattern: "Please enter a valid email address",
      nameMax: "Name cannot exceed 100 characters",
      
      // Course Information
      programRequired: "Please select at least one program level",
      instrumentRequired: "Please select at least one instrument",
      instrumentOtherMax: "Instrument specification cannot exceed 50 characters",
      classTypeRequired: "Please select at least one class type",
      scheduleRequired: "Please select at least one schedule preference",
      
      // Course Type
      courseTypeRequired: "Please select at least one course type",
      
      // Music Background
      yearsMin: "Years of experience cannot be negative",
      yearsMax: "Years of experience cannot exceed 100",
      textMax200: "This field cannot exceed 200 characters",
      performanceOtherMax: "Performance details cannot exceed 100 characters",
      
      // Goals
      goalsMax: "Goals cannot exceed 1000 characters",
      
      // Emergency Contact
      emergencyNameRequired: "Emergency contact name is required",
      emergencyNameMin: "Emergency contact name must be at least 2 characters",
      emergencyRelationshipRequired: "Relationship is required",
      relationshipMax: "Relationship cannot exceed 50 characters",
      emergencyContactRequired: "Emergency contact number is required"
    }
  },
  
  conferenceRequest: {
    title: "Offline Conference in Your City?",
    comingSoon: "Request form coming soon..."
  },
  
  lsmStudent: {
    title: "London School of Music Student?",
    comingSoon: "Form coming soon..."
  },
  
  sponsor: {
    title: "Become a Sponsor for Event?",
    comingSoon: "Sponsorship information coming soon..."
  },
  
  trustee: {
    title: "Become a Trustee?",
    comingSoon: "Information coming soon..."
  },
  
  formFields: {
    fullName: "Full Name",
    email: "Email Address",
    phone: "Phone Number",
    message: "Message",
    city: "City",
    state: "State",
    country: "Country",
    organization: "Organization",
    subject: "Subject",
    submit: "Submit",
    sending: "Sending...",
    success: "Thank you! We'll get back to you soon.",
    error: "There was an error sending your message. Please try again."
  },
  
  contactInfo: {
    title: "Contact Information",
    address: "Address",
    phone: "Phone",
    email: "Email",
    followUs: "Follow Us",
    hours: "Office Hours",
    weekdays: "Monday - Friday: 9:00 AM - 6:00 PM",
    saturday: "Saturday: 10:00 AM - 4:00 PM",
    sunday: "Sunday: Closed"
  },
  
  map: {
    title: "Find Us",
    directions: "Get Directions"
  }
};
