// Mengimpor fungsi yang diperlukan dari Firebase SDK
const admin = require('firebase-admin');
const serviceAccount = require('../../serviceAccountKey.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const {
  getFirestore,
  Timestamp,
  FieldValue,
  Filter,
} = require("firebase-admin/firestore");

const db = getFirestore();
var auth = admin.auth();

module.exports = { db, auth };
