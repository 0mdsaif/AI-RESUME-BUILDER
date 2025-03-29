import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'sonner'
import { motion } from 'framer-motion'

function Education() {

  const [loading,setLoading]=useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
  const params=useParams();
  const resumeId = params.resumeId;
  const [educationalList,setEducationalList]=useState([ 
    {
      universityName:'',
      degree:'',
      major:'',
      startDate:'',
      endDate:'',
      description:''
    }
  ])

  useEffect(()=>{
    resumeInfo&&setEducationalList(resumeInfo?.education)
  },[])
  const handleChange=(event,index)=>{
    const newEntries=educationalList.slice();
    const {name,value}=event.target;
    newEntries[index][name]=value;
    setEducationalList(newEntries);
  }

  const AddNewEducation=()=>{
    setEducationalList([...educationalList,
      {
        universityName:'',
        degree:'',
        major:'',
        startDate:'',
        endDate:'',
        description:''
      }
    ])
  }
  const RemoveEducation=()=>{
    setEducationalList(educationalList=>educationalList.slice(0,-1))

  }
  const onSave = async (e) => {
    // e.preventDefault();
    setLoading(true);
    await onCreate();
    setLoading(false); // Stop loading after save
    toast("Details updated successfully");
  };

  // API call
  const onCreate = async () => {
    const data = {
      ...resumeInfo,
      resumeid: resumeId, // Include resumeId in the data object
      education: educationalList.map(entry => ({
        universityName: entry.universityName,
        degree: entry.degree,
        major: entry.major,
        startDate: entry.startDate,
        endDate: entry.endDate,
        description: entry.description,
      }))
    };

    console.log('Data being sent:', data);

    try {
      const response = await axios.put('http://localhost:3001/api/v1/resume', data);
      console.log(response);
      if (response.status !== 200) {
        throw new Error('Failed to store data');
      }

      console.log('Data stored successfully');
      setErrorMessage('');
    } catch (error) {
      console.error('Fetch error:', error.message);
      console.error('Error response:', error.response?.data); // Log detailed error response
      setErrorMessage('Network error');
      setLoading(false);
    }
  };

  useEffect(()=>{
    setResumeInfo({
      ...resumeInfo,
      education:educationalList
    })
  },[educationalList])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 shadow-lg rounded-2xl border-t-4 border-blue-600 bg-white/5 backdrop-blur-lg"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Education
      </h2>
      <p className="text-muted-foreground mb-6">Add your educational background</p>

      <div className="space-y-6">
        {educationalList.map((education, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">University/Institution Name</label>
                <Input
                  className="glass-input"
                  name="universityName"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.universityName}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Degree</label>
                <Input
                  className="glass-input"
                  name="degree"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.degree}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Major</label>
                <Input
                  className="glass-input"
                  name="major"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.major}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  className="glass-input"
                  type="date"
                  name="startDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.startDate}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  className="glass-input"
                  type="date"
                  name="endDate"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.endDate}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  className="glass-input"
                  name="description"
                  onChange={(e) => handleChange(e, index)}
                  defaultValue={education?.description}
                />
              </motion.div>
            </div>
          </motion.div>
        ))}
      </div>

      <motion.div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewEducation}
            className="border-blue-500/50 hover:border-blue-500 transition-all"
          >
            Add Education
          </Button>
          <Button
            variant="outline"
            onClick={RemoveEducation}
            className="border-red-500/50 hover:border-red-500 transition-all"
          >
            Remove
          </Button>
        </div>

        <Button
          onClick={onSave}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
          disabled={loading}
        >
          {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
          Save Changes
        </Button>
      </motion.div>
    </motion.div>
  )
}

export default Education