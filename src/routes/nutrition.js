var express = require('express');
var router = express.Router();
const { addDataToCollection } = require('../database/addData');

router.post('/', async (req, res, next) => {
    try {
        const data = req.body;
        if (!data.name) {
            return res.status(400).json({ message: "Name is required" });
        }
        const documentName = data.name;
        await addDataToCollection('nutrition', data, documentName);
        res.status(200).json({ message: "Data Added Successfully", data: data });
    } catch (error) {
        next(error);
    }
});

module.exports = router;