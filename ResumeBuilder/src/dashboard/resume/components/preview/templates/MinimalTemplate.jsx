import React from 'react';
import { resumeThemes } from '../../../themes';

const MinimalTemplate = ({ resumeInfo, activeComponents }) => {
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
    <div className={`max-w-4xl mx-auto p-8 ${currentTheme.className}`} 
         style={{ background: styles.background, color: styles.color }}>
      {shouldShowSection('personal') && (
        <div className="text-center mb-8">
          <h1 className="text-4xl font-light mb-2" style={{ color: styles.primary }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <p style={{ color: styles.secondary }}>{resumeInfo?.jobTitle}</p>
          <div className="flex justify-center gap-4 text-sm mt-2" style={{ color: styles.secondary }}>
            <span>{resumeInfo?.email}</span>
            <span>•</span>
            <span>{resumeInfo?.phone}</span>
            <span>•</span>
            <span>{resumeInfo?.address}</span>
          </div>
        </div>
      )}

      {shouldShowSection('summary') && (
        <div className="mb-8">
          <p className="text-sm leading-relaxed" style={{ color: styles.color }}>{resumeInfo?.summery}</p>
        </div>
      )}

      {shouldShowSection('experience') && (
        <div className="mb-8">
          <h2 className="text-xl font-light pb-2 mb-4" 
              style={{ color: styles.primary, borderBottom: `2px solid ${styles.secondary}` }}>Experience</h2>
          {resumeInfo?.experience?.map((exp, index) => (
            <div key={index} className="mb-6" style={{ color: styles.color }}>
              <div className="flex justify-between items-baseline mb-2">
                <h3 className="font-medium">{exp.title}</h3>
                <span className="text-sm">{exp.startDate} - {exp.endDate || 'Present'}</span>
              </div>
              <p className="text-sm mb-2">{exp.companyName}</p>
              <div className="text-sm" dangerouslySetInnerHTML={{__html: exp.workSummery}} />
            </div>
          ))}
        </div>
      )}

      {shouldShowSection('skills') && (
        <div className="mb-8">
          <h2 className="text-xl font-light pb-2 mb-4"
              style={{ color: styles.primary, borderBottom: `2px solid ${styles.secondary}` }}>
            Skills
          </h2>
          <div className="flex flex-wrap gap-3">
            {resumeInfo?.skills?.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-1.5 text-sm rounded-full transition-all duration-300 hover:-translate-y-0.5"
                style={{ 
                  backgroundColor: `${styles.primary}10`,
                  color: styles.primary,
                  border: `2px solid ${styles.primary}`,
                  boxShadow: `0 2px 4px ${styles.primary}20`
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}

      {shouldShowSection('education') && (
        <div>
          <h2 className="text-xl font-light pb-2 mb-4"
              style={{ color: styles.primary, borderBottom: `2px solid ${styles.secondary}` }}>Education</h2>
          {resumeInfo?.education?.map((edu, index) => (
            <div key={index} className="mb-4" style={{ color: styles.color }}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{edu.universityName}</h3>
                <span className="text-sm">{edu.startDate} - {edu.endDate}</span>
              </div>
              <p className="text-sm">{edu.degree} in {edu.major}</p>
            </div>
          ))}
        </div>
      )}

      {shouldShowSection('projects') && (
        <div className="mb-8">
          <h2 className="text-xl font-light pb-2 mb-4"
              style={{ color: styles.primary, borderBottom: `2px solid ${styles.secondary}` }}>Projects</h2>
          {resumeInfo?.projects?.map((project, index) => (
            <div key={index} className="mb-4" style={{ color: styles.color }}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{project.title}</h3>
                <span className="text-sm">{project.startDate} - {project.endDate}</span>
              </div>
              <p className="text-sm mt-1">{project.description}</p>
              <div className="flex justify-between items-center mt-1">
                <span className="text-sm">{project.technologies}</span>
                {project.link && (
                  <a href={project.link} target="_blank" rel="noopener noreferrer" 
                     className="text-sm text-blue-500 hover:underline">
                    View Project
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {shouldShowSection('achievements') && (
        <div className="mb-8">
          <h2 className="text-xl font-light pb-2 mb-4"
              style={{ color: styles.primary, borderBottom: `2px solid ${styles.secondary}` }}>Achievements</h2>
          {resumeInfo?.achievements?.map((achievement, index) => (
            <div key={index} className="mb-4" style={{ color: styles.color }}>
              <div className="flex justify-between items-baseline">
                <h3 className="font-medium">{achievement.title}</h3>
                <span className="text-sm">{achievement.date}</span>
              </div>
              <p className="text-sm mt-1">{achievement.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MinimalTemplate;
