import React from 'react';
import { ResumeData, TemplateSettings } from '@/types/resume';
import { Mail, Phone, MapPin, Linkedin, Globe } from 'lucide-react';

interface CreativeTemplateProps {
  data: ResumeData;
  settings: TemplateSettings;
}

const CreativeTemplate: React.FC<CreativeTemplateProps> = ({ data, settings }) => {
  const { personalInfo, experiences, education, skills, certifications } = data;
  
  const fontSizeClass = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base',
  }[settings.fontSize];

  return (
    <div 
      id="resume-preview"
      className="bg-white text-gray-900 min-h-[1123px] w-[794px] mx-auto flex"
      style={{ fontFamily: 'Inter, sans-serif' }}
    >
      {/* Sidebar */}
      <aside 
        className="w-1/3 p-6 text-white"
        style={{ backgroundColor: settings.primaryColor }}
      >
        {/* Name */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold mb-1">
            {personalInfo.fullName || 'Your Name'}
          </h1>
          {data.targetRole && (
            <p className={`${fontSizeClass} opacity-80`}>{data.targetRole}</p>
          )}
        </div>

        {/* Contact */}
        <div className="mb-8">
          <h2 
            className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b"
            style={{ borderColor: settings.accentColor }}
          >
            Contact
          </h2>
          <div className={`${fontSizeClass} space-y-2`}>
            {personalInfo.email && (
              <p className="flex items-center gap-2 break-all">
                <Mail className="w-3 h-3 flex-shrink-0" style={{ color: settings.accentColor }} />
                {personalInfo.email}
              </p>
            )}
            {personalInfo.phone && (
              <p className="flex items-center gap-2">
                <Phone className="w-3 h-3 flex-shrink-0" style={{ color: settings.accentColor }} />
                {personalInfo.phone}
              </p>
            )}
            {personalInfo.location && (
              <p className="flex items-center gap-2">
                <MapPin className="w-3 h-3 flex-shrink-0" style={{ color: settings.accentColor }} />
                {personalInfo.location}
              </p>
            )}
            {personalInfo.linkedin && (
              <p className="flex items-center gap-2 break-all">
                <Linkedin className="w-3 h-3 flex-shrink-0" style={{ color: settings.accentColor }} />
                {personalInfo.linkedin}
              </p>
            )}
            {personalInfo.website && (
              <p className="flex items-center gap-2 break-all">
                <Globe className="w-3 h-3 flex-shrink-0" style={{ color: settings.accentColor }} />
                {personalInfo.website}
              </p>
            )}
          </div>
        </div>

        {/* Skills */}
        {skills.length > 0 && (
          <div className="mb-8">
            <h2 
              className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b"
              style={{ borderColor: settings.accentColor }}
            >
              Skills
            </h2>
            <div className="space-y-3">
              {skills.map((skill) => (
                <div key={skill.id}>
                  <div className="flex justify-between mb-1">
                    <span className={fontSizeClass}>{skill.name}</span>
                  </div>
                  <div className="h-1.5 bg-white/20 rounded-full overflow-hidden">
                    <div 
                      className="h-full rounded-full"
                      style={{ 
                        backgroundColor: settings.accentColor,
                        width: skill.level === 'expert' ? '100%' : 
                               skill.level === 'advanced' ? '80%' : 
                               skill.level === 'intermediate' ? '60%' : '40%'
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Education */}
        {education.length > 0 && (
          <div>
            <h2 
              className="text-sm font-bold uppercase tracking-wider mb-3 pb-2 border-b"
              style={{ borderColor: settings.accentColor }}
            >
              Education
            </h2>
            <div className="space-y-4">
              {education.map((edu) => (
                <div key={edu.id}>
                  <h3 className={`${fontSizeClass} font-semibold`}>{edu.degree}</h3>
                  <p className={`${fontSizeClass} opacity-80`}>{edu.field}</p>
                  <p className={`${fontSizeClass} opacity-70`}>{edu.institution}</p>
                  <p className={`${fontSizeClass} opacity-60`}>{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <main className="w-2/3 p-6">
        {/* Summary */}
        {personalInfo.summary && (
          <section className="mb-6">
            <h2 
              className="text-lg font-bold mb-3 flex items-center gap-2"
              style={{ color: settings.primaryColor }}
            >
              <span 
                className="w-8 h-1 rounded"
                style={{ backgroundColor: settings.accentColor }}
              />
              About Me
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
              className="text-lg font-bold mb-4 flex items-center gap-2"
              style={{ color: settings.primaryColor }}
            >
              <span 
                className="w-8 h-1 rounded"
                style={{ backgroundColor: settings.accentColor }}
              />
              Experience
            </h2>
            <div className="space-y-5">
              {experiences.map((exp) => (
                <div key={exp.id} className="relative pl-4 border-l-2" style={{ borderColor: settings.accentColor }}>
                  <div 
                    className="absolute -left-1.5 top-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: settings.accentColor }}
                  />
                  <div className="flex justify-between items-start mb-1">
                    <h3 className="font-bold" style={{ color: settings.primaryColor }}>
                      {exp.position}
                    </h3>
                    <span 
                      className={`${fontSizeClass} px-2 py-0.5 rounded text-white`}
                      style={{ backgroundColor: settings.accentColor }}
                    >
                      {exp.startDate} - {exp.current ? 'Present' : exp.endDate}
                    </span>
                  </div>
                  <p className={`${fontSizeClass} font-medium text-gray-600 mb-2`}>{exp.company}</p>
                  {exp.description && (
                    <p className={`${fontSizeClass} text-gray-700 mb-2`}>{exp.description}</p>
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

        {/* Certifications */}
        {certifications.length > 0 && (
          <section>
            <h2 
              className="text-lg font-bold mb-3 flex items-center gap-2"
              style={{ color: settings.primaryColor }}
            >
              <span 
                className="w-8 h-1 rounded"
                style={{ backgroundColor: settings.accentColor }}
              />
              Certifications
            </h2>
            <div className="grid grid-cols-2 gap-3">
              {certifications.map((cert) => (
                <div 
                  key={cert.id} 
                  className={`${fontSizeClass} p-3 rounded-lg border`}
                  style={{ borderColor: `${settings.accentColor}40` }}
                >
                  <p className="font-semibold">{cert.name}</p>
                  <p className="text-gray-600">{cert.issuer}</p>
                  <p className="text-gray-500">{cert.date}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default CreativeTemplate;
