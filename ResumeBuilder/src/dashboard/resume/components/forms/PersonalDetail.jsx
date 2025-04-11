import React, { useContext, useEffect, useState } from "react";
import { ResumeInfoContext } from "../../../../context/ResumeInfoContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { LoaderCircle, User, Briefcase, MapPin, Phone, Mail } from "lucide-react";
import { toast } from "sonner";
import { useParams } from 'react-router-dom';
import { motion } from "framer-motion";

function PersonalDetail() {
  const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const params = useParams();
  const resumeId = params.resumeId; // Assuming resumeId is passed as a URL parameter

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setResumeInfo({
      ...resumeInfo,
      [name]: value,
    });
  };

  const onSave = async (e) => {
    e.preventDefault();
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
      setErrorMessage('Network error');
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 shadow-lg rounded-2xl border-t-4 border-blue-600 bg-white/5 backdrop-blur-lg"
    >
      <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        Personal Details
      </h2>
      <p className="text-muted-foreground mb-6">Get started with your basic information</p>

      <form onSubmit={onSave} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2 transform transition-all duration-300"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              First Name
            </label>
            <Input
              name="firstName"
              defaultValue={resumeInfo?.firstName}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <User className="w-4 h-4" />
              Last Name
            </label>
            <Input
              name="lastName"
              defaultValue={resumeInfo?.lastName}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2 col-span-2"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <Briefcase className="w-4 h-4" />
              Job Title
            </label>
            <Input
              name="jobTitle"
              defaultValue={resumeInfo?.jobTitle}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2 col-span-2"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Address
            </label>
            <Input
              name="address"
              defaultValue={resumeInfo?.address}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Phone Number
            </label>
            <Input
              name="phone"
              defaultValue={resumeInfo?.phone}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            className="space-y-2"
          >
            <label className="text-sm font-medium flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Email
            </label>
            <Input
              name="email"
              defaultValue={resumeInfo?.email}
              required
              onChange={handleInputChange}
              className="glass-input"
            />
          </motion.div>
        </div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="flex justify-end pt-4"
        >
          <Button
            type="submit"
            size="sm"
            className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
            disabled={loading}
          >
            {loading ? (
              <LoaderCircle className="animate-spin mr-2" />
            ) : null}
            Save Details
          </Button>
        </motion.div>
      </form>
      {errorMessage && (
        <p className="text-red-500 mt-4">{errorMessage}</p>
      )}
    </motion.div>
  );
}

export default PersonalDetail;
