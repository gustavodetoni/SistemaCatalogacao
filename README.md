# Sistema de Catalogação

## Descrição

Este projeto foi desenvolvido para auxiliar um biólogo especializado em grandes roedores na catalogação das capivaras presentes no zoológico onde trabalha. O método tradicional de registro em caderno se tornou impraticável devido ao aumento do número de animais, e este software foi criado para otimizar o processo de gestão e organização dessas informações.

## Funcionalidades

- **CRUD de Capivaras**: Permite adicionar, editar, visualizar e excluir registros de capivaras.
- **Filtragem**: Sistema de filtro por idade, peso, status de saúde e habitat.
- **Download de Dados**: Possibilidade de exportar os registros em formato CSV para fácil compartilhamento.
- **Sistema Responsivo**: Layout que se adapta a diferentes tamanhos de tela.
- **Integração com Banco de Dados ElephantSQL**: Armazena as informações das capivaras de forma segura e acessível.
- **API RESTful**: Desenvolvida em Node.js com Express, garantindo um backend robusto.
- **Frontend com Vue.js**: Interface intuitiva para fácil uso do sistema.

## Tecnologias Utilizadas

- **Backend**: Node.js, Express, MySQL
- **Frontend**: Vue.js
- **Banco de Dados**: MySQL (usando [ElephantSQL](https://www.elephantsql.com/) na nuvem)
- **Docker**: Utilizado para gerenciar os ambientes de desenvolvimento e produção.
- **Deploy**: Aplicação em produção [Link do Deploy](https://sistema-catalogacao.vercel.app/)

## Passo a Passo

### 1. Clone o Repositório

```bash
git clone https://github.com/seu-usuario/seu-repositorio.git
cd seu-repositorio 
```

### 2 Instalação de Dependências

**Backend**
Navegue até a pasta do backend e instale as dependências:

```bash
cd backend
npm install
```
**Frontend**
Faça o mesmo para o frontend:

```bash
cd ../frontend
npm install
```

### 3 Executando a Aplicação com Docker (Opcional)

Caso queira rodar o projeto em contêineres, use Docker.

No diretório raiz do projeto, execute:

```bash
docker-compose up
```

### 4 Executando a API e o Frontend
Sem Docker, execute a API e o frontend manualmente:

**Backend**
No diretório backend, inicie o servidor:

```bash
npm start
```
**Frontend**
No diretório frontend, inicie o frontend:

```bash
npm run dev
```

## Deploy 

A aplicação está em produção e pode ser acessada através do seguinte link: 

[Link do Deploy](https://sistema-catalogacao.vercel.app/)