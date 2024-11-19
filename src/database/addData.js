const { db } = require("./config");
// const { collection } = require("firebase/firestore");

function validateData(data) {
  if (typeof data !== "object" || data === null) {
    throw new Error("Data must be a non-null object");
  }
}

async function addDataToCollection(collectionName, data, documentName) {
  try {
    validateData(data);
    console.log("Data being sent to Firestore:", data); // Log the data
    const docRef = db.collection(`${collectionName}`).doc(`${documentName}`);
    await docRef.set({ data });
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}

module.exports = { addDataToCollection };
