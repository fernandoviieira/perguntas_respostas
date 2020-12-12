//CRIANDO UM MODEL => GERANDO TABELA

const Sequelize = require("sequelize");
const connection = require("./database");

const Pergunta = connection.define('pergunta', {
    titulo:{
        type: Sequelize.STRING, //string texto curto
        allowNull: false
    },
    descricao: {
        type: Sequelize.TEXT, //text texto maior
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(() =>{
    console.log('tabela pergunta criada!!')
});


module.exports = Pergunta