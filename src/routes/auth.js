var express = require("express");
var router = express.Router();
var { login, signUp, resetPassword, validateEmail } = require("../database/auth");
const { authenticateToken } = require("../middleware/auth");

router.post("/signup", async (req, res) => {
  try {
    const { email, password } = req.body;
    const userResponse = await signUp(email, password);
    // Ensure userResponse is defined and contains the necessary method
    if (userResponse && typeof userResponse.sendEmailVerification === 'function') {
      // Send email verification
      await userResponse.sendEmailVerification();
      res.status(201).json({ message: "Sign Up Success. Verification email sent.", data: userResponse });
    } else {
      throw new Error("User response is not valid");
    }
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

router.post("/reset-password", authenticateToken, async (req, res) => {
  try {
    const email = req.user.email;
    if (!validateEmail(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }
    await resetPassword(email);
    res.status(200).json({ message: "Password reset email sent" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;