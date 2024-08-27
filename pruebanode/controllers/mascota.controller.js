const db = require("../models");

exports.listMascota = function (req, res) {
    db.mascotas.findAll({
        include: 'persona'
    }).then(mascotas => {
        res.render('mascotas/list.ejs', { mascotas: mascotas });
    });
}
exports.createMascota = async function (req, res) {
    const personas = await db.personas.findAll();
    res.render('mascotas/form.ejs', { mascota: null, personas });
}
exports.insertMascota = function (req, res) {
    db.mascotas.create({
        nombre: req.body.nombre,
        tipo: req.body.tipo,
        personaId: req.body.personaId
    }).then(() => {
        res.redirect('/mascotas');
    });
}
exports.editMascota = async function (req, res) {
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);
    const personas = await db.personas.findAll();

    res.render('mascotas/form.ejs', { mascota: mascota, personas });
}
exports.updateMascota = async function (req, res) {
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);

    mascota.nombre = req.body.nombre;
    mascota.tipo = req.body.tipo;
    mascota.personaId = req.body.personaId;
    await mascota.save();
    res.redirect('/mascotas');
}
exports.deleteMascota = async function (req, res) {
    const id = req.params.id;
    const mascota = await db.mascotas.findByPk(id);
    await mascota.destroy();
    res.redirect('/mascotas');
}