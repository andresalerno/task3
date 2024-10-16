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
    var tarefaDescricao = req.body.tarefa.descricao.trim().toLowerCase(); //Normaliza a entrada

    // Verifica se o status é enviado como string e converte para booleano
    var status = req.body.tarefa.status === 'true';         // trnasforma 'true'/'false' em booleano

    // Analisa se a tarefa já existe
    if (tarefas.some(t => t.descricao.toLowerCase() === tarefaDescricao)) {
        // se verdadeiro direciona para a página principal com uma mensagem, exemplo: "Tarefa já existente!"
        res.send('Tarefa já existe!')
    } else {
        tarefas.push({
            descricao: req.body.tarefa.descricao,   // descrição original
            status: status         // status enviado pelo formulário
        });
        res.redirect('/');
    }

});

// Rota que exibe o formulário para editar uma tarefa existente
app.get('/tarefa/:id/editar', function(req, res) {
    var id = req.params.id;
    res.render('edit', { tarefa: tarefas[id], id: id });
});

// Rota que recebe os dados editados da tarefa e atualiza na lista
app.post('/tarefa/:id/editar', function(req, res) {
    var id = req.params.id;
    var novaDescricao = req.body.tarefa.descricao.trim().toLowerCase();

    // Verifica se o status é enviado como string e converte para booleano
    var status = req.body.tarefa.status === 'true';  // Transforma 'true'/'false' em booleano

    if (tarefas.some((t, index) => t.descricao.toLowerCase() === novaDescricao && index != id)) {
        res.send('Já existe uma tarefa com esse mesmo nome editado');
    } else {
        tarefas[id].descricao = req.body.tarefa.descricao;
        tarefas[id].status = status;
        res.redirect('/');
    }
});

// Rota que exclui uma tarefa da lista
app.post('/tarefa/:id/excluir', function(req, res) {
    var id = req.params.id;
    if (id >= 0 && id < tarefas.length) {
        tarefas.splice(id, 1);
    }
    res.redirect('/');
});

app.listen(3000, function() {
    console.log("Servidor rodando na porta 3000");
});
