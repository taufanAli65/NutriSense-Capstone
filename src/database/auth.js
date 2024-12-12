var { auth } = require("../database/config");
const sendVerificationEmail = require('./sendEmail');

async function login(email, password) {
  require("dotenv").config();
  const apiKey = process.env.FIREBASE_API_KEY;
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`;
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      password: password,
      returnSecureToken: true,
    }),
  });
  if (!response.ok) {
    throw new Error("Login failed");
  }
  const data = await response.json();
  const idToken = data.idToken;
  return idToken;
}

async function signUp(email, password) {
  const userRecord = await auth.createUser({
    email: email,
    password: password,
    emailVerified: false,
    disabled: false,
  });
  // Send email verification
  const user = await auth.getUser(userRecord.uid);
  const emailVerificationLink = await auth.generateEmailVerificationLink(email);
  user.sendEmailVerification = async () => {
    await sendVerificationEmail(email, emailVerificationLink);
  };
  return user;
}

async function getUserID(req) {
  const userID = req.user?.uid; // Make sure req.user exists and contains uid
  return userID;
}

module.exports = { login, signUp, getUserID };
