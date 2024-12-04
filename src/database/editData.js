const { db } = require("./config");


async function editData(documentID, dataToUpdate) {
    const data = db.collection('nutrition').doc(`${documentID}`);
    const newData = await data.update(dataToUpdate)
    return newData;
}

module.exports = { editData}