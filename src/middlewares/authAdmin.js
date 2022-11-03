const jwt = require('jsonwebtoken');

const authAdmin = (permissions) => {
    try {
    return (req,res,next) => {
            const authorization = req.get('authorization')
    // console.log(authorization)
    if(authorization && authorization.toLowerCase().startsWith('bearer')){
        token = authorization.substring(7)
    }
    let decodedToken = {}
    decodedToken = jwt.verify(token, process.env.SECRET)
    console.log(decodedToken)
    if(!token || !decodedToken.id){
        return res.status(401).json({ error: 'token missing or invalid'})
    }
    const {id: userId, role} = decodedToken
    req.userId = userId
    
    if(permissions.includes(role)){
            next()
        } else {
            return res.status(404).json('Page not found')
        }
    }
        } catch (error) {
            res.status(400).send(error.message)
        }
        
}

module.exports = { authAdmin }