import React from 'react';
import { resumeThemes } from '../../../themes';

const TimelineTemplate = ({ resumeInfo, activeComponents }) => {
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
    <div className={`p-6 ${currentTheme.className}`} style={{ background: styles.background, color: styles.color }}>
      {shouldShowSection('personal') && (
        <header className="text-center mb-8 pb-4" style={{ borderBottom: `1px solid ${styles.secondary}` }}>
          <h1 className="text-3xl font-bold" style={{ color: styles.primary }}>{resumeInfo?.firstName} {resumeInfo?.lastName}</h1>
          <p className="text-xl mt-1" style={{ color: styles.secondary }}>{resumeInfo?.jobTitle}</p>
          <div className="mt-2 text-sm" style={{ color: styles.secondary }}>
            {resumeInfo?.email} • {resumeInfo?.phone} • {resumeInfo?.address}
          </div>
        </header>
      )}

      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 z-0" 
             style={{ 
               background: styles.secondary,
               opacity: 0.3
             }}
        ></div>

        {shouldShowSection('summary') && (
          <div className="ml-6 mb-8 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full z-10 shadow-md" 
                 style={{ 
                   background: styles.primary,
                   border: `2px solid ${styles.background}`
                 }}
            ></div>
            <h2 className="text-xl font-semibold mb-2" style={{ color: styles.primary }}>Professional Summary</h2>
            <p style={{ color: styles.color }}>{resumeInfo?.summery}</p>
          </div>
        )}

        {shouldShowSection('experience') && (
          <div className="ml-6 mb-8 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full z-10 shadow-md" 
                 style={{ 
                   background: styles.primary,
                   border: `2px solid ${styles.background}`
                 }}
            ></div>
            <h2 className="text-xl font-semibold mb-4 relative z-10" style={{ color: styles.primary }}>Experience</h2>
            {resumeInfo?.experience?.map((exp, index) => (
              <div key={index} className="mb-4 relative">
                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full z-10" 
                     style={{ 
                       background: styles.secondary,
                       border: `1px solid ${styles.background}`
                     }}
                ></div>
                <h3 className="font-medium" style={{ color: styles.primary }}>{exp.title}</h3>
                <p style={{ color: styles.secondary }}>{exp.companyName}</p>
                <p className="text-sm" style={{ color: styles.secondary }}>{exp.startDate} - {exp.endDate || 'Present'}</p>
                <div className="mt-2 text-sm" style={{ color: styles.color }} dangerouslySetInnerHTML={{__html: exp.workSummery}} />
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('education') && (
          <div className="ml-6 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full z-10 shadow-md" 
                 style={{ 
                   background: styles.primary,
                   border: `2px solid ${styles.background}`
                 }}
            ></div>
            <h2 className="text-xl font-semibold mb-4 relative z-10" style={{ color: styles.primary }}>Education</h2>
            {resumeInfo?.education?.map((edu, index) => (
              <div key={index} className="mb-4 relative">
                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full z-10" 
                     style={{ 
                       background: styles.secondary,
                       border: `1px solid ${styles.background}`
                     }}
                ></div>
                <h3 className="font-medium" style={{ color: styles.primary }}>{edu.universityName}</h3>
                <p style={{ color: styles.secondary }}>{edu.degree} in {edu.major}</p>
                <p className="text-sm" style={{ color: styles.secondary }}>{edu.startDate} - {edu.endDate}</p>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('projects') && (
          <div className="ml-6 mb-8 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full z-10 shadow-md" 
                 style={{ 
                   background: styles.primary,
                   border: `2px solid ${styles.background}`
                 }}
            ></div>
            <h2 className="text-xl font-semibold mb-4 relative z-10" style={{ color: styles.primary }}>Projects</h2>
            {resumeInfo?.projects?.map((project, index) => (
              <div key={index} className="mb-4 relative">
                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full z-10" 
                     style={{ 
                       background: styles.secondary,
                       border: `1px solid ${styles.background}`
                     }}
                ></div>
                <h3 className="font-medium" style={{ color: styles.primary }}>{project.title}</h3>
                <p className="text-sm" style={{ color: styles.secondary }}>{project.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm" style={{ color: styles.secondary }}>{project.technologies}</span>
                  <span className="text-sm" style={{ color: styles.secondary }}>{project.startDate} - {project.endDate}</span>
                </div>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('achievements') && (
          <div className="ml-6 mb-8 relative">
            <div className="absolute -left-8 top-0 w-4 h-4 rounded-full z-10 shadow-md" 
                 style={{ 
                   background: styles.primary,
                   border: `2px solid ${styles.background}`
                 }}
            ></div>
            <h2 className="text-xl font-semibold mb-4 relative z-10" style={{ color: styles.primary }}>Achievements</h2>
            {resumeInfo?.achievements?.map((achievement, index) => (
              <div key={index} className="mb-4 relative">
                <div className="absolute -left-6 top-2 w-2 h-2 rounded-full z-10" 
                     style={{ 
                       background: styles.secondary,
                       border: `1px solid ${styles.background}`
                     }}
                ></div>
                <h3 className="font-medium" style={{ color: styles.primary }}>{achievement.title}</h3>
                <p className="text-sm" style={{ color: styles.color }}>{achievement.description}</p>
                <span className="text-sm" style={{ color: styles.secondary }}>{achievement.date}</span>
              </div>
            ))}
          </div>
        )}
      </div>

      {shouldShowSection('skills') && (
        <div className="mt-8 pt-8" style={{ borderTop: `1px solid ${styles.secondary}` }}>
          <h2 className="text-xl font-semibold mb-4" style={{ color: styles.primary }}>Skills</h2>
          <div className="flex flex-wrap gap-3">
            {resumeInfo?.skills?.map((skill, index) => (
              <span 
                key={index} 
                className="px-4 py-2 rounded-full text-sm font-medium shadow-sm hover:shadow-md transition-shadow"
                style={{ 
                  background: `${styles.primary}15`,
                  color: styles.primary,
                  border: `0.1px solid ${styles.primary}`,
                }}
              >
                {skill.name}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default TimelineTemplate;
