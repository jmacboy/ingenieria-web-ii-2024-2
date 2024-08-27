module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/mascota.controller.js");

    router.get("/", controller.listMascota);
    router.get("/create", controller.createMascota);
    router.post("/create", controller.insertMascota);
    router.get("/:id/edit", controller.editMascota);
    router.post("/:id/edit", controller.updateMascota);
    router.post("/:id/delete", controller.deleteMascota);

    app.use('/mascotas', router);

};