module.exports = async (req, res, next) => {
  const { username, password1, password2 } = req.body;

  if (username.length < 4 || username.length > 20) {
    return res.send({ message: "Wrong username length" });
  }

  if (password2 && password1 !== password2) {
    return res.send({ message: "Passwords doesn't match" });
  }

  if (password1.length < 4 || password1.length > 20) {
    return res.send({ message: "Wrong password length" });
  }

  const smb = ["(", "!", "@", "#", "$", "%", "^", "&", "*", "_", "+", ")"];

  let symbolExist = false;

  smb.forEach((symbol) => {
    if (password1.includes(symbol)) {
      symbolExist = true;
    }
  });

  if (symbolExist === false) {
    return res.send({ message: "Password need symbol" });
  }

  next();
};
