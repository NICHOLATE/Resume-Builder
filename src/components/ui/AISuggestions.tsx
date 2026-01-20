import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Sparkles, Loader2, Lightbulb, Plus, Check } from 'lucide-react';
import { ResumeData } from '@/types/resume';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface AISuggestionsProps {
  resumeData: ResumeData;
  onApplySuggestion: (field: string, value: string) => void;
}

const AISuggestions: React.FC<AISuggestionsProps> = ({ resumeData, onApplySuggestion }) => {
  const [targetRole, setTargetRole] = useState(resumeData.targetRole || '');
  const [targetIndustry, setTargetIndustry] = useState(resumeData.targetIndustry || '');
  const [isLoading, setIsLoading] = useState(false);
  const [suggestions, setSuggestions] = useState<{
    summary?: string;
    skills?: string[];
    achievements?: string[];
  }>({});

  const generateSuggestions = async () => {
    if (!targetRole) {
      toast.error('Please enter a target role');
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('ai-suggestions', {
        body: {
          type: 'suggestions',
          resumeData,
          targetRole,
          targetIndustry,
        },
      });

      if (error) throw error;
      
      setSuggestions(data);
      toast.success('Suggestions generated!');
    } catch (error) {
      console.error('Error generating suggestions:', error);
      // Fallback suggestions
      setSuggestions({
        summary: `Results-driven ${targetRole} with expertise in ${targetIndustry || 'the industry'}. Proven track record of delivering high-quality solutions and driving business outcomes. Passionate about innovation and continuous improvement.`,
        skills: [
          'Strategic Planning',
          'Team Leadership',
          'Problem Solving',
          'Communication',
          'Project Management',
        ],
        achievements: [
          `Increased team productivity by 25% through implementation of new processes`,
          `Led cross-functional team of 10+ members to deliver project ahead of schedule`,
          `Reduced operational costs by 15% through process optimization`,
        ],
      });
      toast.info('Generated template suggestions');
    } finally {
      setIsLoading(false);
    }
  };

  const applySummary = () => {
    if (suggestions.summary) {
      onApplySuggestion('summary', suggestions.summary);
      toast.success('Summary applied!');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <Card elevated>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-accent" />
            </div>
            AI Content Suggestions
          </CardTitle>
          <CardDescription>
            Get AI-powered suggestions to improve your resume content based on your target role.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Target Role</Label>
              <Input
                value={targetRole}
                onChange={(e) => setTargetRole(e.target.value)}
                placeholder="e.g., Senior Software Engineer"
              />
            </div>
            <div className="space-y-2">
              <Label>Target Industry (optional)</Label>
              <Input
                value={targetIndustry}
                onChange={(e) => setTargetIndustry(e.target.value)}
                placeholder="e.g., Technology, Finance"
              />
            </div>
          </div>

          <Button
            onClick={generateSuggestions}
            disabled={isLoading || !targetRole}
            variant="gradient"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Suggestions
              </>
            )}
          </Button>

          {suggestions.summary && (
            <div className="space-y-4 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Suggested Professional Summary
                  </Label>
                  <Button size="sm" variant="outline" onClick={applySummary}>
                    <Check className="w-4 h-4 mr-1" />
                    Apply
                  </Button>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg text-sm">
                  {suggestions.summary}
                </div>
              </div>

              {suggestions.skills && suggestions.skills.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Suggested Skills to Add
                  </Label>
                  <div className="flex flex-wrap gap-2">
                    {suggestions.skills.map((skill, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="text-xs"
                        onClick={() => {
                          onApplySuggestion('skill', skill);
                          toast.success(`Added skill: ${skill}`);
                        }}
                      >
                        <Plus className="w-3 h-3 mr-1" />
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {suggestions.achievements && suggestions.achievements.length > 0 && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Lightbulb className="w-4 h-4 text-accent" />
                    Suggested Achievement Phrases
                  </Label>
                  <div className="space-y-2">
                    {suggestions.achievements.map((achievement, index) => (
                      <div 
                        key={index} 
                        className="p-3 bg-muted/50 rounded-lg text-sm flex items-start gap-2"
                      >
                        <span className="text-accent">•</span>
                        <span>{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default AISuggestions;
