import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import FormSection from '../../components/FormSection';
import ResumePreview from '../../components/ResumePreview';
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import dummy from '@/data/dummy'
import axios from 'axios';

function EditResume() {
    const params= useParams();
    const [resumeInfo, setResumeInfo] = useState()
    const resumeId = params.resumeId;
    const [activeComponents, setActiveComponents] = useState(['personal', 'summary', 'experience', 'education', 'skills'])
    
    useEffect(() => {
      // setResumeInfo(dummy)
      GetResumesInfo()
    }, []) 
    
    useEffect(() => {
        if (resumeInfo?.sections) {
            setActiveComponents(resumeInfo.sections);
        }
    }, [resumeInfo]);

    const GetResumesInfo = () => {
      // console.log(resumeId)
      axios.get(`https://backendres-il7q.onrender.com/api/v1/resume?resumeid=${resumeId}`)
        .then(response => {
          // console.log(response.data.data[0]);
          setResumeInfo(response.data.data[0]);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    const updateSectionOrder = (newOrder) => {
        setResumeInfo(prev => ({
            ...prev,
            sections: newOrder
        }));
        // You may want to save this to your backend as well
    };
    
    return(
      <ResumeInfoContext.Provider value={{resumeInfo, setResumeInfo}}>
        <div className='w-full grid grid-cols-1 md:grid-cols-2 p-5 gap-10'> {/* Updated padding and added w-full */}
          <FormSection activeComponents={activeComponents} setActiveComponents={setActiveComponents} />
          <ResumePreview activeComponents={activeComponents} onSectionReorder={updateSectionOrder} />
        </div>
      </ResumeInfoContext.Provider>
    )
}

export default EditResume
