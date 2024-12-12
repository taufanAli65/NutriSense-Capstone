var { db, FieldValue } = require("./config");

async function appendDailyConsumption(userID, data) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`; // Format date as DD-MM-YYYY
  const docRef = db.collection(userID).doc(formattedDate);

  const doc = await docRef.get();
  if (doc.exists) {
    const existingData = doc.data().dailyConsumption || {};
    const updatedData = {
      calories: (existingData.calories || 0) + data.calories,
      protein: (existingData.protein || 0) + data.protein,
      carbs: (existingData.carbs || 0) + data.carbs,
      fat: (existingData.fat || 0) + data.fat,
    };
    await docRef.set({ dailyConsumption: updatedData }, { merge: true });
  } else {
    await docRef.set({ dailyConsumption: data }, { merge: true });
  }
}

module.exports = { appendDailyConsumption };