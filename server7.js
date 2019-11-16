// task7

const express = require('express');
const app = express();
const port = 3001;

app.use('/', express.static('./build'));

app.get('/user', (req, res) => {
  res.redirect('/users');
})

app.get('/users', (req,res) => {
  res.send('redirected');
})

app.listen(port, () => console.log('Server started!'));