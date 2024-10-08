CREATE TABLE PRODUTO (
    id INT NOT NULL AUTO_INCREMENT,
    nome_produto VARCHAR (100),
    descricao_produto VARCHAR(200),
    preco_produto DECIMAL(18, 2),
    qtd_estoque INT,
    ativo_inativo ENUM ('ATIVO', 'INATIVO'),
    imagem_principal VARCHAR(1000),

    PRIMARY KEY (id)
);

CREATE TABLE FOTOS_PRODUTO(
    id INT NOT NULL AUTO_INCREMENT,
    id_produto INT NOT NULL,
    nome_foto VARCHAR (100),
    url_foto VARCHAR (100),
    flag_img CHAR,

    PRIMARY KEY (id),
    FOREIGN KEY (id_produto) REFERENCES produto(id)
    )