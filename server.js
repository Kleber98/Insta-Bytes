import express from "express";
import routes from "./src/Routes/postsRoutes.js";

const app = express(); // Cria uma instância do servidor Express
app.use(express.static("uploads"))
routes(app)
// Inicia o servidor na porta 3000 e exibe uma mensagem no console quando o servidor estiver ouvindo
app.listen(3000, () => {
  console.log("Servidor escutando...");
});