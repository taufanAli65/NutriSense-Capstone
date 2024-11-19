var express = require("express");
var router = express.Router();
const { getData } = require("../database/getData");

/* GET home page. */
router.get("/", async (req, res, next) => {
  try {
    const data = await getData("nutrition");
    if (data) {
      res.status(200).json({ message: "Get Data Success", data: data });
    } else {
      res.status(404).json({ message: "No data found" });
    }
  } catch (error) {
    next(error);
  }
});

module.exports = router;
