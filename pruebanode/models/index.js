const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(
    dbConfig.DB,
    dbConfig.USER,
    dbConfig.PASSWORD,
    {
        host: dbConfig.HOST,
        port: dbConfig.PORT,
        dialect: "mysql",
    }
);
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.personas = require("./persona.model.js")(sequelize, Sequelize);
db.mascotas = require("./mascota.model.js")(sequelize, Sequelize);
db.personas.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.personas, {
    foreignKey: "personaId",
    as: "persona",
});
module.exports = db;