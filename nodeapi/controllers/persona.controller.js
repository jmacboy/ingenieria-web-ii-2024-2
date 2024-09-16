const db = require("../models")
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listPersona = async (req, res) => {
    const personas = await db.personas.findAll();
    res.json(personas);
}

exports.getPersonaById = async (req, res) => {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return;
    }
    res.json(persona);
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
    res.status(201).json(personaCreada);
}
exports.updatePersona = async (req, res) => {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return;
    }

    persona.nombre = req.body.nombre;
    persona.apellido = req.body.apellido;
    persona.edad = req.body.edad;
    persona.ciudad = req.body.ciudad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    persona.genero = req.body.genero;
    persona.usuarioId = req.body.usuarioId;

    await db.personas.update(persona, {
        where: { id: id }
    });
    res.json(persona);
}
exports.deletePersona = async (req, res) => {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return;
    }
    await persona.destroy();
    res.json({
        msg: 'Persona eliminada correctamente'
    });
}