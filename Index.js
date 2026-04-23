//inicializa da variavel Express, fundamental para que se possa usar as funções dele
const express = require('express');
// simula um banco de dados (futuramente ira integrar com um banco sql)
const users = [];

//inicializa a variavel app colocando a função express() onde podera usar o framework
const app = express();
//define a porta 3001 como porta de acesso
const PORT = 3001;
//define que o framework ira usar jsons e enviar jsons também
app.use(express.json());

//faz um get onde é possivel verificar a pagina inicial, retornando um aviso de que esta tudo rodando corretamente
//HTTPS://localhost:3001/
app.get('/',(req,res) => {
    res.send('API rodando');
});

//define uma main e retorna status pra ela
app.get('/main', (req, res) => {
  res.json({ status: 'chegando...' });
});

//post global, onde se recebe os json e criam os dados no banco
app.post('/users', (req,res) =>{

    //define que a const {name,email} vai receber informações do body e inicializa ela
    const {name, email} = req.body;
 
    //define que a const user vai integrar um ID progressivo de + com a quantia que achar, e receber REQ de name e email
    const user = {
        id: users.length + 1,
        name,
        email
    };

    //validação do nome e email
    if(!name || !email){
        return res.status(400).json({
            message: 'nome e email são obrigatórios'
        });
    }

    //preenche a variavel user com o json enviado via REQ para o banco
    users.push(user);

    //retorna um status de preenchimento para o app
    res.status(201).json({
        message: 'Usuário Criado',
        data: user
    });
});

//deleta o usuario informado por ID do banco de dados
app.delete('/users/:id',(req,res) => {

    //variavel que recebe o id do parametro do HTML
    const id = parseInt(req.params.id);

    //variavel que recebe o index de onde se encontra aquele objeto no banco
    const index = users.findIndex(u => u.id === id);

    //verifica se o usuario existe no banco (retorna mensagem caso não)
    if(index === -1){
        return res.status(404).json ({
            message: 'usuário não encontrado!'
        });
    }

    //deleta o objeto encontrado no index do banco de dados
    users.splice(index,1);

    //retorna um status de excluido
    res.json({
        status : 'Usuário Excluido com sucesso'
    });
});

//get que retorna usuario especifico utilizando o ID
app.get('/users/:id',(req,res)=> {

    //variavel que recebe o id do parametro do HTML
    const id = parseInt(req.params.id);

    //variavel que recebe o index de onde se encontra aquele objeto no banco
    const user = users.find(u => u.id === id);

    //verifica se o usuario existe no banco (retorna mensagem caso não)
    if(!user) {
        return res.status(404).json({
            message: 'Usuário Não Encontrado!'
        });
    }
    //retorna o objeto do banco em json
    res.json(user);
});

//put onde se altera os dados do objeto do banco
app.put('/users/:id',(req,res) =>{

    //define que a const {name,email} vai receber informações do body e inicializa ela
    const {name,email} = req.body;

    //variavel que recebe o id do parametro do HTML
    const id = parseInt(req.params.id);

     //variavel que recebe o index de onde se encontra aquele objeto no banco
    const index = users.findIndex(u => u.id === id);

    //verifica se o usuario existe no banco (retorna mensagem caso não)
    if(index === -1){
        return res.status(404).json({
            message: 'Usuário não encontrado!'
        });
    }
    
    //checa se foram informados nome e email
    if(!email ||!name){
        return res.status(400).json({
            message: 'nome e email são obrigatórios para atualização'
        });
    }

    //faz o update do usuário encontrado no index
    const updateUser = {
        id: users[index].id,
        name,
        email
    };


    //atualiza as informações do usuario encontrado com as informações adicionadas no updateuser
    users[index] = updateUser;

    //retorna a mensagem de que o usuário foi atualizado
    res.json({
        message: 'Usuário atualizado com sucesso',
        data: updateUser
    });
});

//get que retorna todos objetos do banco
app.get('/users',(req,res) => {
    res.json(users);
});

//listen para saber que o server está rodando corretamente
app.listen(3001, () => {
    console.log('servidor rodando com sucesso!');
});