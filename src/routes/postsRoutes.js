import express from "express"; // Importa o módulo Express para criar a API
import multer from "multer"; // Importa o módulo Multer para upload de arquivos
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../controllers/postController.js";// Importa funções controladoras de posts do arquivo postController.js
import cors from "cors";

const corsOption ={
  origin: "http://localhost:8000",
  optionsSuccessStatus: 200
}

const storage = multer.diskStorage({
  // Configura o armazenamento dos arquivos enviados
  destination: function (req, file, cb) {
    // Define o diretório de destino para os arquivos: "uploads/"
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
});

const upload = multer({dest:"./uploads", storage}); // Cria uma instância do middleware Multer com as configurações de armazenamento

// Função para configurar as rotas da API
const routes = (app) => {
  // Habilita o middleware para analisar dados JSON enviados no corpo da requisição
  app.use(express.json());
  app.use(cors(corsOption))

  // Rota GET para listar todos os posts (mapeia a função listarPosts)
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post (mapeia a função postarNovoPost)
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem (usa o middleware upload.single("imagem") e mapeia a função uploadImagem)
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost )
};

export default routes; // Exporta a função routes para ser utilizada em outro arquivo