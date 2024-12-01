const { db } = require("./config");
const { getUserID } = require("./auth");

function validateData(data) {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be a non-null object");
  };
};

function getUserLocalDateTime() {
  const now = new Date();
  const date = now.toISOString().split("T")[0]; // Get the date in YYYY-MM-DD format
  const hours = now.getHours().toString().padStart(2, "0");
  const minutes = now.getMinutes().toString().padStart(2, "0");
  return `${date}:${hours}.${minutes}`;
};

function removeSpaces(str) {
  return str.replace(/\s+/g, '');
}

async function addDataToCollection(req, collectionName, data, name) {
  if (!name || typeof name !== 'string') {
    console.error('Invalid name provided:', name);
  }
  const userID = await getUserID(req);
  const localDateTime = getUserLocalDateTime();  // Mendapatkan tanggal dan waktu lokal menggunakan fungsi ini
  var documentID = `${userID}-${removeSpaces(name)}-${localDateTime}`; // Generate documentID berdasarkan nama dan waktu lokal
  // Menambahkan user_id dan date (tanggal lokal) ke data
  const dataToStore = {
    ...data,            // Menyertakan data yang sudah ada
    user_id: userID,    // Menambahkan user_id
    date: localDateTime, // Menambahkan date yang diambil dari getUserLocalDateTime
  };
  try {
    validateData(data);  // Validasi data
    console.log("Data being sent to Firestore:", dataToStore); // Log data yang akan disimpan
    const docRef = db.collection(`${collectionName}`).doc(`${documentID}`);
    await docRef.set(dataToStore); // Simpan data ke Firestore
    console.log("Document successfully added with ID:", documentID);
    return dataToStore;
  } catch (error) {
    console.error("Error adding document: ", error);
  }
}

module.exports = { addDataToCollection };
