const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');
const router = require('express').Router();

const { User } = require('../db');


router.post('/', async (req,res) => {
    
    try {
        const { username, pass } = req.body
        const user = await User.findOne({where: { userName: username }})
        const passwordCorrect = user === null 
        ? false 
        : await bcrypt.compare(pass, user.passwordHash)
        
        if (!(user && passwordCorrect) ){
            res.status(401).json({error: 'invalid user or password'})
        }

        const userToken = {
            id: user.id,
            username: user.username
        }

        const token = jwt.sign(userToken, process.env.SECRET, 
            { 
                expiresIn: 60 * 60 * 24 * 7
            })
    
        res.json({
            firstName: user.firstName,
            userName: user.userName,
            token
        })
        
    } catch (error) {
        res.status(400).json(error)
    }
})

module.exports = router
