const mongoose = require("mongoose");
const schema = mongoose.Schema;

const DoctorSchema = new schema({   
    _id_user: {
        type: String
    },
    sex: {
        type: String
    },
    nationnality: {
        type: String
    },
    sitMatri: {
        type: String
    },
    speciality: {
        type: String
    },
    address: {
        type: String
    }, 
    grade: {
        type: String
    },
    created_at: {
        type: Date
    }
});

module.exports = mongoose.model("Doctor", DoctorSchema);