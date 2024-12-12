// Mengimpor fungsi yang diperlukan dari Firebase SDK
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');
// require("dotenv").config();

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    storageBucket: process.env.GOOGLE_BUCKET || 'nutrisense-ddd89.firebasestorage.app'
});

const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const bucket = admin.storage().bucket();
const db = getFirestore();
var auth = admin.auth();

module.exports = { db, auth, bucket, FieldValue };
