var express = require('express');
var mongoose = require('mongoose');

var router = express.Router();

mongoose.connect('mongodb://localhost/vk');

var db = mongoose.connection;

db.on('error', function (err) {
    console.log(err);
});

db.once('open', function callback () {
    console.log('connect');
});

var history = mongoose.model('History', {
  action: String,
  desc: String,
  link: String,
  data: Object,
  time : { type : Date, default: Date.now }
});

var gets = {
  '/': function(req,res,next){
    res.redirect('/db/all');
  },
  '/see': function(req,res,next){
    history.find({}, function(err,data){
      res.render('db', err?{err:err}:{data:data} );
    })
  },
  '/all': function(req,res,next){
    history.find({}, function(err,data){
      res.json(err?err:data);
    })
  },
  '/add': function(req,res,next){
    if(req.query.action){
      var ac = new history( req.query );
      res.json(ac.save());
    }else{
      res.json({error: "no action passed"});
    }
  },
  '/rem': function(req,res,next){
    if(req.query.id){
      history.findById(req.query.id , function(err,o){
        o? res.json(o.remove()) : res.json({error: "not found"})
      })
    }else{
      res.json({error: "no id passed"});
    }
  }
}

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
