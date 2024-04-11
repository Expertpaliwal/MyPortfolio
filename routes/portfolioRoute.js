const express = require("express");
const { sendEmailController } = require("../controllers/portfolioContoller");

//router object
const router = express.Router();

//routes
router.get("/sendEmail", sendEmailController);

// /export
module.exports = router;
