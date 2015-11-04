var express = require('express');
var router = express.Router();
var mysql = require('mysql');

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

router.post('/tasks/new', function(req, res, next) {
    console.log(req.body.task);
    connection.query('INSERT INTO task VALUES (?)',req.body.task, function(err, rows, fields) {
        if(!err) {

            res.redirect('/tasks');
        }else {
            console.log('Error while performing Query');
        }
    });
})

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

var connection = mysql.createConnection({
  host     : '192.168.11.88',
  user     : 'root',
  password : '123456',
  database : 'shijiahui'
});

connection.connect();
/*
connection.query('SELECT LOW from GRADE', function(err, rows, fields) {
    if(!err) {

        console.log('The solution is: ', rows);
        console.log('The solution is: ', rows[0]);
        console.log('The solution is: ', rows[0].LOW);
    }else {
        console.log('Error while performing Query');
    }
});

connection.end();
*/
router.get('/tasks', function(req, res) {
    connection.query('SELECT mytask from task', function(err, rows, fields) {
        if(!err) {
            res.render('tasks', {
                title: 'mytask',
                mytask: rows
            });
            console.log('The solution is: ', rows);
            console.log('The solution is: ', rows[0]);
        }else {
            console.log('Error while performing Query');
        }
    });
});



module.exports = router;
