const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');
app.use(express.static('public'));

const db = require("./models");
const { formatDate } = require('./utils/date.utils');
db.sequelize.sync().then(() => {
    console.log("db resync");
});

app.get('/', function (req, res) {
    // eslint-disable-next-line no-undef
    res.sendFile(__dirname + '/views/index.html')
})
app.get('/holamundo', function (req, res) {
    res.send('Hola Mundo')
})
app.post('/respuesta', function (req, res) {
    console.log('Su nombre es: ' + req.body.nombre)
    res.send('Su nombre es: ' + req.body.nombre + ' ' + req.body.apellido)
})
app.get('/respuesta', function (req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    res.send('Su nombre es: ' + nombre + ' ' + apellido)
})
app.get('/respuestatexto', function (req, res) {
    const nombre = req.query.nombre;
    const apellido = req.query.apellido;
    res.render('respuesta.ejs', { nombre: nombre, apellido: apellido });
});

app.get('/personas', function (req, res) {
    db.personas.findAll().then(personas => {
        res.render('personas/list.ejs', { personas: personas });
    });
});
app.get('/personas/create', function (req, res) {
    res.render('personas/form.ejs', { persona: null });
});
app.post('/personas/create', function (req, res) {
    db.personas.create({
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        ciudad: req.body.ciudad,
        edad: req.body.edad,
        fechaNacimiento: req.body.fechaNacimiento
    }).then(() => {
        res.redirect('/personas');
    });
});
app.get('/personas/:id/edit', async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    const fechaFormateada = formatDate(persona.fechaNacimiento);
    res.render('personas/form.ejs', { persona: persona, fechaFormateada: fechaFormateada });
});
app.post('/personas/:id/edit', async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);

    persona.nombre = req.body.nombre;
    persona.apellido = req.body.apellido;
    persona.ciudad = req.body.ciudad;
    persona.edad = req.body.edad;
    persona.fechaNacimiento = req.body.fechaNacimiento;
    await persona.save();
    res.redirect('/personas');
});

app.post('/personas/:id/delete', async function (req, res) {
    const id = req.params.id;
    const persona = await db.personas.findByPk(id);
    await persona.destroy();
    res.redirect('/personas');
});
app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000')
})