# 🎫 Sistema de Gerenciamento de Tickets (Backend)

API REST desenvolvida com foco em gerenciamento de tickets corporativos, permitindo que empresas organizem seus atendimentos internos por departamentos, usuários e status.

## 🚀 Tecnologias utilizadas

- Node.js
- NestJS
- TypeScript
- JWT (Autenticação)
- REST API
- Banco de dados relacional

## 📌 Funcionalidades

- ✅ Cadastro e gerenciamento de empresas
- ✅ Controle de departamentos por empresa
- ✅ Gestão de usuários vinculados à empresa
- ✅ Sistema de autenticação (Admin e Usuário)
- ✅ Criação e gerenciamento de tickets
- ✅ Filtro de tickets por status
- ✅ Controle de status (aberto, fechado, etc.)
- ✅ Relacionamento entre empresa, usuário e departamento

---

## 🔐 Autenticação

A API utiliza **JWT (JSON Web Token)**.

### Login Usuário
POST `/auth/login/usuario`

### Login Empresa (Admin)
POST `/auth/login/empresa`

Após o login, utilize o token nas rotas protegidas:
