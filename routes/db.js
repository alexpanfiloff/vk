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

var order = mongoose.model('Order', {
  name: String,
  email: String,
  phone: String,
  data: Object,
  time : { type : Date, default: Date.now }
});

var models = {
  'history': history,
  'order': order
}

var gets = {
  '/': function(req,res,next){
    res.json(models);
  },
  '/see/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.render(req.params.model, err?{err:err}:{data:data} );
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/all/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      models[req.params.model].find({}, function(err,data){
        res.json(err?err:data);
      })
    }else{
      res.json({error: "no model find"});
    }
  },
  '/add/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      var ac = new models[req.params.model]( req.query );
      res.json(ac.save());
    }else{
      res.json({error: "no model find"});
    }
  },
  '/rem/:model': function(req,res,next){
    if(models.hasOwnProperty(req.params.model)){
      if(req.query.id){
        models[req.params.model].findById(req.query.id , function(err,o){
          o? res.json(o.remove()) : res.json({error: "not found"})
        })
      }else{
        res.json({error: "no id passed"});
      }
    }else{
      res.json({error: "no model find"});
    }
  }
}

for (var i in gets){
  router.get( i , gets[i]);
}

module.exports = router;
