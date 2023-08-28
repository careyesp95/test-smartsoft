const { Router } = require("express");
const controller = require("../controllers/ProductController.js");


const router = Router();

router.get("/", controller.getProducts);

router.post("/", controller.createProduct);

router.delete("/:name", controller.deleteProduct);

router.put("/:name", controller.updateProduct);

module.exports = router;
