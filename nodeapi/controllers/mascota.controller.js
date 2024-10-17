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
exports.listMascota = async (req, res) => {
    try {
        const mascotas = await db.mascotas.findAll({
            include: ['persona']
        });
        res.json(mascotas);
    } catch (error) {
        sendError500(error);
    }
}

exports.getMascotaById = async (req, res) => {
    const id = req.params.id;
    try {
        const mascota = await getMascotaOr404(id, res);
        if (!mascota) {
            return;
        }
        res.json(mascota);
    } catch (error) {
        sendError500(error);
    }
}

exports.createMascota = async (req, res) => {

    const requiredFields = ['nombre', 'tipo', 'personaId'];
    if (!isRequestValid(requiredFields, req.body, res)) {
        return;
    }
    try {

        const mascota = {
            nombre: req.body.nombre,
            tipo: req.body.tipo,
            personaId: req.body.personaId
        }
        const mascotaCreada = await db.mascotas.create(mascota);

        res.status(201).json(mascotaCreada);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateMascotaPatch = async (req, res) => {
    const id = req.params.id;
    try {
        const mascota = await getMascotaOr404(id, res);
        if (!mascota) {
            return;
        }
        mascota.nombre = req.body.nombre || mascota.nombre;
        mascota.tipo = req.body.tipo || mascota.tipo;
        mascota.personaId = req.body.personaId || mascota.personaId;

        await mascota.save();
        res.json(mascota);
    } catch (error) {
        sendError500(error);
    }
}
exports.updateMascotaPut = async (req, res) => {
    const id = req.params.id;
    try {
        const mascota = await getMascotaOr404(id, res);
        if (!mascota) {
            return;
        }
        const requiredFields = ['nombre', 'tipo', 'personaId'];
        if (!isRequestValid(requiredFields, req.body, res)) {
            return;
        }
        mascota.nombre = req.body.nombre;
        mascota.tipo = req.body.tipo;
        mascota.personaId = req.body.personaId;

        await mascota.save();

        res.json(mascota);
    } catch (error) {
        sendError500(error);
    }
}
exports.deleteMascota = async (req, res) => {
    const id = req.params.id;
    try {
        const mascota = await getMascotaOr404(id, res);
        if (!mascota) {
            return;
        }
        await mascota.destroy();
        res.json({
            msg: 'Mascota eliminada correctamente'
        });
    } catch (error) {
        sendError500(error);
    }
}

async function getMascotaOr404(id, res) {
    const mascota = await db.mascotas.findByPk(id, {
        include: ['persona']
    });
    if (!mascota) {
        res.status(404).json({
            msg: 'Mascota no encontrada'
        });
        return;
    }
    return mascota;
}