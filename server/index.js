const express = require("express");

const mysql = require("mysql2");
const cors = require("cors");

const db = mysql.createPool({
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "RASmanager@123",
    database: "ras"
});


const app = express();

app.use(cors());
app.use(express.json());

///
/// Data retrived: All [Pessoa] table rows
///
app.get("/pessoas", (req, res) => {
    let query = "SELECT * FROM PESSOA";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// It response by parsing [Pessoa] column {PESSOA_ID} and retrives respective data
///
app.get("/pessoa/:id", (req, res) => {
    let query = "SELECT * FROM PESSOA WHERE PESSOA_ID =  " + "'" + (req.params.id) + "'";

    
    db.query(query, (error, result) => {
        res.json(result);
    });
});

///
/// It response by parsing [Pessoa] column {PESSOA_ID} and retrives respective data
///
app.get("/auth/:email", (req, res) => {
    let query = "SELECT NOME, EMAIL, SENHA FROM PESSOA WHERE EMAIL = " + "'" + (req.params.email.toLocaleLowerCase()) + "'";
    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// Data retrived: All [Evento] table rows
///
app.get("/eventos", (req, res) => {
    let query = "SELECT * FROM EVENTO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// It response by parsing [Evento] column {EVENTO_ID} and retrives respective data
///
app.get("/evento/:id", (req, res) => {
    let query = "SELECT * FROM EVENTO WHERE EVENTO_ID =  " + "'" + (req.params.id) + "'";

    db.query(query, (error, result) => {
        res.json(result);
    });
});

///
/// Data retrived: All [Reuniao] table rows
///
app.get("/reunioes", (req, res) => {
    let query = "SELECT * FROM REUNIAO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// It response by parsing [Reuniao] column {REUNIAO_ID} and retrives respective data
///
app.get("/reuniao/:id", (req, res) => {
    let query = "SELECT * FROM REUNIAO WHERE REUNIAO_ID = " + "'" + (req.params.id) + "'";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// Data retrived: All [Projeto] table rows
///
app.get("/projetos", (req, res) => {
    let query = "SELECT * FROM PROJETO";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

///
/// It response by parsing [Projeto] column {PROJETO_ID} and retrives respective data
///
app.get("/projeto/:id", (req, res) => {
    let query = "SELECT * FROM PROJETO WHERE PROJETO_ID = " + "'" + (req.params.id) + "'";

    db.query(query, (error, result) => {
        res.json(result);
    });

});

//#//#//#//#//#//#//#//#//# [ CADASTRO DE USUÁRIO ] //#//#//#//#//#//#//#//#//#

app.post("/pessoas/cadastrar/:nome/:email/:senha/:cpf/:telefone", (req, res) => {
    let query = "INSERT INTO PESSOA VALUES (NULL, NULL, '" + req.params.nome + "', '2022-09-20', '2022-09-20', '" + req.params.email + "', '" + req.params.cpf + "', '" + req.params.senha + "', '"  + req.params.telefone + "', 'ATIVO');";

    console.log(query);

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

//#//#//#//#//#//#//#//#//# [ CADASTRO DE EVENTO ] //#//#//#//#//#//#//#//#//#

app.post("/eventos/adicionar/:descricao/:responsavel/:palestrante/:localizacao", (req, res) => {
    let query = "INSERT INTO EVENTO VALUES (NULL, " + req.params.responsavel + ", '" + req.params.descricao + "', '2022-09-20', '" + req.params.localizacao + "', '" + req.params.palestrante + "');";

    console.log(query);

    db.query(query, (error, result) => {
        if (error) return res.json({error: error});
        return res.json(result);
    });
})

const _serverPort = 3001;

app.listen(_serverPort, () => {
    console.log("RUNNING SERVER AT PORT: " + _serverPort);
})