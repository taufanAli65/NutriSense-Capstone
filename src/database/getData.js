const { db } = require("./config");

async function getData(collectionName) {
  const snapshot = await db.collection(`${collectionName}`).get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
};

async function getDataByID(collectionName, documentID) {
  const doc = await db.collection(`${collectionName}`).doc(documentID).get();
  if (!doc.exists) {
    throw new Error('No such document!');
  } else {
    return { id: doc.id, ...doc.data() };
  };
};

module.exports = { getData, getDataByID };
