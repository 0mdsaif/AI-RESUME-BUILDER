import React from 'react'

function AchievementsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
      <h2 className='text-center mb-2 text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>
        Achievements
      </h2>
      <hr className='border-t-2' style={{borderColor: resumeInfo?.themeColor || "#ff6666"}} />

      {resumeInfo?.achievements?.map((achievement, index) => (
        <div key={index} className='my-4'>
          <div className='flex justify-between items-start'>
            <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>
              {achievement?.title}
            </h2>
            <span className='text-xs text-gray-500'>
              {achievement?.date}
            </span>
          </div>
          
          <p className='text-xs my-2'>{achievement?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default AchievementsPreview
