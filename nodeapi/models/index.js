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
db.competencias = require("./competencia.model.js")(sequelize, Sequelize);
db.usuarios = require("./usuario.model.js")(sequelize, Sequelize);

// one to many o many to one
db.personas.hasMany(db.mascotas, { as: "mascotas" });
db.mascotas.belongsTo(db.personas, {
    foreignKey: "personaId",
    as: "persona",
});
// many to many
db.competencias.belongsToMany(db.mascotas, {
    through: "competencia_mascota",
    as: "mascotas",
    foreignKey: "competenciaId",
});
db.mascotas.belongsToMany(db.competencias, {
    through: "competencia_mascota",
    as: "competencias",
    foreignKey: "mascotaId",
});

//one to one usuario - persona
db.usuarios.hasOne(db.personas, { as: "persona", foreignKey: "usuarioId" });
db.personas.belongsTo(db.usuarios, {
    foreignKey: "usuarioId",
    as: "usuario",
});

module.exports = db;