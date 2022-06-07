**RF** => Requisitos funcionais
**RNF** => Requisitos não funcionais
**RN** => Regra de negócio

# Carro

## Cadastro
**RF**
  - Deve ser possível cadastrar um novo carro;
  - Deve ser possível listar todas as categorias;

**RN**
  - Não deve ser possível cadastrar um novo carro com uma placa já existente;
  - Um novo carro deve ser cadastrado, por padrão, com o status disponível;
  - Somente um usuário administrador deve conseguir cadastrar um novo carro;

## Update
**RF**
  - Deve ser possível alterar um novo;

**RN**
  - Não deve ser possível alterar a placa de um carro já cadastrado;
  - Somente um usuário administrador deve conseguir alterar um novo carro;

## Listagem
**RF**
  - Deve ser possível listar todos os carros disponíveis;
  - Deve ser possível listar todos os carros disponíveis pelo modelo (nome do carro);
  - Deve ser possível listar todos os carros disponíveis por marca;
  - Deve ser possível listar todos os carros disponíveis pelo nome da categoria;

**RN**
  - Não é necessário estar logado para listar os carros disponíveis.


# Especificações do carro

## Cadastro
**RF**
  - Deve ser possível cadastrar uma especificação para um carro;
  - Deve ser possível listar todas as especificações;
  - Deve ser possível listar todas os carros;

**RN**
  - Não deve ser possível cadastrar uma especificação para um carro não cadastrado;
  - Não deve ser possível uma mesma especificação para um mesmo carro;
  - Somente um usuário administrador deve conseguir vincular uma especificação de carro;

## Exclusão
**RF**
  - Deve ser possível excluir uma especificação de um carro;
  - Deve ser possível listar todas as especificações;
  - Deve ser possível listar todas os carros;

**RN**
  - Somente um usuário administrador deve conseguir vincular uma especificação de carro;


# Cadastro de imagem do carro

## Cadastro
**RF**
  - Deve ser possível cadastrar uma ou mais imagens para o carro;
  - Deve ser possível listar todos os carros;

**RNF**
  - Utilizar o multer para upload dos arquivos;
  - 
**RN**
  - O usuário deve poder cadastrar mais de uma imagem para o mesmo carro;
  - Não deve ser possível uma mesma especificação para um mesmo carro;
  - Somente um usuário administrador deve conseguir vincular uma especificação de carro;

# Aluguel de carro

## Cadastro
**RF**
  - Deve ser possível criar uma reserva para aluguel de um carro;
  - Deve ser possível listar todos os carros;

**RN**
  - O carro deve estar disponível;
  - O aluguel deve ter duração mínima de 24hr;
  - O usuário deve estar logado para efetuar um aluguel;

