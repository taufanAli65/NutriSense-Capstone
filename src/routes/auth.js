var express = require("express");
var router = express.Router();
var { auth } = require('../database/config');
var { login } = require('../database/login');

router.post("/signup", async(req,res,next) => {
    try {
        const { email, password } = req.body;
        const userResponse = await auth.createUser({
            email: email,
            password: password,
            emailVerified: false,
            disabled: false
        });
        res.status(201).json({ message: "Sign Up Success", data: userResponse });
    } catch (error) {
        next(error)
    };
});

router.post("/login", async (req, res, next) => {
    try {
        const {email, password} = req.body;
        const idToken = await login(email, password);
        res.status(200).json({message: "Login Success", token: idToken});
    } catch (error) {
        next(error);
    }
});

module.exports = router;