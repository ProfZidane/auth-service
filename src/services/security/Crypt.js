const bcrypt = require("bcrypt");
const cryptoJS = require("crypto-js");

class Crypt {

    
    make(params) {
        return bcrypt.hashSync(params, 10);
    }


    encrypt(data) {
        return cryptoJS.AES.encrypt(JSON.stringify(data), process.env.AES_KEY).toString();
    }


    decrypt(data) {
        const p =  (cryptoJS.AES.decrypt((data), process.env.AES_KEY));
        var decryptedData = JSON.parse(p.toString(cryptoJS.enc.Utf8));

        return decryptedData;
    }

}


module.exports = Crypt;