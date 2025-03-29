const mongoose = require('mongoose')

//router handler
const resumeSchema = new mongoose.Schema({
    title:{
        type: String,
        // required: true
        // ref:"Post"
    },
    resumeid:{
        type: String,
        // required: true
    },
    userEmail:{
        type: String,
        // required: true
    },
    userName:{ 
        type: String,
    },

    //personal details

    firstName: {
        type: String,
    },

    lastName: {
        type: String,
    },

    jobTitle: {
        type: String,
    },

    address: {
        type: String,
    },

    phone: {
        type: String,
    },

    email: {
        type: String,
    },

    summery: {
        type: String,
    },

    //experience
    experience: [{
        workTitle: {
            type: String,
        },
        companyName: {
            type: String,
        },
        city: {
            type: String,
        },
        state: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        workSummery: {
            type: String,
        },
    }],
    //education
    education: [{
        universityName: {
            type: String,
        },
        degree: {
            type: String,
        },
        major: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        },
        description: {
            type: String,
        },
    }],

    //Skills
    skills:[{

        name:{
            type: String
        },
        
        rating:{
            type:Number
        },
    }],

    //projects
    projects: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        technologies: {
            type: String,
        },
        link: {
            type: String,
        },
        startDate: {
            type: String,
        },
        endDate: {
            type: String,
        }
    }],

    //achievements
    achievements: [{
        title: {
            type: String,
        },
        description: {
            type: String,
        },
        date: {
            type: String,
        }
    }]
});

module.exports = mongoose.model('Resume', resumeSchema)