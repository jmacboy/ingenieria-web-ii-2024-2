const db = require("../models")

exports.listPersona = async (req, res) => {
    const personas = await db.personas.findAll();
    res.json(personas);
}
exports.createPersona = async (req, res) => {
    const persona = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: req.body.edad,
        ciudad: req.body.ciudad,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero,
        usuarioId: req.body.usuarioId
    }
    const personaCreada = await db.personas.create(persona);
    res.json(personaCreada);
}