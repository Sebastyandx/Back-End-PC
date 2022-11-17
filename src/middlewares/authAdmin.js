const jwt = require('jsonwebtoken');
const { User } = require('../db')
const authAdmin = (permissions) => {
    try {
    return async (req,res,next) => {
            const authorization = req.get('authorization')
    if(!authorization) {return res.status(400).send("Not looged")}
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    decodedToken = jwt.verify(token, process.env.SECRET)
    // console.log(decodedToken)
    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'token missing or invalid'})
    }
    const {id: userId} = decodedToken
    req.userId = userId
    const userFound = await User.findByPk(userId)
    
    console.log('permisos',permissions)
    console.log('rol de user',userFound.role)
    if(permissions.includes(userFound.role)){
            next()
        } else {
            return res.status(404).json('Page not found')
        }
    }
        } catch (error) {
            // res.status(400).send(error.message)
            console.error(error)
        }
        
}

module.exports = { authAdmin }