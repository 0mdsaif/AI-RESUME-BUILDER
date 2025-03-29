import React, { useContext, useEffect, useState } from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { LoaderCircle } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { toast } from 'sonner'
import axios from 'axios'
import { motion } from 'framer-motion'

function Achievements() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const params = useParams()
  const resumeId = params.resumeId

  const [achievementsList, setAchievementsList] = useState([{
    title: '',
    description: '',
    date: ''
  }])

  useEffect(() => {
    resumeInfo?.achievements && setAchievementsList(resumeInfo.achievements)
  }, [])

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      achievements: achievementsList
    })
  }, [achievementsList])

  const handleChange = (index, event) => {
    const { name, value } = event.target
    const newAchievements = [...achievementsList]
    newAchievements[index][name] = value
    setAchievementsList(newAchievements)
  }

  const addNewAchievement = () => {
    setAchievementsList([...achievementsList, {
      title: '',
      description: '',
      date: ''
    }])
  }

  const removeAchievement = () => {
    setAchievementsList(achievements => achievements.slice(0, -1))
  }

  const onSave = async () => {
    setLoading(true)
    try {
      const data = {
        ...resumeInfo,
        resumeid: resumeId,
        achievements: achievementsList
      }

      const response = await axios.put('http://localhost:3001/api/v1/resume', data)
      if (response.status !== 200) throw new Error('Failed to update')
      
      toast.success("Achievements updated successfully")
      setErrorMessage('')
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Failed to save changes')
      toast.error("Failed to update achievements")
    } finally {
      setLoading(false) 
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 shadow-lg rounded-2xl border-t-4 border-blue-600 bg-white/5 backdrop-blur-lg"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Achievements
      </h2>
      <p className="text-muted-foreground mb-6">Add your notable achievements and awards</p>

      <div className="space-y-6">
        {achievementsList.map((achievement, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Achievement Title</label>
                <Input
                  className="glass-input"
                  name="title"
                  value={achievement.title}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Date</label>
                <Input
                  className="glass-input"
                  type="date"
                  name="date"
                  value={achievement.date}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  className="glass-input"
                  name="description"
                  value={achievement.description}
                  onChange={(e) => handleChange(index, e)}
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
            onClick={addNewAchievement}
            className="border-blue-500/50 hover:border-blue-500 transition-all"
          >
            Add Achievement
          </Button>
          <Button
            variant="outline"
            onClick={removeAchievement}
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

export default Achievements
