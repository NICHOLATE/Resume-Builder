import { useState, useEffect, useCallback } from 'react';
import { 
  ResumeData, 
  TemplateSettings, 
  SavedCV, 
  CoverLetter, 
  JobApplication,
  UserProfile 
} from '@/types/resume';

const STORAGE_KEY = 'cvision_data';
const SETTINGS_KEY = 'cvision_settings';
const SAVED_CVS_KEY = 'cvision_saved_cvs';
const COVER_LETTERS_KEY = 'cvision_cover_letters';
const APPLICATIONS_KEY = 'cvision_applications';
const PROFILE_KEY = 'cvision_profile';

const defaultResumeData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
  },
  experiences: [],
  education: [],
  skills: [],
  projects: [],
  certifications: [],
  targetRole: '',
  targetIndustry: '',
};

const defaultSettings: TemplateSettings = {
  template: 'modern',
  primaryColor: '#1e3a5f',
  accentColor: '#2d9596',
  fontFamily: 'Inter',
  fontSize: 'medium',
};

const defaultProfile: UserProfile = {
  id: 'local-user',
  name: '',
  email: '',
  createdAt: new Date().toISOString(),
};

export function useCVisionStorage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [settings, setSettings] = useState<TemplateSettings>(defaultSettings);
  const [savedCVs, setSavedCVs] = useState<SavedCV[]>([]);
  const [coverLetters, setCoverLetters] = useState<CoverLetter[]>([]);
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [profile, setProfile] = useState<UserProfile>(defaultProfile);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      const savedCVsData = localStorage.getItem(SAVED_CVS_KEY);
      const savedCoverLetters = localStorage.getItem(COVER_LETTERS_KEY);
      const savedApplications = localStorage.getItem(APPLICATIONS_KEY);
      const savedProfile = localStorage.getItem(PROFILE_KEY);

      if (savedData) setResumeData(JSON.parse(savedData));
      if (savedSettings) setSettings(JSON.parse(savedSettings));
      if (savedCVsData) setSavedCVs(JSON.parse(savedCVsData));
      if (savedCoverLetters) setCoverLetters(JSON.parse(savedCoverLetters));
      if (savedApplications) setApplications(JSON.parse(savedApplications));
      if (savedProfile) {
        const parsed = JSON.parse(savedProfile);
        setProfile(parsed);
        setIsLoggedIn(!!parsed.email);
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    setIsLoaded(true);
  }, []);

  // Resume data
  const saveResumeData = useCallback((data: ResumeData) => {
    setResumeData(data);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, []);

  const saveSettings = useCallback((newSettings: TemplateSettings) => {
    setSettings(newSettings);
    try {
      localStorage.setItem(SETTINGS_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  }, []);

  const updateSection = useCallback(<K extends keyof ResumeData>(
    section: K,
    data: ResumeData[K]
  ) => {
    const newData = { ...resumeData, [section]: data };
    saveResumeData(newData);
  }, [resumeData, saveResumeData]);

  // Saved CVs
  const saveCV = useCallback((name: string): SavedCV => {
    const newCV: SavedCV = {
      id: Date.now().toString(),
      name,
      resumeData: { ...resumeData },
      settings: { ...settings },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedCVs = [...savedCVs, newCV];
    setSavedCVs(updatedCVs);
    localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(updatedCVs));
    return newCV;
  }, [resumeData, settings, savedCVs]);

  const loadCV = useCallback((cv: SavedCV) => {
    setResumeData(cv.resumeData);
    setSettings(cv.settings);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cv.resumeData));
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(cv.settings));
  }, []);

  const deleteCV = useCallback((id: string) => {
    const updatedCVs = savedCVs.filter(cv => cv.id !== id);
    setSavedCVs(updatedCVs);
    localStorage.setItem(SAVED_CVS_KEY, JSON.stringify(updatedCVs));
  }, [savedCVs]);

  // Cover Letters
  const saveCoverLetter = useCallback((letter: Omit<CoverLetter, 'id' | 'createdAt' | 'updatedAt'>): CoverLetter => {
    const newLetter: CoverLetter = {
      ...letter,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    const updatedLetters = [...coverLetters, newLetter];
    setCoverLetters(updatedLetters);
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(updatedLetters));
    return newLetter;
  }, [coverLetters]);

  const updateCoverLetter = useCallback((id: string, updates: Partial<CoverLetter>) => {
    const updatedLetters = coverLetters.map(l => 
      l.id === id ? { ...l, ...updates, updatedAt: new Date().toISOString() } : l
    );
    setCoverLetters(updatedLetters);
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(updatedLetters));
  }, [coverLetters]);

  const deleteCoverLetter = useCallback((id: string) => {
    const updatedLetters = coverLetters.filter(l => l.id !== id);
    setCoverLetters(updatedLetters);
    localStorage.setItem(COVER_LETTERS_KEY, JSON.stringify(updatedLetters));
  }, [coverLetters]);

  // Applications
  const addApplication = useCallback((app: Omit<JobApplication, 'id'>): JobApplication => {
    const newApp: JobApplication = { ...app, id: Date.now().toString() };
    const updatedApps = [...applications, newApp];
    setApplications(updatedApps);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApps));
    return newApp;
  }, [applications]);

  const updateApplication = useCallback((id: string, updates: Partial<JobApplication>) => {
    const updatedApps = applications.map(a => a.id === id ? { ...a, ...updates } : a);
    setApplications(updatedApps);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApps));
  }, [applications]);

  const deleteApplication = useCallback((id: string) => {
    const updatedApps = applications.filter(a => a.id !== id);
    setApplications(updatedApps);
    localStorage.setItem(APPLICATIONS_KEY, JSON.stringify(updatedApps));
  }, [applications]);

  // Profile & Auth
  const login = useCallback((name: string, email: string) => {
    const newProfile: UserProfile = {
      id: Date.now().toString(),
      name,
      email,
      createdAt: new Date().toISOString(),
    };
    setProfile(newProfile);
    setIsLoggedIn(true);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
  }, []);

  const logout = useCallback(() => {
    setProfile(defaultProfile);
    setIsLoggedIn(false);
    localStorage.removeItem(PROFILE_KEY);
  }, []);

  const updateProfile = useCallback((updates: Partial<UserProfile>) => {
    const newProfile = { ...profile, ...updates };
    setProfile(newProfile);
    localStorage.setItem(PROFILE_KEY, JSON.stringify(newProfile));
  }, [profile]);

  const clearAllData = useCallback(() => {
    setResumeData(defaultResumeData);
    setSettings(defaultSettings);
    setSavedCVs([]);
    setCoverLetters([]);
    setApplications([]);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
    localStorage.removeItem(SAVED_CVS_KEY);
    localStorage.removeItem(COVER_LETTERS_KEY);
    localStorage.removeItem(APPLICATIONS_KEY);
  }, []);

  return {
    // Data
    resumeData,
    settings,
    savedCVs,
    coverLetters,
    applications,
    profile,
    isLoaded,
    isLoggedIn,
    // Resume methods
    saveResumeData,
    saveSettings,
    updateSection,
    clearAllData,
    // CV methods
    saveCV,
    loadCV,
    deleteCV,
    // Cover letter methods
    saveCoverLetter,
    updateCoverLetter,
    deleteCoverLetter,
    // Application methods
    addApplication,
    updateApplication,
    deleteApplication,
    // Auth methods
    login,
    logout,
    updateProfile,
  };
}
