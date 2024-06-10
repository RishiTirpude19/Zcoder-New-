const express = require("express");
const AC = require("../controller/auth-controller");
const router = express.Router({mergeParams : true});
const authMiddelware = require("../middleware/authMiddleware");

router.post("/signup" , AC.signup); //FRONTEND CREATED
router.post("/signin" , AC.signin); //FRONTEND CREATED
router.post("/logout" , authMiddelware , AC.logOut); //FRONTEND CREATED

module.exports = router;