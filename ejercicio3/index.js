const express = require('express');
const app = express();
const PORT = 5463;
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
    
    console.log(req.body);
   /* if (!nombre || !precio) {         
      nombre = req.query.nombre;         
      precio = req.query.precio;     
    }*/
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
    const productId = parseInt(req.params.id, 10); // Convierte a número
    const found = productos.some((producto)=>producto.id === productId)
    if(found){
        productos.forEach((producto)=>{
            if(producto.id === productId)
            {
                producto.nombre = req.body.nombre || producto.nombre,
                producto.precio = req.body.precio || producto.precio
                console.log(req.body.precio); //NO ENVIA EL PRECIO
                res.send(producto)
            }
        })    
    }
    else
    {
      res.status(404).send('error');
    }
  })
/*
  if (found) {
      products.forEach(product => {
          if (product.id === productId) {
              product.nombre = req.body.nombre ? req.body.nombre : product.nombre;
              product.precio = req.body.precio ? req.body.precio : product.precio;
              res.send(product);
          }
      });
  } else {
      res.status(404).send('Error: Producto no encontrado');
  }
});
*/


 app.delete('/producto/id/:id', (req,res)=>{
  const productId = req.params.id;
  console.log(productId);

  const found = productos.some((producto)=> producto.id === +productId)//Convierto el valor que viene por la url de STRING a NUMBER

    if(found)
    {
      const deleteItem = productos.filter((producto)=>producto.id !== +productId) //Paso productId de STRING  a NUMBER por venir por URL
console.log(deleteItem)
      res.send(deleteItem);
    }
    else
  {
    res.status(400).send({message:'No existe lo q buscas'})
  }
 })

 //Busqueda de producto por id
app.get('/producto/id/:id', (req,res)=>{

  const productId = req.params.id;
  const found = productos.filter((producto)=>producto.id === +productId)

  if(found)
  {res.status(200).send(found)}

  else
  {
    res.send(console.log('No se ha encontrado'))
  }
})

app.get('/producto/nombre/:nombre', (req,res)=>{
  const productNombre = req.params.nombre;
  console.log(productNombre.toLowerCase())
  console.log(productos);

  console.log(productos.map(producto=>producto.nombre.toLowerCase()))
  
  const found = productos.find(producto => producto.nombre.toLowerCase() === productNombre.toLowerCase());

  console.log(found)
//HACERLO BUSCANDO EL ID DE ESE NOMBRE


if(found)
{
  res.send({description: 'encontrado', item: found});
}
else
{
  res.send('No existe ese producto');
}
})
app.listen(PORT, ()=>{
    console.log(`Server started at port 5463 ${PORT}`);
})