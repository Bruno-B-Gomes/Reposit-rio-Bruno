-- Cria o banco de dados
CREATE DATABASE IF NOT EXISTS find_outdoor;

-- Seleciona o banco de dados
USE find_outdoor;

-- Cria a tabela TB_Proprietario
CREATE TABLE IF NOT EXISTS TB_Proprietario (
    idProprietario INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    CPF BIGINT NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    Dados_Banc_PIX VARCHAR(45) NOT NULL
);

-- Cria a tabela TB_Aluguel
CREATE TABLE IF NOT EXISTS TB_Aluguel (
    idTB_Aluguel INT AUTO_INCREMENT PRIMARY KEY,
    MesAno VARCHAR(45) NOT NULL,
    Valor FLOAT NOT NULL,
    DataInicio DATETIME NOT NULL,
    DataFim DATETIME NOT NULL
);

-- Cria a tabela TB_Intermediario
CREATE TABLE IF NOT EXISTS TB_Intermediario (
    idTB_Intermediario INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    CNPJ VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL
);

-- Cria a tabela TB_Outdoor
CREATE TABLE IF NOT EXISTS TB_Outdoor (
    idTB_Outdoor INT AUTO_INCREMENT PRIMARY KEY,
    Codigo INT NOT NULL,
    Endereco VARCHAR(45) NOT NULL,
    Tipo VARCHAR(45) NOT NULL,
    Dimensoes VARCHAR(45) NOT NULL,
    Disponibilidade VARCHAR(45) NOT NULL
);

-- Cria a tabela TB_Locador
CREATE TABLE IF NOT EXISTS TB_Locador (
    idTB_Locador INT AUTO_INCREMENT PRIMARY KEY,
    Nome VARCHAR(45) NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    Email VARCHAR(45) NOT NULL,
    CPF VARCHAR(45) NOT NULL
);
