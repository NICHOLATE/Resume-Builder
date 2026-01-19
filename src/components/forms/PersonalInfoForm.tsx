import React from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { PersonalInfo } from '@/types/resume';
import { User, Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface PersonalInfoFormProps {
  data: PersonalInfo;
  onChange: (data: PersonalInfo) => void;
}

const PersonalInfoForm: React.FC<PersonalInfoFormProps> = ({ data, onChange }) => {
  const handleChange = (field: keyof PersonalInfo, value: string) => {
    onChange({ ...data, [field]: value });
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
              <User className="w-5 h-5 text-accent" />
            </div>
            Personal Information
          </CardTitle>
          <CardDescription>
            Start with your basic contact details. This information appears at the top of your resume.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Name */}
          <div className="space-y-2">
            <Label htmlFor="fullName" className="flex items-center gap-2">
              <User className="w-4 h-4 text-muted-foreground" />
              Full Name *
            </Label>
            <Input
              id="fullName"
              value={data.fullName}
              onChange={(e) => handleChange('fullName', e.target.value)}
              placeholder="John Doe"
            />
          </div>

          {/* Email & Phone */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-muted-foreground" />
                Email *
              </Label>
              <Input
                id="email"
                type="email"
                value={data.email}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder="john@example.com"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-muted-foreground" />
                Phone *
              </Label>
              <Input
                id="phone"
                type="tel"
                value={data.phone}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder="+1 (555) 123-4567"
              />
            </div>
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location" className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground" />
              Location
            </Label>
            <Input
              id="location"
              value={data.location}
              onChange={(e) => handleChange('location', e.target.value)}
              placeholder="San Francisco, CA"
            />
          </div>

          {/* LinkedIn & Website */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="linkedin" className="flex items-center gap-2">
                <Linkedin className="w-4 h-4 text-muted-foreground" />
                LinkedIn (optional)
              </Label>
              <Input
                id="linkedin"
                value={data.linkedin || ''}
                onChange={(e) => handleChange('linkedin', e.target.value)}
                placeholder="linkedin.com/in/johndoe"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="website" className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-muted-foreground" />
                Website (optional)
              </Label>
              <Input
                id="website"
                value={data.website || ''}
                onChange={(e) => handleChange('website', e.target.value)}
                placeholder="johndoe.com"
              />
            </div>
          </div>

          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="summary" className="flex items-center gap-2">
              Professional Summary *
            </Label>
            <Textarea
              id="summary"
              value={data.summary}
              onChange={(e) => handleChange('summary', e.target.value)}
              placeholder="Write a compelling 2-3 sentence summary highlighting your experience, skills, and career goals..."
              className="min-h-[120px]"
            />
            <p className="text-xs text-muted-foreground">
              {data.summary.length}/300 characters recommended
            </p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PersonalInfoForm;
