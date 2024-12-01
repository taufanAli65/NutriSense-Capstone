const { db } = require("./config");
const { getUserID } = require("./auth");

async function getData(collectionName) {
  const userID = await getUserID(req);
  const snapshot = await db
    .collection(`${collectionName}`)
    .where("userID", "==", userID)
    .get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

async function getDataByID(collectionName, documentID) {
  const doc = await db.collection(`${collectionName}`).doc(documentID).get();
  if (!doc.exists) {
    throw new Error("No such document!");
  } else {
    return { id: doc.id, ...doc.data() };
  }
}

async function getDataByDate(req, collectionName, date) {
  const userID = await getUserID(req); 
  const formattedDate = `${date}:00.00`; // Format tanggal input menjadi "YYYY-MM-DD:00.00"
  
  console.log(formattedDate); // Untuk melihat apakah format sudah benar

  const querySnapshot = await db
    .collection(collectionName)
    .where("user_id", "==", userID) // Filter berdasarkan userID
    .where("date", ">=", formattedDate) // Pencarian dengan tanggal yang sudah diformat
    .where("date", "<", `${date}:23.59`) // Pencarian dengan tanggal yang lebih besar dari tanggal sebelumnya tapi lebih kecil dari akhir hari
    .orderBy("date")  // Mengurutkan berdasarkan 'date'
    .get();

  const data = querySnapshot.docs.map((doc) => doc.data()); // Menyusun data dari hasil query
  return data;
}

module.exports = { getData, getDataByID, getDataByDate };
