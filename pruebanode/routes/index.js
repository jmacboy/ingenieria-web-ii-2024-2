module.exports = app => {
    require('./personas.routes')(app);
    require('./mascotas.routes')(app);
    require('./competencias.routes')(app);
}