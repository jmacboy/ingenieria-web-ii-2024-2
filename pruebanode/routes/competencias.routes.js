module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/competencia.controller.js");

    router.get("/", controller.listCompetencia);
    router.get("/create", controller.createCompetencia);
    router.post("/create", controller.insertCompetencia);
    router.get("/:id/edit", controller.editCompetencia);
    router.post("/:id/edit", controller.updateCompetencia);
    router.post("/:id/delete", controller.deleteCompetencia);
    router.get("/:id/participantes", controller.addParticipantes);
    router.post("/:id/participantes", controller.insertParticipantes);

    app.use('/competencias', router);

};