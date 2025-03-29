import React from 'react'

function SkillsPreview({resumeInfo}) {
    return (
        <div className='my-8 text-black'>
            <h2 className='text-center mb-3 text-xl font-semibold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>Skills</h2>
            <hr className='border-t-2 mb-5' style={{borderColor: resumeInfo?.themeColor || "#ff6666"}} />
    
            <div className='grid grid-cols-2 gap-5'>
                {resumeInfo?.skills.map((skill,index)=>( 
                    <div key={index} className='flex items-center p-3 border rounded-lg shadow-md'>
                        <h2 className='text-base w-1/3' >{skill.name}</h2>
                        <div className='w-2/3 h-3 bg-gray-300 rounded-full flex items-center relative'>
                            <div className='h-3 rounded-full flex items-center justify-center' 
                                style={{
                                    backgroundColor: resumeInfo?.themeColor || "#ff6666",
                                    width: `${skill.rating}%`
                                }}>
                                <span className='text-xs text-white'>
                                    {skill.rating}%
                                </span>
                            </div>
                        </div>
                    </div>
                ))}    
            </div>
        </div>
    )
}
export default SkillsPreview