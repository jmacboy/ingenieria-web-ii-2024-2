module.exports = (sequelize, Sequelize) => {
    const Mascota = sequelize.define("mascota", {
        nombre: {
            type: Sequelize.STRING
        },
        tipo: {
            type: Sequelize.INTEGER
        },
        personaId: {
            type: Sequelize.INTEGER
        },
    });
    return Mascota;
}
