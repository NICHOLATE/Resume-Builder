import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';

interface MinimalTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const MinimalTemplate: React.FC<MinimalTemplateProps> = ({ data, settings }) => {
  const { personalInfo, experiences, education, skills, projects, certifications } = data;
  
  const fontSizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[settings.fontSize];

  return (
    <div 
      id="resume-preview"
      className="bg-white text-gray-800 p-10 min-h-[1123px] w-[794px] mx-auto"
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      {/* Header - Ultra minimal */}
      <header className="mb-10">
        <h1 
          className="text-3xl font-light tracking-tight mb-2"
          style={{ color: settings.primaryColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={`${fontSizeClass} text-gray-500 space-x-3`}>
          {personalInfo.email && <span>{personalInfo.email}</span>}
          {personalInfo.phone && <span>• {personalInfo.phone}</span>}
          {personalInfo.location && <span>• {personalInfo.location}</span>}
          {personalInfo.linkedin && <span>• {personalInfo.linkedin}</span>}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-8">
          <p className={`${fontSizeClass} text-gray-600 leading-relaxed`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: settings.primaryColor, borderColor: settings.accentColor }}
          >
            Experience
          </h2>
          <div className="space-y-5">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline">
                  <div>
                    <span className="font-medium">{exp.position}</span>
                    <span className="text-gray-500 mx-2">at</span>
                    <span className="text-gray-700">{exp.company}</span>
                  </div>
                  <span className={`${fontSizeClass} text-gray-400`}>
                    {exp.startDate} — {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                {exp.achievements.filter(a => a).length > 0 && (
                  <ul className={`${fontSizeClass} text-gray-600 mt-2 space-y-1`}>
                    {exp.achievements.filter(a => a).map((achievement, i) => (
                      <li key={i} className="pl-4 relative before:content-['–'] before:absolute before:left-0 before:text-gray-400">
                        {achievement}
                      </li>
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
        <section className="mb-8">
          <h2 
            className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: settings.primaryColor, borderColor: settings.accentColor }}
          >
            Projects
          </h2>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id}>
                <div className="flex items-baseline gap-2">
                  <span className="font-medium">{project.name}</span>
                  {project.link && (
                    <span className={`${fontSizeClass} text-gray-400`}>{project.link}</span>
                  )}
                </div>
                {project.description && (
                  <p className={`${fontSizeClass} text-gray-600 mt-1`}>{project.description}</p>
                )}
                {project.technologies.length > 0 && (
                  <p className={`${fontSizeClass} text-gray-400 mt-1`}>
                    {project.technologies.join(' · ')}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education */}
      {education.length > 0 && (
        <section className="mb-8">
          <h2 
            className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
            style={{ color: settings.primaryColor, borderColor: settings.accentColor }}
          >
            Education
          </h2>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <span className="font-medium">{edu.degree}</span>
                  {edu.field && <span className="text-gray-600"> in {edu.field}</span>}
                  <span className="text-gray-500"> — {edu.institution}</span>
                </div>
                <span className={`${fontSizeClass} text-gray-400`}>
                  {edu.endDate}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Skills & Certifications side by side */}
      <div className="grid grid-cols-2 gap-8">
        {skills.length > 0 && (
          <section>
            <h2 
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ color: settings.primaryColor, borderColor: settings.accentColor }}
            >
              Skills
            </h2>
            <p className={`${fontSizeClass} text-gray-600 leading-relaxed`}>
              {skills.map(s => s.name).join(' · ')}
            </p>
          </section>
        )}

        {certifications.length > 0 && (
          <section>
            <h2 
              className="text-xs font-semibold uppercase tracking-widest mb-4 pb-2 border-b"
              style={{ color: settings.primaryColor, borderColor: settings.accentColor }}
            >
              Certifications
            </h2>
            <div className={`${fontSizeClass} text-gray-600 space-y-1`}>
              {certifications.map((cert) => (
                <div key={cert.id}>
                  {cert.name} <span className="text-gray-400">({cert.issuer})</span>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default MinimalTemplate;
