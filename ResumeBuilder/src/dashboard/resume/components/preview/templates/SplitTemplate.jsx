import React from 'react';
import { resumeThemes } from '../../../themes';

const SplitTemplate = ({ resumeInfo, activeComponents }) => {
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
    <div className={`flex h-full ${currentTheme.className}`} 
         style={{ background: styles.background, color: styles.color }}>
      {/* Left Side - Contact & Skills */}
      <div className="w-1/3 p-6" style={{ background: `${styles.primary}15` }}>
        {shouldShowSection('personal') && (
          <>
            <div className="mb-8">
              <h1 className="text-2xl font-bold mb-1" style={{ color: styles.primary }}>
                {resumeInfo?.firstName}
              </h1>
              <h1 className="text-2xl font-bold mb-2" style={{ color: styles.primary }}>
                {resumeInfo?.lastName}
              </h1>
              <p style={{ color: styles.secondary }}>{resumeInfo?.jobTitle}</p>
            </div>
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3" style={{ color: styles.primary }}>Contact</h2>
              <div className="text-sm space-y-2" style={{ color: styles.secondary }}>
                <p>{resumeInfo?.email}</p>
                <p>{resumeInfo?.phone}</p>
                <p>{resumeInfo?.address}</p>
              </div>
            </div>
          </>
        )}

        {shouldShowSection('skills') && (
          <div>
            <h2 className="text-lg font-semibold mb-3" style={{ color: styles.primary }}>Skills</h2>
            <div className="flex flex-wrap gap-3">
              {resumeInfo?.skills?.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 rounded-full text-sm font-medium"
                  style={{ 
                    background: `linear-gradient(135deg, ${styles.primary}20, ${styles.primary}10)`,
                    color: styles.primary,
                    border: `1.5px solid ${styles.primary}`,
                  }}
                >
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right Side - Main Content */}
      <div className="w-2/3 p-6">
        {shouldShowSection('summary') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ 
              color: styles.primary,
              borderBottom: `2px solid ${styles.secondary}`
            }}>Summary</h2>
            <p style={{ color: styles.color }}>{resumeInfo?.summery}</p>
          </div>
        )}

        {shouldShowSection('experience') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ 
              color: styles.primary,
              borderBottom: `2px solid ${styles.secondary}`
            }}>Experience</h2>
            {resumeInfo?.experience?.map((exp, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium" style={{ color: styles.primary }}>{exp.title}</h3>
                <p style={{ color: styles.secondary }}>{exp.companyName}</p>
                <p className="text-sm" style={{ color: styles.secondary }}>
                  {exp.startDate} - {exp.endDate || 'Present'}
                </p>
                <div className="mt-2 text-sm" 
                     style={{ color: styles.color }}
                     dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('education') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ 
              color: styles.primary,
              borderBottom: `2px solid ${styles.secondary}`
            }}>Education</h2>
            {resumeInfo?.education?.map((edu, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium" style={{ color: styles.primary }}>
                  {edu.universityName}
                </h3>
                <p style={{ color: styles.secondary }}>
                  {edu.degree} in {edu.major}
                </p>
                <p className="text-sm" style={{ color: styles.secondary }}>
                  {edu.startDate} - {edu.endDate}
                </p>
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('projects') && (
          <div className="mb-8">
            <h2 className="text-xl font-semibold mb-4" style={{ 
              color: styles.primary,
              borderBottom: `2px solid ${styles.secondary}`
            }}>Projects</h2>
            {resumeInfo?.projects?.map((project, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium" style={{ color: styles.primary }}>
                  {project.title}
                </h3>
                <p style={{ color: styles.color }}>{project.description}</p>
                <div className="flex justify-between items-center mt-1">
                  <span className="text-sm" style={{ color: styles.secondary }}>
                    {project.technologies}
                  </span>
                  <span className="text-sm" style={{ color: styles.secondary }}>
                    {project.startDate} - {project.endDate}
                  </span>
                </div>
                {project.link && (
                  <a href={project.link} 
                     target="_blank" 
                     rel="noopener noreferrer"
                     style={{ color: styles.primary }}
                     className="text-sm hover:underline mt-1 inline-block">
                    View Project
                  </a>
                )}
              </div>
            ))}
          </div>
        )}

        {shouldShowSection('achievements') && (
          <div>
            <h2 className="text-xl font-semibold mb-4" style={{ 
              color: styles.primary,
              borderBottom: `2px solid ${styles.secondary}`
            }}>Achievements</h2>
            {resumeInfo?.achievements?.map((achievement, index) => (
              <div key={index} className="mb-4">
                <h3 className="font-medium" style={{ color: styles.primary }}>
                  {achievement.title}
                </h3>
                <p style={{ color: styles.color }}>{achievement.description}</p>
                <span className="text-sm" style={{ color: styles.secondary }}>
                  {achievement.date}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SplitTemplate;
