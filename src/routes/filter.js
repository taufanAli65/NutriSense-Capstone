var express = require("express");
var router = express.Router();
const {
  getDataByDate,
  getDataByWeek,
  getDataByMonth,
  getDataByYear
} = require("../database/filter");
const { getUserID } = require("../database/auth");
const { authenticateToken } = require("../middleware/auth");

router.get("/", authenticateToken, async (req, res) => {
  try {
    const userID = await getUserID(req);
    const { month, week, date, year } = req.query;
    let data;

    if (date) {
      // Jika parameter date diberikan
      data = await getDataByDate(userID, date);
    } else if (month && week) {
      // Jika parameter month dan week diberikan
      data = await getDataByWeek(userID, parseInt(month), parseInt(week));
    } else if (month) {
      // Jika hanya parameter month yang diberikan
      data = await getDataByMonth(userID, parseInt(month));
    } else if (year) {
      // Jika parameter year diberikan
      data = await getDataByYear(userID, parseInt(year));
    } else {
      return res.status(400).json({ error: "Invalid parameters" });
    }

    res.status(200).json({message: "Data Fetched Successfuly", data: data });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;