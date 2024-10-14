const { userRequiredMiddleware } = require("../middlewares/userRequiredMiddleware,js");

module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/persona.controller.js");

    router.get('/', userRequiredMiddleware, controller.listPersona);
    router.get('/:id', userRequiredMiddleware, controller.getPersonaById);
    router.post('/', userRequiredMiddleware, controller.createPersona);
    router.put('/:id', userRequiredMiddleware, controller.updatePersonaPut);
    router.patch('/:id', userRequiredMiddleware, controller.updatePersonaPatch);
    router.delete('/:id', userRequiredMiddleware, controller.deletePersona);
    router.post('/:id/foto', userRequiredMiddleware, controller.uploadPicture);
    app.use('/personas', router);

};