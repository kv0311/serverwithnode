var express = require('express');
var app = express();
bodyParser = require('body-parser');
app.set('view engine', 'pug')
app.set('views','./views')
app.set('port', process.env.PORT || 3000);

app.get('/headers', function(req,res){
    res.set('Content-Type','text/plain');
    var s = '';
    for(var name in req.headers) s += name + ': ' + req.headers[name] + '\n';
    res.send(s);
    });

app.use('/about', function(req, res){
    res.render('index', { title: 'Hey', message: 'Hello there!' })
});
app.use('/query', function(req, res){
    res.send('id: ' + req.query.id);
});
app.use('/greeting', function(req, res){
        res.render('about', {
        message: 'welcome',
        style: req.query.id,
        });
    });
app.get('/error', function(req, res){
    res.status(500),
    res.render('error')
})
// custom 500 page
app.use(function(err, req, res, next){
console.error(err.stack);
res.type('text/plain');
res.status(500);
res.send('500 - Server Error');
});

app.listen(app.get('port'), function(){
console.log( 'Express started on http://localhost:' +
app.get('port') + '; press Ctrl-C to terminate.' );
});