const userSchema = require("../shemas/userSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

module.exports = {
  getUsers: async (req, res) => {
    const users = await userSchema.find();
    res.send({ users: users });
  },

  getUserData: async (req, res) => {
    const { username } = req.body;
    const user = await userSchema.findOne({ username: username });
    res.send({ user: user });
  },

  singleUser: async (req, res) => {
    const { username } = req.body;
    const user = await userSchema.findOne({ username: username });
    res.send({ user: user });
  },

  avatarUpdate: async (req, res) => {
    const { username, avatar } = req.body;

    const user = await userSchema.findOneAndUpdate(
      { username: username },
      { $set: { avatar: avatar } },
      { new: true }
    );

    res.send({ message: "ok", user: user });
  },

  passwordUpdate: async (req, res) => {
    const { username, password } = req.body;

    if (password.length < 4 || password.length > 20) {
      return res.send({ message: "bad password" });
    }

    const smb = ["(", "!", "@", "#", "$", "%", "^", "&", "*", "_", "+", ")"];

    let symbolExist = false;

    smb.forEach((symbol) => {
      if (password.includes(symbol)) {
        symbolExist = true;
      }
    });

    if (symbolExist === false) {
      return res.send({ message: "password need symbol" });
    }

    const newPassword = await bcrypt.hash(password, +process.env.SALT);

    await userSchema.findOneAndUpdate(
      { username: username },
      { $set: { password: newPassword } }
    );
    res.send({ message: "ok" });
  },

  usernameUpdate: async (req, res) => {
    const { username, username2 } = req.body;

    const usernameExist = await userSchema.findOne({ username: username2 });

    if (usernameExist) {
      return res.send({ message: "Username taken" });
    }

    const user = await userSchema.findOneAndUpdate(
      { username: username },
      { $set: { username: username2 } },
      { new: true }
    );

    const userToken = jwt.sign(
      { username: user.username },
      process.env.TOKEN_SECRET
    );

    res.send({ message: "ok", user: user, token: userToken });
  },
};
