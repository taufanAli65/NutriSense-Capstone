var express = require("express");
var router = express.Router();
const { addDataToCollection, validateDataID } = require("../database/addData");
const { getDataByID, getDataByDate } = require("../database/getData");
const { authenticateToken } = require("../middleware/auth");

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
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/:id", authenticateToken, async (req, res) => {
  try {
    const id = req.params.id;
    const data = await getDataByID("nutrition", id);
    res.status(200).json({ message: "Get Data Success", data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

router.get("/date/:date", authenticateToken, async (req, res) => {
  try {
    const date = req.params.date;
    const data = await getDataByDate(req, "nutrition", date);
    res.status(200).json({ message: "Get Data Success", data: data });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
