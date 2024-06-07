const express = require("express");
const AC = require("../controller/auth-controller");
const router = express.Router({mergeParams : true});
const authMiddelware = require("../middleware/authMiddleware");

router.post("/signup" , AC.signup);
router.post("/signin" , AC.signin);
router.post("/logout" , authMiddelware , AC.logOut);

module.exports = router;