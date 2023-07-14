# eteg-challenge

[![Maintainability](https://api.codeclimate.com/v1/badges/53e208feae1af865ac2d/maintainability)](https://codeclimate.com/github/mkvlrn/eteg-challenge/maintainability) [![Test Coverage](https://api.codeclimate.com/v1/badges/53e208feae1af865ac2d/test_coverage)](https://codeclimate.com/github/mkvlrn/eteg-challenge/test_coverage)

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

---

## validando cpf

o validador de cpf usa o algorítmo de validação [wikipedia](https://pt.wikipedia.org/wiki/Cadastro_de_Pessoas_F%C3%ADsicas#Algoritmo) oficial, então CPFs válidos precisam ser inseridos. aqui vão alguns exemplos:

| CPF         |
| ----------- |
| 91128788047 |
| 21138613053 |
| 18908711090 |
| 86115817099 |
| 30665729006 |
| 24174131082 |
| 40219855064 |

outros podem ser gerados em <https://www.geradordecpf.org/>
