# Gestor P&D

Este projeto foi gerado com [Angular CLI](https://github.com/angular/angular-cli) versão 7.1.4.

## Preconfiguração

Abra o arquivo `src/environments/environment.[local|prod].ts` e altere a propriedade `api_url` para o endereço que a api está.

```js
export const environment = {
  ...
  api_url: "URL_DA_API",
  ...
};
```

### Proxy

O arquivo na raiz `angular.json` está com o proxy configurado `(project -> sistema-ped -> architect -> serve -> options -> proxyConfig)`. \
No arquivo referenciado `src/proxy.conf.json` altere a url que a api está

```json
// Só se aplica ao ambiente de desenvolvimento
{
  "/api": {
    "target": "https://localhost:8080",
    "secure": false
  }
}
```

Para desabilitar remova a propriedade `proxyConfig` no arquivo angular.json

### User Admin

Em ambiente desenvolvimento o formulário de login já estará preenchido com usuário e senha. Os dados de login/senha podem ser alterado no arquivo `src/environments/environment.local.ts`.

```js
export const environment = {
  ...
  autologin: {
    user: "",
    pass: ""
  }
  ...
};
```

## Servidor de desenvolvimento

No terminal execute o comamndo `ng serve` para rodar o servidor de desenvolvimento. Navegue para `http://localhost:4200/`. O aplicativo irá atualizar a página se qualquer arquivo do projeto for alterado.

## Code scaffolding

Execute o comando `ng generate component component-name` Para gerar um novo componente. Você também pode user `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Execute o comando `ng build` para compilar o projeto. Os arquivos gerados estarão em no diretório `dist/stage`. Use a flag `--prod` para compilar uma versão de produção que estará localizada na pasta `dist/production`.

## Further help

Para mais informações de ajudar com a CLI do angular use o comando `ng help` ou veja também a página [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
