import React from 'react'
import { ExternalLink } from 'lucide-react'

function ProjectsPreview({resumeInfo}) {
  return (
    <div className='my-6'>
      <h2 className='text-center mb-2 text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>
        Projects
      </h2>
      <hr className='border-t-2' style={{borderColor: resumeInfo?.themeColor || "#ff6666"}} />

      {resumeInfo?.projects?.map((project, index) => (
        <div key={index} className='my-4'>
          <div className='flex justify-between items-start'>
            <h2 className='text-sm font-bold' style={{color: resumeInfo?.themeColor || "#ff6666"}}>
              {project?.title}
            </h2>
            {project?.link && (
              <a href={project.link} target="_blank" rel="noopener noreferrer" 
                 className="text-xs text-blue-500 hover:text-blue-600 flex items-center gap-1">
                <ExternalLink size={12} />
                View Project
              </a>
            )}
          </div>
          
          <div className='text-xs flex justify-between'>
            <span className='text-gray-600'>{project?.technologies}</span>
            <span className='block text-gray-500'>
              {project?.startDate} - {project?.endDate}
            </span>
          </div>
          
          <p className='text-xs my-2'>{project?.description}</p>
        </div>
      ))}
    </div>
  )
}

export default ProjectsPreview
