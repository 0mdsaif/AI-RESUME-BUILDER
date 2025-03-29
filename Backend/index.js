const express = require('express')
const app = express()
const cors = require('cors')

require('dotenv').config();
const PORT = process.env.PORT || 4000

//middleware
app.use(express.json())
app.use(cors())

const blog = require('./routes/resumeRoute')
app.use("/api/v1",blog)

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send('Hello This is my app')
})

//connect to database
const dbConnect = require('./config/database')
dbConnect();