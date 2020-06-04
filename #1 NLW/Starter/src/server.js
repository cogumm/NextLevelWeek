const express = require("express");

// Instânciando o servidor utilizando o express.
const server = express();

/**
 * Rodando o servidor back-end.
 */
server.listen(3000, () => {
    console.log("Servidor backend inicializado com sucesso na porta " + 3000);
});
