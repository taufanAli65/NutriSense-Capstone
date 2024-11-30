// Mengimpor fungsi yang diperlukan dari Firebase SDK
const {
  initializeApp,
  applicationDefault,
  cert,
} = require("firebase-admin/app");
const admin = require("firebase-admin");
const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");
const serviceAccount = require("../../serviceAccountKey.json");

initializeApp({
  credential: cert(serviceAccount),
});

const db = getFirestore();

module.exports = { db, admin };
