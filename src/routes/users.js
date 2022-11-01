const router = require('express').Router();
const bcrypt = require('bcrypt');
const { User } = require('../db.js');

router.post('/', async (req,res) => {
    try {
        const { first_name, last_name, username, password, email, 
            date_of_birth, phone_number, zip_code, address, city } = req.body;
            const saltRounds = 10
            const passwordHash = await bcrypt.hash(password, saltRounds)
        const userCreated = await User.create({ 
                firstName: first_name, 
                lastName: last_name,
                userName:  username,
                passwordHash: passwordHash, 
                email: email, 
                birthday: date_of_birth, 
                phone: phone_number, 
                zipcode: zip_code, 
                address: address,
                city: city
            })
        res.status(200).json(userCreated)
    } catch (error) {
        res.status(400).send(error)
    }
})

router.get('/', async (req, res) => {
    try {
        const allUsers = await User.findAll()
        res.json(allUsers)
    } catch (error) {
        res.send(error)
    }
})

module.exports = router