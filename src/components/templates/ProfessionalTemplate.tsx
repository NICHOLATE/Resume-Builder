import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ProfessionalTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const ProfessionalTemplate: React.FC<ProfessionalTemplateProps> = ({ data, settings }) => {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;
  
  const fontSizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[settings.fontSize];

  return (
    <div 
      id="resume-preview"
      className="bg-white text-gray-900 min-h-[1123px] w-[794px] mx-auto"
      style={{ fontFamily: settings.fontFamily || 'Georgia, serif' }}
    >
      {/* Header with accent bar */}
      <div className="h-2" style={{ backgroundColor: settings.primaryColor }} />
      
      <div className="p-8">
        {/* Name & Contact */}
        <header className="text-center mb-8">
          <h1 
            className="text-4xl font-bold mb-4 tracking-tight"
            style={{ color: settings.primaryColor }}
          >
            {personalInfo.fullName || 'Your Name'}
          </h1>
          
          <div className={`flex flex-wrap justify-center gap-4 ${fontSizeClass} text-gray-600`}>
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
            <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
              <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                Professional Summary
              </h2>
            </div>
            <p className={`${fontSizeClass} text-gray-700 leading-relaxed text-justify`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="mb-6">
            <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
              <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                Professional Experience
              </h2>
            </div>
            <div className="space-y-4">
              {experiences.map((exp) => (
                <div key={exp.id}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-gray-900">{exp.position}</h3>
                    <span className={`${fontSizeClass} font-medium`} style={{ color: settings.accentColor }}>
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`${fontSizeClass} text-gray-600 italic mb-2`}>{exp.company}</p>
                  {exp.description && (
                    <p className={`${fontSizeClass} text-gray-700 mb-2`}>{exp.description}</p>
                  )}
                  {exp.achievements.filter(a => a).length > 0 && (
                    <ul className={`${fontSizeClass} text-gray-700 list-disc ml-5 space-y-1`}>
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

        {/* Projects */}
        {projects.length > 0 && (
          <section className="mb-6">
            <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
              <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                Projects
              </h2>
            </div>
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id}>
                  <div className="flex items-baseline gap-2">
                    <h3 className="font-bold text-gray-900">{project.name}</h3>
                    {project.link && (
                      <span className={`${fontSizeClass} text-gray-500`}>({project.link})</span>
                    )}
                  </div>
                  {project.description && (
                    <p className={`${fontSizeClass} text-gray-700 mb-1`}>{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <p className={`${fontSizeClass} text-gray-600`}>
                      <span className="font-medium">Technologies:</span> {project.technologies.join(', ')}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education */}
        {education.length > 0 && (
          <section className="mb-6">
            <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
              <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                Education
              </h2>
            </div>
            <div className="space-y-3">
              {education.map((edu) => (
                <div key={edu.id} className="flex justify-between">
                  <div>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className={`${fontSizeClass} text-gray-600 italic`}>
                      {edu.institution}
                      {edu.gpa && ` • GPA: ${edu.gpa}`}
                    </p>
                  </div>
                  <span className={`${fontSizeClass} font-medium`} style={{ color: settings.accentColor }}>
                    {edu.startDate} - {edu.endDate}
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Two column: Skills & Certifications */}
        <div className="grid grid-cols-2 gap-6">
          {skills.length > 0 && (
            <section>
              <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
                <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                  Skills
                </h2>
              </div>
              <div className="space-y-2">
                {Object.entries(skills.reduce((acc, skill) => {
                  if (!acc[skill.category]) acc[skill.category] = [];
                  acc[skill.category].push(skill.name);
                  return acc;
                }, {} as Record<string, string[]>)).map(([category, skillNames]) => (
                  <div key={category}>
                    <span className={`${fontSizeClass} font-medium text-gray-800`}>{category}:</span>
                    <span className={`${fontSizeClass} text-gray-600 ml-1`}>{skillNames.join(', ')}</span>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <div className="border-b-2 mb-3" style={{ borderColor: settings.primaryColor }}>
                <h2 className="text-lg font-bold uppercase tracking-wider pb-1" style={{ color: settings.primaryColor }}>
                  Certifications
                </h2>
              </div>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id}>
                    <span className={`${fontSizeClass} font-medium text-gray-900`}>{cert.name}</span>
                    <span className={`${fontSizeClass} text-gray-600`}> - {cert.issuer}, {cert.date}</span>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
