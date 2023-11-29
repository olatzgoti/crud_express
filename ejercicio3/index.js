const express = require('express');
const app = express();
const PORT = 3000;
app.use(express.json())

const productos = [
    { id: 1, nombre: 'Taza de Harry Potter' , precio: 300},
    { id: 2, nombre: 'FIFA 22 PS5' , precio: 1000},
    {  id: 3, nombre: 'Figura Goku Super Saiyan' , precio: 100},
    {  id: 4,  nombre: 'Zelda Breath of the Wild' , precio: 200},
    {  id: 5,  nombre: 'Skin Valorant' , precio: 120},
    {  id: 6, nombre: 'Taza de Star Wars' , precio: 220}]


app.get('/productos', (req,res)=>{
  res.status(200).send(productos);
  })


  app.post('/productos/new', (req,res)=>{
    
    let {nombre, precio} = req.body;
    
    if (!nombre || !precio) {         
      nombre = req.query.nombre;         
      precio = req.query.precio;     
    }
    const newProduct = { id: productos.length+1, nombre, precio}

   if( !nombre || !precio )
    { res.status(400).send('field required'); }
    else
    {
        productos.push(newProduct);
        res.status(200).send({message:'todo ok', productos});
    }
  })




  app.put('/productos/id/:id', (req,res)=>{
    const found = productos.some((producto)=>producto.id == req.params.id)
    if(found){
        productos.forEach((producto)=>{
            if(producto.id == req.params.id)
            {
                producto.name = req.params.name || producto.name,
                producto.precio = req.params.precio || producto.precio
                console.log(req.params.precio); //NO ENVIA EL PRECIO
                res.send(producto)

            }
        })    
    }
    else
    {
      res.status(404).send('error');
    }
  })

 app.delete('/producto/id/:id', (req,res)=>{
  const found = productos.some((producto)=> producto.id == req.params.id)

    if(found)
    {
      const deleteItem = productos.filter((producto)=>producto.id != req.params.id)
      res.send(deleteItem);
    }

    else
  {
    res.status(400).send({message:'No existe lo q buscas'})

  }

 })



app.listen(PORT, ()=>{

    console.log(`Server started at port ${PORT}`);
})

