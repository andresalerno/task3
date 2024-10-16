var express = require('express');
var bodyParser = require('body-parser');
var app = express();

// Configuração do bodyParser para JSON
app.use(bodyParser.json());  // Para processar requisições com JSON
app.use(bodyParser.urlencoded({ extended: true }));  // Para processar requisições com dados de formulários

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));

// Armazenamento em memória para as tarefas
var tarefas = [];

// Rota principal que exibe a lista de tarefas
app.get('/', function(req, res) {
    // Captura o status da query string
    var status = req.query.status || 'all'; // Se não houver status, default para 'all'


    // Se o status for 'all' ou indefinido, mostra todas as tarefas
    // Verifica o valor do status e aplica o filtro correspondente
    var tarefasFiltradas;
    if (status === 'all') {
        tarefasFiltradas = tarefas;  // Sem filtro, mostra todas as tarefas
    } else if (status === 'true') {
        tarefasFiltradas = tarefas.filter(tarefa => tarefa.status === true);
    } else if (status === 'false') {
        tarefasFiltradas = tarefas.filter(tarefa => tarefa.status === false);
    }

    // Renderiza o template 'index' com as tarefas filtradas
    res.render('index', { tarefas: tarefasFiltradas, filtroSelecionado: status });
});


// Rota que retorna as tarefas em formato JSON
app.get('/tarefas', function(req, res) {
    // Verifica se o parâmetro de status foi passado
    if (req.query.status !== undefined && req.query.status !== 'all') {
        // Converte o parâmetro de string para booleano
        var status = req.query.status === 'true';  // 'true' => true, 'false' => false

        // Filtra as tarefas de acordo com o status
        var tarefasFiltradas = tarefas.filter(function(tarefa) {
            return tarefa.status === status;  // Retorna apenas as tarefas com o status correspondente
        });

        // Retorna a lista de tarefas filtrada
        return res.json(tarefasFiltradas);
    }

    // Se o parâmetro 'status' não foi passado, retorna todas as tarefas
    res.json(tarefas);
});




// Rota que exibe o formulário para adicionar uma nova tarefa
app.get('/tarefa/nova', function(req, res) {
    res.render('form');
});

// Rota que recebe os dados da tarefa e a adiciona à lista
app.post('/tarefa', function(req, res) {
    var tarefaDescricao = req.body.tarefa.descricao.trim().toLowerCase();

    // Verifica se o status é enviado como string e converte para booleano
    var status = req.body.tarefa.status === 'true';

    // Verifica se a tarefa já existe
    if (tarefas.some(t => t.descricao.toLowerCase() === tarefaDescricao)) {
        // Retorna uma mensagem de erro se a tarefa já existe, com status 400
        return res.status(400).json({ message: 'Tarefa já existe!' });
    } else {
        // Adiciona a nova tarefa
        tarefas.push({
            descricao: req.body.tarefa.descricao,
            status: status
        });
        // Retorna uma mensagem de sucesso, com status 201
        return res.status(201).json({ message: 'Tarefa adicionada com sucesso!' });
    }
});




// Rota que exibe o formulário para editar uma tarefa existente
app.get('/tarefa/:id/editar', function(req, res) {
    var id = req.params.id;
    res.render('edit', { tarefa: tarefas[id], id: id });
});

// Rota que recebe os dados editados da tarefa e atualiza na lista
app.post('/tarefa/:id/editar', function(req, res) {
    var id = parseInt(req.params.id);
    var novaDescricao = req.body.tarefa.descricao.trim().toLowerCase();
    var status = req.body.tarefa.status === 'true';  // Transformando a string em booleano

    if (tarefas.some((t, index) => t.descricao.toLowerCase() === novaDescricao && index !== id)) {
        return res.status(400).json({ message: 'Já existe uma tarefa com esse mesmo nome editado' });
    } else {
        tarefas[id].descricao = req.body.tarefa.descricao;
        tarefas[id].status = status;
        return res.status(200).json({ message: 'Tarefa editada com sucesso!' });
    }
});

// Rota que exclui uma tarefa da lista
app.post('/tarefa/:id/excluir', function(req, res) {
    var id = parseInt(req.params.id); // Certifique-se de que o ID é um número
    console.log(`Tentando excluir a tarefa com ID: ${id}`);

    if (id >= 0 && id < tarefas.length) {
        tarefas.splice(id, 1);
        console.log(`Tarefa ${id} excluída com sucesso.`);
        return res.status(200).json({ message: 'Tarefa excluída com sucesso!' }); // Mensagem de sucesso
    } else {
        console.log(`Tarefa ${id} não encontrada.`);
        return res.status(404).json({ message: 'Tarefa não encontrada!' }); // Mensagem de erro
    }
});


app.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});
