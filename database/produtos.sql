create database restapi;

use restapi;

create table produtos (
    id int not null auto_increment,
    nome varchar(255) not null,
    descricao varchar(255) not null,
    preco decimal(15,2) not null,
    data_criacao timestamp default current_timestamp,
    primary key (id)
);

insert into produtos (nome, descricao, preco) values ('Cama', 'Casal 20', 520);
insert into produtos (nome, descricao, preco) values ('Mesa', 'Madeira nobre', 1200);
insert into produtos (nome, descricao, preco) values ('Cadeira', 'Alumínio', 310);