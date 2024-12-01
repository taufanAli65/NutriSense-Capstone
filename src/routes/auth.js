var express = require("express");
var router = express.Router();
var { login, signUp } = require('../database/auth');

router.post("/signup", async(req,res,next) => {
    try {
        const { email, password } = req.body;
        const userResponse = await signUp(email, password);
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