const { Product, Purchase } = require("../data/index.js");


const getAllPurchases = async (req, res, next) => {
    try{
        let purchases = await Purchase.findAll({
            include: [{ model: Product, as: "products" }]
        });
        if(purchases.length > 0){
            res.status(202).send(purchases);
        }else{
            res.status(404).send("No hay compras en la base de datos");
        }
    }catch(err){
        next(err);
    }
}

const MakePurchase = async (req, res, next) => {
    try{
        const {id, total} = req.body;
        let datePurchases = new Date();
        
        if(!total) return res.status(404).send("Faltan datos de la compra");
        let newPurchase = await Purchase.create({
            total: total,
            purchaseDate: datePurchases
        });
        let productPay = await Product.findOne({ where:{id:id}});
        const user = req.user;
        let userFound = user.name;
        await newPurchase.addProduct(productPay);
        res.status(202).json({
            message:"La compra se ha realizado exitosamente",
            "Compra realizada por":userFound,
            newPurchase
        });
    }catch(err){
        next(err);
    }

}

const deletePurchase = async (req, res, next) => {
    try{
        const { id } = req.params;
        console.log("compra que se elimina",id);
        if(id){
            let existsInDB = await Purchase.findOne({
                where: {
                    id,
                },
            });
            if (existsInDB) {
                Purchase.destroy({
                    where: {
                        id,
                    },
                });
                return res.status(202).send("La compra ha sido eliminada de la base de datos exitosamente");
            }else {
                res.status(404).send("La compra no existe en la base de datos")
            }
        }else {
            res.status(404).send("La compra que intenta eliminar no machea en la base de datos")
        }
    }catch(err){
        next(err);
    }
}

module.exports = {
    getAllPurchases,
    MakePurchase,
    deletePurchase
}