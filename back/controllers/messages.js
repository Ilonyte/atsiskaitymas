const userSchema = require("../shemas/userSchema");

module.exports = {
  sendMessage: async (req, res) => {
    const { username, message, user } = req.body;

    let currentTime = new Date();

    await userSchema.findOneAndUpdate(
      { username: user },
      {
        $push: {
          messages: {
            message: message,
            from: username,
            time: currentTime.toLocaleTimeString(),
          },
        },
      }
    );

    await res.send({ message: "ok" });
  },

  deleteMessage: async (req, res) => {
    const { username, user } = req.body;

    let getter = await userSchema.findOne({ username: username });

    const newGetter = getter.messages.filter(
      (message) => message.from !== user
    );

    const changedUser = await userSchema.findOneAndUpdate(
      { username: username },
      { $set: { messages: newGetter } },
      { new: true }
    );

    return res.send({ message: "ok", user: changedUser });
  },
};
