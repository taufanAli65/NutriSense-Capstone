var express = require("express");
var router = express.Router();
var { addDataToCollection } = require("../database/addData");
var { getDataByID, getDataByDate, generateDateString } = require("../database/getData");
var { authenticateToken } = require("../middleware/auth");
var { editData } = require("../database/editData");
var { db } = require("../database/config");

router.post("/", authenticateToken, async (req, res) => {
  try {
    const data = req.body;
    const dataName = data.name;
    if (!data.name) {
      return res.status(400).json({ message: "Name is required" });
    }
    const dataToSend = await addDataToCollection(
      req,
      "nutrition",
      data,
      dataName
    );
    res
      .status(200)
      .json({ message: "Data Added Successfully", data: dataToSend });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getDataByID("nutrition", id);
    res.status(200).json({ message: "Get Data Success", data: data });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.put("/:id", authenticateToken, async (req, res) => {
  try {
    const dataToUpdate = req.body;
    const id = req.params.id;
    await editData(id, dataToUpdate);
    res.status(200).json({message: "Data Successfuly Updated", data_added: dataToUpdate });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
});

router.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const deleteData = await db.collection('nutrition').doc(`${id}`).delete();
    res.status(200).json({message: "Data Deleted Successfuly"});
  } catch (error) {
    res.status(500).json({message: "Internal Server Error", error: error.message});
  }
})

router.get("/:foods/:year/:month?/:week?/:day?", authenticateToken, async (req, res) => {
  try {
    const foods = decodeURIComponent(req.params.foods);  // Decode nama makanan
    const year = req.params.year;
    const month = req.params.month || '00';  // Defaultkan ke '00' jika tidak ada bulan
    const day = req.params.day || '00';      // Defaultkan ke '00' jika tidak ada hari

    // Tentukan format tanggal berdasarkan parameter yang diberikan
    const date = generateDateString(year, month, day);

    // Mengambil data berdasarkan parameter tanggal yang ditentukan
    const data = await getDataByDate(req, "nutrition", foods, date);
    res.status(200).json({ message: "Get Data Success", data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
