import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { ResumeInfoContext } from '../../../../context/ResumeInfoContext';
import { LoaderCircle } from "lucide-react";
import { toast } from "sonner";
import { useParams } from 'react-router-dom';
import { Biohazard } from 'lucide-react';
import { AIchatSession } from '../../../../../service/AiModel';
import { motion } from 'framer-motion';

const prompt = `For the job title "{jobTitle}", generate 3 different resume summaries in the following JSON format:
{
  "summaries": [
    {
      "level": "Fresher",
      "summary": "..."
    },
    {
      "level": "Mid-Level",
      "summary": "..."
    },
    {
      "level": "Senior",
      "summary": "..."
    }
  ]
}`;

const Summery = () => {
    const { resumeInfo, setResumeInfo } = useContext(ResumeInfoContext);
    const [summery, setSummery] = useState();
    const [errorMessage, setErrorMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [aiGeneratedSummenryList, setaiGeneratedSummenryList] = useState([]); // Initialize as an empty array

    const params = useParams();
    const resumeId = params.resumeId; // Assuming resumeId is passed as a URL parameter

    useEffect(() => {
        summery && setResumeInfo({
            ...resumeInfo,
            summery: summery,
        });
    }, [summery]);

    const GenerateSummeryFromAI = async () => {
        setLoading(true);
        try {
            const PROMPT = prompt.replace('{jobTitle}', resumeInfo?.jobTitle);
            console.log('Sending prompt:', PROMPT);
            const result = await AIchatSession.sendMessage(PROMPT);
            const responseText = await result.response.text();
            console.log('AI Response:', responseText);
            
            // Parse the JSON response
            const parsedResponse = JSON.parse(responseText);
            
            // Extract summaries array or create from single object
            const summaryArray = parsedResponse.summaries || [parsedResponse];
            
            // Sort summaries by experience level
            const orderedSummaries = summaryArray.sort((a, b) => {
                const levelOrder = { 'Fresher': 1, 'Mid-Level': 2, 'Senior': 3 };
                return levelOrder[a.level] - levelOrder[b.level];
            });
            
            setaiGeneratedSummenryList(orderedSummaries);
        } catch (error) {
            console.error('Error generating summary:', error);
            toast.error('Failed to generate summary. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const onSave = async (e) => {
        e.preventDefault();
        setLoading(true);
        await onCreate();
        setLoading(false); // Stop loading after save
        toast("Details updated succesfully");
    };

    //api call
    const onCreate = async () => {
        const data = {
            resumeid: resumeId, // Include resumeId in the data object
            summery: summery,
        };

        // console.log('Data being sent:', data);

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
            setLoading(false); // Corrected typo from setloading to setLoading
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
                Professional Summary
            </h2>
            <p className="text-muted-foreground mb-6">Add a compelling professional summary</p>

            <form className='mt-7' onSubmit={onSave}>
                <div className='flex justify-between items-center mb-4'>
                    <label className="text-sm font-medium">Add Summary</label>
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        type="button"
                        onClick={GenerateSummeryFromAI}
                        className="flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600/20 to-purple-600/20 border border-blue-500/50 hover:border-blue-500 transition-all"
                    >
                        <Biohazard className="w-4 h-4" />
                        <span>Generate with AI</span>
                    </motion.button>
                </div>

                <motion.div
                    whileHover={{ scale: 1.01 }}
                    className="w-full"
                >
                    <Textarea
                        required
                        defaultValue={resumeInfo?.summery}
                        className="glass-input min-h-[200px] text-base"
                        placeholder='Write your professional summary here...'
                        onChange={(e) => setSummery(e.target.value)}
                    />
                </motion.div>

                <motion.div className="flex justify-end mt-6">
                    <Button
                        type="submit"
                        size="sm"
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white shadow-xl hover:shadow-2xl transition-all duration-300"
                        disabled={loading}
                    >
                        {loading ? <LoaderCircle className="animate-spin mr-2" /> : null}
                        Save Summary
                    </Button>
                </motion.div>
            </form>

            {aiGeneratedSummenryList && aiGeneratedSummenryList.length > 0 && (
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className='mt-8 space-y-4'
                >
                    <h3 className='text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent'>
                        AI Suggestions
                    </h3>
                    {aiGeneratedSummenryList.map((item, index) => (
                        <motion.div
                            key={index}
                            whileHover={{ scale: 1.02 }}
                            className='p-6 glass-card rounded-xl cursor-pointer hover:shadow-xl transition-all'
                            onClick={() => setSummery(item.summary)}
                        >
                            <h4 className='font-medium text-blue-400 mb-2'>
                                Level: {item.level}
                            </h4>
                            <p className="text-sm text-gray-300">{item.summary}</p>
                        </motion.div>
                    ))}
                </motion.div>
            )}
        </motion.div>
    );
};

export default Summery;
