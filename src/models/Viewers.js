const mongoose = require("mongoose");
const schema = mongoose.Schema;

const ViewerSchema = new schema({
    _id_user_patient: {
        type: String
    },
    _id_patient: {
        type: String
    },
    identify: {
        type: String
    },
    pseudo: {
        type: String
    },
    password: {
        type: String
    },      
    created_at: {
        type: Date
    },
    status: {
        type: String
    }    
});

module.exports = mongoose.model("Viewer", ViewerSchema);
