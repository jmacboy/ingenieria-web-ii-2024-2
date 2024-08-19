module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("persona", {
        nombre: {
            type: Sequelize.STRING
        },
        apellido: {
            type: Sequelize.STRING
        },
        ciudad: {
            type: Sequelize.STRING
        },
        edad: {
            type: Sequelize.INTEGER
        },
        fechaNacimiento: {
            type: Sequelize.DATE
        }
    });
    return Persona;
}
