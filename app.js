var express = require('express');
var app = express();
var bodyParser = require('body-parser')
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var _ = require('lodash')
bodyParser = require('body-parser');
app.set('view engine', 'pug')
app.set('views','./views')
app.set('port', process.env.PORT || 3000);
var users=[
   {id:1 , name:'Vinh'},
   {id:2, name:'Thinh'},
   {id:3, name:'Lam'}
]
app.get('/user',function(req,res){
    res.render('list/listuser',{
        user:users
    })
})
app.get('/test',function(req,res){
    var filtered=_.filter(users,e=>
            _.includes(e.name,req.query.q)
    )
    res.render('list/listuser',{
        user:filtered
    })
})
app.get('/', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
    });
app.get('/user/create',function(req,res){
    res.render('users/index')
})
app.post('/user/create',function(req,res){
    res.render('users/index')
    users.push(req.body);
    res.redirect('/user');
})
app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});