var express = require('express');
var app = express();
var bodyParser = require('body-parser')
var low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
db=low(adapter)
db.defaults({ users: [] })
  .write()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
var _ = require('lodash')
bodyParser = require('body-parser');
app.set('view engine', 'pug')
app.set('views','./views')
app.set('port', process.env.PORT || 3000);
app.get('/user',function(req,res){
    res.render('list/listuser',{
        user:db.get('users').value()
    })
})
app.get('/test',function(req,res){
    var users = db.get('users').value()
    var filtered=_.filter(users,e =>
        (_.includes(e.id,req.query.q) || _.includes(e.name,req.query.w))
    )

    res.render('list/listuser',{
        user:filtered
    })
    console.log(filtered)
    console.log(users)
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
// make a form with post method and save low database
app.post('/user/create',function(req,res){
    db.get('users').push(req.body).write();
    res.redirect('/user');
})
app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});