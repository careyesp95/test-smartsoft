const jwt = require('jsonwebtoken');
const { SECRET_KEY} = process.env;

const tokenGenerator = async (name) => {
    return jwt.sign({name},SECRET_KEY, {expiresIn: '1h'});
}



module.exports = { tokenGenerator };