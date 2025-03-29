const Resume = require('../models/ResumeModel')

exports.getResume = async(req,res) => {
    try{
        console.log('Request query:', req.query); // Log the query parameters
        //by mail id -----------------------------------------------
        const { userEmail } = req.query;
        console.log('userEmail:', userEmail); // Log the userEmail value
        const filter = userEmail ? { userEmail } : {};
        console.log('Filter:', filter); // Log the filter object
        const resume = await Resume.find(filter);
        console.log('Resume:', resume); // Log the retrieved resumes

        res.status(200)
        .json({
            success:true,
            data:resume,
            message:'Entries retrieved successfully'
        })
    }

    catch(err){
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}

exports.getResumeById = async(req,res) => {
    try{
        console.log('Request query:', req.query); // Log the query parameters
        //by userId------------------------------
        const{resumeid} = req.query;
        console.log('resumeid',resumeid);
        const filter = resumeid?{resumeid} :{};

        console.log('Filter:', filter); // Log the filter object
        const resume = await Resume.find(filter);
        console.log('Resume:', resume); // Log the retrieved resumes

        res.status(200)
        .json({
            success:true,
            data:resume,
            message:'Entries retrieved successfully'
        })
    }

    catch(err){
        console.log(err);
        res.status(500)
        .json({
            success:false,
            data:"internal server error",
            message:err.message,
        })
    }
}