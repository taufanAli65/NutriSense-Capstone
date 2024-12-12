const { db } = require("./config");
const moment = require("moment");

const getDataByMonth = async (userID, month) => {
  const startDate = moment()
    .month(month - 1)
    .startOf("month")
    .format("DD-MM-YYYY");
  const endDate = moment()
    .month(month - 1)
    .endOf("month")
    .format("DD-MM-YYYY");
  console.log(startDate);
  console.log(endDate);

  const userCollection = db.collection(userID);
  const snapshot = await userCollection
    .where("date", ">=", startDate)
    .where("date", "<=", endDate)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

// Fungsi untuk mendapatkan data berdasarkan tanggal spesifik
const getDataByDate = async (userID, date) => {
  const userCollection = db.collection(userID);
  const snapshot = await userCollection.where("date", "==", date).get();

  return snapshot.docs.map((doc) => doc.data());
};

// Fungsi untuk mendapatkan data berdasarkan minggu
const getDataByWeek = async (userID, month, week) => {
  const startOfMonth = moment()
    .month(month - 1)
    .startOf("month");
  const startOfWeek = startOfMonth.add((week - 1) * 7, "days");
  const endOfWeek = startOfWeek.clone().add(6, "days");

  const startDate = startOfWeek.format("DD-MM-YYYY");
  const endDate = endOfWeek.format("DD-MM-YYYY");
  console.log(startDate);
  console.log(endDate);

  const userCollection = db.collection(userID);
  const snapshot = await userCollection
    .where("date", ">=", startDate)
    .where("date", "<=", endDate)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

const getDataByYear = async (userID, year) => {
  const startDate = moment().year(year).startOf("year").format("DD-MM-YYYY");
  const endDate = moment().year(year).endOf("year").format("DD-MM-YYYY");

  const userCollection = db.collection(userID);
  const snapshot = await userCollection
    .where("date", ">=", startDate)
    .where("date", "<=", endDate)
    .get();

  return snapshot.docs.map((doc) => doc.data());
};

module.exports = {
  getDataByYear,
  getDataByMonth,
  getDataByDate,
  getDataByWeek,
};
