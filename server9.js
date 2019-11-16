// task9

const express = require('express');
const fs = require('fs');
const app = express();
const port = 3000;

const file = './files/file.txt';

app.use('/', express.static('./build'));

app.get('/user', (req, res) => {
  fs.readFile(file, 'utf8', (err, data) => {
    
    if (err) return res.status(404).json({ 
      Error: `file ${file} not found`,
      Description: err
    });
    res.send(data);
  });
  
})

app.listen(port, () => console.log('Server started!'));
