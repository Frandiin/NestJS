# API REST NestJS

## Descrição

API REST desenvolvida com NestJS, PostgreSQL e Prisma ORM para gerenciamento de usuários, produtos e planos.

## Configuração do Projeto

```bash
# Instalação de dependências
npm install

# Configuração do banco de dados
npx prisma generate
npx prisma migrate dev
```

## Estrutura do Banco de Dados

O projeto utiliza PostgreSQL com as seguintes tabelas:

### Users

- id: Int (Primary Key)
- name: String
- email: String (Unique)
- password: String
- createdAt: DateTime
- updatedAt: DateTime

### Products

- id: Int (Primary Key)
- name: String
- price: String
- description: String
- imageUrl: String

### Plans

- id: Int (Primary Key)
- name: String
- price: String
- description: String

## Executar o projeto

```bash
# development
npm run start

# watch mode
npm run start:dev

# production mode
npm run start:prod
```

## Executar testes

```bash
# unit tests
npm run test

# e2e tests
npm run test:e2e

# test coverage
npm run test:cov
```

## Deploy

Para fazer o deploy da aplicação em produção, siga os passos na [documentação de deploy](https://docs.nestjs.com/deployment) do NestJS.

## Endpoints da API

### Autenticação

- POST /auth/login - Login de usuário
- POST /auth/register - Registro de novo usuário

### Produtos

- GET /products - Lista todos os produtos
- GET /products/:id - Obtém um produto específico
- POST /products - Cria um novo produto
- PATCH /products/:id - Atualiza um produto
- DELETE /products/:id - Remove um produto

### Planos

- GET /plans - Lista todos os planos
- GET /plans/:id - Obtém um plano específico
- POST /plans - Cria um novo plano
- PATCH /plans/:id - Atualiza um plano
- DELETE /plans/:id - Remove um plano

## Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/database_name"
```

## Licença

Este projeto está sob a licença MIT.
