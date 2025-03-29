import React from 'react';
import { motion } from 'framer-motion';

const ModernTemplate = ({ resumeInfo, activeComponents }) => {
  const shouldShowSection = (sectionId) => activeComponents.includes(sectionId);

  return (
    <div className="bg-white p-8 shadow-lg">
      {shouldShowSection('personal') && (
        <div className="border-l-4 border-blue-500 pl-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {resumeInfo?.firstName} {resumeInfo?.lastName}
          </h1>
          <h2 className="text-xl text-blue-600">{resumeInfo?.jobTitle}</h2>
        </div>
      )}

      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1 space-y-6">
          {shouldShowSection('personal') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact</h3>
              <div className="text-sm space-y-2">
                <p>{resumeInfo?.email}</p>
                <p>{resumeInfo?.phone}</p>
                <p>{resumeInfo?.address}</p>
              </div>
            </div>
          )}

          {shouldShowSection('skills') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Skills</h3>
              <div className="flex flex-wrap gap-2">
                {resumeInfo?.skills?.map((skill, index) => (
                  <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
                    {skill.name}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="col-span-2 space-y-6">
          {shouldShowSection('summary') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b-2 pb-2 mb-4">Summary</h3>
              <p className="text-sm text-gray-600">{resumeInfo?.summery}</p>
            </div>
          )}

          {shouldShowSection('experience') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b-2 pb-2 mb-4">Experience</h3>
              {resumeInfo?.experience?.map((exp, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium">{exp.title}</h4>
                  <p className="text-sm text-blue-600">{exp.companyName}</p>
                  <p className="text-xs text-gray-500">{exp.startDate} - {exp.endDate || 'Present'}</p>
                  <div className="text-sm mt-2" dangerouslySetInnerHTML={{ __html: exp.workSummery }} />
                </div>
              ))}
            </div>
          )}

          {shouldShowSection('education') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b-2 pb-2 mb-4">Education</h3>
              {resumeInfo?.education?.map((edu, index) => (
                <div key={index} className="mb-4">
                  <h4 className="font-medium">{edu.universityName}</h4>
                  <p className="text-sm">{edu.degree} in {edu.major}</p>
                  <p className="text-xs text-gray-500">{edu.startDate} - {edu.endDate}</p>
                </div>
              ))}
            </div>
          )}

          {shouldShowSection('projects') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b-2 pb-2 mb-4">Projects</h3>
              {resumeInfo?.projects?.map((project, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium">{project.title}</h4>
                    <span className="text-xs text-gray-500">{project.startDate} - {project.endDate}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{project.description}</p>
                  {project.technologies && (
                    <p className="text-xs text-blue-600 mt-1">Technologies: {project.technologies}</p>
                  )}
                  {project.link && (
                    <a href={project.link} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-blue-500 hover:underline mt-1 inline-block">
                      View Project
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}

          {shouldShowSection('achievements') && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 border-b-2 pb-2 mb-4">Achievements</h3>
              {resumeInfo?.achievements?.map((achievement, index) => (
                <div key={index} className="mb-4">
                  <div className="flex justify-between items-baseline">
                    <h4 className="font-medium">{achievement.title}</h4>
                    <span className="text-xs text-gray-500">{achievement.date}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{achievement.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModernTemplate;
