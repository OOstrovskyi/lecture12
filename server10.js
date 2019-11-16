// task10

const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000

app.use('/', express.static('./build'));

app.get('/user', (req, res) => {

  axios.get('https://jsonplaceholder.typicode.com/posts/1')
  .then(function (response) {
    // handle success
    res.json(response.data);
  })
  .catch(function (error) {
    // handle error
    return res.status(404).send('not found');
  });

})

app.listen(port, () => console.log('Server started!'));
