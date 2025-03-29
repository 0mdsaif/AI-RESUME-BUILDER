import { Input } from '@/components/ui/input'
import React, { useContext, useEffect, useState } from 'react'
import { Slider } from "@/components/ui/slider"
import { Button } from '@/components/ui/button'
import { LoaderCircle } from 'lucide-react'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { motion } from 'framer-motion';

function Skills() {

    const [loading,setLoading]=useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const {resumeInfo,setResumeInfo}=useContext(ResumeInfoContext);
    const params=useParams();
    const resumeId = params.resumeId;

    const [skillsList,setSkillsList]=useState([{
        name:'',
        rating:0
    }])

   
    useEffect(()=>{
        resumeInfo&&setSkillsList(resumeInfo?.skills)
      },[])
   
    const handleChange=(index,name,value)=>{
        const newEntries=skillsList.slice();
      
        newEntries[index][name]=value;
        setSkillsList(newEntries);
    }

    const AddNewSkills=()=>{
        setSkillsList([...skillsList,{
            name:'',
        rating:0 
        }])
    }
    const RemoveSkills=()=>{
        setSkillsList(skillsList=>skillsList.slice(0,-1))
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
      skills: skillsList.map(entry => ({
        name: entry.name,
        rating: entry.rating,
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
            skills:skillsList
        })
    },[skillsList])
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 shadow-lg rounded-2xl border-t-4 border-blue-600 bg-white/5 backdrop-blur-lg"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Skills & Expertise
      </h2>
      <p className="text-muted-foreground mb-6">Add your key professional skills</p>

      <div className="space-y-4">
        {skillsList.map((skill, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-4 rounded-xl flex items-center gap-4"
          >
            <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
              <Input
                className="glass-input"
                name="skillName"
                placeholder="Skill name"
                defaultValue={skill.name}
                onChange={(e) => handleChange(index, 'name', e.target.value)}
              />
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.02 }} className="flex-1">
              <Slider
                className="w-full"
                value={[skill.rating]}
                min={0}
                max={100}
                step={1}
                onValueChange={(v) => handleChange(index, 'rating', v[0])}
              />
            </motion.div>
          </motion.div>
        ))}
      </div>

      <motion.div className="flex justify-between mt-6">
        <div className="flex gap-2">
          <Button
            variant="outline"
            onClick={AddNewSkills}
            className="border-blue-500/50 hover:border-blue-500 transition-all"
          >
            Add Skill
          </Button>
          <Button
            variant="outline"
            onClick={RemoveSkills}
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

export default Skills