const Sequelize = require("sequelize");
const connection = require("./database");


// RELACIONAMENTO DE 2 TABELAS (2 MODEL) RESPOSTA PERTENCE A PERGUNTA
const Respostas = connection.define("respostas", {
    corpo: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    perguntaId: {
        type: Sequelize.INTEGER,
        allowNull: false
    }

});

Respostas.sync({force: false}).then(() =>{
    console.log('tabela resposta criada!!')
});

module.exports = Respostas