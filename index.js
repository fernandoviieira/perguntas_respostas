//EXPRESS, MYSQL e Embedded Javascript templating EJS

const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")

//DATABASE
connection
    .authenticate()
    .then(() => {
        console.log('Conexão feita com sucesso!!')
    })

    .catch((msgerro) => {
       console.log(msgerro)
    })

//Estou dizendo para o express usar o EJS como view engine
app.set("view engine", "ejs");
app.use(express.static('public'))

// Body Parser
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

// ROTAS
app.get("/perguntas", (req, res) => {
    res.render("perguntas")
});

app.get("/", (req, res) => {
    res.render("index")
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    res.send(`Formulario enviado com titulo: ${titulo} e a descricao: ${descricao}`)
})

app.listen(8080, () => { console.log("app rodando!"); });

