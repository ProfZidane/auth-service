const mongoose = require("mongoose");
const schema = mongoose.Schema;

const PatientSchema = new schema({
    _id_user: {
        type: String
    },
    sex: {
        type: String
    },
    birth: {
        type: Date
    },
    birthPlace: {
        type: String
    },
    nationnality: {
        type: String
    },
    sitMatri: {
        type: String
    }, 
    address: {
        type: String
    },  
    created_at: {
        type: Date
    }
});

module.exports = mongoose.model("Patient", PatientSchema);