const express = require('express');

const app = express();
const PORT = 3001;

app.get('/',(req,res) => {
    res.send('API rodando');
});

app.listen(3001, () => {
    console.log('servidor rodando com sucesso!');
});

app.get('/main', (req, res) => {
  res.json({ status: 'chegando...' });
});