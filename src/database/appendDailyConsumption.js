var { db, FieldValue } = require("./config");

async function appendDailyConsumption(userID, data) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`; // Format date as DD-MM-YYYY
  const docRef = db.collection(userID).doc(formattedDate);
  await docRef.set({
    dailyConsumption: FieldValue.arrayUnion(data)
  }, { merge: true });
}

module.exports = { appendDailyConsumption };