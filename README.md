
# Projeto Final: Luiza Labs 4ª edição
## Nome do projeto: Magacare

### Índice

- [Descrição do projeto](#descrição-do-projeto)

- [Ferramentas utilizadas](#ferramentas-utilizadas)

- [Abrir e rodar o projeto](#abrir-e-rodar-o-projeto)

- [Documentação da API](#documentação-da-api)

- [Gerenciamento de clientes](#gerenciamento-de-clientes)

- [Gerenciamento de produtos](#gerenciamento-de-produtos)

- [Gerenciamento de listas de desejos](#gerenciamento-de-listas-de-desejos)

- [Testes unitários](#testes-unitários)

- [Desenvolvedoras](#desenvolvedoras)

## Descrição do projeto

### Proposta
A Magazon (empresa totalmente fictícia) contratou nossos serviços para desenvolver um
módulo de lista de desejos dos produtos da Magacare, e-commerce especializada em produtos para skin care.

### Funcionalidades do projeto:

- Gerenciamento de clientes
- Gerenciamento de produtos
- Gerenciamento da lista de desejos

### Requisitos

- Node.js instalado na sua máquina
    - Esta API foi desenvolvida com o node v16.13.0

## Ferramentas utilizadas
- Javascript  
- Node.Js
- Insomnia e Postman 
- Swagger
- Github
- Trello
- Dataedo
- Google meet
- Slack
- Zoom

## Abrir e rodar o projeto

### Iniciando o projeto
- Clonar ou baixar esse projeto para seu computador;
- Digite no terminal o comando `npm install`, assim instalará todas as dependências necessárias para rodar a API; 
- Digite o comando `npm start` para iniciar o server;


### Configurando variável de ambiente para conexão com seu banco de dados
- Esta aplicação utilizou como banco de dados o MongoDB e para configurá-lo você deve:
- Criar um arquivo chamado .env com uma variável de ambiente chamada DATABASE, utilize o arquivo `.envExemple` para ver um exemplo de configuração.
- A variável DATABASE deve receber a string do banco de dados criado previamente no MongoDB-Atlas.

- A string do banco de dados pode ser acessada pelo MongoDB-atlas, ao acessar sua Database:
    - 1º click em Connect 
    - 2º click em Connect your application
    - 3º copie a string do seu banco de dados

- Se preferir manipular o banco de dados localmente, você deve instalar na sua máquina:
    - MongoDB Community Server e o MongoDB Compass.
    - Após a instalação, utilizar a string de conexão de sua preferência, como por exemplo:
    `mongodb://localhost:27017/<nomoBancoDeDados>`
    - Configurar o .env com essas informações

- Uma outra opção seria baixar a extensão no VSCode para conectar com o seu banco de dados atlas diretamente pela IDE. 
    - Nome da extensão: MongoDB
    - Após instalar a extensão, basta clicar em add MongoDB Connection e passar a string de conexão do seu banco de dados no atlas.


### Modelagem do Banco de Dados - MongoDB
![](https://github.com/magacare/magacare/blob/main/database/print-db-magacare.png)

- Para maiores detalhes sobre a modelagem do banco de dados utilize o  documento chamado `db_magacare.pdf` que está pasta `database`.

### Modelo json para testes da aplicação
- Caso tenha interesse:
    - Utilize um documento chamado `model_db.json` que está pasta `database` para acessar modelos de json para teste da aplicação na sua ferramenta de prefência.
    
## Documentação da API

## Gerenciamento de clientes

#### Cadastro do cliente
Rota não autenticada

```http
  POST/YOUR-SERVER/clients
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
| `gender` | `string` | **Obrigatório**. Opções: ('mulher cis', 'mulher trans', 'homem cis', 'homem trans', 'não binário', 'prefiro não responder') |
| `password` | `string` | **Obrigatório** |

#### Autenticação do cliente
Rota não autenticada

```http
  POST YOUR-SERVER/session
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `email` | `string` | **Obrigatório** |
| `password` | `string` | **Obrigatório** |

Na resposta dessa requisição você terá como resposta o ***token*** JWT, tipo bearer para ter permissão de acesso para as demais rotas da aplicação.

### Retorna todos os clientes
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  POST YOUR-SERVER/clients
```

#### Buscar cliente pelo seu id
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  GET YOUR-SERVER/clients/id/:id
```
 Passar como parâmetro na URL da requisição o ID do client que deseja detalhar.
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**.

#### Buscar cliente pelo seu email
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  GET YOUR-SERVER/clients/email?email=exemplo@email.com&page=1&limit=4
```
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `email`      | O email que deseja filtrar | **Obrigatório**. O email que deseja filtrar | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Filtrar por "contém", utilizando o nome, lista paginada

Exemplo: ao pesquisar pelos clientes com nome ‘silva’ a pesquisa pode retorna nomes tais
como: “Silvana”, “Silvanir”, “Júlia Silva”.

Passar parâmetros no Query params:
```http
  GET YOUR-SERVER/clients/search?searchBy=name&filter=exemplodefilter&page=1&limit=4
```
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  name | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 

#### Filtrar por "contém", utilizando o gênero, lista paginada

Exemplo: ao pesquisar por "cis" a pesquisa pode retornar: “Homem cis”, “Mulher cis”.

```http
  GET YOUR-SERVER/clients/search?searchBy=gender&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:

| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  gender | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Filtrar por "contém", utilizando ID, lista paginada

Exemplo: ao pesquisar por "777" a pesquisa pode retornar: “000444777”, “888999777”.

```http
  GET YOUR-SERVER/clients/search?searchBy=gender&filter=exemplodefilter&page=1&limit=4
```

Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  id | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Pesquisar se cliente possui lista de desejos

```http
  GET YOUR-SERVER/clients/wishlists/:id
```
 Passar como parâmetro na URL da requisição o ID do client que deseja pesquiar.
 
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**.

#### Atualizar cliente
```http
  PUT YOUR-SERVER/clients/:id
```
Passar como parâmetro na URL da requisição o ID do client que deseja atualizar.

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório** |

Passar parâmetros no body da requisição em formato JSON:
- O id do client não pode ser alterado
     
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `fullName` | `string` | **Opcional** |
| `email` | `string` | **Opcional**. Desde que não seja igual ao e-mail de outro client |
| `birthDate` | `string` | **Opcional** |
| `cpf` | `string` | **Opcional**.  Desde que não seja igual ao CPF de outro client |
| `phoneNumber` | `string` | **Opcional** |
| `postalCode` | `string` | **Opcional** |
| `gender` | `string` | **Opcional** |
| `password` | `string` | **Opcional** |
| `oldPassword` | `string` | **Opcional** |
| `confirmPassword` | `string` | **Opcional** |


#### Remover cliente
```http
  DELETE YOUR-SERVER/clients/:id
```
- Ao deletar um clients as wishlists associadas a ele também serão deletadas

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**. Passar como parâmetro na URL da requisição o ID do client que deseja deletar |

## Gerenciamento de produtos

#### Cadastro do produto
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  POST/YOUR-SERVER/products
```
Passar parâmetros no body da requisição em formato JSON:

| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Obrigatório** |
| `code` | `string` | **Obrigatório**. Chave única |
| `description` | `string` | **Obrigatório** |
| `volume` | `string` | **Obrigatório**. |
| `recommendation` | `string` | **Obrigatório**. Opções ('pele seca', 'pele oleosa', 'pele mista', 'pele normal', 'todas as peles') |

### Retorna todos os produtos
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  POST YOUR-SERVER/products
```

#### Buscar produtos pelo seu código
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  GET YOUR-SERVER/products/code/:code
```
Passar como parâmetro na URL da requisição o code do product que deseja detalhar.

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**. 

#### Filtrar por "contém", utilizando o nome, lista paginada

Exemplo: ao pesquisar pelos produtos com nome ‘protetor’ , a pesquisa pode retornar nomes tais como: “Protetor solar”, “Proteror labial”.

```http
  GET YOUR-SERVER/products/search?searchBy=name&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  name | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 

#### Filtrar por "contém", utilizando a recomendação, lista paginada

Exemplo: ao pesquisar por "pele" pesquisa pode retornar: “pele seca”, “pele normal”.

```http
  GET YOUR-SERVER/products/search?searchBy=recommendation&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  recommendatio | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Filtrar por "contém", utilizando o código do produto, lista paginada

Exemplo: ao pesquisar por "777" a pesquisa pode retornar: “000444777”, “888999777”.

```http
  GET YOUR-SERVER/products/search?searchBy=code&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  code | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Pesquisar as listas de desejos em que o produto aparece

```http
  GET YOUR-SERVER/products/wishlists/:code
```
Passar como parâmetro na URL da requisição o code do product que deseja pesquisar.
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `code`      | **Obrigatório**. 

#### Atualizar produto
```http
  PUT YOUR-SERVER//:id
```
 Passar como parâmetro na URL da requisição o ID do client que deseja atualizar
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `code`      | **Obrigatório** |

Passar parâmetros no body da requisição em formato JSON:
- O código do produto não pode ser alterado
     
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `name` | `string` | **Opcional**. Desde que não seja igual ao e-mail de outro client |
| `description` | `string` | **Opcional** |
| `recommendation` | `string` | **Opcional** |


#### Remover produtos
```http
  DELETE YOUR-SERVER/clients/:id
```
- Se um produto está em uma lista de desejos, então, ele não poderá ser removido.

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `code`      | **Obrigatório**. Passar como parâmetro na URL da requisição o code do client que deseja deletar |

## Gerenciamento de listas de desejos

#### Cadastro da lista de desejos
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  POST/YOUR-SERVER/wishlists
```
Passar parâmetros no body da requisição em formato JSON:
- Não pode conter produtos repetidos na lista de produtos
-
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Obrigatório** |
| `client` | `string` | **Obrigatório**. Chave única |
| `product` | `array` | **Obrigatório** |

### Retorna todas as listas de desejos
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  POST YOUR-SERVER/wishlists
```

#### Buscar listas de desejos pelo seu id
Rota autenticada - necessário configurar sua ferramenta de teste da aplicação de preferência com Authorization - tipo Bearer token

```http
  GET YOUR-SERVER/wishlist/id/:id
```
Passar como parâmetro na URL da requisição o code do product que deseja detalhar.

| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**. 

#### Filtrar por "contém", utilizando id da lista de desejos, lista paginada

Exemplo: ao pesquisar por "777" a pesquisa pode retornar: “000444777”, “888999777”.

```http
  GET YOUR-SERVER/wishlists/search?searchBy=id&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  id | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 

#### Filtrar por "contém", utilizando o código do produto, lista paginada

Exemplo: ao pesquisar por "999" pesquisa pode retornar: “11488999”, “99963571”.

```http
  GET YOUR-SERVER/products/search?searchBy=recommendation&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  product | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Filtrar por "contém", utilizando id do cliente, lista paginada

Exemplo: ao pesquisar por "777" a pesquisa pode retornar: “000444777”, “7770004785”.

```http
  GET YOUR-SERVER/wishlists/search?searchBy=client&filter=exemplodefilter&page=1&limit=4
```
Passar parâmetros no Query params:
| Query Params   | Value       |  Descrição                                 |
| :---------- | :--------- | :------------------------------------------|
| `searchBy`   |  client | **Obrigatório**. | 
| `filter`     |  O que deseja filtrar | **Obrigatório**. | 
| `page`       | 1 | **Obrigatório**. Iniciar com 1, primeira página|
| `limit`      | número que deseja de itens por página | **Obrigatório**. O número de itens que deseja ter em cada paginação | 


#### Pesquisar listas de desejos por cliente

```http
  GET YOUR-SERVER/wishlists/client/:id
```
Passar como parâmetro na URL da requisição o id do client que deseja pesquisar.
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório**. 

#### Atualizar lista de desejos
```http
  PUT YOUR-SERVER//:id
```
 Passar como parâmetro na URL da requisição o ID da wishlist que deseja atualizar
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório** |

Passar parâmetros no body da requisição em formato JSON:
- O client não pode ser alterado
     
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Opcional** |
| `product` | `array` | **Obrigatório** | O array será composto pelos id dos products que desejo inserir.

#### Remover produto da lista de desejos
```http
  DELETE YOUR-SERVER/wislists/products/:code
```
Passar como parâmetro na URL da requisição o code do product que desejamos remover da wishlist
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório** |

Passar parâmetros no body da requisição em formato JSON:
| Parâmetro   | Tipo       | Descrição                           |
| :---------- | :--------- | :---------------------------------- |
| `title` | `string` | **Opcional** |
| `product` | `array` | **Obrigatório** | O array deve conter o id do product que desejo remover da wishilist.


#### Remover lista de desejos
```http
  DELETE YOUR-SERVER/wishlists/:id
```
Passar como parâmetro na URL da requisição o id da wishlist que deseja deletar.
| Parâmetro   | Descrição                                   |
| :---------- | :------------------------------------------ |
| `id`      | **Obrigatório** |

## Testes unitários

## Desenvolvedoras 


| [<img src="https://avatars.githubusercontent.com/u/84817222?v=4" width=115><br><sub>Bruna Hirano Imbriani</sub>](https://github.com/brunahirano) |  [<img src="https://avatars.githubusercontent.com/u/100802546?v=4" width=115><br><sub>Graziella Costa</sub>](https://github.com/grazie-lla) |  [<img src="https://avatars.githubusercontent.com/u/96178284?v=4" width=115><br><sub>Maria Luisa Campos</sub>](https://github.com/marialuisacampos) | [<img src="https://avatars.githubusercontent.com/u/88402963?v=4" width=115><br><sub>Priscilla Prado</sub>](https://github.com/Erica08muniz) | [<img src="https://avatars.githubusercontent.com/u/73727259?v=4" width=115><br><sub>Tatiane Moraes</sub>](https://github.com/tatianemoraes)
| :---: | :---: | :---: | :---: | :---: 

