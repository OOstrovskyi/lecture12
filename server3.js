// task3
// JSON data in body
// {
//	"id": "5"
// }

const express = require('express');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3000;

app.use(bodyParser.json());

app.post('/user', [check('id').isNumeric()], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      Error: `Input correct number parameter 'id'`,
      Description: errors.array() 
    });
  }

  const id = req.body.id;
  const result = String(id*id);
  res.send( result );
});

app.listen(port, () => console.log('Server started!'));
