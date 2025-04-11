import React, { useContext, useEffect, useState, useCallback } from 'react'
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import RichTextEditor from "./richTextEditor";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { toast } from "sonner";
import { useParams } from 'react-router-dom';
import { LoaderCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const formField = {
  title: '',
  companyName: '',
  city: '',
  state: '',
  startDate: '',
  endDate: '',
  workSummery: '',
}

const Experience = () => {
  const [experiencelist, setExperiencelist] = useState([]);
  const [initialized, setInitialized] = useState(false);
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const resumeId = params.resumeId; // Assuming resumeId is passed as a URL parameter

  const handleRichTextEditor = (e, name, index) => {
    const newEntries = experiencelist.map((entry, i) =>
      i === index ? { ...entry, [name]: e.target.value } : entry
    );
    setExperiencelist(newEntries);
  }

  const handleChange = (index, event) => {
    const { name, value } = event.target;
    const newEntries = experiencelist.map((entry, i) =>
      i === index ? { ...entry, [name]: value } : entry
    );
    setExperiencelist(newEntries);
  }

  const AddNewExperience = () => {
    setExperiencelist(prev => [...prev, { ...formField }]);
  }

  const RemoveExperience = () => {
    setExperiencelist(experiencelist.slice(0, -1))
  }

  useEffect(() => {
    let isMounted = true;

    if (!initialized && resumeInfo) {
      if (resumeInfo?.experience?.length) {
        const formattedExperience = resumeInfo.experience.map(exp => ({
          title: exp.workTitle || exp.title || '',
          companyName: exp.companyName || '',
          city: exp.city || '',
          state: exp.state || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          workSummery: exp.workSummery || ''
        }));
        if (isMounted) {
          setExperiencelist(formattedExperience);
          setInitialized(true);
        }
      } else {
        if (isMounted) {
          setExperiencelist([formField]);
          setInitialized(true);
        }
      }
    }

    return () => {
      isMounted = false;
    };
  }, [resumeInfo, initialized]);

  useEffect(() => {
    if (!initialized) return;

    const timeoutId = setTimeout(() => {
      setResumeInfo(prev => ({
        ...prev,
        experience: experiencelist
      }));
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [experiencelist, initialized]);

  const renderInput = useCallback((index, field, type = "text") => (
    <Input
      className="glass-input"
      type={type}
      name={field}
      value={experiencelist[index]?.[field] || ''}
      onChange={(event) => handleChange(index, event)}
    />
  ), [experiencelist, handleChange]);

  const onSave = async (e) => {
    setLoading(true);
    await onCreate();
    setLoading(false); // Stop loading after save
    toast("Details updated successfully");
  };

  const onCreate = async () => {
    const data = {
      ...resumeInfo,
      resumeid: resumeId, // Include resumeId in the data object
      experience: experiencelist.map(entry => ({
        workTitle: entry.title, // Map title to workTitle
        companyName: entry.companyName,
        city: entry.city,
        state: entry.state,
        startDate: entry.startDate,
        endDate: entry.endDate,
        workSummery: entry.workSummery,
      }))
    };

    console.log('Data being sent:', data);

    try {
      const response = await axios.put('https://backendres-il7q.onrender.com/api/v1/resume', data);
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

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 shadow-lg rounded-2xl border-t-4 border-blue-600 bg-white/5 backdrop-blur-lg"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Professional Experience
      </h2>
      <p className="text-muted-foreground mb-6">Add your work experience</p>

      <div className="space-y-6">
        {experiencelist.map((experience, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className="glass-card p-6 rounded-xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <label className="text-sm font-medium">Position Title</label>
                {renderInput(index, "title")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Company Name</label>
                {renderInput(index, "companyName")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">City</label>
                {renderInput(index, "city")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">State</label>
                {renderInput(index, "state")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">Start Date</label>
                {renderInput(index, "startDate", "date")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="space-y-2">
                <label className="text-sm font-medium">End Date</label>
                {renderInput(index, "endDate", "date")}
              </motion.div>

              <motion.div whileHover={{ scale: 1.02 }} className="col-span-2 space-y-2">
                <RichTextEditor
                  index={index}
                  onRichTextEditorChange={(event) => handleRichTextEditor(event, 'workSummery', index)}
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
            onClick={AddNewExperience}
            className="border-blue-500/50 hover:border-blue-500 transition-all"
          >
            Add Experience
          </Button>
          <Button
            variant="outline"
            onClick={RemoveExperience}
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
  );
};

export default React.memo(Experience);
