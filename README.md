<h1 align=center>
  Um exemplo de CRUD usando JS
</h1>

<p align=center>
  Nesse CRUD ainda apresento:
  <ul>
    <li>JavaScript</li>
    <li>Typescript</li>
    <li>Booststrap</li>
    <li>Express</li>
  </ul>
</p>

# Detalhes sobre o projeto
Esse projeto visa criar uma estrutura de CRUD usando JS e TS.

# Requisitos
- Node.js
- Typescript
- Express
- Bootstrap

# Passos para executar a API

<h4>1. Clonar o repositório</h4>

 <p>Copie e cole o código abaixo no terminal onde você fará toda a instalação da API</p>
   
```bash
git clone https://github.com/andresalerno/task3.git

```

<h4>2. Instalar as dependências</h4>

<p>Para instalar as dependências existentes no arquivo <strong>package.json</strong>, no diretório onde estiver esse arquivo, execute:</p>

```bash
npm install

```

<p>Todas as dependências necessárias para a execução desse projeto, inclusive com suas respectivas versões, serão instaladas. Você observará o aparecimento de um diretório chamado <strong>node_modules</strong></p>

<h4>3. Execução da aplicação</h4>

<p>Para executar a aplicação, você deve digitar o seguinte código abaixo em seu terminal

  Observação importante: você deve estar no mesmo diretório onde está o arquivo app.js

</p>

```bash
node .\app.js

```

<h4>4. Ambiente Web</h4>

<h5>4.1 Página Inicial</h5>

<p>Na página inicial <link>http://localhost:3000/</link> você acessa a aplicação.</p>

<h5>4.2 Adiciona tarefas</h5>

<p>Clicando no botão verde você adiciona tarefas:

<ul>
  <li>Descrição da tarefa</li>
  <li>Status: por default ela já aparece como false</li>
</ul>

Logo após a sua adição, aparecerá um popup pedindo a sua confirmação e o retorno da página se dará para uma lista de tarefas.

Se você tentar adicionar uma tarefa com a mesma descrição, aparecerá um popup dizendo que a tarefa ja existe. Você clicará nesse botão, e retornará para a página para adicionar uma tarefa de nome distinto.

</p>

<h5>4.3 Filtros</h5>

<p>No menu dropdown você terá 3 (três) opções:

<ul>
  <li>Todas (default)</li>
  <li>True</li>
  <li>False</li>

</ul>

Ao selecionar uma das 3 (três) opções listadas acima, e clicar no botão Filtrar, aparecerão tão somentes as tarefas filtradas.

</p>

<h5>4.4 Editar</h5>

<p>

Do lado direito da tela você encontrará um botão na cor laranja de nome Editar. Nele será possível editar a descrição da tarefa (somente se for diferente das tarefas existentes) como também o status da tarefa.

</p>

<h5>4.5 Excluir</h5>

<p>

No lado extremo direito você encontrará um botão vermelho chamado Excluir. Ao clicar nele aparecerá uma mensagem de confirmação para você dar sequência ou não na exclusão. Caso não queira prosseguir com a exclusão, você deve clicar no botão Cancelar.

</p>