import React, { useState, useContext, useEffect } from 'react'
import PersonalDetail from './forms/PersonalDetail'
import { Button } from '@/components/ui/button'
import { ArrowLeft, ArrowRight, LayoutGrid } from 'lucide-react'
import Summery from './forms/Summery'
import Experience from './forms/Experience'
import Education from './forms/education'
import Skills from './forms/Skills'
import Projects from './forms/Projects'
import Achievements from './forms/Achievements'
import { ThemeSelector } from '../themes'
import { ResumeInfoContext } from '@/context/ResumeInfoContext'
import { Settings } from 'lucide-react'
import { ResumeComponentSelector } from './ResumeComponentSelector'
import { motion } from 'framer-motion'

const FormSection = ({ activeComponents, setActiveComponents }) => {
  const [activeFormIndex, setActiveFormIndex] = useState(1)
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext)
  const [showComponentSelector, setShowComponentSelector] = useState(false)
  const [showTheme, setShowTheme] = useState(false)

  const handleToggleComponent = (componentId) => {
    const newComponents = activeComponents.includes(componentId)
      ? activeComponents.filter(id => id !== componentId)
      : [...activeComponents, componentId];
    
    setActiveComponents(newComponents);

    // Update resumeInfo with new sections
    setResumeInfo(prev => ({
      ...prev,
      sections: newComponents
    }));
  }
  
  const getComponentId = (index) => {
    const componentMap = {
      1: 'personal',
      2: 'summary',
      3: 'experience',
      4: 'education',
      5: 'skills',
      6: 'projects',
      7: 'achievements'
    };
    return componentMap[index];
  };

  const hasNextComponent = (currentIndex, components) => {
    for (let i = currentIndex + 1; i <= 7; i++) {
      if (components.includes(getComponentId(i))) {
        return true;
      }
    }
    return false;
  };

  const shouldShowComponent = (componentId, index) => {
    return activeComponents.includes(componentId) && activeFormIndex === index;
  };

  return (
    <div>
      <div className='mb-6 relative'>
        <motion.div 
          className="flex flex-col gap-4 p-6 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 rounded-xl border border-blue-200/20 backdrop-blur-sm"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button 
                variant="outline" 
                size="sm" 
                className='flex gap-2 border-blue-500/50 hover:border-blue-500 transition-all'
                onClick={() => setShowTheme(!showTheme)}
              > 
                <LayoutGrid className="w-4 h-4"/> 
                Theme
              </Button>
              
              <div className="h-6 w-px bg-gray-300/50" />
              
              <div className="flex gap-2">
                {activeFormIndex > 1 && (
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => {
                      // Find the previous active component index
                      let prevIndex = activeFormIndex - 1;
                      while (prevIndex > 0 && !activeComponents.includes(getComponentId(prevIndex))) {
                        prevIndex--;
                      }
                      setActiveFormIndex(prevIndex);
                    }}
                    className="hover:bg-blue-500/10"
                  > 
                    <ArrowLeft className="w-4 h-4"/> 
                  </Button>
                )}
                {activeFormIndex < 7 && hasNextComponent(activeFormIndex, activeComponents) && (
                  <Button 
                    size="sm" 
                    className='flex gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700' 
                    onClick={() => {
                      // Find the next active component index
                      let nextIndex = activeFormIndex + 1;
                      while (nextIndex <= 7 && !activeComponents.includes(getComponentId(nextIndex))) {
                        nextIndex++;
                      }
                      setActiveFormIndex(nextIndex);
                    }}
                  >
                    Next <ArrowRight className="w-4 h-4"/>
                  </Button>
                )}
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowComponentSelector(true)}
              className="group px-4 py-2 rounded-lg bg-gradient-to-r from-purple-500/10 to-pink-500/10 hover:from-purple-500/20 hover:to-pink-500/20 border border-purple-500/50 hover:border-purple-500 transition-all duration-300 flex items-center gap-3"
            >
              <Settings className="w-4 h-4 text-purple-500 group-hover:rotate-90 transition-transform duration-500" />
              <span className="text-sm font-medium bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Customize Sections
              </span>
            </motion.button>
          </div>
        </motion.div>
      </div>

      <ResumeComponentSelector
        open={showComponentSelector}
        onOpenChange={setShowComponentSelector}
        activeComponents={activeComponents}
        onToggleComponent={handleToggleComponent}
      />

      {/* Show components based on activeComponents array */}
      {!showTheme && (
        <>
          {shouldShowComponent('personal', 1) && <PersonalDetail />}
          {shouldShowComponent('summary', 2) && <Summery />}
          {shouldShowComponent('experience', 3) && <Experience />}
          {shouldShowComponent('education', 4) && <Education />}
          {shouldShowComponent('skills', 5) && <Skills />}
          {shouldShowComponent('projects', 6) && <Projects />}
          {shouldShowComponent('achievements', 7) && <Achievements />}
        </>
      )}

      {showTheme && (
        <ThemeSelector 
          currentTheme={resumeInfo?.theme} 
          onThemeSelect={(theme) => {
            setResumeInfo({
              ...resumeInfo,
              theme: theme
            });
          }} 
        />
      )}
      {/* Removed bottom navigation controls */}
    </div>
  )
}

export default FormSection