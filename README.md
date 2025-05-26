# 👤 CRUD de Usuários

Este é um projeto simples de estudo para criação de uma API REST que realiza o CRUD (Create, Read, Update, Delete) de usuários, utilizando as seguintes tecnologias:

- **Node.js**
- **TypeScript**
- **Express**
- **TypeORM**
- **MySQL**

## 📚 Funcionalidades

- Criar um novo usuário
- Listar todos os usuários
- Buscar um usuário por ID
- Atualizar os dados de um usuário
- Remover um usuário

## 🏗️ Estrutura da Tabela `users`

| Campo     | Tipo                 | Descrição                      |
| --------- | -------------------- | ------------------------------ |
| id        | int (auto-increment) | Identificador único do usuário |
| name      | varchar              | Nome do usuário                |
| email     | varchar              | E-mail do usuário              |
| createdAt | timestamp            | Data de criação                |
| updatedAt | timestamp            | Data de atualização            |

## 📚 Endpoints da API

| Método | Rota           | Descrição                       |
| ------ | -------------- | ------------------------------- |
| GET    | /users      | Lista todos os usuários         |
| GET    | /users/\:id | Busca um usuário por ID         |
| POST   | /users      | Cria um novo usuário            |
| PUT    | /users/\:id | Atualiza os dados de um usuário |
| DELETE | /users/\:id | Deleta um usuário               |

## 📄 Exemplo de JSON para criar/atualizar um usuário

```
{
    "name": "John Doe",
    "email": "johndoe@email.com"
}
```

## 📌 Comandos

Instalar todas as dependências indicadas pelo arquivo `package.json`

```
npm install
```

Compilar o arquivo TypeScript.

```
npx tsc
```

Executar as migrations para criar as tabelas no banco de dados.

```
npx typeorm migration:run -d dist/data-source.js
```

Executar o arquivo gerado com `Node.js`

```
node dist/index.js
```

## ⚙️ Criação do Projeto

Criar o arquivo package.

```
npm init
```

Instalar o framework `Express`

```
npm i express
```

Instalar os pacotes para suporte ao `TypeScript`

```
npm i --save-dev @types/express
npm i --save-dev @types/node
```

Instalar o compilador `TypeScript`

```
npm i --save-dev ts-node
```

Gerar o arquivo de configuração para o `TypeScript`

```
npx tsc --init
```

Instalar `TypeORM` para conexão com banco de dados.

```
npm install typeorm --save
```

Biblioteca utilizada no `TypeScript` para adicionar metadados (informações adicionais) a classes.

```
npm install reflect-metadata --save
```

Instalar o drive do banco de dados MySQL.

```
npm install mysql2 --save
```

Criar a migration que será usada para criar a tabela no banco de dados.

```
npx typeorm migration:create src/migration/<nome-da-migration>
```

Executar as migrations para criar as tabelas no banco de dados.

```
npx typeorm migration:run -d dist/data-source.js
```