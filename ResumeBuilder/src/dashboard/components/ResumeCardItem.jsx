import React, { useState } from "react";
import { FileText, Calendar, ChevronRight, Trash2 } from "lucide-react";
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

function ResumeCardItem({ resume, onDelete }) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async (e) => {
    e.preventDefault();
    e.stopPropagation(); // Add this to prevent event bubbling
    setIsDeleting(true);
    
    try {
      const response = await axios.delete(`https://backendres-il7q.onrender.com/api/v1/resume/${resume.resumeid}`);
      if (response.status === 200) {
        onDelete(resume.resumeid);
        setShowDeleteDialog(false);
      } else {
        throw new Error('Failed to delete resume');
      }
    } catch (error) {
      console.error('Error deleting resume:', error);
      // You might want to show an error toast here
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <div 
        onClick={() => setShowOptionsDialog(true)} 
        className="group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl 
                  shadow-lg hover:shadow-xl transition-all p-6 cursor-pointer 
                  border border-gray-200/50 dark:border-gray-700/50 relative"
      >
        {/* Delete button */}
        <button
          onClick={(e) => {
            e.preventDefault();
            setShowDeleteDialog(true);
          }}
          className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 
                   hover:bg-red-100 dark:hover:bg-red-900/30 transition-all duration-200"
        >
          <Trash2 className="h-5 w-5 text-red-600 dark:text-red-400" />
        </button>

        {/* Existing content */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <ChevronRight className="h-5 w-5 text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-400 transition-colors" />
        </div>
        
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          {resume.title || "Untitled Resume"}
        </h3>
        
        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
          <Calendar className="h-4 w-4 mr-1" />
          <span>Last edited {new Date().toLocaleDateString()}</span>
        </div>

        <div className="mt-4 flex gap-2">
          {resume.jobTitle && (
            <span className="inline-flex items-center rounded-md bg-blue-50 dark:bg-blue-900/30 px-2 py-1 text-xs font-medium text-blue-700 dark:text-blue-400 ring-1 ring-inset ring-blue-700/10">
              {resume.jobTitle}
            </span>
          )}
        </div>
      </div>

      {/* Resume Options Dialog */}
      <Dialog open={showOptionsDialog} onOpenChange={setShowOptionsDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Customize Your Resume
            </DialogTitle>
            <DialogDescription>
              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  What would you like to do with your resume?
                </h3>
                <div className="grid grid-cols-1 gap-4">
                  <Link 
                    to={`/dashboard/resume/${resume.resumeid}/edit`}
                    className="flex items-center p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 
                             rounded-lg border border-blue-100 dark:border-blue-800 hover:shadow-md transition-all"
                  >
                    <div className="p-2 bg-blue-100 dark:bg-blue-900 rounded-lg mr-4">
                      <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Edit Resume</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Modify existing sections and content</p>
                    </div>
                  </Link>

                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      setShowDeleteDialog(true);
                      setShowOptionsDialog(false);
                    }}
                    className="flex items-center p-4 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-900/20 dark:to-pink-900/20 
                             rounded-lg border border-red-100 dark:border-red-800 hover:shadow-md transition-all"
                  >
                    <div className="p-2 bg-red-100 dark:bg-red-900 rounded-lg mr-4">
                      <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-gray-100">Delete Resume</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Remove this resume permanently</p>
                    </div>
                  </button>
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold mb-4">Delete Resume</DialogTitle>
            <DialogDescription>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete "{resume.title}"? This action cannot be undone.
              </p>
              <div className="flex justify-end gap-4">
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteDialog(false)}
                >
                  Cancel
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </div>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResumeCardItem;
