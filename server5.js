// task5
// http://localhost:3000/static1/task_1.gif
// http://localhost:3000/static2/ava2.jpg

const express = require('express');
const app = express();
const port = 3000

// Static resources
app.use('/static1', express.static('./files'));
app.use('/static2', express.static('./files2'));

app.listen(port, () => console.log('Server started!'));
