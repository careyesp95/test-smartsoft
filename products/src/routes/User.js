const { Router } = require("express");
const controller = require("../controllers/AuthController.js");

const router = Router();

router.post("/auth", controller.singUp);

router.delete("/:name", controller.eliminarUsuario);

router.put("/:name", controller.actualizarUsuario);


module.exports = router;
