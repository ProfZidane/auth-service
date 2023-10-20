const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const DoctorModel = require("../models/Doctor");
const PatientModel = require("../models/Patient");
const Viewer = require('../models/Viewers');

const mailer = require("../services/mailing/sendMail");


class LoginController {

    async action(data) {
        const userExist = await UserModel.findOne({ email: data.email });
        let response = {};
        let info = {};
        let configToke = {
            _id: "",
            email: "",
            role: "",
            _info: ""
        };

        if (userExist) {

            const passwordVerify = await bcrypt.compare(data.password, userExist.password);

            if (passwordVerify) {
                

                if (userExist.role === "docteur") {
                    const doctor = await DoctorModel.findOne({ _id_user: userExist._id });
                    configToke._id = userExist._id;
                    configToke.email = userExist.email;
                    configToke.role = userExist.role;
                    configToke._info = doctor._id;
                    info = doctor;

                } else if (userExist.role === "patient") {
                    const patient = await PatientModel.findOne({ _id_user: userExist._id });
                    configToke._id = userExist._id;
                    configToke.email = userExist.email;
                    configToke.role = userExist.role;
                    configToke._info = patient._id;
                    info = patient;

                } else if (userExist.role === "admin_sys") {
                    configToke._id = userExist._id;
                    configToke.email = userExist.email;
                    configToke.role = userExist.role;
                    info = userExist;
                }

                const token = jwt.sign(configToke, process.env.TOKEN_SECRET, { expiresIn: 85000 });


                response = {
                    data : userExist,
                    info: info,
                    token : token
                };
                
        
                return response;
        
            }

            return 1;
            

        }

        return 0;

    }


    async actionViewer(data) {
        const viewer = await Viewer.findOne({ pseudo: data.pseudo });
        
        if (viewer) {
            console.log("passer");
            const passwordCompare = await bcrypt.compare(data.password, viewer.password);

            if (passwordCompare) {
                const token = jwt.sign({_id: viewer._id}, process.env.TOKEN_SECRET, { expiresIn: 85000 });
                const patient_data = await PatientModel.findOne({ _id: viewer._id_patient });
                const user_data = await UserModel.findOne({ _id: viewer._id_user_patient });

                return { patient: patient_data, user: user_data, token };
            }

            return 1;

        }

        return 0;
    }
}

module.exports = LoginController;