import { useState, useEffect, useCallback } from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';

const STORAGE_KEY = 'resume_builder_data';
const SETTINGS_KEY = 'resume_builder_settings';

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

export function useResumeStorage() {
  const [resumeData, setResumeData] = useState<ResumeData>(defaultResumeData);
  const [settings, setSettings] = useState<TemplateSettings>(defaultSettings);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const savedData = localStorage.getItem(STORAGE_KEY);
      const savedSettings = localStorage.getItem(SETTINGS_KEY);
      
      if (savedData) {
        setResumeData(JSON.parse(savedData));
      }
      if (savedSettings) {
        setSettings(JSON.parse(savedSettings));
      }
    } catch (error) {
      console.error('Error loading saved data:', error);
    }
    setIsLoaded(true);
  }, []);

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

  const clearAllData = useCallback(() => {
    setResumeData(defaultResumeData);
    setSettings(defaultSettings);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(SETTINGS_KEY);
  }, []);

  return {
    resumeData,
    settings,
    isLoaded,
    saveResumeData,
    saveSettings,
    updateSection,
    clearAllData,
  };
}
