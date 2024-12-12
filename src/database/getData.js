const { db } = require("./config");
const { getUserID } = require("./auth");

async function getData(req, collectionName) {
  const userID = await getUserID(req);
  const snapshot = await db
    .collection(`${collectionName}`)
    .where("user_id", "==", userID)
    .get();
  const data = [];
  snapshot.forEach((doc) => {
    data.push({ id: doc.id, ...doc.data() });
  });
  return data;
}

async function getDataByID(collectionName, documentID) {
  try {
    const doc = await db.collection(collectionName).doc(documentID).get();
    if (!doc.exists) {
      return null;  // Tidak ada dokumen yang ditemukan
    }
    return { id: doc.id, ...doc.data() };
  } catch (error) {
    console.error("Error fetching document:", error);
    throw new Error("Failed to fetch document");
  }
}

async function getDataByDate(req, collectionName, foods, date) {
  const userID = await getUserID(req); // Mendapatkan ID pengguna dari request

  // Variabel untuk menyimpan rentang tanggal
  let dateStart = "";
  let dateEnd = "";

  // Logika penentuan rentang tanggal berdasarkan input
  if (date.length === 4) {
    // Jika hanya tahun yang diberikan (YYYY)
    dateStart = `${date}-01-01:00.00`; // Mulai dari 1 Januari jam 00:00
    dateEnd = `${date}-12-31:23.59`; // Hingga 31 Desember jam 23:59
  } else if (date.length === 7) {
    // Jika tahun dan bulan diberikan (YYYY-MM)
    const [year, month] = date.split("-");
    dateStart = `${year}-${month}-01:00.00`; // Mulai dari tanggal 1 bulan tersebut jam 00:00
    dateEnd = `${year}-${month}-31:23.59`; // Hingga tanggal 31 bulan tersebut jam 23:59
  } else if (date.length === 10) {
    // Jika tahun, bulan, dan hari diberikan (YYYY-MM-DD)
    dateStart = `${date}:00.00`; // Mulai dari jam 00:00 pada hari tersebut
    dateEnd = `${date}:23.59`; // Hingga jam 23:59 pada hari tersebut
  }

  // Menjalankan query untuk mengambil data berdasarkan rentang tanggal
  const querySnapshot = await db
    .collection(collectionName)
    .where("name", "==", foods) // Filter berdasarkan nama makanan
    .where("user_id", "==", userID) // Filter berdasarkan userID
    .where("date", ">=", dateStart) // Rentang mulai
    .where("date", "<", dateEnd) // Rentang akhir
    .orderBy("date") // Urutkan berdasarkan tanggal
    .get();

  const data = querySnapshot.docs.map((doc) => doc.data()); // Ambil data dari hasil query
  return data;
}

function generateDateString(year, month, day) {
  let date = "";

  if (month === "00" && day === "00") {
    // Jika hanya tahun yang diberikan
    date = `${year}`;
  } else if (month !== "00" && day === "00") {
    // Jika bulan diberikan, tetapi tidak ada hari
    date = `${year}-${month}`;
  } else if (day !== "00") {
    // Jika hari diberikan
    date = `${year}-${month}-${day}`;
  }

  return date;
}

module.exports = { getData, getDataByID, getDataByDate, generateDateString };
