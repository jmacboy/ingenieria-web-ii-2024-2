module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/persona.controller.js");

    router.get("/", controller.listPersona);
    router.get("/create", controller.createPersona);
    router.post("/create", controller.insertPersona);
    router.get("/:id/edit", controller.editPersona);
    router.post("/:id/edit", controller.updatePersona);
    router.post("/:id/delete", controller.deletePersona);
    router.get("/:id/profile", controller.uploadProfileGet);
    router.post("/:id/profile", controller.uploadProfilePost);

    app.use('/personas', router);

};