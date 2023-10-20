const UserModel = require("../models/User");
const bcrypt = require("bcrypt");


module.exports = async function() {

    const admins = [
        {
            firstName: "ZIDANE",
            lastName: "MOHAMED",
            email: "madazada0@gmail.com",
            password: "super_admin_zidane",
            tel: "51814058",    
            created_at: new Date(),
            role: "admin_sys",
            info: "",
            img: ""
        },
        {
            firstName: "CHEDOU",
            lastName: "MOHAMED SALAH",
            email: "salahhabib0202@gmail.com",
            password: "super_admin_salah",
            tel: "5555555",    
            created_at: new Date(),
            role: "admin_sys",
            info: "",
            img: ""
        }
    ];

    for (let i = 0; i < admins.length; i++) {
        
        const adminExist = await UserModel.findOne({ email: admins[i].email, role: "admin_sys" });

        if (!adminExist) {

            admins[i].password = await bcrypt.hashSync(admins[i].password,10);

            const admin = new UserModel(admins[i]);
            const adminsSaved = await admin.save();

            if (adminsSaved) continue

        } else {
            
            console.log("Admin " + admins[i].firstName + " " + admins[i].lastName + " existe déjà !");

        }
        

    }


}