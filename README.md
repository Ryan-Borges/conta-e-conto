# 🎮 Conta & Conto

O **Conta & Conto** é uma plataforma educacional gamificada desenvolvida com o objetivo de tornar o estudo de **Matemática** e **Língua Portuguesa** mais dinâmico, interativo e competitivo.

O projeto permite que o usuário pratique conteúdos por meio de desafios com diferentes níveis de dificuldade, acompanhe seus recordes e dispute posições no ranking do modo Brutal.

---

## 🌐 Acesse o projeto

🔗 **Site:**  
https://conta-e-conto.vercel.app

---

## 🎯 Objetivo do projeto

O Conta & Conto foi desenvolvido como **Projeto Integrador do IFRN**, com o objetivo de integrar conhecimentos adquiridos ao longo do **Curso Técnico Integrado em Informática**.

A proposta foi desenvolver uma aplicação web funcional que reunisse conhecimentos técnicos de programação e banco de dados com conteúdos de Matemática e Língua Portuguesa.

A competição também faz parte da proposta do projeto. Ela está presente frequentemente em diferentes momentos da nossa vida e pode ser utilizada como uma ferramenta de motivação para o estudo.

No **modo Brutal**, os jogadores podem registrar seus melhores resultados e comparar seu desempenho através dos rankings.

Além de competir com outros usuários, a plataforma incentiva o jogador a superar seus próprios resultados e continuar praticando.

---

## 📚 Disciplinas envolvidas

### ⚓ Disciplina âncora

- **Programação para Internet**

### 📖 Disciplinas auxiliares

- Autoria Web
- Programação com Acesso a Banco de Dados
- Banco de Dados
- Língua Portuguesa
- Matemática

---

## 🕹️ Funcionalidades

O Conta & Conto possui:

- 🔐 Cadastro de usuários
- 🔑 Sistema de login
- 👤 Perfil individual
- 🧮 Jogo de Matemática
- 📖 Jogo de Língua Portuguesa
- 🎚️ Diferentes níveis de dificuldade
- 🔥 Modo Brutal
- 🏆 Ranking de Matemática
- 🏆 Ranking de Português
- 💾 Armazenamento de recordes
- 📚 Área de aprendizagem
- 🧠 Estratégias de cálculo mental
- 📝 Revisão de classes gramaticais
- ⌨️ Teclado numérico para dispositivos móveis
- 📱 Interface adaptada para diferentes dispositivos

---

## 🎮 Modos de jogo

O jogador pode escolher entre diferentes modos de dificuldade.

### 🌱 Tranquilo

Modo indicado para praticar os conteúdos com menor pressão.

### ⚡ Velocidade

O jogador precisa responder com mais rapidez.

### 🔥 Brutal

O modo mais competitivo da plataforma.

Os resultados obtidos no modo Brutal são armazenados e utilizados nos rankings de:

- 🧮 Matemática
- 📖 Português

---

## 🧮 Matemática

O jogo de Matemática trabalha com operações matemáticas e cálculo mental.

A área **Aprender** apresenta estratégias para tornar os cálculos mais rápidos e eficientes, como:

- decomposição de números;
- arredondamento;
- compensação;
- completar dezenas;
- multiplicação por 5;
- multiplicação por 9;
- multiplicação por 11;
- divisão por 4;
- divisão por 5;
- divisão por 25;
- dobrar um fator e dividir o outro pela metade.

### Exemplo de subtração

Para calcular:

```text
120 - 79
```

é possível fazer:

```text
120 - 80 = 40
40 + 1 = 41
```

### Exemplo de divisão

Para calcular:

```text
145 ÷ 5
```

é possível fazer:

```text
145 × 2 = 290
290 ÷ 10 = 29
```

---

## 📖 Língua Portuguesa

O jogo de Português utiliza questões armazenadas em banco de dados e trabalha principalmente com a identificação de classes gramaticais em frases.

Atualmente, o banco possui **80 questões**.

A área de aprendizagem aborda as dez classes gramaticais:

- Substantivo
- Adjetivo
- Artigo
- Numeral
- Pronome
- Verbo
- Advérbio
- Preposição
- Conjunção
- Interjeição

Cada conteúdo possui explicações e exemplos para auxiliar o jogador antes ou depois das partidas.

---

## 🛠️ Tecnologias utilizadas

### Frontend

- HTML5
- CSS3
- JavaScript

### Backend

