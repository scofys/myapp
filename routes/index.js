var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    var user = {
        first_name: 'Lord',
        surname: 'Lucan',
        address: 'I am not telling!',
        QQ: '123456'
    };

    res.render('index', { title: 'Express', user: user });
});

router.get('/about', function(req, res, next) {
    res.send('Hello from the about route!');
});

router.post('/', function(req, res, next) {
    res.send(req.body);
});

router.get('/users/:id', function(req, res, next) {
    var users = {
        1 : {
            first_name: 'Lord',
            surname: 'Lucan',
            address: 'I am not telling!',
            QQ: '123456'
        },
        2 : {
            first_name: 'S',
            surname: 'Jh',
            address: 'I am not telling!',
            QQ: '654321'
        }
    };
    if(req.params.id == 1) {
        res.render('index', { title: 'Express', user: users[1] });
    }
    if(req.params.id == 2) {
        res.render('index', { title: 'Express', user: users[2] });
    }
    res.send('show content for user id ' + req.params.id);
    console.log(req.params.id);
    console.log(users[req.params.id]);
});

router.get('/tasks', function(req, res) {
    res.render('tasks', {
        tittle: 'mytask'
    });
});

module.exports = router;
