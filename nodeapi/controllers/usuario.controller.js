const db = require("../models");
const { isRequestValid } = require("../utils/request.utils");

exports.listUsuarios = async (req, res) => {
    try {
        const usuarios = await db.usuarios.findAll();
        res.json(usuarios);
    } catch (error) {
        sendError500(error);
    }
}