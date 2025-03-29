import React from 'react';
import { resumeThemes } from '../../../themes';

const GridTemplate = ({ resumeInfo, activeComponents }) => {
  const shouldShowSection = (sectionId) => activeComponents.includes(sectionId);
  const currentTheme = resumeThemes[resumeInfo?.theme || 'modern'];
  
  // Get theme-specific styles
  const styles = {
    background: `var(--theme-background, white)`,
    color: `var(--theme-text, black)`,
    primary: `var(--theme-primary)`,
    secondary: `var(--theme-secondary)`
  };

  const cardStyle = {
    background: `${styles.primary}08`,
    border: `1px solid ${styles.primary}20`
  };

  return (
    <div className={`p-6 ${currentTheme.className}`} style={{ background: styles.background, color: styles.color }}>
      {shouldShowSection('personal') && (
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold" style={{ color: styles.primary }}>
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <p style={{ color: styles.secondary }}>{resumeInfo?.jobTitle}</p>
          <div className="mt-2 flex justify-center gap-4 text-sm" style={{ color: styles.secondary }}>
            <span>{resumeInfo?.email}</span>
            <span>{resumeInfo?.phone}</span>
          </div>
        </header>
      )}

      <div className="grid grid-cols-2 gap-6">
        {shouldShowSection('summary') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Professional Summary</h2>
            <p className="text-sm" style={{ color: styles.color }}>{resumeInfo?.summery}</p>
          </div>
        )}

        {shouldShowSection('skills') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Skills</h2>
            <div className="flex flex-wrap gap-2">
              {resumeInfo?.skills?.map((skill, index) => (
                <span key={index} className="bg-white px-2 py-1 text-sm rounded" style={{ color: styles.color }}>
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}

        {shouldShowSection('experience') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Experience</h2>
            {resumeInfo?.experience?.map((exp, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-medium" style={{ color: styles.primary }}>{exp.title}</h3>
                <p className="text-sm" style={{ color: styles.secondary }}>{exp.companyName}</p>
                <p className="text-xs" style={{ color: styles.secondary }}>{exp.startDate} - {exp.endDate || 'Present'}</p>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('education') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Education</h2>
            {resumeInfo?.education?.map((edu, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-medium" style={{ color: styles.primary }}>{edu.universityName}</h3>
                <p className="text-sm" style={{ color: styles.color }}>{edu.degree} in {edu.major}</p>
                <p className="text-xs" style={{ color: styles.secondary }}>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('projects') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Projects</h2>
            {resumeInfo?.projects?.map((project, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-medium" style={{ color: styles.primary }}>{project.title}</h3>
                <p className="text-sm" style={{ color: styles.color }}>{project.description}</p>
                <div className="flex justify-between text-xs mt-1">
                  <span style={{ color: styles.secondary }}>{project.technologies}</span>
                  <span style={{ color: styles.secondary }}>{project.startDate} - {project.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('achievements') && (
          <div className="p-4 rounded" style={cardStyle}>
            <h2 className="font-semibold mb-3" style={{ color: styles.primary }}>Achievements</h2>
            {resumeInfo?.achievements?.map((achievement, index) => (
              <div key={index} className="mb-3">
                <h3 className="font-medium" style={{ color: styles.primary }}>{achievement.title}</h3>
                <p className="text-sm" style={{ color: styles.color }}>{achievement.description}</p>
                <span className="text-xs" style={{ color: styles.secondary }}>{achievement.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default GridTemplate;
