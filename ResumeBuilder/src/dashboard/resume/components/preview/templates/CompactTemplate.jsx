import React from 'react';
import { resumeThemes } from '../../../themes';

const CompactTemplate = ({ resumeInfo, activeComponents }) => {
  const shouldShowSection = (sectionId) => activeComponents.includes(sectionId);
  const currentTheme = resumeThemes[resumeInfo?.theme || 'modern'];

  // Get theme-specific styles
  const styles = {
    background: `var(--theme-background, white)`,
    color: `var(--theme-text, black)`,
    primary: `var(--theme-primary)`,
    secondary: `var(--theme-secondary)`
  };

  return (
    <div className={`${currentTheme.className}`} style={{ background: styles.background, color: styles.color }}>
      {shouldShowSection('personal') && (
        <header className="pb-1" style={{ borderBottom: `2px solid ${styles.primary}` }}>
          <h1 className="text-2xl font-bold" style={{ color: styles.primary }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <p className="font-medium text-sm" style={{ color: styles.secondary }}>{resumeInfo?.jobTitle}</p>
          <div className="text-xs">
            <span className="mr-2">{resumeInfo?.email}</span>
            <span className="mr-2">{resumeInfo?.phone}</span>
            <span>{resumeInfo?.address}</span>
          </div>
        </header>
      )}

      <div className="space-y-1 text-xs">
        {shouldShowSection('summary') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>
              Professional Summary
            </h2>
            <p>{resumeInfo?.summery}</p>
          </section>
        )}

        {shouldShowSection('experience') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>Experience</h2>
            <div className="space-y-1">
              {resumeInfo?.experience?.map((exp, index) => (
                <div key={index} className="flex justify-between rounded">
                  <div>
                    <h3 className="font-semibold" style={{ color: styles.primary }}>{exp.title}</h3>
                    <p>{exp.companyName}</p>
                    <div className="mt-1" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                  </div>
                  <div className="text-right">
                    {exp.startDate} - {exp.endDate || 'Present'}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {shouldShowSection('skills') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>Skills</h2>
            <div className="flex flex-wrap gap-1">
              {resumeInfo?.skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-2 py-1 rounded-full text-xs"
                  style={{ 
                    backgroundColor: `${styles.primary}20`,
                    color: styles.primary,
                    border: `1px solid ${styles.primary}40`
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </section>
        )}

        {shouldShowSection('projects') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>Projects</h2>
            <div className="space-y-1">
              {resumeInfo?.projects?.map((project, index) => (
                <div key={index} className="flex justify-between rounded">
                  <div>
                    <h3 className="font-semibold" style={{ color: styles.primary }}>{project.title}</h3>
                    <p>{project.description}</p>
                    <p className="text-xs">{project.technologies}</p>
                  </div>
                  <div className="text-right text-xs">
                    {project.startDate} - {project.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {shouldShowSection('achievements') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>Achievements</h2>
            <div className="space-y-1">
              {resumeInfo?.achievements?.map((achievement, index) => (
                <div key={index} className="flex justify-between rounded">
                  <div>
                    <h3 className="font-semibold" style={{ color: styles.primary }}>{achievement.title}</h3>
                    <p>{achievement.description}</p>
                  </div>
                  <div className="text-right text-xs">
                    {achievement.date}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {shouldShowSection('education') && (
          <section className={`${currentTheme.styles.cardStyle} p-1`}>
            <h2 className="font-bold uppercase" style={{ color: styles.primary }}>Education</h2>
            <div className="space-y-1">
              {resumeInfo?.education?.map((edu, index) => (
                <div key={index} className="flex justify-between rounded">
                  <div>
                    <h3 className="font-semibold" style={{ color: styles.primary }}>{edu.universityName}</h3>
                    <p>{edu.degree} in {edu.major}</p>
                  </div>
                  <div className="text-right">
                    {edu.startDate} - {edu.endDate}
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
};

export default CompactTemplate;
