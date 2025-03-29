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

function Projects() {
  const [loading, setLoading] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const {resumeInfo, setResumeInfo} = useContext(ResumeInfoContext)
  const params = useParams()
  const resumeId = params.resumeId

  const [projectsList, setProjectsList] = useState([{
    title: '',
    description: '',
    technologies: '',
    link: '',
    startDate: '',
    endDate: ''
  }])

  useEffect(() => {
    resumeInfo?.projects && setProjectsList(resumeInfo.projects)
  }, [])

  useEffect(() => {
    setResumeInfo({
      ...resumeInfo,
      projects: projectsList
    })
  }, [projectsList])

  const handleChange = (index, event) => {
    const { name, value } = event.target
    const newProjects = [...projectsList]
    newProjects[index][name] = value
    setProjectsList(newProjects)
  }

  const addNewProject = () => {
    setProjectsList([...projectsList, {
      title: '',
      description: '',
      technologies: '',
      link: '',
      startDate: '',
      endDate: ''
    }])
  }

  const removeProject = () => {
    setProjectsList(projects => projects.slice(0, -1))
  }

  const onSave = async () => {
    setLoading(true)
    try {
      const data = {
        ...resumeInfo,
        resumeid: resumeId,
        projects: projectsList
      }

      const response = await axios.put('http://localhost:3001/api/v1/resume', data)
      if (response.status !== 200) throw new Error('Failed to update')
      
      toast.success("Projects updated successfully")
      setErrorMessage('')
    } catch (error) {
      console.error('Error:', error)
      setErrorMessage('Failed to save changes')
      toast.error("Failed to update projects")
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
        Projects
      </h2>
      <p className="text-muted-foreground mb-6">Add your notable projects</p>

      <div className="space-y-6">
        {projectsList.map((project, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Project Title</label>
                <Input
                  className="glass-input"
                  name="title"
                  value={project.title}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Technologies Used</label>
                <Input
                  className="glass-input"
                  name="technologies"
                  value={project.technologies}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Project Link</label>
                <Input
                  className="glass-input"
                  name="link"
                  value={project.link}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                <Input
                  className="glass-input"
                  type="date"
                  name="startDate"
                  value={project.startDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                <Input
                  className="glass-input"
                  type="date"
                  name="endDate"
                  value={project.endDate}
                  onChange={(e) => handleChange(index, e)}
                />
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea
                  className="glass-input"
                  name="description"
                  value={project.description}
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
            onClick={addNewProject}
            className="border-blue-500/50 hover:border-blue-500 transition-all"
          >
            Add Project
          </Button>
          <Button
            variant="outline"
            onClick={removeProject}
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

export default Projects
