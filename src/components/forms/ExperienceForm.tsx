import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { Experience } from '@/types/resume';
import { Briefcase, Plus, Trash2, GripVertical, ChevronDown, ChevronUp } from 'lucide-react';

interface ExperienceFormProps {
  data: Experience[];
  onChange: (data: Experience[]) => void;
}

const ExperienceForm: React.FC<ExperienceFormProps> = ({ data, onChange }) => {
  const [expandedId, setExpandedId] = useState<string | null>(data[0]?.id || null);

  const addExperience = () => {
    const newExp: Experience = {
      id: Date.now().toString(),
      company: '',
      position: '',
      startDate: '',
      endDate: '',
      current: false,
      description: '',
      achievements: [''],
    };
    onChange([...data, newExp]);
    setExpandedId(newExp.id);
  };

  const updateExperience = (id: string, field: keyof Experience, value: any) => {
    onChange(data.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    ));
  };

  const updateAchievement = (expId: string, index: number, value: string) => {
    onChange(data.map(exp => {
      if (exp.id === expId) {
        const newAchievements = [...exp.achievements];
        newAchievements[index] = value;
        return { ...exp, achievements: newAchievements };
      }
      return exp;
    }));
  };

  const addAchievement = (expId: string) => {
    onChange(data.map(exp => 
      exp.id === expId ? { ...exp, achievements: [...exp.achievements, ''] } : exp
    ));
  };

  const removeAchievement = (expId: string, index: number) => {
    onChange(data.map(exp => {
      if (exp.id === expId) {
        const newAchievements = exp.achievements.filter((_, i) => i !== index);
        return { ...exp, achievements: newAchievements.length ? newAchievements : [''] };
      }
      return exp;
    }));
  };

  const removeExperience = (id: string) => {
    onChange(data.filter(exp => exp.id !== id));
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
              <Briefcase className="w-5 h-5 text-accent" />
            </div>
            Work Experience
          </CardTitle>
          <CardDescription>
            Add your relevant work history. Start with your most recent position.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="popLayout">
            {data.map((exp, index) => (
              <motion.div
                key={exp.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
                className="border rounded-lg overflow-hidden"
              >
                {/* Header */}
                <button
                  onClick={() => setExpandedId(expandedId === exp.id ? null : exp.id)}
                  className="w-full flex items-center justify-between p-4 bg-muted/50 hover:bg-muted transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <GripVertical className="w-4 h-4 text-muted-foreground" />
                    <div className="text-left">
                      <p className="font-medium">
                        {exp.position || 'New Position'} 
                        {exp.company && <span className="text-muted-foreground"> at {exp.company}</span>}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {exp.startDate || 'Start Date'} - {exp.current ? 'Present' : exp.endDate || 'End Date'}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={(e) => {
                        e.stopPropagation();
                        removeExperience(exp.id);
                      }}
                    >
                      <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    {expandedId === exp.id ? (
                      <ChevronUp className="w-5 h-5 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Content */}
                <AnimatePresence>
                  {expandedId === exp.id && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 space-y-4 border-t">
                        {/* Position & Company */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Job Title *</Label>
                            <Input
                              value={exp.position}
                              onChange={(e) => updateExperience(exp.id, 'position', e.target.value)}
                              placeholder="Software Engineer"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Company *</Label>
                            <Input
                              value={exp.company}
                              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
                              placeholder="Tech Company Inc."
                            />
                          </div>
                        </div>

                        {/* Dates */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Input
                              type="month"
                              value={exp.startDate}
                              onChange={(e) => updateExperience(exp.id, 'startDate', e.target.value)}
                            />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center justify-between">
                              <Label>End Date</Label>
                              <div className="flex items-center gap-2">
                                <Switch
                                  checked={exp.current}
                                  onCheckedChange={(checked) => updateExperience(exp.id, 'current', checked)}
                                />
                                <span className="text-sm text-muted-foreground">Current</span>
                              </div>
                            </div>
                            <Input
                              type="month"
                              value={exp.endDate}
                              onChange={(e) => updateExperience(exp.id, 'endDate', e.target.value)}
                              disabled={exp.current}
                            />
                          </div>
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={exp.description}
                            onChange={(e) => updateExperience(exp.id, 'description', e.target.value)}
                            placeholder="Describe your role and responsibilities..."
                            className="min-h-[80px]"
                          />
                        </div>

                        {/* Achievements */}
                        <div className="space-y-2">
                          <Label>Key Achievements</Label>
                          <div className="space-y-2">
                            {exp.achievements.map((achievement, achIndex) => (
                              <div key={achIndex} className="flex gap-2">
                                <Input
                                  value={achievement}
                                  onChange={(e) => updateAchievement(exp.id, achIndex, e.target.value)}
                                  placeholder="Increased sales by 25%..."
                                />
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeAchievement(exp.id, achIndex)}
                                  disabled={exp.achievements.length === 1}
                                >
                                  <Trash2 className="w-4 h-4" />
                                </Button>
                              </div>
                            ))}
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => addAchievement(exp.id)}
                              className="mt-2"
                            >
                              <Plus className="w-4 h-4 mr-2" />
                              Add Achievement
                            </Button>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button
            variant="outline"
            onClick={addExperience}
            className="w-full border-dashed"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Work Experience
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ExperienceForm;
