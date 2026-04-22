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
    })
})

app.get('/users/:id',(req,res)=> {

    const id = parseInt(req.params.id);

    const user = users.find(u => u.id === id);

    if(!user) {
        return res.status(404).json({
            message: 'Usuário Não Encontrado!'
        });
    }
    
    res.json(user);
})

app.get('/users',(req,res) => {
    res.json(users);
})


app.listen(3001, () => {
    console.log('servidor rodando com sucesso!');
});