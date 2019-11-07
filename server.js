const express = require('express');
const app = express();

// Static resources
app.use('/', express.static('./build'));

// API endpoints
app.get('/check', (req, res) => res.send('OK'));

app.listen(3000, () => console.log('Server started!'));
