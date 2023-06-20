const bcrypt = require("bcrypt");
require("dotenv").config();
const jwt = require("jsonwebtoken");
const userSchema = require("../shemas/userSchema");

module.exports = {
  registration: async (req, res) => {
    const { username, password1, avatar } = req.body;

    const userExist = await userSchema.findOne({ username: username });

    if (userExist) {
      return res.send({ message: "User exist" });
    }

    const user = new userSchema({
      username: username,
      password: await bcrypt.hash(password1, +process.env.SALT),
      avatar: avatar,
    });

    await user.save();

    res.send({ message: "" });
  },

  login: async (req, res) => {
    const { username, password1 } = req.body;

    const user = await userSchema.findOne({ username: username });

    if (user) {
      if (bcrypt.compareSync(password1, user.password)) {
        const userToken = jwt.sign(
          { username: user.username },
          process.env.TOKEN_SECRET
        );
        return res.send({ message: "", user: user, userToken: userToken });
      } else {
        return res.send({ message: "Wrong password" });
      }
    } else {
      return res.send({ message: "No user" });
    }
  },
};
