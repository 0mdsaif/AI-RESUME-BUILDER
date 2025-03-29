const mongoose = require('mongoose');

// Router handler
const PersonalDetailSchema = new mongoose.Schema({
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
});

module.exports = mongoose.model('PersonalDetail', PersonalDetailSchema);
