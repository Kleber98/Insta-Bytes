import 'dotenv/config';
import conectarAoBanco from "../config/dbConfig.js";
import { ObjectId } from "mongodb";

// Conecta ao banco de dados MongoDB usando a string de conexão fornecida no ambiente
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

// Função assíncrona para obter todos os posts da coleção "posts" no banco de dados "imersao-instabytes"
export async function getTodosPosts() {
    // Obtém uma referência ao banco de dados "imersao-instabytes"
    const db = conexao.db("imersao-instabytes");
    // Obtém uma referência à coleção "posts"
    const colecao = db.collection("posts");
    // Retorna um array com todos os documentos da coleção
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost)      
}

export async function atualizarPost(id, novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objID = ObjectId.createFromHexString(id);
    return colecao.updateOne({_id: new ObjectId(objID)}, {$set:novoPost});      
}