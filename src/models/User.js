const mongoose = require("mongoose");
const schema = mongoose.Schema;

const UserSchema = new schema({
    firstName: {
        type: String
    },
    lastName: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    tel: {
        type: String
    },    
    created_at: {
        type: Date
    },
    role: {
        type: String
    },
    info: {
        type: String
    },
    img: {
        type: String
    }
});

module.exports = mongoose.model("User", UserSchema);
