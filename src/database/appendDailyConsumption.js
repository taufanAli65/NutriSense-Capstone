var { db, FieldValue } = require("./config");

async function appendDailyConsumption(userID, data) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`; // Format date as DD-MM-YYYY
  const docRef = db.collection(userID).doc(formattedDate);

  const doc = await docRef.get();
  const dataWithoutName = { ...data };
  delete dataWithoutName.name; // Remove the name property

  if (doc.exists) {
    const existingData = doc.data().dailyConsumption || {};
    const updatedData = { ...existingData };

    // Update existing nutrients and add new ones
    for (const key in dataWithoutName) {
      if (dataWithoutName.hasOwnProperty(key)) {
        updatedData[key] = (existingData[key] || 0) + dataWithoutName[key];
      }
    }

    await docRef.set({ dailyConsumption: updatedData }, { merge: true });
  } else {
    await docRef.set({ dailyConsumption: dataWithoutName }, { merge: true });
  }
}

module.exports = { appendDailyConsumption };