var { db, FieldValue } = require("./config");

async function appendDailyConsumption(userID, data) {
  const date = new Date();
  const formattedDate = `${String(date.getDate()).padStart(2, '0')}-${String(date.getMonth() + 1).padStart(2, '0')}-${date.getFullYear()}`; // Format date as DD-MM-YYYY
  const docRef = db.collection(userID).doc(formattedDate);

  const doc = await docRef.get();
  const dataWithoutName = {
    calories: data.calories,
    protein: data.protein,
    carbs: data.carbs,
    fat: data.fat,
  };

  if (doc.exists) {
    const existingData = doc.data().dailyConsumption || {};
    const updatedData = {
      calories: (existingData.calories || 0) + dataWithoutName.calories,
      protein: (existingData.protein || 0) + dataWithoutName.protein,
      carbs: (existingData.carbs || 0) + dataWithoutName.carbs,
      fat: (existingData.fat || 0) + dataWithoutName.fat,
    };
    await docRef.set({ dailyConsumption: updatedData }, { merge: true });
  } else {
    await docRef.set({ dailyConsumption: dataWithoutName }, { merge: true });
  }
}

module.exports = { appendDailyConsumption };