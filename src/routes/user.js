const express = require("express");
const router = express.Router();
const { updateUser } = require("../database/editData");
const { getUserID } = require("../database/auth");
const { getDataByID } = require("../database/getData");
const { authenticateToken } = require("../middleware/auth");
const { upload, uploadToFirebase } = require("../middleware/upload");
const { db } = require("../database/config");

router.get("/", authenticateToken, async (req, res) => {
  const userID = await getUserID(req);
  const userInfo = await getDataByID("users", userID);
  try {
    res.status(200).json(userInfo);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

router.put("/update", authenticateToken, async (req, res) => {
  const userID = await getUserID(req);
  const { username, birthdate, currentHeight, currentWeight, targetWeight } =
    req.body;
  var userTargetWeight = targetWeight || null;
  // Validate birthdate format
  const birthdateRegex = /^\d{2}-\d{2}-\d{4}$/;
  if (!birthdateRegex.test(birthdate)) {
    return res.status(400).json("Invalid birthdate format. Use DD-MM-YYYY.");
  }
  try {
    const user = await updateUser(userID, {
      username,
      birthdate,
      currentHeight,
      currentWeight,
      userTargetWeight,
    });
    console.log(user);
    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({
        message: "Error updating user information",
        errors: error.message,
      });
  }
});

router.post(
  "/upload",
  authenticateToken,
  upload.single("profilePhoto"),
  uploadToFirebase,
  async (req, res) => {
    try {
      // Ambil userID dari token autentikasi
      const userID = await getUserID(req);
      console.log("UserID:", userID);

      // Pastikan file diupload
      if (!req.file) {
        return res.status(400).json({ message: "No file uploaded." });
      }
      // Mendapatkan URL file yang diupload ke Firebase Storage
      const profilePhotoUrl = req.file.firebaseStoragePublicUrl;
      console.log("Data being sent to Firestore:", profilePhotoUrl); // Log data yang akan disimpan
      const docRef = db.collection("users").doc(userID);
      await docRef.update({
        profilePhotoUrl: profilePhotoUrl, // Menyimpan URL foto profil pada field 'profilePhotoUrl'
      });

      res.status(200).json({
        message: "Profile photo uploaded successfully.",
        profilePhotoUrl: profilePhotoUrl,
      });
    } catch (error) {
      console.error("Error uploading file:", error);
      res
        .status(500)
        .json({ message: "Error uploading file.", error: error.message });
    }
  }
);

module.exports = router;
