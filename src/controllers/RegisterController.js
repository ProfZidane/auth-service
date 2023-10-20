const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const DoctorModel = require("../models/Doctor");
const PatientModel = require("../models/Patient");

const mailer = require("../services/mailing/sendMail");


class RegisterController {


    async action(data) {

        const userExist = await UserModel.findOne({ tel: data.tel, role: data.role, email: data.email });

        if (!userExist) {
            const password_not_crypt = data.password;            
            const password_crypt = await bcrypt.hashSync(password_not_crypt,10);
            data.password = password_crypt;
             
            // console.log(data);
            const user = new UserModel(data);
            const userSaved = await user.save();

            if (userSaved) {
                

                if (data.role === "docteur")  {  
                    const obj = {
                        _id_user: userSaved._id,
                        sex: data.sex,
                        nationnality: data.nationnality,
                        sitMatri: data.sitMatri,
                        speciality: data.speciality,
                        address: data.address, 
                        grade: data.grade,
                        created_at: data.created_at
                    };
                    const doctor = new DoctorModel(obj);
                    await doctor.save();                                        

                } else if (data.role === "patient") {
                    const obj = data.content;
                    obj._id_user = userSaved._id;
                    const patient = new PatientModel(obj);
                    await patient.save();
                }

                if (data.email !== "" && (data.role === "docteur" || data.role === "directeur" || data.role === "admin_sys" || data.role === 'RH')) {
                    mailer(data.email, "CREATION DE VOTRE COMPTE " + data.role, {
                        title: "BIENVENUE SUR LE SIH Mr " + data.firstName + " " + data.lastName,
                        text: `<br/>
                            Vos coordonnées de compte : <br>
                            Email : ${data.email} <br/>
                            Mot de passe : ${password_not_crypt} <br/><br/>
                            
                            ${data.info}
                        `,
                        signature: "Service Sécrétariat"
                    });
                }
                
               /*  if (data.email !== "") {
                    mailer(data.email, "CREATION DE VOTRE COMPTE " + data.role, {
                        title: "BIENVENUE SUR LE SIH Mr " + data.firstName + " " + data.lastName,
                        text: data.info,
                        signature: "Service Sécrétariat"
                    });
                }   */             

                return true;
            } else {
                return 1;
            }

        } else {
            return 0;
        }


    }

}

module.exports = RegisterController;