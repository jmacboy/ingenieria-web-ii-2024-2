module.exports = app => {
    require('./home.routes')(app);
    require('./persona.routes')(app);
    require('./usuario.routes')(app);
}