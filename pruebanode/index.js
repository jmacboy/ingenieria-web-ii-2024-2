const express = require('express')
const bodyParser = require('body-parser')
const app = express()
app.use(bodyParser.urlencoded({ extended: false }))

app.set('view engine', 'ejs');



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

app.listen(3000, function () {
    console.log('Ingrese a http://localhost:3000')
})