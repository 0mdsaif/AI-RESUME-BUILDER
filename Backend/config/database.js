const mongoose = require('mongoose')
require('dotenv').config

const  dbConnect = async() => {

    // mongoose.connect(process.env.DATABASE_URL);
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(()=>{
        console.log('Database Connected')
    })
}

module.exports = dbConnect;