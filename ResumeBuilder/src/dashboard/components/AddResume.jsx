import React, { useState } from "react";
import { Loader2, Plus } from "lucide-react";
import { Button } from '../../components/ui/button';
import { Input } from "@/components/ui/input"
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useNotifications } from '@/context/NotificationsContext';
import { useNavigate } from 'react-router-dom';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useUser } from '@clerk/clerk-react'

const AddResume = () => {
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [OpenDialog, setOpenDialog] = useState(false);
  const [resumeTitle, setresumeTitle] = useState('');
  const { user } = useUser();
  const [loading, setloading] = useState(false);
  const [resumeId, setResumeId] = useState('');
  const { addNotification } = useNotifications();
  const navigate = useNavigate();

  const onCreate = async (resumeTitle) => {
    setloading(true);
    const uuid = uuidv4();
    setResumeId(uuid);
    const data = {
      title: resumeTitle,
      resumeid: uuid,
      userEmail: user?.primaryEmailAddress?.emailAddress,
      userName: user?.fullName || 'Anonymous' 
    };

    try {
      const response = await axios.post('http://localhost:3001/api/v1/resume', data);
      if (response.status !== 200) {
        throw new Error('Failed to store data');
      }

      // Add notification
      addNotification({
        title: "Resume Created",
        message: `Your resume "${resumeTitle}" has been created successfully.`,
      });

      setOpenDialog(false);
      navigate(`/dashboard/resume/${uuid}/edit`);
      setErrorMessage('');
    } catch (error) {
      console.error('Fetch error:', error.message);
      setErrorMessage('Network error');
    } finally {
      setloading(false);
    }
  };

  return (
    <div>
      <div 
        onClick={() => setOpenDialog(true)}
        className="group bg-gradient-to-br from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-900/10 
                   border-2 border-dashed border-blue-300 dark:border-blue-700 rounded-xl
                   hover:border-blue-400 dark:hover:border-blue-600 transition-all
                   flex flex-col items-center justify-center p-6 cursor-pointer min-h-[200px]"
      >
        <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full mb-4 group-hover:scale-110 transition-transform">
          <Plus className="h-6 w-6 text-blue-600 dark:text-blue-400" />
        </div>
        <h3 className="font-semibold text-gray-900 dark:text-white mb-1">Create New Resume</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 text-center">
          Start fresh with a new resume template
        </p>
      </div>

      <Dialog open={OpenDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Create New Resume</DialogTitle>
            <DialogDescription>
              <p className="mb-4">Give your resume a title to get started</p>
              <Input 
                className="mb-4" 
                placeholder="Ex. Full Stack Developer Resume" 
                onChange={(e) => setresumeTitle(e.target.value)} 
              />
            </DialogDescription>

            <div className="flex justify-end gap-4">
              <Button 
                variant="outline" 
                onClick={() => setOpenDialog(false)}
              >
                Cancel
              </Button>
              <Button 
                disabled={!resumeTitle || loading} 
                onClick={() => onCreate(resumeTitle)}
                className="bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Creating...
                  </>
                ) : (
                  'Create Resume'
                )}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddResume;
