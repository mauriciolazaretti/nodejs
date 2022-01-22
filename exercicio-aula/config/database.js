const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:teste@127.0.0.1/nodejs");

export default sequelize;