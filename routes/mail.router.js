const express = require("Express");
const router = express.Router();
const { sendMail } = require("../controllers/mail.controller");

router.post("/", sendMail);

module.exports = router;
