-- Cria o banco de dados find_outdoor
CREATE DATABASE IF NOT EXISTS find_outdoor;

-- Seleciona o banco de dados find_outdoor
USE find_outdoor;

-- Tabela TB_Proprietário
CREATE TABLE tb_proprietário (
    idProprietário INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    E_mail VARCHAR(45) NOT NULL
);

-- Tabela TB_Aluguel
CREATE TABLE tb_aluguel (
    idTB_Aluguel INT PRIMARY KEY AUTO_INCREMENT,
    Mês_Ano VARCHAR(45) NOT NULL,
    Valor FLOAT NOT NULL,
    Data_Início DATETIME NOT NULL,
    Data_Fim DATETIME NOT NULL
);

-- Tabela TB_Intermediário
CREATE TABLE tb_intermediário (
    idTB_Intermediário INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    CNPJ VARCHAR(45) NOT NULL,
    E_mail VARCHAR(45) NOT NULL
);

-- Tabela TB_Outdoor
CREATE TABLE tb_outdoor (
    idTB_Outdoor INT PRIMARY KEY AUTO_INCREMENT,
    Endereço VARCHAR(45) NOT NULL,
    Bairro VARCHAR(45) NOT NULL,
    Localidade VARCHAR(45) NOT NULL,
    Tipo VARCHAR(45) NOT NULL,
    Altura VARCHAR(45) NOT NULL,
    Largura VARCHAR(45) NOT NULL,
    Informacoes VARCHAR(200) NOT NULL,
    Disponibilidade VARCHAR(45) NOT NULL DEFAULT 'Disponível'
);

-- Tabela TB_Locador
CREATE TABLE tb_locador (
    idTB_Locador INT PRIMARY KEY AUTO_INCREMENT,
    Nome VARCHAR(45) NOT NULL,
    Telefone VARCHAR(45) NOT NULL,
    E_mail VARCHAR(45) NOT NULL,
    CPF VARCHAR(45) NOT NULL
);
