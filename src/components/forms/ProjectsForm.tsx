import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Project } from '@/types/resume';
import { FolderGit2, Plus, Trash2, ChevronDown, Link, X } from 'lucide-react';

interface ProjectsFormProps {
  data: Project[];
  onChange: (data: Project[]) => void;
}

const ProjectsForm: React.FC<ProjectsFormProps> = ({ data, onChange }) => {
  const [openItems, setOpenItems] = useState<string[]>(data.map(p => p.id));
  const [newTech, setNewTech] = useState<Record<string, string>>({});

  const addProject = () => {
    const newProject: Project = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: [],
      link: '',
      highlights: [''],
    };
    onChange([...data, newProject]);
    setOpenItems([...openItems, newProject.id]);
  };

  const removeProject = (id: string) => {
    onChange(data.filter(p => p.id !== id));
    setOpenItems(openItems.filter(i => i !== id));
  };

  const updateProject = (id: string, field: keyof Project, value: any) => {
    onChange(data.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const addTechnology = (projectId: string) => {
    const tech = newTech[projectId]?.trim();
    if (!tech) return;
    const project = data.find(p => p.id === projectId);
    if (project && !project.technologies.includes(tech)) {
      updateProject(projectId, 'technologies', [...project.technologies, tech]);
      setNewTech({ ...newTech, [projectId]: '' });
    }
  };

  const removeTechnology = (projectId: string, tech: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'technologies', project.technologies.filter(t => t !== tech));
    }
  };

  const addHighlight = (projectId: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      updateProject(projectId, 'highlights', [...project.highlights, '']);
    }
  };

  const updateHighlight = (projectId: string, index: number, value: string) => {
    const project = data.find(p => p.id === projectId);
    if (project) {
      const newHighlights = [...project.highlights];
      newHighlights[index] = value;
      updateProject(projectId, 'highlights', newHighlights);
    }
  };

  const removeHighlight = (projectId: string, index: number) => {
    const project = data.find(p => p.id === projectId);
    if (project && project.highlights.length > 1) {
      updateProject(projectId, 'highlights', project.highlights.filter((_, i) => i !== index));
    }
  };

  const toggleItem = (id: string) => {
    setOpenItems(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
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
              <FolderGit2 className="w-5 h-5 text-accent" />
            </div>
            Projects
          </CardTitle>
          <CardDescription>
            Showcase your personal or professional projects to demonstrate your skills.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <AnimatePresence mode="popLayout">
            {data.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <Collapsible
                  open={openItems.includes(project.id)}
                  onOpenChange={() => toggleItem(project.id)}
                >
                  <div className="border rounded-lg">
                    <CollapsibleTrigger className="w-full">
                      <div className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors">
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-medium text-muted-foreground">
                            {index + 1}.
                          </span>
                          <span className="font-medium">
                            {project.name || 'New Project'}
                          </span>
                          {project.technologies.length > 0 && (
                            <span className="text-sm text-muted-foreground">
                              • {project.technologies.slice(0, 3).join(', ')}
                              {project.technologies.length > 3 && '...'}
                            </span>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeProject(project.id);
                            }}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                          <ChevronDown className={`w-4 h-4 transition-transform ${openItems.includes(project.id) ? 'rotate-180' : ''}`} />
                        </div>
                      </div>
                    </CollapsibleTrigger>

                    <CollapsibleContent>
                      <div className="p-4 pt-0 space-y-4 border-t">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label>Project Name *</Label>
                            <Input
                              value={project.name}
                              onChange={(e) => updateProject(project.id, 'name', e.target.value)}
                              placeholder="e.g., E-commerce Platform"
                            />
                          </div>
                          <div className="space-y-2">
                            <Label>Project Link</Label>
                            <div className="relative">
                              <Link className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                              <Input
                                value={project.link || ''}
                                onChange={(e) => updateProject(project.id, 'link', e.target.value)}
                                placeholder="https://github.com/..."
                                className="pl-10"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label>Description</Label>
                          <Textarea
                            value={project.description}
                            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
                            placeholder="Brief description of the project, its purpose, and your role..."
                            rows={3}
                          />
                        </div>

                        <div className="space-y-2">
                          <Label>Technologies Used</Label>
                          <div className="flex gap-2">
                            <Input
                              value={newTech[project.id] || ''}
                              onChange={(e) => setNewTech({ ...newTech, [project.id]: e.target.value })}
                              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addTechnology(project.id))}
                              placeholder="e.g., React, Node.js"
                            />
                            <Button
                              variant="outline"
                              onClick={() => addTechnology(project.id)}
                              disabled={!newTech[project.id]?.trim()}
                            >
                              <Plus className="w-4 h-4" />
                            </Button>
                          </div>
                          {project.technologies.length > 0 && (
                            <div className="flex flex-wrap gap-2 mt-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary" className="flex items-center gap-1">
                                  {tech}
                                  <button
                                    onClick={() => removeTechnology(project.id, tech)}
                                    className="ml-1 hover:text-destructive"
                                  >
                                    <X className="w-3 h-3" />
                                  </button>
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>

                        <div className="space-y-2">
                          <Label>Key Highlights</Label>
                          {project.highlights.map((highlight, hIndex) => (
                            <div key={hIndex} className="flex gap-2">
                              <Input
                                value={highlight}
                                onChange={(e) => updateHighlight(project.id, hIndex, e.target.value)}
                                placeholder="Describe a key feature or achievement..."
                              />
                              {project.highlights.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeHighlight(project.id, hIndex)}
                                  className="text-muted-foreground hover:text-destructive"
                                >
                                  <X className="w-4 h-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => addHighlight(project.id)}
                            className="text-accent"
                          >
                            <Plus className="w-4 h-4 mr-1" />
                            Add Highlight
                          </Button>
                        </div>
                      </div>
                    </CollapsibleContent>
                  </div>
                </Collapsible>
              </motion.div>
            ))}
          </AnimatePresence>

          <Button onClick={addProject} variant="outline" className="w-full">
            <Plus className="w-4 h-4 mr-2" />
            Add Project
          </Button>

          {data.length === 0 && (
            <p className="text-center text-muted-foreground py-4">
              No projects added yet. Add some projects to showcase your work.
            </p>
          )}
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default ProjectsForm;
