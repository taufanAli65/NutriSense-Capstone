const { db } = require("./config");

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
  const userID = req.user?.uid; // Make sure req.user exists and contains uid
  if (!name || typeof name !== 'string') {
    console.error('Invalid name provided:', name);
  }

  var documentID = `${userID}-${removeSpaces(name)}-${getUserLocalDateTime()}`; // Generate documentID based on name and local date-time
  try {
    validateData(data);
    console.log("Data being sent to Firestore:", data); // Log the data
    const docRef = db.collection(`${collectionName}`).doc(`${documentID}`);
    await docRef.set({ data });
  } catch (error) {
    console.error("Error adding document: ", error);
  };
};

module.exports = { addDataToCollection };
