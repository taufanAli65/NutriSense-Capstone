var express = require("express");
var router = express.Router();
var { login, signUp } = require("../database/auth");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResponse = await signUp(email, password);
    res.status(201).json({ message: "Sign Up Success", data: userResponse });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const idToken = await login(email, password);
    res.status(200).json({ message: "Login Success", token: idToken });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;