import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { TemplateSettings, TemplateType } from '@/types/resume';
import { Palette, Layout } from 'lucide-react';
import { cn } from '@/lib/utils';

interface TemplateSettingsFormProps {
  settings: TemplateSettings;
  onChange: (settings: TemplateSettings) => void;
}

const templates: { id: TemplateType; name: string; description: string }[] = [
  { id: 'modern', name: 'Modern', description: 'Clean and minimalist design with accent colors' },
  { id: 'classic', name: 'Classic', description: 'Traditional professional layout' },
  { id: 'creative', name: 'Creative', description: 'Bold design with unique styling' },
];

const colorPresets = [
  { primary: '#1e3a5f', accent: '#2d9596', name: 'Ocean' },
  { primary: '#1f2937', accent: '#6366f1', name: 'Indigo' },
  { primary: '#0f172a', accent: '#22c55e', name: 'Emerald' },
  { primary: '#3f3f46', accent: '#f59e0b', name: 'Amber' },
  { primary: '#1c1917', accent: '#ef4444', name: 'Ruby' },
  { primary: '#0c4a6e', accent: '#06b6d4', name: 'Cyan' },
];

const TemplateSettingsForm: React.FC<TemplateSettingsFormProps> = ({ settings, onChange }) => {
  const updateSetting = <K extends keyof TemplateSettings>(key: K, value: TemplateSettings[K]) => {
    onChange({ ...settings, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="space-y-6"
    >
      {/* Template Selection */}
      <Card elevated>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Layout className="w-5 h-5 text-accent" />
            </div>
            Template Style
          </CardTitle>
          <CardDescription>
            Choose a template that best fits your industry and personal style.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {templates.map((template) => (
              <button
                key={template.id}
                onClick={() => updateSetting('template', template.id)}
                className={cn(
                  "relative p-4 rounded-xl border-2 transition-all duration-200 text-left",
                  settings.template === template.id
                    ? "border-accent bg-accent/5"
                    : "border-border hover:border-accent/50"
                )}
              >
                {/* Template Preview */}
                <div className="aspect-[3/4] rounded-lg bg-muted mb-3 overflow-hidden">
                  <div className={cn(
                    "h-full p-2",
                    template.id === 'modern' && "bg-gradient-to-b from-primary/10 to-transparent",
                    template.id === 'classic' && "border-t-4 border-primary",
                    template.id === 'creative' && "bg-gradient-to-br from-accent/20 to-primary/20"
                  )}>
                    <div className="space-y-1">
                      <div className="h-2 w-1/2 bg-primary/30 rounded" />
                      <div className="h-1 w-3/4 bg-muted-foreground/20 rounded" />
                      <div className="h-1 w-2/3 bg-muted-foreground/20 rounded" />
                      <div className="mt-2 h-1.5 w-1/3 bg-accent/40 rounded" />
                      <div className="h-1 w-full bg-muted-foreground/10 rounded" />
                      <div className="h-1 w-5/6 bg-muted-foreground/10 rounded" />
                    </div>
                  </div>
                </div>
                <h4 className="font-medium">{template.name}</h4>
                <p className="text-sm text-muted-foreground">{template.description}</p>
                {settings.template === template.id && (
                  <motion.div
                    layoutId="selectedTemplate"
                    className="absolute top-2 right-2 w-6 h-6 rounded-full bg-accent flex items-center justify-center"
                  >
                    <svg className="w-4 h-4 text-accent-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                )}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Color Settings */}
      <Card elevated>
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-accent/10 flex items-center justify-center">
              <Palette className="w-5 h-5 text-accent" />
            </div>
            Color Scheme
          </CardTitle>
          <CardDescription>
            Customize the colors to match your personal brand.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Presets */}
          <div className="space-y-2">
            <Label>Color Presets</Label>
            <div className="flex flex-wrap gap-3">
              {colorPresets.map((preset) => (
                <button
                  key={preset.name}
                  onClick={() => {
                    updateSetting('primaryColor', preset.primary);
                    updateSetting('accentColor', preset.accent);
                  }}
                  className={cn(
                    "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all",
                    settings.primaryColor === preset.primary && settings.accentColor === preset.accent
                      ? "border-accent bg-accent/5"
                      : "border-border hover:border-accent/50"
                  )}
                >
                  <div className="flex">
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-background" 
                      style={{ backgroundColor: preset.primary }}
                    />
                    <div 
                      className="w-5 h-5 rounded-full border-2 border-background -ml-2" 
                      style={{ backgroundColor: preset.accent }}
                    />
                  </div>
                  <span className="text-sm">{preset.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Custom Colors */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Primary Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting('primaryColor', e.target.value)}
                  className="w-12 h-11 p-1 cursor-pointer"
                />
                <Input
                  value={settings.primaryColor}
                  onChange={(e) => updateSetting('primaryColor', e.target.value)}
                  placeholder="#1e3a5f"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>Accent Color</Label>
              <div className="flex gap-2">
                <Input
                  type="color"
                  value={settings.accentColor}
                  onChange={(e) => updateSetting('accentColor', e.target.value)}
                  className="w-12 h-11 p-1 cursor-pointer"
                />
                <Input
                  value={settings.accentColor}
                  onChange={(e) => updateSetting('accentColor', e.target.value)}
                  placeholder="#2d9596"
                />
              </div>
            </div>
          </div>

          {/* Font Size */}
          <div className="space-y-2">
            <Label>Font Size</Label>
            <Select 
              value={settings.fontSize} 
              onValueChange={(v) => updateSetting('fontSize', v as TemplateSettings['fontSize'])}
            >
              <SelectTrigger className="w-full md:w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="small">Small</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="large">Large</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default TemplateSettingsForm;
