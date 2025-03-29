const Resume = require('../models/ResumeModel')

//buisness logic
exports.createResume = async (req,res) => {
    try {
        const {title,resumeid,userEmail,userName,firstName,lastName,jobTitle,address,phone,email,summery,workTitle,companyName,city,state,workSummery,universityName,degree,major,startDate,endDate,description,name,rating,education,experience,skills,projects,discription,technologies,link,achievements,date} = req.body
        const resume = new Resume({
            title,resumeid,userEmail,userName,firstName,lastName,jobTitle,address,phone,email,summery,workTitle,companyName,city,state,workSummery,universityName,degree,major,startDate,endDate,description,name,rating,education,experience,skills,projects,discription,technologies,link,achievements,date
        })

        const savedResume = await resume.save()
        // const updatedPost = await Post.findByIdAndUpdate(post, {$push: {comments: savedComment._id} }, {new: true})
        // .populate("comments")
        // .exec()

        res.json({
            post:savedResume
        })
    } 
    
    catch (error) {
        return res.status(500)
        .json({
            error:"Error while creating resume",
            message: error.message
        })
    }
}

exports.updateResume = async (req,res) => {
    try {
        const {resumeid,firstName,lastName,jobTitle,address,phone,email,summery,workTitle,companyName,city,state,workSummery,universityName,degree,major,startDate,endDate,description,name,rating,education,experience,skills,projects,discription,technologies,link,achievements,date} = req.body
        const updatedResume = await Resume.findOneAndUpdate(
            { resumeid: resumeid },
            { firstName, lastName, jobTitle, address, phone, email, summery ,workTitle,companyName,city,state,workSummery,universityName,degree,major,startDate,endDate,description,name,rating,education,experience,skills,projects,discription,technologies,link,achievements,date },
            { new: true }
        )

        res.json({
            post: updatedResume
        })
    } 
    
    catch (error) {
        return res.status(500)
        .json({
            error:"Error while updating resume",
            message: error.message
        })
    }
}

exports.deleteResume = async (req, res) => {
    try {
        const { resumeid } = req.params;
        const deletedResume = await Resume.findOneAndDelete({ resumeid: resumeid });
        
        if (!deletedResume) {
            return res.status(404).json({
                success: false,
                message: "Resume not found"
            });
        }

        res.json({
            success: true,
            message: "Resume deleted successfully"
        });
    } catch (error) {
        return res.status(500).json({
            error: "Error while deleting resume",
            message: error.message
        });
    }
}

