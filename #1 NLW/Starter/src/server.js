const express = require("express");

// Instânciando o servidor utilizando o express.
const server = express();

/**
 * Configurando o Nunjucks = template engine
 */
const nunjucks = require("nunjucks");
nunjucks.configure("src/views", {
    express: server,
    noCache: true,
});

/**
 * Rota pública para ser acessada de forma direta.
 */
server.use(express.static("public"));

/**
 * Enviando o arquivo index.html
 */
server.get("/", (req, res) => {
    return res.render("index.html");
});

/**
 * Enviando o arquivo create-point.html
 */
server.get("/create", (req, res) => {
    return res.render("create-point.html", {
        title: "Ecoleta - Criar ponto de coleta",
    });
});

/**
 * Enviando o arquivo search.html
 */
server.get("/search", (req, res) => {
    return res.render("search.html", {
        title: "Ecoleta - Resultado da pesquisa",
    });
});

/**
 * Rodando o servidor back-end.
 */
server.listen(3001, () => {
    console.log("Servidor backend inicializado com sucesso na porta " + 3001);
});
