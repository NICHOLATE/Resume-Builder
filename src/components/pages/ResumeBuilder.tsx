import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import StepIndicator from '@/components/StepIndicator';
import PersonalInfoForm from '@/components/forms/PersonalInfoForm';
import ExperienceForm from '@/components/forms/ExperienceForm';
import EducationForm from '@/components/forms/EducationForm';
import SkillsForm from '@/components/forms/SkillsForm';
import TemplateSettingsForm from '@/components/forms/TemplateSettingsForm';
import ResumePreview from '@/components/ResumePreview';
import ATSScoreCard from '@/components/ATSScoreCard';
import JobMatchAnalyzer from '@/components/JobMatchAnalyzer';
import { useResumeStorage } from '@/hooks/useResumeStorage';
import { calculateATSScore } from '@/utils/atsChecker';
import { ArrowLeft, ArrowRight, Eye, FileText } from 'lucide-react';

const steps = [
  { id: 1, title: 'Personal Info', description: 'Contact details' },
  { id: 2, title: 'Experience', description: 'Work history' },
  { id: 3, title: 'Education', description: 'Academic background' },
  { id: 4, title: 'Skills', description: 'Your expertise' },
  { id: 5, title: 'Design', description: 'Template & style' },
  { id: 6, title: 'Preview', description: 'Review & export' },
];

const ResumeBuilder: React.FC = () => {
  const { resumeData, settings, updateSection, saveSettings } = useResumeStorage();
  const [currentStep, setCurrentStep] = useState(0);
  const [showPreview, setShowPreview] = useState(false);

  const atsScore = calculateATSScore(resumeData);

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <PersonalInfoForm
            data={resumeData.personalInfo}
            onChange={(data) => updateSection('personalInfo', data)}
          />
        );
      case 1:
        return (
          <ExperienceForm
            data={resumeData.experiences}
            onChange={(data) => updateSection('experiences', data)}
          />
        );
      case 2:
        return (
          <EducationForm
            data={resumeData.education}
            onChange={(data) => updateSection('education', data)}
          />
        );
      case 3:
        return (
          <SkillsForm
            data={resumeData.skills}
            onChange={(data) => updateSection('skills', data)}
            industry={resumeData.targetIndustry}
          />
        );
      case 4:
        return (
          <TemplateSettingsForm
            settings={settings}
            onChange={saveSettings}
          />
        );
      case 5:
        return (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2">
              <ResumePreview data={resumeData} settings={settings} />
            </div>
            <div className="space-y-6">
              <ATSScoreCard score={atsScore} />
              <JobMatchAnalyzer resumeData={resumeData} />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b bg-card/80 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <a href="/" className="flex items-center gap-2">
              <FileText className="w-6 h-6 text-accent" />
              <span className="font-display text-xl font-bold text-foreground">ResumeAI</span>
            </a>
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              className="lg:hidden"
            >
              <Eye className="w-4 h-4 mr-2" />
              {showPreview ? 'Edit' : 'Preview'}
            </Button>
          </div>
        </div>
      </header>

      {/* Progress */}
      <div className="border-b bg-card">
        <div className="container mx-auto px-4">
          <StepIndicator
            steps={steps}
            currentStep={currentStep}
            onStepClick={setCurrentStep}
          />
        </div>
      </div>

      {/* Content */}
      <main className="container mx-auto px-4 py-8 pb-24">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderStepContent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Navigation */}
      <div className="fixed bottom-0 left-0 right-0 border-t bg-card/95 backdrop-blur-lg">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous
            </Button>
            <span className="text-sm text-muted-foreground">
              Step {currentStep + 1} of {steps.length}
            </span>
            <Button
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;
