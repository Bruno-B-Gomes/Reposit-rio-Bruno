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
    res.writeHead(200, { 'Content-Type': 'text/html' });

    if (req.method === 'GET') {
        if (req.url === '/') {
            // Lê o arquivo HTML do formulário e envia para o cliente
            fs.readFile('index.html', (err, data) => {
                if (err) {
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Erro ao ler o arquivo HTML');
                } else {
                    res.end(data);
                }
            });
        } else if (req.url === '/outdoors') {
            // Busca os outdoors no banco de dados
            const sql = 'SELECT * FROM tb_outdoor';
            db.query(sql, (err, result) => {
                if (err) {
                    console.error('Erro ao buscar dados no banco de dados:', err);
                    res.writeHead(500, { 'Content-Type': 'text/plain' });
                    res.end('Erro ao buscar dados no banco de dados');
                } else {
                    // Envia os dados dos outdoors como resposta
                    // res.writeHead(200, {'Content-Type': 'application/json'});
                    // console.log(result)
                    // console.log(JSON.stringify(result))
                    res.end(JSON.stringify(result));
                }
            });
        }
    } else if (req.method === 'POST') {
        if (req.url === '/cadastro') {
            // Lida com os dados do formulário de cadastro
            cadastrarOutdoor(req, res);
        } else if (req.url === '/alterar') {
            // Lida com os dados do formulário de alteração
            alterarOutdoor(req, res);
        } else if (req.url === '/deletar') {
            // Lida com os dados do formulário de exclusão
            deletarOutdoor(req, res);
        }
    } else {
        // Lê o arquivo HTML do formulário e envia para o cliente
        fs.readFile('index.html', (err, data) => {
            if (err) {
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao ler o arquivo HTML');
            } else {
                res.end(data);
            }
        });
    }
}).listen(3000);

console.log('Servidor rodando em http://localhost:3000');

function cadastrarOutdoor(req, res) {
    let data = '';

    // Lida com os dados do formulário
    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    // Quando todos os dados do formulário forem recebidos
    req.on('end', () => {
        // Converte os dados recebidos de string JSON para objeto JavaScript
        const formData = querystring.parse(data);

        // Insere os dados no banco de dados
        const sql = `INSERT INTO tb_outdoor (Endereço, Bairro, Localidade, Tipo, Altura, Largura, Informacoes) VALUES (?, ?, ?, ?, ?, ?, ?)`;
        db.query(sql, [formData.endereco, formData.bairro, formData.localidade, formData.tipo, formData.altura, formData.largura, formData.informacoes], (err, result) => {
            if (err) {
                console.error('Erro ao inserir dados no banco de dados:', err);
                // res.writeHead(500, {'Content-Type': 'text/plain'});
                res.end('Erro ao inserir dados no banco de dados');
            } else {
                console.log('Dados inseridos com sucesso');
                res.end('Dados inseridos com sucesso');
            }
        });
    });
}

// Função para lidar com a alteração de outdoors
function alterarOutdoor(req, res) {
    let data = '';

    // Lida com os dados do formulário
    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    // Quando todos os dados do formulário forem recebidos
    req.on('end', () => {
        // Converte os dados recebidos de string JSON para objeto JavaScript
        const formData = JSON.parse(data);

        // Atualiza os dados no banco de dados
        const sql = `UPDATE tb_outdoor SET Endereço = ?, Bairro = ?, Localidade = ?, Altura = ?, Largura = ?, Informacoes = ? WHERE idTB_Outdoor = ?`;
        db.query(sql, [formData.endereco, formData.bairro, formData.localidade, formData.altura, formData.largura, formData.informacoes, formData.id], (err, result) => {
            if (err) {
                console.error('Erro ao atualizar dados no banco de dados:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao atualizar dados no banco de dados');
            } else {
                console.log('Dados atualizados com sucesso');
                res.end('Dados atualizados com sucesso');
            }
        });
    });
}

// Função para lidar com a exclusão de outdoors
function deletarOutdoor(req, res) {
    console.log("Chegou no deletar do servidor")
    let data = '';

    // Lida com os dados do formulário
    req.on('data', (chunk) => {
        data += chunk.toString();
    });

    // Quando todos os dados do formulário forem recebidos
    req.on('end', () => {
        // Converte os dados recebidos de string JSON para objeto JavaScript
        const formData = JSON.parse(data);

        // Console para verificar se está pegando o ID correto
        console.log(formData.id)

        // Deleta os dados no banco de dados
        const sql = `DELETE FROM tb_outdoor WHERE idTB_Outdoor = ?`;
        db.query(sql, [formData.id], (err, result) => {
            if (err) {
                console.error('Erro ao deletar dados no banco de dados:', err);
                res.writeHead(500, { 'Content-Type': 'text/plain' });
                res.end('Erro ao deletar dados no banco de dados');
            } else {
                console.log('Dados deletados com sucesso');
                res.end('Dados deletados com sucesso');
            }
        });
    });
}
