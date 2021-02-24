# Testes Automatizados

## 1. Testes unitátios

> Os testes unitários são os testes que testar determinada funcionalidade da aplicação, seja um serviço ou uma função expecífica.

Geralmente utiliza-se quando está utilizando o TDD (Test Driven Development).

Nunca testar fazendo acesso a banco de dados ou API's externas.

## 2. Testes de integração

> Testa a funcionalidade completa da aplicação.

Exemplo teste da criação de um usuário:

```
request -> routes -> controller -> repository
<- repository <- controller <- response
```

Testa todo o fluxo da aplicação.

## 3. Ponta a Ponta (E2E)

> Testa toda a ação do usuáro em uma aplicação, é mais utilizado para testar o front-end.
