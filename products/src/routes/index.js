const { Router } = require('express');
const routerUser = require('./User.js');
const routerProducts = require('./Products.js');
const routerPurchase = require('./Purchase.js');

const {validateUser} = require('../middlewares/validateUser.js');

const router = Router();

router.use("/user",  routerUser)
router.use("/products",validateUser, routerProducts)
router.use("/purchase",validateUser, routerPurchase)


module.exports = router;