// task2
// http://localhost:3000/user/5

const express = require('express');
const { check, validationResult } = require('express-validator');
const app = express();
const port = 3000

app.use('/', express.static('./build'));

app.get('/user/:id', [check('id').isNumeric()], (req, res) => {

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ 
      Error: 'Input correct number parameter id',
      Description: errors.array() 
    });
  }

  const id = (req.params.id);
  const result = String(id*id); 
  res.send(result);
})

app.listen(port, () => console.log('Server started!'));
