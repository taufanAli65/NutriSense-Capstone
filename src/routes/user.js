var express = require("express");
var router = express.Router();
var { admin } = require('../database/config');

router.post("/signup", async(req,res,next) => {
    try {
        const user = req.body;
        const userResponse = await admin.auth().createUser({
            email: user.email,
            password: user.password,
            emailVerified: false,
            disabled: false
        });
        res.status(201).json({ message: "Sign Up Success", data: userResponse });
    } catch (error) {
        next(error)
    };
});

module.exports = router;