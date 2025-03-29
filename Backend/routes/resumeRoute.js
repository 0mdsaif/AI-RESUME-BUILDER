const express = require('express')
const router = express.Router()

// import controller
const { createResume, updateResume, deleteResume } = require('../controllers/resumeController')
const { getResume, getResumeById } = require('../controllers/GetResume')

router.post("/resume", createResume)
router.get("/resumes", getResume)
router.get("/resume", getResumeById)
router.put("/resume", updateResume)
router.delete("/resume/:resumeid", deleteResume)  // Add this line

module.exports = router