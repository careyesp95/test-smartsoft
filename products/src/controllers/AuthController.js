const { UUID, UUIDV4 } = require("sequelize");
const { User, Purchase } = require("../data/index.js");
const { tokenGenerator } = require("../utils/index.js");


const getAllUsers = async (req, res, next) => {
    try {
        let users = await User.findAll({
            include: [{ model: Purchase, as: "purchases" }]
        });
        if (users.length > 0) {
            res.status(202).send(users);
        } else {
            res.status(404).send("No hay usuarios en la base de datos");
        }
    } catch (err) {
        next(err);
    }
}


const singUp = async (req, res, next) => {
    let { name, password, money } = req.body;
    if (name && password && money ) {
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
                
                let newPurchase = await Purchase.findAll();
                await newUser.addPurchase(newPurchase);
                
                res.header("auth-token", accessToken).json({ 
                    status:201,
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
        res.status(404).send({ msg: "Faltan datos de usuario"});
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

const deleteUser = async (req, res, next) => {
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
            return res.status(202).send("El usuario ha sido eliminado de la base de datos exitosamente");
        } else throw new Error("ERROR 500: El usuario no existe en la base de datos");
    } catch (err) {
        next(err);
    }
}

const updateUser = async (req, res, next) => {
    const { name } = req.params;
    const { password, money } = req.body;
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
                    money,
                    name
                },
                {
                    where: {
                        name,
                    },
                }
            );
            return res.status(202).send("El usuario ha sido modificado exitosamente");
        } else throw new Error("ERROR 500: El usuario no existe en la base de datos");
    } catch (err) {
        next(err);
    }    
}

module.exports = {
    getAllUsers,
    singUp,
    deleteUser,
    updateUser,
    singIn
}
