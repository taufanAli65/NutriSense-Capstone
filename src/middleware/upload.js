const multer = require("multer");
const { bucket } = require("../database/config");
const { getUserID } = require("../database/auth");
const path = require("path");

// Konfigurasi multer untuk menggunakan memory storage
const upload = multer({
  storage: multer.memoryStorage(), // Menyimpan file di memory
  limits: { fileSize: 1024 * 1024 * 5 }, // Batasan ukuran file 5MB
  fileFilter: (req, file, cb) => {
    // Filter untuk menerima hanya file gambar
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(
      path.extname(file.originalname).toLowerCase()
    );

    if (mimetype && extname) {
      return cb(null, true); // File diterima
    } else {
      cb("Error: Images Only!"); // Error jika bukan gambar
    }
  },
});

// Fungsi untuk mengupload file ke Firebase Storage
const uploadToFirebase = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }
  const userID = await getUserID(req);
  if (!userID) {
    return res.status(400).send("UserID is required.");
  }
  const folderPath = `profilePhoto/`; // Membuat folder profilePhoto/${userID} dan menambahkan nama file
  const fileName = `${userID}`; // Nama file yang unik
  const filePath = folderPath + fileName;
  // Membuat referensi file di Firebase Storage dengan folder
  const blob = bucket.file(filePath);
  const blobStream = blob.createWriteStream({
    resumable: false,
    contentType: req.file.mimetype, // Menentukan jenis konten berdasarkan file
  });
  // Event listener jika upload selesai
  blobStream.on("finish", () => {
    // URL akses file di Firebase Storage
    const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filePath}`;
    req.file.firebaseStoragePublicUrl = publicUrl; // Menyimpan URL di objek file untuk digunakan lebih lanjut
    next(); // Melanjutkan ke middleware atau route berikutnya
  });
  // Event listener jika terjadi error saat upload
  blobStream.on("error", (err) => {
    console.log("Error uploading file to Firebase Storage:", err);
    res.status(500).send("Error uploading file to Firebase Storage");
  });
  blobStream.end(req.file.buffer); // Mengirim file ke Firebase Storage
};

module.exports = { upload, uploadToFirebase };
