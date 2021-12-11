const { Sequelize, Model, DataTypes } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database/web3.sqlite'
});

class Usuarios extends Model {}

Usuarios.init({
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
}, {
  sequelize,
  modelName: 'Usuarios'
});

module.exports = Usuarios;
module.exports = {
  sequelize,
  Usuarios
}