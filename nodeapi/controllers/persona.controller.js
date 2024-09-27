const db = require("../models");
const { isRequestValid, sendError500 } = require("../utils/request.utils");
// Estados del servidor
//200 -> ok
//201 -> creado
//400 -> validaciones
//401 -> no autorizado
//403 -> prohibido
//404 -> no encontrado
//500 -> errores del servidor
exports.listPersona = async (req, res) => {
    try {
        const personas = await db.personas.findAll({
            include: ['usuario']
        });
        res.json(personas);
    } catch (error) {
        sendError500(error);
    }
}

exports.getPersonaById = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        res.json(persona);
    } catch (error) {
        sendError500(error);
    }
}

exports.createPersona = async (req, res) => {

    const requiredFields = ['nombre', 'apellido', 'edad', 'ciudad', 'fechaNacimiento', 'genero', 'usuarioId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

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
    } catch (error) {
        sendError500(error);
    }
}
exports.updatePersonaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        persona.nombre = req.body.nombre || persona.nombre;
        persona.apellido = req.body.apellido || persona.apellido;
        persona.edad = req.body.edad || persona.edad;
        persona.ciudad = req.body.ciudad || persona.ciudad;
        persona.fechaNacimiento = req.body.fechaNacimiento || persona.fechaNacimiento;
        persona.genero = req.body.genero || persona.genero;
        persona.usuarioId = req.body.usuarioId || persona.usuarioId;

        await persona.save();
        res.json(persona);
    } catch (error) {
        sendError500(error);
    }
}
exports.updatePersonaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        const requiredFields = ['nombre', 'apellido', 'edad', 'ciudad', 'fechaNacimiento', 'genero', 'usuarioId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        persona.nombre = req.body.nombre;
        persona.apellido = req.body.apellido;
        persona.edad = req.body.edad;
        persona.ciudad = req.body.ciudad;
        persona.fechaNacimiento = req.body.fechaNacimiento;
        persona.genero = req.body.genero;
        persona.usuarioId = req.body.usuarioId;

        await persona.save();

        res.json(persona);
    } catch (error) {
        sendError500(error);
    }
}
exports.deletePersona = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        await persona.destroy();
        res.json({
            msg: 'Persona eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}
exports.uploadPicture = async (req, res) => {
    const id = req.params.id;
    try {
        const persona = await getPersonaOr404(id, res);
        if (!persona) {
            return;
        }
        if (!req.files) {
            res.status(400).json({
                msg: 'No se ha enviado el archivo'
            });
            return;
        }
        const file = req.files.fotoPerfil;
        const fileName = persona.id + '.jpg';
        file.mv(`public/personas/${fileName}`);
        await persona.save();
        res.json(persona);
    } catch (error) {
        sendError500(error);
    }
}
async function getPersonaOr404(id, res) {
    const persona = await db.personas.findByPk(id);
    if (!persona) {
        res.status(404).json({
            msg: 'Persona no encontrada'
        });
        return;
    }
    return persona;
}