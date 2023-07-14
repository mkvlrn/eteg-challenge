# eteg-challenge

---

## rodando o projeto

### live

<https://mkvlrn-eteg-challenge.up.railway.app/>

### localhost via docker compose (simula production)

requisitos:

- docker, testado com versão 24.0.2
- docker-compose, testado com versão 2.19.1
- yarn, testado com versão 1.22.19
- node 18 testado com versão 18.16.1 (projeto usa ES modules e async em top level)
- porta 4000 disponível

instruções:

1. clone o projeto e instale as dependências

   ```bash
   git clone git@github.com:mkvlrn/eteg-challenge
   cd eteg-challenge
   yarn install
   ```

2. inicie o profile `prod` com docker-compose

   ```bash
   docker-compose --profile prod up -d
   ```

3. acesse o projeto em <http://localhost:4000>

### localhost via docker e node (dev)

requisitos:

- docker, testado com versão 24.0.2
- docker-compose, testado com versão 2.19.1
- yarn, testado com versão 1.22.19
- node 18 testado com versão 18.16.1 (projeto usa ES modules e async em top level)
- portas 3000 e 4000 disponíveis

instruções:

1. clone o projeto e instale as dependências

   ```bash
   git clone git@github.com:mkvlrn/eteg-challenge
   cd eteg-challenge
   yarn install
   ```

2. crie um arquivo .env baseado no .env.example

   ```bash
   cp .env.example .env
   ```

3. inicie o profile `dev` com docker-compose

   ```bash
   docker-compose --profile dev up -d
   ```

4. execute as migrations

   ```bash
   yarn prisma migrate dev
   ```

5. inicie o projeto

   ```bash
    yarn dev
   ```

6. acesse o projeto em <http://localhost:3000>
