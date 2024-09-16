module.exports = app => {
    let router = require("express").Router();
    const controller =
        require("../controllers/persona.controller.js");

    router.get('/', controller.listPersona);
    router.get('/:id', controller.getPersonaById);
    router.post('/', controller.createPersona);
    router.put('/:id', controller.updatePersona);
    //TODO: Hacer patch
    // router.patch('/:id', controller.updatePersona);
    router.delete('/:id', controller.deletePersona);
    app.use('/personas', router);

};