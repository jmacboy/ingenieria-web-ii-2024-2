const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware,js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/usuario.controller.js");

    router.get('/', userRequiredMiddleware, controller.listUsuarios);
    router.get('/:id', userRequiredMiddleware, controller.getUsuarioById);
    router.post('/', controller.createUsuario);
    router.put('/:id', userRequiredMiddleware, controller.updateUsuarioPut);
    router.patch('/:id', userRequiredMiddleware, controller.updateUsuarioPatch);
    router.delete('/:id', userRequiredMiddleware, controller.deleteUsuario);
    app.use('/usuarios', router);

};