- Node.js
- Express

### Banco de dados

- MySQL

### Autenticação e segurança

- JSON Web Token (JWT)
- bcryptjs
- Variáveis de ambiente

### Hospedagem

- **Vercel** — Frontend
- **Render** — Backend/API
- **Aiven** — Banco de dados MySQL

---

## 🏗️ Arquitetura

A aplicação funciona seguindo esta estrutura:

```text
Usuário
   ↓
Frontend
HTML + CSS + JavaScript
   ↓
API REST
Node.js + Express
   ↓
Banco de Dados
MySQL
```

Na versão publicada:

```text
Vercel
Frontend
   ↓
Render
Backend / API
   ↓
Aiven
MySQL
```

---

## 📂 Estrutura do projeto

```text
conta-e-conto/
│
├── css/
│   └── style.css
│
├── docs/
│   └── portugues.json
│
├── js/
│   └── script.js
│
├── server/
│   ├── migrations/
│   │   └── 001_senha_alterada_em.sql
│   ├── database.js
│   ├── migrate.js
│   ├── schema.sql
│   ├── server.js
│   ├── package.json
│   └── package-lock.json
│
├── avatars/
│   ├── 01.webp … 12.webp
│   └── sm/
│       └── 01.webp … 12.webp
│
├── index.html
├── vercel.json
├── .gitignore
└── README.md
```

O arquivo `docs/portugues.json` é mantido como referência e backup, enquanto as questões utilizadas pela versão atual são obtidas através do banco de dados MySQL.

A estrutura das tabelas fica em `server/schema.sql`.

---

## 🔐 Segurança

Informações sensíveis, como:

- senha do banco de dados;
- host do banco;
- segredo utilizado pelo JWT;

não são armazenadas diretamente no código-fonte.

Esses dados são configurados através de **variáveis de ambiente**.

O arquivo `.env` não é enviado ao GitHub.

As senhas dos usuários também não são armazenadas em texto puro, sendo protegidas utilizando **bcryptjs**.

---

## 💻 Executando localmente

Clone o repositório:

```bash
git clone https://github.com/Ryan-Borges/conta-e-conto.git
```

Entre na pasta do projeto:

```bash
cd conta-e-conto
```

Depois entre na pasta do backend:

```bash
cd server
```

Instale as dependências:

```bash
npm install
```

Crie um arquivo `.env` dentro da pasta `server`:

```text
server/.env
```

Adicione as variáveis necessárias:

```env
DB_HOST=
DB_USER=
DB_PASSWORD=
DB_NAME=
DB_PORT=
JWT_SECRET=
```

Variáveis opcionais (recuperação de senha e formulário de contato):

```env
BREVO_API_KEY=
EMAIL_FROM=
CONTACT_EMAIL=
FRONTEND_URL=
RESET_TOKEN_MINUTES=30
```

Prepare o banco.

Banco novo (cria todas as tabelas):

```bash
mysql -h HOST -P PORTA -u USUARIO -p NOME_DO_BANCO < schema.sql
```

Banco que já existe (aplica só o que falta, usando o
`.env` — não precisa do cliente `mysql` instalado):

```bash
npm run migrate
```

Para ver o que está pendente sem aplicar nada:

```bash
npm run migrate:lista
```

Depois execute o backend:

```bash
npm start
```

Por padrão, o backend ficará disponível localmente em:

```text
http://localhost:3000
```

O frontend pode ser executado utilizando uma extensão como **Live Server** no Visual Studio Code.

Use a porta **5500** — é a que está liberada no CORS do backend.

Quando o site é aberto por `localhost` ou `127.0.0.1`, o frontend
aponta sozinho para o backend local (`http://localhost:3000`).
Em qualquer outro endereço usa a API publicada, sem precisar
alterar código.

Para usar a API de produção mesmo rodando local, execute no
console do navegador:

```js
localStorage.setItem("apiUrl", "https://conta-e-conto-api.onrender.com")
```

Para voltar ao padrão:

```js
localStorage.removeItem("apiUrl")
```

---

## 🌐 API

O backend do projeto disponibiliza uma API REST responsável pela comunicação entre o frontend e o banco de dados.

Entre suas funções estão:

- cadastro de usuários;
- autenticação;
- consulta de perfil;
- armazenamento de recordes;
- consulta dos recordes do usuário;
- ranking;
- carregamento das questões de Português.

---

## 🗄️ Banco de dados

