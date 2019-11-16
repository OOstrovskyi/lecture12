// task6
// JSON data in body

const express = require('express');
const bodyParser = require('body-parser')
const { check, validationResult } = require('express-validator');

const app = express();
const port = 3001;
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

let userId = 0;
let appUsers = [
    {
        id: ++userId,
        name: 'Dotsenko',
    },
    {
        id: ++userId,
        name: 'Glushenko'
    },
    {
        id: ++userId,
        name: 'Pashenko'
    }
]

// view all
app.get('/users', (req, res) => {
    if (appUsers.length !== 0)
        res.send(appUsers);
    else
        return res.status(204).send('array is empty');
});

// view by id
app.get('/users/:id', [check('id').isNumeric()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            Error: 'Input correct number parameter',
            Description: errors.array()
        });
    }
    const user = appUsers.find((user) => {
        return user.id === Number(req.params.id)
    })
    if (user)
        res.send(user);
    else
        return res.status(204).send('user is not found');
})

// add new
app.post('/users', [check('name').isLength({ min: 3, max: 30 })], (req, res) => {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ 
        Error: `Input name with length between 3 and 30 symbols`,
        Description: errors.array() 
      });
    }
    
    const user = {
        id: ++userId,
        name: req.body.name
    };
    appUsers.push(user);
    res.send(user);
})

//update by id
app.put('/users/:id', [check('id').isNumeric(), 
    check('name').isLength({ min: 3, max: 30 })], 
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                Error: 'Input correct number parameter and name with length between 3 and 30 symbols',
                Description: errors.array()
            });
        }

        const user = appUsers.find((user) => {
            return user.id === Number(req.params.id)
        })

        if (user){
            user.name = req.body.name;
            res.sendStatus(200);
        } else {
            return res.status(204).send('user is not found');
        }
    
})

//delete by id
app.delete('/users/:id', [check('id').isNumeric()], (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            Error: 'Input correct number parameter',
            Description: errors.array()
        });
    }
    const initialLength = appUsers.length;
    if (initialLength === 0)
    return res.status(204).send('array is empty');

    appUsers = appUsers.filter((user) => {
        return user.id !== Number(req.params.id);
    })
    const currentLength = appUsers.length;

    if (initialLength>currentLength)
        res.sendStatus(200);
    else
        return res.status(204).send('user is not found');

})


app.listen(port, () => console.log('Server started!'));
