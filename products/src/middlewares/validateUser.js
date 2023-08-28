const jwt = require('jsonwebtoken');
const { SECRET_KEY} = process.env;


const validateUser = async (req, res,next) => {
    try{
        const accessToken = req.header('auth-token');
        if(!accessToken){
            res.status(404).send('Acceso denegado')
        }
        jwt.verify(accessToken, SECRET_KEY, async (err, user) => {
            if(err){
                res.status(404).send('Token no es valido o ha expirado')
            }else{
                req.user = user;
                next();
            }
        })
    }catch(err){
        next(err);
    }

}

module.exports = {
    validateUser

};