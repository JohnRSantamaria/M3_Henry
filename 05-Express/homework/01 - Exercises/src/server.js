const express = require("express");
const morgan = require("morgan");

let publications = [];
const server = express();

//server.use(morgan('dev'));
server.use(express.json());

server.post('/posts',(req,res)=>{
  const {author,title,contents} = req.body;

  if(author&&title&&contents) {
    let publicacion = {
      ...req.body,
      id: publications.length + 1
    }    

    publications.push(publicacion);
    res.json(publications)
  }

  res.status(400).json({error: "No se recibieron los parámetros necesarios para crear la publicación"})
})

server.get('/posts',(req,res)=>{
  
  const {author,title} = req.query;
  
  if(author&&title){
    publications = publications.filter(post=> post.author === author && post.title === title);  
  }
  
  res.status(400).json({error: "No existe ninguna publicación con dicho título y autor indicado"})
})

server.get('/posts/:author',(req,res)=>{
  const {author} = req.params;
  if(author){
    publications = publications.filter(post=> post.author === author);
  }
  res.status(400).json({error: "No existe ningun post del autor indicado"});
})

server.put('/posts/:id',(req,res)=> {
  const {id} = req.params;
  const {title, contents} = req.body
  const found = publications.find(post=> post.id === parseInt(id));
  
  if(!id||!title||!contents) res.status(400).json({error:"No se recibieron los parámetros necesarios para modificar la publicación"});
  if(!found) res.status(400).json({error:"No se recibió el id correcto necesario para modificar la publicación"});

  publications = publications.map(post=> post.id === id ? {...post,...newData} : post);

})

server.delete('/posts/:id',(req,res)=>{
  const {id} = req.params;
  const found = publications.find(post=> post.id === parseInt(id));
  
  if(id) res.status(400).json({error:"No se recibió el id correcto necesario para eliminar la publicación"});
  if(!found) res.status(400).json({error:"No se recibió el id correcto necesario para eliminar la publicación"});

  publications = publications.filter(post => post.id !== parseInt(id));
  res.status(200).json({success: true})
})

server.use(express.json());


//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
