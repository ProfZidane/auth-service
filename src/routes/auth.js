const router = require('express').Router();
const LoginController = require("../controllers/LoginController");
const RegisterController = require("../controllers/RegisterController");
const PasswordController = require("../controllers/PasswordController");
const CryptService = require("../services/security/Crypt");

const LoginClass = new LoginController();
const RegisterClass = new RegisterController();
const PassswordClass = new PasswordController();
const CryptClass = new CryptService();


router.post("/register", async (req,res,next) => {
    console.log(req.body);
    const user = await RegisterClass.action(req.body);

    if (user === 0) {
        res.status(500).send({ message: "User already exist !" });
    } else if (user === 1) {
        res.status(500).send({ message: "Problem in your request. Please look well !"});
    } else {
        res.status(200).send({ data: CryptClass.encrypt(user) });
    }
});



router.post("/login", async (req,res,next) => {
    console.log(req.body);

    // const user = await LoginClass.action(CryptClass.decrypt(req.body));
    const user = await LoginClass.action(req.body);

    if (user === 0) {
        res.status(500).send({ message: "Problem with your credential" });        
    } else if (user === 1) {
        res.status(400).send({ message: "Problem with your credential" });
    } else {
        res.status(200).send({ data: CryptClass.encrypt(user) });
    }
});


router.post("/login-viewer", async (req,res,next) => {
    console.log(req.body);

    // const user = await LoginClass.action(CryptClass.decrypt(req.body));
    const viewer = await LoginClass.actionViewer(req.body);

    if (viewer === 0) {
        res.status(500).send({ message: "Problem with your credential" });        
    } else if (viewer === 1) {
        res.status(400).send({ message: "Problem with your credential" });
    } else {
        res.status(200).send({ data: CryptClass.encrypt(viewer) });
    }
});




router.post('/create-link', async (req,res,next) => {
    const sendLink = await PassswordClass.reinitializeLink(req.body);

     if (sendLink === true) {
        res.status(200).send({ message: "Vous avez reçu un mail de confirmation. Veuillez le lire et effectuer les autres étapes !"});
    } else  {
        res.status(401).send({ message: "Votre compte n'existe pas ou a été bloquer !"});
    }
});



router.post("/modify-password", async (req,res,next) => {
    const user = await PassswordClass.action(req.body);
    // console.log(user);
    if (user === 0) {
        res.status(500).send({ message: "User not exist" });
    } else if (user === 'expired') {
        res.status(403).send({ message: "Authentification expired !"});
    } else {
        res.status(200).send({ data: CryptClass.encrypt(user) });
    }

});



module.exports = router;
