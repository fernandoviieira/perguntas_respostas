//EXPRESS, MYSQL e Embedded Javascript templating EJS

const express = require("express");
const app = express();
const bodyParser = require("body-parser")
const connection = require("./database/database")
const Pergunta = require("./database/Pergunta")
const Respostas = require("./database/Respostas")

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
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// ROTAS
app.get("/perguntas", (req, res) => {
    res.render("perguntas")
});

app.get("/", (req, res) => {  //findall => SELECT * ALL FROM perguntas
    Pergunta.findAll({
        raw: true, order: [
            ['id', 'DESC'] // ASC = Crescente DESC = Descrescente
        ]
    }).then(perguntas => {
        res.render("index", {
            perguntas: perguntas
        });
    });
});

app.post("/salvarpergunta", (req, res) => {
    var titulo = req.body.titulo
    var descricao = req.body.descricao
    Pergunta.create({
        titulo: titulo,
        descricao: descricao
    }).then(() => {
        res.redirect("/")
    });
});


app.get("/pergunta/:id", (req, res) => {
    var id = req.params.id;
    Pergunta.findOne({
        where: { id: id }
    }).then(pergunta => {
        if (pergunta != undefined) { // Pergunta encontrada!!

            Respostas.findAll({
                where: { perguntaId: pergunta.id },
                order:[
                     ['id', 'DESC']
                     ]
            }).then(Respostas => {
                res.render('pergunta', {
                    pergunta: pergunta,
                    Respostas:Respostas
                });
            })



        } else {// Não encontrada!!
            res.render('naoencontrado');
        }
    });
});

app.post("/responder", (req, res) => {
    var corpo = req.body.corpo;
    var perguntaId = req.body.pergunta;
    Respostas.create({
        corpo: corpo,
        perguntaId: perguntaId
    }).then(() => {
        res.redirect("/pergunta/" + perguntaId)
    });
});

app.listen(8080, () => { console.log("app rodando!"); });

