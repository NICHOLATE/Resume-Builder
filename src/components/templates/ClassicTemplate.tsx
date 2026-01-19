import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';

interface ClassicTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const ClassicTemplate: React.FC<ClassicTemplateProps> = ({ data, settings }) => {
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
      style={{ fontFamily: 'Georgia, serif' }}
    >
      {/* Header */}
      <header className="text-center mb-8 pb-4 border-b-4" style={{ borderColor: settings.primaryColor }}>
        <h1 
          className="text-4xl font-bold mb-3"
          style={{ color: settings.primaryColor }}
        >
          {personalInfo.fullName || 'Your Name'}
        </h1>
        
        <div className={`${fontSizeClass} text-gray-600 space-y-1`}>
          <p>
            {[personalInfo.email, personalInfo.phone, personalInfo.location].filter(Boolean).join(' | ')}
          </p>
          {(personalInfo.linkedin || personalInfo.website) && (
            <p>{[personalInfo.linkedin, personalInfo.website].filter(Boolean).join(' | ')}</p>
          )}
        </div>
      </header>

      {/* Summary */}
      {personalInfo.summary && (
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-2 border-b-2 pb-1"
            style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
          >
            PROFESSIONAL SUMMARY
          </h2>
          <p className={`${fontSizeClass} text-gray-700 leading-relaxed mt-2`}>
            {personalInfo.summary}
          </p>
        </section>
      )}

      {/* Experience */}
      {experiences.length > 0 && (
        <section className="mb-6">
          <h2 
            className="text-xl font-bold mb-3 border-b-2 pb-1"
            style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
          >
            PROFESSIONAL EXPERIENCE
          </h2>
          <div className="space-y-4 mt-2">
            {experiences.map((exp) => (
              <div key={exp.id}>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="text-lg font-bold">{exp.position}</h3>
                  <span className={`${fontSizeClass} italic`}>
                    {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                  </span>
                </div>
                <p className={`${fontSizeClass} font-semibold mb-1`} style={{ color: settings.accentColor }}>
                  {exp.company}
                </p>
                {exp.description && (
                  <p className={`${fontSizeClass} text-gray-700 mb-2`}>{exp.description}</p>
                )}
                {exp.achievements.filter(a => a).length > 0 && (
                  <ul className={`${fontSizeClass} text-gray-700 list-disc ml-6 space-y-1`}>
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
            className="text-xl font-bold mb-3 border-b-2 pb-1"
            style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
          >
            EDUCATION
          </h2>
          <div className="space-y-3 mt-2">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between">
                <div>
                  <h3 className="font-bold">{edu.degree} in {edu.field}</h3>
                  <p className={`${fontSizeClass} italic`}>{edu.institution}</p>
                  {edu.gpa && <p className={`${fontSizeClass} text-gray-600`}>GPA: {edu.gpa}</p>}
                </div>
                <span className={`${fontSizeClass}`}>{edu.startDate} - {edu.endDate}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="grid grid-cols-2 gap-6">
        {/* Skills */}
        {skills.length > 0 && (
          <section>
            <h2 
              className="text-xl font-bold mb-3 border-b-2 pb-1"
              style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
            >
              SKILLS
            </h2>
            <ul className={`${fontSizeClass} mt-2 space-y-1`}>
              {skills.map((skill) => (
                <li key={skill.id} className="flex items-center gap-2">
                  <span 
                    className="w-2 h-2 rounded-full" 
                    style={{ backgroundColor: settings.accentColor }}
                  />
                  {skill.name}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 
              className="text-xl font-bold mb-3 border-b-2 pb-1"
              style={{ color: settings.primaryColor, borderColor: settings.primaryColor }}
            >
              CERTIFICATIONS
            </h2>
            <ul className={`${fontSizeClass} mt-2 space-y-2`}>
              {certifications.map((cert) => (
                <li key={cert.id}>
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer}, {cert.date}</p>
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </div>
  );
};

export default ClassicTemplate;
