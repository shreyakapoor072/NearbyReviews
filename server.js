const express = require('express');
const mongoose = require('mongoose');// to work on mongodb
const bodyParser = require('body-parser');
const productRoutes = require('./routes/Product');
const app = express();
const socketio = require('socket.io');

app.use(bodyParser.json());

// db config
const db = "mongodb+srv://shreya:shreya072@cluster0-2jhoj.mongodb.net/test?retryWrites=true&w=majority";

mongoose.connect(db,{useNewUrlParser: true, useUnifiedTopology: true })
.then(
    ()=>{console.log("database connected")},
    err=>{console.log('error',err)}
);

app.use('/products',productRoutes);



const PORT = 5000;
const server = app.listen(PORT,()=>console.log('Server started'));
const io = socketio(server);


io.on('connection', function(socket){
    console.log('a user connected');
    socket.emit('chat', 'Connected');
    socket.on('disconnect', function(){
      console.log('user disconnected');
    });
  });