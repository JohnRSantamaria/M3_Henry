const express = require("express");
const morgan = require('morgan');
const userRouter = require('./userRouter');
const postsRouter = require('./postsRouter');

const PORT = 3001

const server = express();

server.use((req,res,next)=>{
  console.log('Pasando...');
  next()
})

server.use(morgan('dev'))
server.use(express.json());

server.use("/users",userRouter);
server.use("/posts",postsRouter);

server.listen(PORT);

console.log('server lisening on port '+PORT);


// server.get("/ab?cd",(req,res)=>{
//   res.send("ab?cd");
// })

// server.get("/ab*cd",(req,res)=>{
//   res.send("/ab*cd");
// })