O projeto utiliza MySQL para armazenar informações persistentes.

As principais tabelas são:

### `usuarios`

Armazena:

- ID do usuário;
- nome de usuário;
- senha criptografada;
- data de cadastro.

### `records`

Armazena:

- usuário;
- jogo;
- modo;
- melhor recorde;
- data da última atualização.

### `questoes_portugues`

Armazena:

- nível;
- frase;
- palavra analisada;
- classe gramatical correta;
- alternativas;
- explicação da resposta.

---

## 🏆 Ranking

O ranking é utilizado exclusivamente no **modo Brutal**.

Existem rankings separados para:

- 🧮 Matemática
- 📖 Português

O sistema armazena o melhor resultado de cada usuário no modo Brutal.

As três primeiras posições recebem destaque visual:

- 🥇 1º lugar
- 🥈 2º lugar
- 🥉 3º lugar

---

## 📚 Área Aprender

Além dos jogos, o Conta & Conto possui uma área destinada à revisão dos conteúdos.

### 🧮 Matemática

Apresenta estratégias de cálculo mental, como:

- compensação;
- arredondamento;
- decomposição;
- completar dezenas e centenas;
- propriedades de multiplicação e divisão;
- reconhecimento de padrões numéricos.

### 📖 Português

Apresenta explicações sobre as dez classes gramaticais da Língua Portuguesa, com definições e exemplos contextualizados.

O objetivo é permitir que o usuário não apenas responda às questões, mas também tenha acesso a conteúdos que auxiliem no processo de aprendizagem.

---

## 🏆 Competição e aprendizagem

A competição está presente de forma frequente em diferentes situações da vida, como:

- esportes;
- jogos;
- processos seletivos;
- desafios acadêmicos;
- metas pessoais.

O Conta & Conto utiliza esse elemento como uma ferramenta para estimular o estudo.

A proposta não é apenas competir contra outros jogadores, mas também incentivar cada usuário a superar seus próprios resultados.

O ranking e o modo Brutal transformam a prática dos conteúdos em um desafio, criando um incentivo adicional para que o jogador continue estudando e melhorando seu desempenho.

---

## 🎓 Projeto Integrador — IFRN

O Conta & Conto foi desenvolvido como parte do **Projeto Integrador do Curso Técnico Integrado em Informática do IFRN**.

A disciplina âncora foi:

- **Programação para Internet**

O projeto também integrou conhecimentos das seguintes disciplinas:

- Autoria Web;
- Programação com Acesso a Banco de Dados;
- Banco de Dados;
- Língua Portuguesa;
- Matemática.

A proposta do Projeto Integrador é reunir conhecimentos de diferentes componentes curriculares em uma aplicação prática, permitindo aplicar conteúdos estudados ao longo do curso na construção de um sistema funcional.

---

## 🚀 Deploy

O projeto utiliza serviços diferentes para cada parte da aplicação.

```text
GitHub
   ↓
   ├── Vercel
   │      ↓
   │   Frontend
   │
   └── Render
          ↓
       Backend
          ↓
        Aiven
          ↓
         MySQL
```

O código-fonte é armazenado no GitHub.

Quando novas alterações são realizadas, elas podem ser enviadas com:

```bash
git add .
git commit -m "Descrição da alteração"
git push
```

Os serviços conectados ao repositório podem então realizar novos deploys automaticamente.

---

## 🔄 Atualizações futuras

O projeto pode continuar sendo atualizado mesmo após sua publicação.

Possíveis melhorias futuras incluem:

- novas questões de Português;
- novos conteúdos educacionais;
- novas estratégias de cálculo mental;
- melhorias visuais;
- novos modos de jogo;
- sistema de conquistas;
- estatísticas individuais;
- histórico de partidas;
- novas matérias.

---

## 👨‍💻 Criador

**Ryan Borges**

Projeto desenvolvido no contexto do **Curso Técnico Integrado em Informática do IFRN**.

---

## 📌 Status do projeto

✅ **Projeto funcional e publicado**

O Conta & Conto possui atualmente:

- frontend publicado;
- backend online;
- banco de dados online;
- autenticação de usuários;
- armazenamento de recordes;
- rankings;
- jogos de Matemática e Português;
- 80 questões de Língua Portuguesa;
- área educacional;
- suporte para acesso em computadores e dispositivos móveis.

O projeto permanece aberto a novas funcionalidades, conteúdos e melhorias futuras.