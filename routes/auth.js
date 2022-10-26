const express = require("express");
const { register, login, getMe, forgotPassword, resetPassword, updateDetails, updatePassword, logout } = require("../controllers/auth");
const router = express.Router();

const {protect} = require("../middleware/auth");

router.post("/register", register);
router.post("/login", login);
router.get("/me", protect, getMe);
router.put("/updatedetails", protect, updateDetails);
router.post("/forgotpassword", forgotPassword);
router.put("/resetpassword/:resettoken", resetPassword);
router.put("/updatepassword", protect, updatePassword);
router.get("/logout", logout);

module.exports = router;