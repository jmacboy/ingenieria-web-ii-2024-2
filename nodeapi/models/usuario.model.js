
module.exports = (sequelize, Sequelize) => {
    const Usuario = sequelize.define("usuario", {

        email: {
            type: Sequelize.STRING,
            unique: true
        },
        password: {
            type: Sequelize.STRING
        }
    }, {
        defaultScope: {
            attributes: { exclude: ['password'] },
        },
    });
    return Usuario;
}
