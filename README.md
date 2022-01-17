# Gestor PDI

## Instalação

### Pré-requisitos

- [Node](https://nodejs.org) 14 Instalado
- [Angular CLI](https://angular.io/guide/setup-local) para instalar use o comando:`npm i -g @angular/cli`
- Dependencias dos projeto instaladas: `npm install`

## Preconfiguração

Abra o arquivo `src/environments/environment.[local|prod].ts` e altere a propriedade `api_url` para o endereço que a api
está.

```js
export const environment = {
  ...
    api_url
:
"URL_DA_API",
...
}
;
```

### Proxy (Só se aplica ao ambiente de desenvolvimento)

O arquivo na raiz `angular.json` está com o proxy
configurado `(project -> sistema-ped -> architect -> serve -> options -> proxyConfig)`. \
No arquivo referenciado `src/proxy.conf.json` altere a url que a api está

```json
{
  "/api": {
    "target": "http://localhost:5000",
    "secure": false
  }
}
```

Para desabilitar remova a propriedade `proxyConfig` no arquivo angular.json

## Servidor de desenvolvimento

No terminal execute o comamndo `ng serve` para rodar o servidor de desenvolvimento. Navegue
para `http://localhost:4200/`. O aplicativo irá atualizar a página se qualquer arquivo do projeto for alterado.

## Publicação

Execute o comando `ng build` para compilar o projeto.\
Os arquivos gerados estarão em no diretório `dist/stage`.\
Use a
flag `--prod` para compilar uma versão de produção que estará localizada na pasta `dist/production`.

Execute o comando `npm run build` e será compilado em modo de produção e será gerado um arquivo zip com o nome do projeto e a
versão atual.

## Dificuldades

### Comando`ng serve` ou `ng build` não encontrado
Verifique se o [Node](https://nodejs.org) 14 está instalado na máquina e, caso esteja, execute o comando npm install -g @angular/cli
 
### Erros na compilação
Verfique se a versão do node instalada é 14.x, caso seja superior ocorrerão erros de compatibilidade com as dependencias.\
Faça o downgrade da versão, exclua a pasta node_modules e execute o comando `npm install`.

### A aplicação abre com a mensagem  _'Erro na comunicação com o servidor, verifique a conexão com a internet e tente novamente mais tarde'_.
- Verifique se a propriedade api_url no arquivo de configuração está correto
- O servidor da api pode não está online no momento.
- As configurações de CORS da api podem estar ausentes ou não incluem o url atual do client (Padrão em desenvolvimento: http://localhost:4200)
