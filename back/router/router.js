const express = require("express");
const router = express.Router();
const auth = require("../controllers/auth");
const user = require("../controllers/user");
const inputConfirm = require("../middleware/inputConfirm");
const getUser = require("../middleware/getUser");
const messages = require("../controllers/messages");

router.get("/getUsers", user.getUsers);
router.get("/getUserData", getUser, user.getUserData);
router.post("/singleUser", user.singleUser);
router.post("/sendMessage", getUser, messages.sendMessage);
router.post("/deleteMessage", getUser, messages.deleteMessage);
router.post("/usernameUpdate", getUser, user.usernameUpdate);
router.post("/registration", inputConfirm, auth.registration);
router.post("/login", inputConfirm, auth.login);
router.post("/avatarUpdate", getUser, user.avatarUpdate);
router.post("/passwordUpdate", getUser, user.passwordUpdate);

module.exports = router;
