const db = require("../models");
const { formatDate } = require("../utils/date.utils");

exports.listPersona = function (req, res) {
    db.personas.findAll({
        include: 'mascotas'
    }).then(personas => {
        res.render('personas/list.ejs', { personas: personas });
    });
}
exports.createPersona = function (req, res) {
    res.render('personas/form.ejs', { persona: null });
}
exports.insertPersona = function (req, res) {
    db.personas.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        ciudad: req.body.ciudad,
        edad: req.body.edad,
        fechaNacimiento: req.body.fechaNacimiento,
        genero: req.body.genero
    }).then(() => {
        res.redirect('/personas');
    });
}
exports.editPersona = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    const fechaFormateada = formatDate(persona.fechaNacimiento);
    res.render('personas/form.ejs', { persona: persona, fechaFormateada: fechaFormateada });
}
exports.updatePersona = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);

    persona.nombre = req.body.nombre;
    persona.apellido = req.body.apellido;
    persona.ciudad = req.body.ciudad;
    persona.edad = req.body.edad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    persona.genero = req.body.genero;
    await persona.save();
    res.redirect('/personas');
}
exports.deletePersona = async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    await persona.destroy();
    res.redirect('/personas');
}