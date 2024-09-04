module.exports = (sequelize, Sequelize) => {
    const Persona = sequelize.define("persona", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        apellido: {
            type: Sequelize.STRING,
            allowNull: false
        },
        ciudad: {
            type: Sequelize.STRING,
            allowNull: false
        },
        edad: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        fechaNacimiento: {
            type: Sequelize.DATE,
            allowNull: false
        },
        genero: {
            type: Sequelize.INTEGER,
            allowNull: false
        }
    });
    return Persona;
}
