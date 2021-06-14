const express = require('express');
const cors = require('cors');
const app = express();
const database = require('./config/database')

//Método do express json(). This middleware is available in Express v4.16.0 onwards. headers na requisição: {"Content-Type": "application/json"}
app.use(express.json());

//CORS-enabled for all origins!
app.use(cors());

app.get('/produtos', async function(req, res) {     
    await database.query('select * from produtos',
        function (err, results) {   
            if (err) throw err;         
            res.json(results)
        }
    )        
});

app.get('/produtos/:id', async function(req, res) {  
    const id = req.params.id
    await database.query('select * from produtos where id = ?', id,
        function (err, results) {
            if (err) throw err;            
            res.json(results)
        }
    )        
});

app.post('/produtos/', async function(req, res) {
    const post = req.body;
    await database.query('INSERT INTO produtos (nome, descricao, preco) values ( ?, ?, ? )', [post.nome, post.descricao, post.preco],
        function (err, results) { 
            if (err) throw err;
            res.json(results.affectedRows)                       
        }
    )        
});

app.put('/produtos/:id', async function(req, res){
    const id = req.params.id
    const post = req.body; 
    await database.query('UPDATE produtos SET nome = ?, descricao = ?, preco = ? WHERE id = ?', [post.nome, post.descricao, post.preco, id], 
    function(err, results){
        if (err) throw err;
        res.json(results.affectedRows) 
    })
})

app.delete('/produtos/:id', async function(req, res){
    const id = req.params.id 
    await database.query('DELETE FROM produtos WHERE id = ?', id, function(err, results){
        if (err) throw err;
        res.json(results.affectedRows) 
    })
})

app.listen(3000)

