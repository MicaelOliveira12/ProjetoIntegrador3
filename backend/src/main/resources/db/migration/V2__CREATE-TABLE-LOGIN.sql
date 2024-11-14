create table IF NOT EXISTS logins(

    id bigint not null auto_increment,
    nome_usuario varchar(100) not null,
    pais_usuario varchar(11) not null,
    email_usuario varchar(50) not null unique,
    data_nascimento varchar (10) not null,
    senha_usuario varchar(50) not null,
    telefone_usuario varchar(20) not null,
    primary key (id)
);

