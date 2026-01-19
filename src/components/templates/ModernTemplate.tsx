import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ModernTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const ModernTemplate: React.FC<ModernTemplateProps> = ({ data, settings }) => {
  const { personalInfo, experiences, education, skills, certifications } = data;
  
  const fontSizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[settings.fontSize];

  return (
    <div 
      id="resume-preview"
      className="bg-white text-gray-900 p-8 min-h-[1123px] w-[794px] mx-auto"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Header */}
      <header className="mb-6 pb-6 border-b-2" style={{ borderColor: settings.accentColor }}>
        <h1 
          className="text-3xl font-bold mb-2"
          style={{ color: settings.primaryColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={`flex flex-wrap gap-4 ${fontSizeClass} text-gray-600`}>
          {personalInfo.email && (
            <span className="flex items-center gap-1">
              <Mail className="w-3 h-3" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-1">
              <Phone className="w-3 h-3" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-1">
              <MapPin className="w-3 h-3" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-1">
              <Linkedin className="w-3 h-3" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-1">
              <Globe className="w-3 h-3" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 
            className="text-lg font-semibold mb-2 uppercase tracking-wide"
            style={{ color: settings.primaryColor }}
          >
            Professional Summary
          </h2>
          <p className={`${fontSizeClass} text-gray-700 leading-relaxed`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: settings.primaryColor }}
          >
            Work Experience
          </h2>
          <div className="space-y-4">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h3 className="font-semibold" style={{ color: settings.primaryColor }}>
                      {exp.position}
                    </h3>
                    <p className={`${fontSizeClass} text-gray-600`}>{exp.company}</p>
                  </div>
                  <span 
                    className={`${fontSizeClass} font-medium`}
                    style={{ color: settings.accentColor }}
                  >
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.description && (
                  <p className={`${fontSizeClass} text-gray-700 mb-2`}>{exp.description}</p>
                )}
                {exp.achievements.filter(a => a).length > 0 && (
                  <ul className={`${fontSizeClass} text-gray-700 list-disc list-inside space-y-1`}>
                    {exp.achievements.filter(a => a).map((achievement, i) => (
                      <li key={i}>{achievement}</li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: settings.primaryColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-semibold" style={{ color: settings.primaryColor }}>
                    {edu.degree} {edu.field && `in ${edu.field}`}
                  </h3>
                  <p className={`${fontSizeClass} text-gray-600`}>
                    {edu.institution}
                    {edu.gpa && ` • GPA: ${edu.gpa}`}
                  </p>
                </div>
                <span 
                  className={`${fontSizeClass} font-medium`}
                  style={{ color: settings.accentColor }}
                >
                  {edu.startDate} - {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: settings.primaryColor }}
          >
            Skills
          </h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <span
                key={skill.id}
                className={`${fontSizeClass} px-3 py-1 rounded-full`}
                style={{ 
                  backgroundColor: `${settings.accentColor}20`,
                  color: settings.primaryColor 
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Certifications */}
      {certifications.length > 0 && (
        <section>
          <h2 
            className="text-lg font-semibold mb-3 uppercase tracking-wide"
            style={{ color: settings.primaryColor }}
          >
            Certifications
          </h2>
          <div className="space-y-2">
            {certifications.map((cert) => (
              <div key={cert.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{cert.name}</span>
                  <span className={`${fontSizeClass} text-gray-600`}> - {cert.issuer}</span>
                </div>
                <span className={`${fontSizeClass} text-gray-500`}>{cert.date}</span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

export default ModernTemplate;
