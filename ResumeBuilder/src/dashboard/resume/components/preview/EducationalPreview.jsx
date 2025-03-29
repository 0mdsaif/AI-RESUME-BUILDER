import { HouseWifi } from 'lucide-react'
import React from 'react'

function EducationalPreview({resumeInfo}) {
  return (
    <div>
        <h2 className='text-center mb-2 text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>Education</h2>
        <hr className='border-t-2' style={{borderColor: resumeInfo?.themeColor || "#ff6666"}} />

        {resumeInfo?.education.map((education,index)=>( 
            <div key={index} className='my-4'>
                <h2>
                    <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>{education?.universityName}</h2>
                    <h2 className='text-sm flex justify-between'>{education?.degree} in {education?.major}
                    <span className='block text-sm text-gray-500'>
                        {education?.startDate} - {education?.currentlyWorking ? 'Present' : education?.endDate}
                    </span>
                    </h2>
                    <p className='text-xs my-2'>{education?.description}</p>

                </h2>

                {/* <p className='text-xs my-2'>{experience?.workSummery}</p> */}

            </div>
        ))}

    </div>
     
  )
}

export default EducationalPreview