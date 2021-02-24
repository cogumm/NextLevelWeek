require("dotenv").config();
import app from "./app";

/**
 * Rodando o servidor back-end.
 */
app.listen(process.env.PORT_APP || 3000, () => {
    console.log(
        "Servidor backend inicializado com sucesso na porta " +
            process.env.PORT_APP || 3000
    );
});
