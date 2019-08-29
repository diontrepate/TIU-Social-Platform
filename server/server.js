const express = require('express')
const app = express()
const bodyParser = require('body-parser')

  
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// import later
// npm install body-parser --save

app.listen(8000, () => {
    console.log('Server started!')
  })


  app.route('/api/people').get((req, res) => {
    res.send({
       name: 'Diontre'
    })
  })