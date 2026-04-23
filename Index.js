const express = require('express');
const users = [];

const app = express();
const PORT = 3001;
app.use(express.json());

app.get('/',(req,res) => {
    res.send('API rodando');
});

app.get('/main', (req, res) => {
  res.json({ status: 'chegando...' });
});

app.post('/users', (req,res) =>{

    const user = {
        id: users.length + 1,
        ...req.body
    };

    users.push(user);

    res.status(201).json({
        message: 'Usuário Criado',
        data: user
    });
});

app.delete('/users/:id',(req,res) => {

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).json ({
            message: 'usuário não encontrado!'
        });
    }

    users.splice(index,1);

    res.json({
        status : 'Usuário Excluido com sucesso'
    });
});


app.get('/users/:id',(req,res)=> {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if(!user) {
        return res.status(404).json({
            message: 'Usuário Não Encontrado!'
        });
    }
    
    res.json(user);
});

app.put('/users/:id',(req,res) =>{

    const id = parseInt(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if(index === -1){
        return res.status(404).json({
            message: 'Usuário não encontrado!'
        });
    }
    
    const updateuser = {
        id: users[index].id,
        ...req.body
    };

    users[index] = updateuser;

    res.json({
        message: 'Usuário atualizado com sucesso',
        data: updateuser
    });
});

app.get('/users',(req,res) => {
    res.json(users);
});


app.listen(3001, () => {
    console.log('servidor rodando com sucesso!');
});