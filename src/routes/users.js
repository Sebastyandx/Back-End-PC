const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User } = require("../db.js");
const { transporter, infoTransporter } = require("../config/mailer");

router.post("/signup", async (req, res) => {
  try {
    const {
      first_name,
      last_name,
      username,
      password,
      email,
      date_of_birth,
      phone_number,
      zip_code,
      address,
      city,
      show,
      role,
      picture,
    } = req.body;
    const saltRounds = 10;
    const passwordHash = await bcrypt.hash(password, saltRounds);
    const userCreated = await User.create({
      firstName: first_name,
      lastName: last_name,
      userName: username,
      passwordHash: passwordHash,
      email: email,
      birthday: date_of_birth,
      phone: phone_number,
      zipcode: zip_code,
      address: address,
      city: city,
      show,
      role: role
    });
    
    await userCreated.save();
    
    await infoTransporter(
      "gonzalogaete602@gmail.com",
      email,
      "Bienvenido a GamerTech",
      `<h2>Te haz registrado en GamerTech, Felicidades!</h2>`
    );

    res.status(200).json(userCreated);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    const allUsers = await User.findAll();
    res.json(allUsers);
  } catch (error) {
    res.send(error);
  }
});

router.put("/:id", async (req,res)=>{
  try{
    const {
      first_name,
      last_name,
      username,
      password,
      email,
      date_of_birth,
      phone_number,
      zip_code,
      address,
      city,
      show,
      role,
    } = req.body;
    const {id} = req.params;
    User.update(
      {
        first_name,
        last_name,
        username,
        password,
        email,
        date_of_birth,
        phone_number,
        zip_code,
        address,
        city,
        show,
        role,
      }, 
        {where: {id}}
    ).then(e => {
      res.status(200).send("usuario modificado")
    })
  }catch(error){
    res.send('error')
  }
})

module.exports = router;
