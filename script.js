// Importa os módulos necessários
const http = require('http');
const fs = require('fs');
const mysql = require('mysql');
const querystring = require('querystring');

// Cria uma conexão com o banco de dados MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '0099',
    database: 'find_outdoor'
});

// Conecta-se ao banco de dados
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conectado ao banco de dados MySQL');
});

// Cria um servidor HTTP
http.createServer((req, res) => {
    // Define a resposta HTTP
    res.writeHead(200, {'Content-Type': 'text/html'});

    // Verifica o método da requisição
    if (req.method === 'POST' && req.url === '/cadastro') {
        let data = '';

        // Lida com os dados do formulário
        req.on('data', (chunk) => {
            data += chunk.toString();
        });

        // Quando todos os dados do formulário forem recebidos
        req.on('end', () => {
            // Converte os dados recebidos de string JSON para objeto JavaScript
            const formData = querystring.parse(data);
            // const formData = JSON.parse(data);

            // Insere os dados no banco de dados
            const sql = `INSERT INTO teste (Nome, CPF, Telefone, E_mail, Dados_Banc_PIX) VALUES (?, ?, ?, ?, ?)`;
            db.query(sql, [formData.nome, formData.cpf, formData.telefone, formData.email, formData.dadosBancarios], (err, result) => {
                if (err) {
                    console.error('Erro ao inserir dados no banco de dados:', err);
                    res.end('Erro ao inserir dados no banco de dados');
                } else {
                    console.log('Dados inseridos com sucesso');
                    res.end('Dados inseridos com sucesso');
                }
            });
        });
    } else {
        // Lê o arquivo HTML do formulário e envia para o cliente
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.end('Erro ao ler o arquivo HTML');
            } else {
                res.end(data);
            }
        });
    }
}).listen(3000);

console.log('Servidor rodando em http://localhost:3000');
