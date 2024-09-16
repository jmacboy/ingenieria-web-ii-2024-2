module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/persona.controller.js");

    router.get('/', controller.listPersona);
    router.post('/', controller.createPersona);
    app.use('/personas', router);

};