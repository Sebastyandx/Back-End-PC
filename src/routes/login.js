const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = require("express").Router();
const { User } = require("../db");
const {authAdmin} = require('../middlewares/authAdmin.js');

router.get("/name", authAdmin(["user"]), async(req,res) => {
  try {
    const { userId } = req

    console.log(userId)
    
    const userFound = await User.findByPk(userId)

    console.log(userFound)

    res.status(200).json(userFound)

  } catch (error) {
    res.status(400).json(error.message)
  }
})

router.post("/", async (req, res) => {
  try {
    const { username, pass } = req.body;
    const user = await User.findOne({ where: { userName: username } });
    const passwordCorrect =
      user === null ? false : await bcrypt.compare(pass, user.passwordHash);

    if (!(user && passwordCorrect)) {
      return res.status(401).json({ error: "invalid user or password" });
    }

    const userToken = {
      id: user.id,
      username: user.username,
    };

    const token = jwt.sign(userToken, process.env.SECRET, {
      expiresIn: 60 * 60 * 24 * 7,
    });

    return res.json({
      firstName: user.firstName,
      userName: user.userName,
      token,
    });
  } catch (error) {
    res.status(400).json(error);
  }
});

router.post("/find", async (req, res) => {
  const { token } = req.body;
  try {
    let decodedToken = {};
    decodedToken = jwt.verify(token, process.env.SECRET);
    const { id } = decodedToken;
    const userId = await User.findByPk(id);
    res.status(200).json(userId);
  } catch (error) {
    res.json({ error: "Error al encontrar usuario" });
  }
});

module.exports = router;
