## API CRUD de Produtos (Node.js, Express, MongoDB)

Projeto de API com cadastro/login de usuários, CRUD de produtos e upload de imagem usando `multer`. As imagens são servidas estaticamente via rota `/uploads`.

### Tecnologias
- **Servidor**: Express
- **Banco**: MongoDB (Mongoose)
- **Autenticação**: JWT (login)
- **Criptografia**: bcryptjs
- **Upload**: multer (armazenamento em disco)
- **E-mail**: nodemailer (Gmail)

## Como executar

### 1) Requisitos
- Node.js 18+
- MongoDB Atlas (ou cluster compatível)

### 2) Variáveis de ambiente (.env)
Crie um arquivo `.env` na raiz do projeto com:

```
PORT=3000
DB_USER=seu_usuario_mongodb
DB_PASS=sua_senha_mongodb
JWT_SECRET=um_segredo_seguro
EMAIL_USER=seu_email_gmail@gmail.com
EMAIL_PASS=sua_senha_ou_app_password
```

- `DB_USER` e `DB_PASS` são usados em `config/db.js` para conectar no cluster Atlas.
- `EMAIL_USER` e `EMAIL_PASS` são usados em `controllers/UsuarioController.js` para enviar e-mail de boas-vindas.

### 3) Instalar dependências

```bash
npm install
```

### 4) Subir o servidor (desenvolvimento)

```bash
npm run dev
```

Ou produção:

```bash
npm start
```

O servidor inicia em `http://localhost:PORT` (padrão `3000`). A pasta `uploads/` é servida em `/uploads`.

## Estrutura principal

- `server.js`: configura Express, middlewares, estáticos e registra as rotas `produtos` e `usuarios`.
- `config/db.js`: conexão com MongoDB Atlas usando `mongoose` e variáveis do `.env`.
- `config/multer.js`: configuração do `multer` (destino `uploads/`, nomes únicos e filtro de imagens `.jpeg|.jpg|.png|.gif`).
- `routes/produtoRouter.js`: rotas REST de produtos, com upload de imagem no `POST` e `PUT` (campo `imagem`).
- `routes/usuarioRouter.js`: rotas de autenticação: `registrar` e `login`.
- `controllers/ProdutoController.js`: lógica de CRUD de produto.
- `controllers/UsuarioController.js`: registrar usuário (envia e-mail) e login (gera JWT).
- `models/Produto.js`: schema do produto (`nome`, `descricao`, `preco`, `estoque`, `imagem`).
- `models/usuario.js`: schema do usuário (`nome`, `email`, `senha`).
- `uploads/`: diretório de armazenamento das imagens enviadas (servido via `/uploads`).
- `frontend.html`: arquivo estático opcional para testes simples (quando aplicável).

Observação: existem `Picture.js` e `PictureController.js` na raiz, que não estão referenciados pelas rotas atuais.

## Rotas

Base URL: `http://localhost:3000`

### Saúde
- `GET /` → "API CRUD de Produtos com Autenticação e Upload de Imagem"
- Estático: `GET /uploads/<arquivo>` → retorna a imagem enviada.

### Usuários
- `POST /usuarios/registrar`
  - Body (JSON): `{ "nome": string, "email": string, "senha": string }`
  - Envia um e-mail de boas-vindas e cadastra o usuário (e-mail único).

- `POST /usuarios/login`
  - Body (JSON): `{ "email": string, "senha": string }`
  - Retorna `{ token }` (JWT) em caso de sucesso.

### Produtos
- `GET /produtos` → lista todos os produtos.
- `GET /produtos/:id` → obtém um produto pelo ID.

- `POST /produtos`
  - Formato: `multipart/form-data`
  - Campos:
    - `nome` (string, obrigatório)
    - `descricao` (string, opcional)
    - `preco` (number, obrigatório)
    - `estoque` (number, obrigatório)
    - `imagem` (file, opcional — campo do arquivo deve se chamar `imagem`)
  - Cria um novo produto. Se enviado, a imagem será salva em `uploads/` e o caminho público salvo em `imagem`.

- `PUT /produtos/:id`
  - Formato: `multipart/form-data`
  - Mesmos campos do `POST`. Atualiza o produto. (Observação: a implementação atual substitui apenas campos textuais; adapte conforme a necessidade para atualizar a imagem.)

- `DELETE /produtos/:id` → remove o produto.

## Exemplos de requisições

### Criar Produto (com imagem via cURL)
```bash
curl -X POST http://localhost:3000/produtos \
  -F "nome=Tênis Vans Old Skool" \
  -F "descricao=Clássico e confortável" \
  -F "preco=399.9" \
  -F "estoque=10" \
  -F "imagem=@./caminho/para/arquivo.jpg"
```

### Login de Usuário
```bash
curl -X POST http://localhost:3000/usuarios/login \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","senha":"minha_senha"}'
```

A resposta será semelhante a:
```json
{"token":"<jwt>"}
```

## Notas e dicas
- Se usar Gmail, configure um App Password (senhas de app) para `EMAIL_PASS` e verifique permissões de acesso.
- Certifique-se de que a pasta `uploads/` exista e tenha permissão de escrita. Ela é criada automaticamente quando o primeiro upload ocorre, mas você pode criá-la manualmente.
- O campo do arquivo no formulário deve se chamar exatamente `imagem` (ver `config/multer.js` e `routes/produtoRouter.js`).
- O schema `Produto` define `imagem` como obrigatório; se não quiser exigir upload sempre, ajuste `required` para `false` em `models/Produto.js`.
- Considere proteger as rotas de produtos com middleware de autenticação (`middlewares/auth.js`) se desejar.

## Scripts NPM
- `npm run dev`: inicia com `nodemon`.
- `npm start`: inicia com `node`.

## Licença
ISC (padrão do `package.json`).
