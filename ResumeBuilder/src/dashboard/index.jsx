import React, { useEffect, useState, useCallback, useMemo } from 'react'
import AddResume from './components/AddResume'
import { useUser } from '@clerk/clerk-react';
import axios from 'axios';
import ResumeCardItem from './components/ResumeCardItem';
import { FileText, Plus, Sparkles, BarChart3, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const {user} = useUser();
  const [resumeList, setResumeList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const GetResumesList = useCallback(async (userEmail) => {
    if (!userEmail) return;
    
    setIsLoading(true);
    setError(null);
    try {
      const response = await axios.get(`https://backendres-il7q.onrender.com/api/v1/resumes?userEmail=${userEmail}`);
      setResumeList(response.data.data);
    } catch (error) {
      console.error('Error fetching data:', error);
      setError('Failed to load resumes');
    } finally {
      setIsLoading(false);
    }
  }, []); // Empty dependency array since it doesn't depend on any state

  useEffect(() => {
    if (user?.primaryEmailAddress?.emailAddress) {
      GetResumesList(user.primaryEmailAddress.emailAddress);
    }
  }, [user, GetResumesList]);

  const handleDeleteResume = useCallback((resumeId) => {
    setResumeList(prevList => prevList.filter(resume => resume.resumeid !== resumeId));
  }, []);

  // Memoize animation variants
  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  }), []);

  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  }), []);

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      >
        <FileText className="w-8 h-8 text-blue-500" />
      </motion.div>
    </div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">
      {error}
    </div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 via-purple-900 to-violet-900 perspective-1000">
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute bg-white/5 rounded-full"
            style={{
              width: Math.random() * 300 + 50,
              height: Math.random() * 300 + 50,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 360],
              opacity: [0.1, 0.2, 0.1],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "linear"
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 py-8 mt-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card rounded-3xl shadow-2xl border border-white/10 overflow-hidden"
        >
          {/* Dashboard Header with 3D effect */}
          <motion.div 
            className="p-8 relative overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-blue-500/10 blur-3xl" />
            <h1 className="text-4xl font-bold text-white mb-2 relative z-10">
              My Resumes
            </h1>
            <p className="text-gray-300 relative z-10">
              Create and manage your professional resumes with AI-powered assistance
            </p>
          </motion.div>

          {/* Enhanced Stats Section */}
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 md:grid-cols-4 gap-6 p-8"
          >
            {[
              { icon: FileText, label: "Total Resumes", value: resumeList.length },
              { icon: Activity, label: "Active Resumes", value: resumeList.length },
              { icon: BarChart3, label: "Job Applications", value: "15" },
              { icon: Sparkles, label: "AI Enhancements", value: "Enabled" },
            ].map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="glass-card hover-3d p-6 rounded-xl border border-white/10 transform transition-transform hover:scale-105"
              >
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-lg">
                    <stat.icon className="h-6 w-6 text-purple-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-400">{stat.label}</h3>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Resumes Grid with 3D cards */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible" 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-8"
          >
            <motion.div variants={itemVariants}>
              <AddResume />
            </motion.div>
            {resumeList && resumeList.map((resume, index) => (
              <motion.div key={index} variants={itemVariants}>
                <ResumeCardItem 
                  resume={resume}
                  onDelete={handleDeleteResume}
                />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}

export default React.memo(Dashboard);
