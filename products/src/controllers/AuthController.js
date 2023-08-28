const { User } = require("../data/index.js");
const { tokenGenerator } = require("../utils/index.js");


const singUp = async (req, res, next) => {
    const { name, password, money } = req.body;
    if (name && password && money) {
        try {
            let nameUser = await User.findOne({ where: { 
                name: name,
                 }});
            if(!nameUser) {
                const accessToken = await tokenGenerator(name);
                let newUser = await User.create({
                    name: name,
                    password: password,
                    money: money,
                    token:accessToken
                    
                })
                
                res.header("auth-token", accessToken).json({ 
                    message: "Usuario creado exitosamente", 
                    accessToken: accessToken, 
                    user: newUser 
                });
            }else{
                return res.status(404).send("El usuario ya existe en la base de datos")
            }
        } catch (err) {
            next(err);
        }
    } else {
        res.status(404).send({ msg: "Faltan sus datos de usuario"});
    }
}

const singIn = async (req, res, next) => {
    try{
        const {name} = req.body;
        const userLogin = await User.findOne(name)
        if(!userLogin) return res.status(404).send("El usuario no se ha loggeado")
        const accessToken = await tokenGenerator(name);
        res.status(200).send({accessToken: accessToken})
        next();
    }catch(err){
        next(err);
    }
}

const eliminarUsuario = async (req, res, next) => {
    const { name } = req.params;
    try {
        let existsInDB = await User.findOne({
            where: {
                name,
            },
        });
        if (existsInDB) {
            User.destroy({
                where: {
                    name,
                },
            });
            return res.status(200).send("El usuario ha sido eliminado de la base de datos exitosamente");
        } else throw new Error("ERROR 500: El usuario no existe en la base de datos");
    } catch (err) {
        next(err);
    }
}

const actualizarUsuario = async (req, res, next) => {
    const { name } = req.params;
    const { password } = req.body;
    try {
        let existsInDB = await User.findOne({
            where: {
                name,
            },
        });
        if (existsInDB) {
            User.update(
                {
                    password,
                },
                {
                    where: {
                        name,
                    },
                }
            );
            return res.status(200).send("El usuario ha sido modificado exitosamente");
        } else throw new Error("ERROR 500: El usuario no existe en la base de datos");
    } catch (err) {
        next(err);
    }    
}

module.exports = {
    singUp,
    eliminarUsuario,
    actualizarUsuario,
    singIn
}
