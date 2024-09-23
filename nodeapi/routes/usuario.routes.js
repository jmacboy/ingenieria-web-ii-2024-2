module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/usuario.controller.js");

    router.get('/', controller.listUsuarios);
    app.use('/usuarios', router);

};