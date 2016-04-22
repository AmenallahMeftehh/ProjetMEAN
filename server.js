var express = require('express');
var app = express();
var mongojs = require('mongojs');
var db = mongojs('localhost/contactlist', ['contactlist']);
var bodyParser = require('body-parser');

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());

// methode get de http pour recuperer la liste des contacts

app.get('/contactlist', function (req, res) {
  console.log('I received a GET request');

  db.contactlist.find(function (err, docs) {
    console.log(docs);
    res.json(docs);
  });
});
// methode post de http pour ajouter un contact dans la liste des contacts

app.post('/contactlist', function (req, res) {
  console.log(req.body);

  db.contactlist.insert(req.body,
    function (err, doc)
    {
    res.json(doc);
    });
});
// methode delete de http pour supprimer un contact de la liste des contacts
app.delete('/contactlist/:id',function(req,res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.remove({_id:mongojs.ObjectId(id)},
  function(err,doc)
  {
    res.json(doc);
  });
});

app.get('/contactlist/:id',function(req, res){
  var id = req.params.id;
  console.log(id);
  db.contactlist.findOne({_id:mongojs.ObjectId(id)},
  function(err,doc)
  {
    res.json(doc);
  });
});
app.put('/contactlist/:id',function(req, res){
  var id = req.params.id;
  console.log(req.body.name);
  db.contactlist.findAndModify({
      query: {_id: mongojs.ObjectId(id)},
      update: {$set: {name: req.body.name,mail: req.body.mail, number: req.body.number}},
      new: true}, function (err, doc) {
        res.json(doc);
      }
    );
});

app.listen(3000);
console.log("Server running on port 3000");
