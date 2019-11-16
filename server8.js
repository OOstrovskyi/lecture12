// task8
// http://localhost:3000/user?type=text

const express = require('express');
//const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000

const someText = {"city": "Antananarivo"};

app.use('/', express.static('./build'));

app.get('/user', (req, res) => {
  switch (req.query.type) {
    case 'text' : { 
        res.set('Content-Type', 'text/plain'); 
        return res.send(someText);
      }
    case 'json' : {
        return res.json(someText);
      }
    default : return res.send('Incorrect type');
  }
  
})

app.listen(port, () => console.log('Server started!'));
