const { Router } = require('express');
const routerUser = require('./User.js');
const routerProducts = require('./Products.js');
const {validateUser} = require('../middlewares/validateUser.js');

const router = Router();

router.use("/user",  routerUser)
router.use("/products",validateUser, routerProducts)


module.exports = router;