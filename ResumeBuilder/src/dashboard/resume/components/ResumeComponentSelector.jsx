import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { Plus, Minus, FileText, Briefcase, GraduationCap, Award, Lightbulb, ScrollText, AlignLeft } from "lucide-react";

const components = [
  {
    id: 'personal',
    name: 'Personal Details',
    icon: FileText,
    description: 'Basic information like name, contact, and address'
  },
  {
    id: 'summary',
    name: 'Professional Summary',
    icon: AlignLeft,
    description: 'Brief overview of your professional background'
  },
  {
    id: 'experience',
    name: 'Work Experience',
    icon: Briefcase,
    description: 'Professional work history and achievements'
  },
  {
    id: 'education',
    name: 'Education',
    icon: GraduationCap,
    description: 'Academic qualifications and certifications'
  },
  {
    id: 'skills',
    name: 'Skills',
    icon: Lightbulb,
    description: 'Technical and professional competencies'
  },
  {
    id: 'projects',
    name: 'Projects',
    icon: ScrollText,
    description: 'Portfolio of completed projects'
  },
  {
    id: 'achievements',
    name: 'Achievements',
    icon: Award,
    description: 'Awards, honors and recognitions'
  }
];

export function ResumeComponentSelector({ open, onOpenChange, activeComponents, onToggleComponent }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Customize Resume Sections
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
          {components.map((component) => {
            const isActive = activeComponents.includes(component.id);
            const Icon = component.icon;
            
            return (
              <motion.div
                key={component.id}
                whileHover={{ scale: 1.02 }}
                className={`relative p-4 rounded-xl border cursor-pointer transition-all
                  ${isActive ? 'border-blue-500 bg-blue-50/50' : 'border-gray-200 hover:border-blue-500/50'}`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${isActive ? 'bg-blue-100' : 'bg-gray-100'}`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-blue-600' : 'text-gray-600'}`} />
                    </div>
                    <div>
                      <h3 className="font-medium">{component.name}</h3>
                      <p className="text-sm text-gray-500">{component.description}</p>
                    </div>
                  </div>
                  <Button
                    size="icon"
                    variant={isActive ? "destructive" : "outline"}
                    onClick={() => onToggleComponent(component.id)}
                    className="shrink-0"
                  >
                    {isActive ? <Minus className="w-4 h-4" /> : <Plus className="w-4 h-4" />}
                  </Button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </DialogContent>
    </Dialog>
  );
}

