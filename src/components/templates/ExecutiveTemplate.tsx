import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface ExecutiveTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const ExecutiveTemplate: React.FC<ExecutiveTemplateProps> = ({ data, settings }) => {
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
      style={{ fontFamily: 'Cambria, Georgia, serif' }}
    >
      {/* Elegant header with dark background */}
      <header 
        className="px-8 py-10 text-white"
        style={{ backgroundColor: settings.primaryColor }}
      >
        <h1 className="text-4xl font-bold tracking-wide mb-4 text-center">
          {personalInfo.fullName?.toUpperCase() || 'YOUR NAME'}
        </h1>
        
        <div className={`flex flex-wrap justify-center gap-6 ${fontSizeClass}`}>
          {personalInfo.email && (
            <span className="flex items-center gap-2 opacity-90">
              <Mail className="w-4 h-4" />
              {personalInfo.email}
            </span>
          )}
          {personalInfo.phone && (
            <span className="flex items-center gap-2 opacity-90">
              <Phone className="w-4 h-4" />
              {personalInfo.phone}
            </span>
          )}
          {personalInfo.location && (
            <span className="flex items-center gap-2 opacity-90">
              <MapPin className="w-4 h-4" />
              {personalInfo.location}
            </span>
          )}
          {personalInfo.linkedin && (
            <span className="flex items-center gap-2 opacity-90">
              <Linkedin className="w-4 h-4" />
              {personalInfo.linkedin}
            </span>
          )}
          {personalInfo.website && (
            <span className="flex items-center gap-2 opacity-90">
              <Globe className="w-4 h-4" />
              {personalInfo.website}
            </span>
          )}
        </div>
      </header>

      <div className="p-8">
        {/* Executive Summary */}
        {personalInfo.summary && (
          <section className="mb-8 text-center">
            <h2 
              className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
              style={{ color: settings.primaryColor }}
            >
              Executive Summary
            </h2>
            <p className={`${fontSizeClass} text-gray-700 leading-relaxed max-w-2xl mx-auto italic`}>
              {personalInfo.summary}
            </p>
          </section>
        )}

        <div className="border-t" style={{ borderColor: settings.accentColor }} />

        {/* Experience */}
        {experiences.length > 0 && (
          <section className="my-6">
            <h2 
              className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
              style={{ color: settings.primaryColor }}
            >
              Professional Experience
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="border-l-2 pl-4" style={{ borderColor: settings.accentColor }}>
                  <div className="flex justify-between items-start mb-1">
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: settings.primaryColor }}>
                        {exp.position}
                      </h3>
                      <p className={`${fontSizeClass} font-medium text-gray-700`}>{exp.company}</p>
                    </div>
                    <span 
                      className={`${fontSizeClass} font-semibold px-3 py-1 rounded`}
                      style={{ backgroundColor: `${settings.accentColor}20`, color: settings.primaryColor }}
                    >
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  {exp.description && (
                    <p className={`${fontSizeClass} text-gray-600 mb-2`}>{exp.description}</p>
                  )}
                  {exp.achievements.filter(a => a).length > 0 && (
                    <ul className={`${fontSizeClass} text-gray-700 space-y-1`}>
                      {exp.achievements.filter(a => a).map((achievement, i) => (
                        <li key={i} className="flex items-start gap-2">
                          <span style={{ color: settings.accentColor }}>▸</span>
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
          <section className="my-6">
            <h2 
              className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
              style={{ color: settings.primaryColor }}
            >
              Key Projects
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {projects.map((project) => (
                <div 
                  key={project.id} 
                  className="p-4 rounded-lg border"
                  style={{ borderColor: `${settings.accentColor}40` }}
                >
                  <h3 className="font-bold" style={{ color: settings.primaryColor }}>{project.name}</h3>
                  {project.description && (
                    <p className={`${fontSizeClass} text-gray-600 mt-1`}>{project.description}</p>
                  )}
                  {project.technologies.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {project.technologies.map((tech) => (
                        <span 
                          key={tech}
                          className="text-xs px-2 py-0.5 rounded"
                          style={{ backgroundColor: `${settings.accentColor}15`, color: settings.primaryColor }}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Education & Certifications */}
        <div className="grid grid-cols-2 gap-8 my-6">
          {education.length > 0 && (
            <section>
              <h2 
                className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
                style={{ color: settings.primaryColor }}
              >
                Education
              </h2>
              <div className="space-y-3">
                {education.map((edu) => (
                  <div key={edu.id}>
                    <h3 className="font-bold text-gray-900">
                      {edu.degree} {edu.field && `in ${edu.field}`}
                    </h3>
                    <p className={`${fontSizeClass} text-gray-600`}>
                      {edu.institution} • {edu.endDate}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {certifications.length > 0 && (
            <section>
              <h2 
                className="text-sm font-bold uppercase tracking-[0.3em] mb-4"
                style={{ color: settings.primaryColor }}
              >
                Certifications
              </h2>
              <div className="space-y-2">
                {certifications.map((cert) => (
                  <div key={cert.id} className="flex items-center gap-2">
                    <span style={{ color: settings.accentColor }}>●</span>
                    <div>
                      <span className={`${fontSizeClass} font-medium`}>{cert.name}</span>
                      <span className={`${fontSizeClass} text-gray-500`}> — {cert.issuer}</span>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <section className="mt-6 pt-4 border-t" style={{ borderColor: settings.accentColor }}>
            <h2 
              className="text-sm font-bold uppercase tracking-[0.3em] mb-3"
              style={{ color: settings.primaryColor }}
            >
              Core Competencies
            </h2>
            <div className="flex flex-wrap gap-2">
              {skills.map((skill) => (
                <span
                  key={skill.id}
                  className={`${fontSizeClass} px-3 py-1.5 rounded-full font-medium`}
                  style={{ 
                    backgroundColor: settings.primaryColor,
                    color: 'white'
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default ExecutiveTemplate;
