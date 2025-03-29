import React from 'react'
import { User, Briefcase, MapPin, Phone, Mail } from "lucide-react"
import { motion } from "framer-motion"

function PersonalDetailPreview({resumeInfo, theme}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={`relative ${theme?.styles?.sectionSpacing}`}
      whileHover={{ scale: 1.02 }}
    >
      <motion.div 
        className="text-center space-y-4 mb-6"
        whileHover={{ z: 20 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        <motion.h2 
          className={`text-3xl font-bold ${theme?.styles?.headingColor}`}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
        >
          {resumeInfo?.firstName} {resumeInfo?.lastName}
        </motion.h2>
        
        <motion.h3 
          className={`text-lg font-medium ${theme?.styles?.borderAccent}`}
          whileHover={{ scale: 1.05 }}
        >
          {resumeInfo?.jobTitle}
        </motion.h3>
      </motion.div>

      <motion.div 
        className="grid grid-cols-2 gap-4 text-sm mb-6"
        style={{ transformStyle: 'preserve-3d' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <motion.div 
          className="flex items-center gap-2"
          whileHover={{ x: 5 }}
        >
          <MapPin className="w-4 h-4" style={{ color: resumeInfo?.themeColor || "#ff6666" }} />
          <span>{resumeInfo?.address}</span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 justify-end"
          whileHover={{ x: -5 }}
        >
          <Phone className="w-4 h-4" style={{ color: resumeInfo?.themeColor || "#ff6666" }} />
          <span>{resumeInfo?.phone}</span>
        </motion.div>

        <motion.div 
          className="flex items-center gap-2 col-span-2 justify-center"
          whileHover={{ y: -2 }}
        >
          <Mail className="w-4 h-4" style={{ color: resumeInfo?.themeColor || "#ff6666" }} />
          <span>{resumeInfo?.email}</span>
        </motion.div>
      </motion.div>

      <motion.hr 
        className="border-[1.5px] my-4"
        style={{ borderColor: resumeInfo?.themeColor || "#ff6666" }}
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 0.5 }}
      />
    </motion.div>
  )
}

export default PersonalDetailPreview