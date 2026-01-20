export interface PersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  website?: string;
  summary: string;
}

export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  achievements: string[];
}

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
  gpa?: string;
  achievements: string[];
}

export interface Skill {
  id: string;
  name: string;
  level: 'beginner' | 'intermediate' | 'advanced' | 'expert';
  category: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  technologies: string[];
  link?: string;
  highlights: string[];
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  expiry?: string;
  credentialId?: string;
}

export interface ResumeData {
  personalInfo: PersonalInfo;
  experiences: Experience[];
  education: Education[];
  skills: Skill[];
  projects: Project[];
  certifications: Certification[];
  targetRole?: string;
  targetIndustry?: string;
}

export type TemplateType = 'modern' | 'classic' | 'creative' | 'professional' | 'minimal' | 'executive';

export interface TemplateSettings {
  template: TemplateType;
  primaryColor: string;
  accentColor: string;
  fontFamily: string;
  fontSize: 'small' | 'medium' | 'large';
}

export interface ATSScore {
  overall: number;
  formatting: number;
  keywords: number;
  readability: number;
  suggestions: string[];
}

export interface JobMatch {
  score: number;
  matchedKeywords: string[];
  missingKeywords: string[];
  suggestions: string[];
}

export interface CoverLetter {
  id: string;
  name: string;
  targetCompany: string;
  targetPosition: string;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface SavedCV {
  id: string;
  name: string;
  resumeData: ResumeData;
  settings: TemplateSettings;
  createdAt: string;
  updatedAt: string;
}

export interface JobApplication {
  id: string;
  company: string;
  position: string;
  status: 'applied' | 'interviewing' | 'offered' | 'rejected' | 'accepted';
  appliedDate: string;
  notes?: string;
  cvId?: string;
  coverLetterId?: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  createdAt: string;
}
