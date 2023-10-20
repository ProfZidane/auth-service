const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const UserModel = require("../models/User");

const mailer = require("../services/mailing/sendMail");


class PasswordController {


    async reinitializeLink(data) {
        const userExist = await UserModel.findOne({ email: data.email }); 

        if (userExist) {

            const token = jwt.sign({ _id: userExist._id }, process.env.TOKEN_SECRET, { expiresIn: 120 });
            let link = process.env.DOMAIN_APP + 'modify-password/' + token;

            mailer(userExist.email, 'Notification de confirmation', {
                title: "Réinitialisation de votre mot de passe",
                text: `
                    Veuillez cliquer sur le lien en dessous : <br>
                    ${link}
                `,
                signature: "Notre service" + process.env.APP_NAME
            }); 

            return true;
            
        } 

        return false;

    }   


    async update(data) {
        const userExist = await UserModel.findOne({ tel: data.tel });
        
        if (userExist) {
            const password_crypt = await bcrypt.hashSync(data.password,10);
            const userUpdating = await UserModel.findByIdAndUpdate({ _id: data._id }, { password: password_crypt });
            
            if (userUpdating) {
                
                return userUpdating;

            } 

            return 1;

        } 

        return 0;
    }


    async action(data) {
        try {
            const jwtVerification = jwt.verify(data.token, process.env.TOKEN_SECRET);
            
            var decoded = jwt.decode(data.token);        
            var decoded = jwt.decode(data.token, {complete: true});
            // console.log(decoded.header);
            console.log(decoded.payload)
            
            const userExist = await UserModel.findOne({ _id: decoded.payload._id });
            
            if (userExist) {
                console.log(userExist);
                
                const newdata = {
                    _id: userExist._id,
                    tel: userExist.tel,
                    password: data.password
                }

                return this.update(newdata);

            } else {
                return 0;
            }

        } catch (error) {
            console.log("expires");
            return "expired";
        }
        
    }

}

module.exports = PasswordController;