const { Router } = require("express");
const controller = require("../controllers/PurchaseController.js");


const router = Router();

router.get("/", controller.getAllPurchases);

router.post("/", controller.MakePurchase);

router.delete("/:id", controller.deletePurchase);


module.exports = router;
