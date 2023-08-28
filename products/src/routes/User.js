const { Router } = require("express");
const controller = require("../controllers/AuthController.js");

const router = Router();

router.get("/", controller.getAllUsers);

router.post("/auth", controller.singUp);

router.delete("/:name", controller.deleteUser);

router.put("/:name", controller.updateUser);


module.exports = router;
