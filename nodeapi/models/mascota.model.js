module.exports = (sequelize, Sequelize) => {
    const Mascota = sequelize.define("mascota", {
        nombre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        tipo: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
        personaId: {
            type: Sequelize.INTEGER,
            allowNull: false
        },
    });
    return Mascota;
}
