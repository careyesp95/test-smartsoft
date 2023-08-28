const { Product} = require("../data/index.js");

const getProducts = async (req, res, next) => {
    try {
        const products = await Product.findAll();
        if(products.length < 1){
            res.status(404).send("No hay productos en la base de datos")
        }else{
            res.status(200).send(products);
        }
    }catch(err){
        next(err);
    }
}

const crearProducto = async (req, res, next) => {
    const { name, category, price, quantity } = req.body;
    if (name && category && price && quantity) {
        try {
            const newProduct = await Product.create({
                name: name,
                category: category,
                price: price,
                quantity: quantity
            });
            return res.send(
                await Product.findByPk(newProduct.id)
            ); 
        } catch (err) {
            next(err);
        }
    } else {
        res.status(404).send({ msg: "Faltan datos de el producto"});
    }
}

const deleteProduct = async (req, res, next) => {
    try {
        const { name } = req.params;
        if(name){

            let existsInDB = await Product.findOne({
                where: {
                    name,
                },
            });
            if (existsInDB) {
                Product.destroy({
                    where: {
                        name,
                    },
                });
                return res.status(200).send("El producto ha sido eliminado de la base de datos exitosamente");
            }else {
                res.status(404).send("El producto no existe en la base de datos")
            }
        }else {
            res.status(404).send("El producto que intenta eliminar no machea en la base de datos")
        }
    } catch (err) {
        next(err);
    }
}

const actualizarProducto = async (req, res, next) => {
    const { name } = req.params;
    const { category, price, quantity } = req.body;
    try {
        if(!name || !category || !price || !quantity) return res.status(404).send("Faltan datos de el producto");

        let existsInDB = await Product.findOne({
            where: {
                name,
            },
        });
        if (existsInDB) {
            Product.update(
                {
                    category,
                    price,
                    quantity
                },
                {
                    where: {
                        name,
                    },
                }
            );
            return res.status(200).send("El producto ha sido modificado exitosamente");
        } else {
            res.status(404).send("El producto no existe en la base de datos")
        }
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProducts,
    crearProducto,
    deleteProduct,
    actualizarProducto
}