const PORT = 3005;

const express = require('express');

const app = express();
app.use(express.json());



app.get('/', (req,res)=>{

    res.status(200).send({message:'Bienvenida a nuestra página web'});

})


app.get('/productos', (req,res)=>{

    res.status(200).send({message:'Listado de productos'});

})

app.post('/productos', (req,res)=>{
    res.status(200).send({message:'Crear un producto'});
})

app.put('/productos', (req, res)=>{
    res.status(200).send({message:'Actualizar un producto'})
})

app.delete('/productos', (req, res)=>{
    res.status(200).send({message:'Borrar un producto'})
})

app.get('/usuarios', (req,res)=>{

res.status(200).send({message:'Listado de usuarios'});    
})

app.post('/usuarios', (req,res)=>{
    res.status(200).send({message:'crear usuario'})
})

app.put('/usuarios', (req,res)=>{

    res.status(200).send({message:'Actualiza un usuario'})
})

app.delete('/usuarios', (req,res)=>{

    res.status(200).send({message:'Borra un usuario'})
})


app.listen(PORT, ()=>{
    console.log(`server started at port ${PORT}`);
})