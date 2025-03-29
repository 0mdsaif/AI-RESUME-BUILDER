import React, { memo, useMemo } from 'react'
import './ExperiencePreview.css'

const ExperiencePreview = memo(function ExperiencePreview({resumeInfo}) {
  const experience = useMemo(() => {
    if (!resumeInfo?.experience?.length) return null;
    return resumeInfo.experience.map(exp => ({
      ...exp,
      title: exp.workTitle || exp.title || '',
    }));
  }, [resumeInfo?.experience]);

  if (!experience) return null;

  return (
    <div className='my-6'>
      <h2 className='text-center mb-2 text-sm font-bold' style={{color: resumeInfo?.themeColor || '#ff6666'}}>
        Professional Experience
      </h2>
      <hr className='border-t-2' style={{borderColor: resumeInfo?.themeColor || '#ff6666'}} />

      {experience.map((exp, index) => (
        <div key={index} className='my-4'>
          <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor || '#ff6666'}}>
            {exp.title}
          </h2>
          <h2 className='text-xs flex justify-between'>
            {[exp.companyName, exp.city, exp.state].filter(Boolean).join(', ')}
            <span className='block text-sm text-gray-500'>
              {exp.startDate} - {exp.currentlyWorking ? 'Present' : exp.endDate}
            </span>
          </h2>
          {exp.workSummery && (
            <div className='text-xs my-2' dangerouslySetInnerHTML={{__html: exp.workSummery}} />
          )}
        </div>
      ))}
    </div> 
  );
});

export default ExperiencePreview;