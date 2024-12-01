var express = require("express");
var router = express.Router();
const { addDataToCollection, validateDataID } = require("../database/addData");
const { getDataByID } = require("../database/getData");
const { authenticateToken } = require("../middleware/auth");

router.post("/", authenticateToken, async (req, res, next) => {
  try {
    const data = req.body;
    const dataID = data.name;
    if (!data.name) {
      return res.status(400).json({ message: "Name is required" });
    };
    await addDataToCollection("nutrition", data, dataID);
    res.status(200).json({ message: "Data Added Successfully", data: data });
  } catch (error) {
    next(error);
  };
});

router.get("/:id", authenticateToken, async (req, res, next) => {
  try {
    const id = req.params.id;
    const data = await getDataByID('nutrition', id);
    res.status(200).json({ message: "Get Data Success", data: data });
  } catch (error) {
    next(error);
  };
});

module.exports = router;
