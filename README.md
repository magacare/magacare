
# Projeto Final: Luiza Labs 4ª edição
## Nome do projeto: Magacare

### Proposta
A Magazon (empresa totalmente fictícia) contratou nossos serviços para desenvolver um
módulo de lista de desejos dos produtos da Magacare, e-commerce especializada em produtos para skin care.

### Funcionalidades do projeto:

- Gerenciamento de clientes
- Gerenciamento de produtos
- Gerenciamento da lista de desejos

## Requisitos

- Node.js instalado
    - Esta API foi desenvolvida com o node v16.13.0

## Iniciando o projeto
- Clonar ou baixar esse projeto para seu computador;
- Digite no terminal o comando `npm install`, assim instalará todas as dependências necessárias para rodar a API; 
- Digite o comando `npm start` para iniciar o server;

## Modelagem do Banco de Dados - MongoDB
![](https://github.com/magacare/magacare/blob/main/database/print-db-magacare.png)

- Para maiores detalhes sobre a modelagem do banco de dados utilize o  documento chamado `db_magacare.pdf` que está pasta `database`.

## Modelo json para testes da aplicação
- Caso tenha interesse:
    - Utilize um documento chamado `model_db.json` que está pasta `database` para acessar modelos de json para teste da aplicação na sua ferramenta de prefência.
## Documentação da API

#### Cadastro do client

```http
  POST/YOUR-SERVER/api/clients/register
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `fullName` | `string` | **Obrigatório** |
| `email` | `string` | **Obrigatório**. Chave única |
| `birthDate` | `string` | **Obrigatório** |
| `cpf` | `string` | **Obrigatório**. Chave única |
| `phoneNumber` | `string` | **Obrigatório** |
| `postalCode` | `string` | **Obrigatório** |
| `gender` | `string` | **Obrigatório**. Default: prefiro não responder |
| `password` | `string` | **Obrigatório** |

#### Autenticação do client
```http
  POST YOUR-SERVER/api/clients/authenticate
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

Na resposta dessa requisição você terá acesso ao ***token*** JWT, tipo bearer para ter permissão de acesso para as demais rotas da aplicação.

### Retorna todos os clients

```http
  POST YOUR-SERVER/api/clients
```

#### Buscar client pelo seu id

```http
  GET YOUR-SERVER/api/clients/:id
```

| Parâmetro   | Tipo       | Descrição                                   |
| :---------- | :--------- | :------------------------------------------ |
| `id`      | `string` | **Obrigatório**. Passar como parâmetro na URL da requisição o ID do client que deseja detalhar.

#### Buscar client pelo seu email paginada

```http
  GET YOUR-SERVER/api/clients/email?email=exemplo@email.com&page=1&limit=4
```
| Parâmetro   |  Descrição                                 |
| :---------- | :------------------------------------------|
| `email`      | **Obrigatório**. Passar como Query params, o que email que deseja filtrar | 
| `page`      | **Obrigatório**. Iniciar com 1, primeira página | 
| `limit`      | **Obrigatório**. Passar o número de itens que deseja ter em cada paginação | 

Passar como Query params onde: 

key: email

value: o email que desejo procurar

#### Buscar por nome do client paginada

```http
  GET YOUR-SERVER/api/clients/search?filter=exemplodefilter&page=1&limit=4
```
| Parâmetro   |  Descrição                                 |
| :---------- | :------------------------------------------|
| `filter`      | **Obrigatório**. Passar como Query params, o que deseja filtrar | 
| `page`      | **Obrigatório**. Iniciar com 1, primeira página | 
| `limit`      | **Obrigatório**. Passar o número de itens que deseja ter em cada paginação | 
