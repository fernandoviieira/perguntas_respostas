//EXPRESS, MYSQL e Embedded Javascript templating EJS

const express = require("express");
const app = express();

//Estou dizendo para o express usar o EJS como view engine
app.set("view engine","ejs");
app.use(express.static('public'))

app.get("/:nome/:lang", (req, res) => {
    var nome = req.params.nome
    var lang = req.params.lang
    let exibirMsg = false

    var produtos = [
        {nome:"Leite", preco:3.14},
        {nome:"Coca-Cola", preco:8.70},
        {nome:"Doritos", preco:4.70}
    ]


    res.render("index",{
        nome: nome,
        lang: lang,
        empresa: "empresa",
        inscritos:8000,
        msg: exibirMsg,
        produtos: produtos
    })
});

app.listen(8080,() =>{console.log("app rodando!");});

