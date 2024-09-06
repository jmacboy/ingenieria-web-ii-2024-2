module.exports = app => {
    require('./personas.routes')(app);
    require('./mascotas.routes')(app);
    require('./competencias.routes')(app);
    require('./usuarios.routes')(app);
    require('./home.routes')(app);
}