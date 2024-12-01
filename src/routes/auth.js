var express = require("express");
var router = express.Router();
var { auth } = require('../database/config');

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
        const user = await auth.getUserByEmail(email);
        const customToken = await auth.createCustomToken(user.uid);
        res.status(200).json({message:"Login Success", token: customToken});
    } catch (error) {
        next(error);
    }
})

module.exports = router;