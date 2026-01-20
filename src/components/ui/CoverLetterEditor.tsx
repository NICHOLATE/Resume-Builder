import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { CoverLetter, ResumeData } from '@/types/resume';
import { FileText, Sparkles, Save, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface CoverLetterEditorProps {
  resumeData: ResumeData;
  coverLetters: CoverLetter[];
  onSave: (letter: Omit<CoverLetter, 'id' | 'createdAt' | 'updatedAt'>) => void;
}

const CoverLetterEditor: React.FC<CoverLetterEditorProps> = ({ 
  resumeData, 
  coverLetters,
  onSave 
}) => {
  const [name, setName] = useState('');
  const [targetCompany, setTargetCompany] = useState('');
  const [targetPosition, setTargetPosition] = useState('');
  const [content, setContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const generateCoverLetter = async () => {
    if (!targetCompany || !targetPosition) {
      toast.error('Please enter company and position');
      return;
    }

    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-suggestions', {
        body: {
          type: 'cover-letter',
          resumeData,
          targetCompany,
          targetPosition,
        },
      });

      if (error) throw error;
      
      setContent(data.content || '');
      toast.success('Cover letter generated!');
    } catch (error) {
      console.error('Error generating cover letter:', error);
      // Fallback to template
      const template = `Dear Hiring Manager,

I am writing to express my strong interest in the ${targetPosition} position at ${targetCompany}. With my background in ${resumeData.targetIndustry || 'the industry'} and experience as ${resumeData.experiences[0]?.position || 'a professional'}, I am confident in my ability to contribute effectively to your team.

${resumeData.personalInfo.summary || 'I bring a combination of technical expertise and soft skills that would make me a valuable addition to your organization.'}

Throughout my career, I have developed strong skills in ${resumeData.skills.slice(0, 3).map(s => s.name).join(', ') || 'various relevant areas'}. My experience at ${resumeData.experiences[0]?.company || 'previous organizations'} has equipped me with the ability to ${resumeData.experiences[0]?.achievements[0] || 'deliver results and exceed expectations'}.

I am particularly excited about the opportunity at ${targetCompany} because of your commitment to excellence and innovation. I believe my skills and experience align well with the requirements of this role, and I am eager to bring my expertise to your team.

Thank you for considering my application. I look forward to the opportunity to discuss how I can contribute to ${targetCompany}'s continued success.

Sincerely,
${resumeData.personalInfo.fullName || '[Your Name]'}`;
      
      setContent(template);
      toast.info('Generated template cover letter');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleSave = () => {
    if (!name || !content) {
      toast.error('Please fill in all required fields');
      return;
    }

    onSave({
      name,
      targetCompany,
      targetPosition,
      content,
    });
    
    // Reset form
    setName('');
    setTargetCompany('');
    setTargetPosition('');
    setContent('');
    toast.success('Cover letter saved!');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      <Card elevated>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-accent" />
            </div>
            Cover Letter Generator
          </CardTitle>
          <CardDescription>
            Create a personalized cover letter for your job application. Use AI to generate content based on your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label>Letter Name *</Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., Software Engineer - Google"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Company *</Label>
              <Input
                value={targetCompany}
                onChange={(e) => setTargetCompany(e.target.value)}
                placeholder="e.g., Google"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Position *</Label>
              <Input
                value={targetPosition}
                onChange={(e) => setTargetPosition(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              onClick={generateCoverLetter}
              disabled={isGenerating || !targetCompany || !targetPosition}
              variant="outline"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Generate with AI
                </>
              )}
            </Button>
          </div>

          <div className="space-y-2">
            <Label>Cover Letter Content</Label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Start typing your cover letter or generate one with AI..."
              rows={15}
              className="font-serif"
            />
          </div>

          <Button onClick={handleSave} disabled={!name || !content}>
            <Save className="w-4 h-4 mr-2" />
            Save Cover Letter
          </Button>
        </CardContent>
      </Card>

      {/* Saved Cover Letters */}
      {coverLetters.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Saved Cover Letters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {coverLetters.map((letter) => (
                <div
                  key={letter.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 cursor-pointer"
                  onClick={() => {
                    setName(letter.name);
                    setTargetCompany(letter.targetCompany);
                    setTargetPosition(letter.targetPosition);
                    setContent(letter.content);
                  }}
                >
                  <div>
                    <p className="font-medium">{letter.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {letter.targetCompany} • {letter.targetPosition}
                    </p>
                  </div>
                  <Button variant="ghost" size="sm">Load</Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </motion.div>
  );
};

export default CoverLetterEditor;
