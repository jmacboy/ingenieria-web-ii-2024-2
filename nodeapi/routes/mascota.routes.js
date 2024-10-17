const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware,js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/mascota.controller.js");

    router.get('/', userRequiredMiddleware, controller.listMascota);
    router.get('/:id', userRequiredMiddleware, controller.getMascotaById);
    router.post('/', userRequiredMiddleware, controller.createMascota);
    router.put('/:id', userRequiredMiddleware, controller.updateMascotaPut);
    router.patch('/:id', userRequiredMiddleware, controller.updateMascotaPatch);
    router.delete('/:id', userRequiredMiddleware, controller.deleteMascota);
    app.use('/mascotas', router);

};