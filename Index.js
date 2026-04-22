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

    const user = req.body

    users.push(user);
    res.status(201).json({
        message: 'Usuário Criado',
        data: user
    })
})

app.get('/users',(req,res) => {
    res.json(users);
})


app.listen(3001, () => {
    console.log('servidor rodando com sucesso!');
});