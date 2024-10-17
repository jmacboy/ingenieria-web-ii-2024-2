module.exports = app => {
    require('./home.routes')(app);
    require('./persona.routes')(app);
    require('./usuario.routes')(app);
    require('./mascota.routes')(app);
    require('./auth.routes')(app);

}