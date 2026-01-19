import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/types/resume';
import { Wrench, Plus, X } from 'lucide-react';

interface SkillsFormProps {
  data: Skill[];
  onChange: (data: Skill[]) => void;
  industry?: string;
}

const skillSuggestions: Record<string, string[]> = {
  software: ['JavaScript', 'TypeScript', 'React', 'Node.js', 'Python', 'Git', 'AWS', 'Docker', 'SQL', 'REST APIs', 'Agile', 'CI/CD'],
  marketing: ['SEO', 'Google Analytics', 'Content Marketing', 'Social Media', 'Email Marketing', 'CRM', 'A/B Testing', 'Copywriting', 'PPC', 'Brand Strategy'],
  finance: ['Financial Analysis', 'Excel', 'Financial Modeling', 'Budgeting', 'Forecasting', 'SAP', 'Bloomberg', 'Risk Assessment', 'Accounting', 'Compliance'],
  healthcare: ['Patient Care', 'EMR Systems', 'HIPAA Compliance', 'Medical Terminology', 'Clinical Documentation', 'Vital Signs', 'Medication Administration'],
  general: ['Communication', 'Leadership', 'Problem Solving', 'Team Collaboration', 'Project Management', 'Time Management', 'Critical Thinking', 'Adaptability'],
};

const categories = ['Technical', 'Soft Skills', 'Tools', 'Languages', 'Certifications', 'Other'];

const SkillsForm: React.FC<SkillsFormProps> = ({ data, onChange, industry = 'general' }) => {
  const [newSkill, setNewSkill] = useState('');
  const [newCategory, setNewCategory] = useState('Technical');
  const [newLevel, setNewLevel] = useState<Skill['level']>('intermediate');

  const addSkill = (skillName?: string) => {
    const name = skillName || newSkill.trim();
    if (!name || data.some(s => s.name.toLowerCase() === name.toLowerCase())) return;

    const skill: Skill = {
      id: Date.now().toString(),
      name,
      level: newLevel,
      category: newCategory,
    };
    onChange([...data, skill]);
    setNewSkill('');
  };

  const removeSkill = (id: string) => {
    onChange(data.filter(s => s.id !== id));
  };

  const updateSkillLevel = (id: string, level: Skill['level']) => {
    onChange(data.map(s => s.id === id ? { ...s, level } : s));
  };

  const suggestions = skillSuggestions[industry.toLowerCase()] || skillSuggestions.general;
  const unusedSuggestions = suggestions.filter(s => !data.some(d => d.name.toLowerCase() === s.toLowerCase()));

  const groupedSkills = data.reduce((acc, skill) => {
    if (!acc[skill.category]) acc[skill.category] = [];
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

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
              <Wrench className="w-5 h-5 text-accent" />
            </div>
            Skills
          </CardTitle>
          <CardDescription>
            Add your relevant skills. Use the suggestions below or add your own.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Add new skill */}
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="md:col-span-2 space-y-2">
                <Label>Skill Name</Label>
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSkill()}
                  placeholder="e.g., React, Project Management"
                />
              </div>
              <div className="space-y-2">
                <Label>Category</Label>
                <Select value={newCategory} onValueChange={setNewCategory}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map(cat => (
                      <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Level</Label>
                <Select value={newLevel} onValueChange={(v) => setNewLevel(v as Skill['level'])}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="beginner">Beginner</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="advanced">Advanced</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <Button onClick={() => addSkill()} disabled={!newSkill.trim()}>
              <Plus className="w-4 h-4 mr-2" />
              Add Skill
            </Button>
          </div>

          {/* Suggestions */}
          {unusedSuggestions.length > 0 && (
            <div className="space-y-2">
              <Label className="text-muted-foreground">Suggested Skills</Label>
              <div className="flex flex-wrap gap-2">
                {unusedSuggestions.slice(0, 8).map(suggestion => (
                  <Badge
                    key={suggestion}
                    variant="outline"
                    className="cursor-pointer hover:bg-accent hover:text-accent-foreground transition-colors"
                    onClick={() => addSkill(suggestion)}
                  >
                    <Plus className="w-3 h-3 mr-1" />
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Current skills */}
          <AnimatePresence mode="popLayout">
            {Object.entries(groupedSkills).map(([category, skills]) => (
              <motion.div
                key={category}
                layout
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="space-y-2"
              >
                <Label>{category}</Label>
                <div className="flex flex-wrap gap-2">
                  {skills.map(skill => (
                    <motion.div
                      key={skill.id}
                      layout
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                    >
                      <Badge
                        variant="secondary"
                        className="flex items-center gap-2 py-1.5 px-3"
                      >
                        <span>{skill.name}</span>
                        <span className="text-xs text-muted-foreground capitalize">
                          ({skill.level})
                        </span>
                        <button
                          onClick={() => removeSkill(skill.id)}
                          className="ml-1 hover:text-destructive transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </Badge>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-8">
              No skills added yet. Add some skills to strengthen your resume.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillsForm;
