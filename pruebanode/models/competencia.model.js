module.exports = (sequelize, Sequelize) => {
    const Competencia = sequelize.define("competencia", {
        nombre: {
            type: Sequelize.STRING
        },
        fecha: {
            type: Sequelize.DATE
        }
    });
    return Competencia;
}
