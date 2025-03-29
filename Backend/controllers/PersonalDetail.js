const PersonalDetail = require('../models/PersonalDetailModel')
// Removed Resume model import
// const Resume = require('../models/ResumeModel')

//buisness logic
exports.createPersonalDetail = async (req,res) => {
    try {
        const {firstName,lastName,jobTitle,address,phone,email,summery} = req.body
        // Removed resumeId from destructuring

        const personaldetail = new PersonalDetail({
            firstName,lastName,jobTitle,address,phone,email,summery
            // Removed resumeId from personaldetail creation
        })

        const savedPersonalDetail = await personaldetail.save()

        // Removed Resume update logic

        res.json({
            post: savedPersonalDetail
        })
    }
    
    catch (error) {
        return res.status(500)
        .json({
            error:"Error while adding Personal Detail",
            message: error.message
        })
    }
}

