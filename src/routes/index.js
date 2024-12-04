var express = require("express");
var router = express.Router();
const { getData } = require("../database/getData");
const { authenticateToken } = require("../middleware/auth");

/* GET home page. */
router.get("/", authenticateToken, async (req, res) => {
  try {
    const data = await getData(req, "nutrition");
    if (data) {
      res.status(200).json({ message: "Get Data Success", data: data });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
