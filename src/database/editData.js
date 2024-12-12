const { db } = require("./config");

async function editData(documentID, dataToUpdate) {
  const data = db.collection("nutrition").doc(`${documentID}`);
  const newData = await data.update(dataToUpdate);
  return newData;
}

async function updateUser(userId, userInfo) {
  const userRef = db.collection("users").doc(userId);
  console.log(`Data sent: ${JSON.stringify(userInfo)}`); // Log the userInfo to check what data is being sent
  try {
    const doc = await userRef.get(); // fetch the document
    if (!doc.exists) {
      console.log("User document not found. Creating a new document.");
      await userRef.set(userInfo); // Create the new document with provided userInfo
      return { message: "User created successfully", data: userInfo };
    } else {
      console.log("User document found. Updating existing document.");
      await userRef.update(userInfo); // Update the existing document with userInfo
      const updatedUser = await userRef.get(); // Fetch the updated data
      return { message: "User updated successfully", data: updatedUser.data() };
    }
  } catch (error) {
    console.error("Error updating or creating user data:", error);
    throw new Error("Error updating or creating user data: " + error.message);
  }
}

module.exports = {
  editData,
  updateUser,
};
