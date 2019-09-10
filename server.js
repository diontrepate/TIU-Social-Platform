const express = require('express')
const app = express()
const http = require('http')
const path = require('path')

// later this numbe will be a node that we want to deploy on, in other words an environment varaible
const port = process.env.PORT || 3001;

// for serving static files in the root directory
app.use(express.static(__dirname + '/client/dist/social-platform'));


app.get('/*',(req,res)=> res.sendFile(path.join(__dirname)));


const server = http.createServer(app);

server.listen(port, ()=> console.log('Running...'));
  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// app.listen(8000, () => {
//     console.log('Server started!')
//   })


  app.route('/api/people').get((req, res) => {
    res.send({
       name: 'Diontre'
    })
  })