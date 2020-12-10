const Sequelize = require('sequelize')

const connection = new Sequelize('guiaperguntas', 'root', 'j@llc@rd12',{
    host: 'localhost',
    dialect: 'mysql'
})

module.exports = connection