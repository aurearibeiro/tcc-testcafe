# tcc-testcafe

- [Sobre](#-sobre)
- [Como executar](#-como-executar)

## 💻 Sobre
Este é um projeto utilizando o testcafe, uma ferramenta javascript, para rodar teste de software no portal do Inatel.

## 🚀 Como executar

### Pré-requisitos

Antes de começar, você vai precisar ter instalado em sua máquina as seguintes ferramentas:

* [Git](https://git-scm.com/)
* [Visual Studio Code](https://code.visualstudio.com/) como editor de texto, ele será útil para obter as dependências e executar o app.
* [npm](https://www.npmjs.com/package/npm) ou [yarn](https://classic.yarnpkg.com/lang/en/docs/install/#windows-stable)
* [Node.js](https://nodejs.org/en/)

### Clonando repositório

Para clonar o repositório em algum lugar na sua máquina, basta utilizar o comando abaixo:
```bash
$ git clone https://github.com/aurearibeiro/tcc-testcafe.git
```

### Instalando dependências da aplicação
Recomendamos utilizar o VisualStudio Code, ao abrir o código dentro dele, baixe as dependências pelo terminal:
```
npm install ou yarn install - Instala todas as dependências necessárias.
```

### Iniciando a aplicação
* Para rodar os testes, abra o terminal do VsCode e digite o comando:
```
npm test ou yarn test
```

* Para rodar os testes e atualizar a documentação, abra o terminal do VsCode e digite o comando:
```
npx testcafe chrome tests/basic.test.js --reporter html:report.html
```

* Para gerar os vídeos, abra o terminal do VsCode e digite o comando:
```
npx testcafe chrome tests/basic.test.js --video artifacts/videos
```

* Para tirar os prints da tela, abra o terminal do VsCode e digite o comando:
```
testcafe chrome tests/sample-fixture.js -s takeOnFails=true
```
