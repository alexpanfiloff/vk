var express = require('express');
var request = require('request');
var cheerio = require('cheerio');
var chance = new require('chance')();
var router = express.Router();

var domain = 'http://localhost:3000';

var task = {
  auto: null
}

var gets = {
  '/': function(req,res,next){
      res.redirect( '/serve' + chance.pickone( Object.keys(gets) ) );
  },
  '/test': function(req,res,next){
    request.get(domain + '/api/users.get', function(err,rs, body){
      if(task.auto){
        clearInterval(task.auto);
      }
      function inc(){
        var t = 0;
        return function(){
          return t++;
        };
      }
      var counter = inc();

      task.auto = setInterval(function(){
        console.log(counter());
      }, req.query.t || 1000)
      res.send(body);
    })
  },
  '/fact': function(req,res,next){
    request.get("http://webdiscover.ru/facts/" , function(err,rs,body){
      if(err){
        res.json({error: "page not load"});
      }else{
        var $ = cheerio.load(body);
        console.log( $('#quote').html() );
        res.send($('#quote').html());
      }
    })
  },
  '/wiki': function(err,res,next){
    request.get("https://ru.wikipedia.org/wiki/%D0%A1%D0%BB%D1%83%D0%B6%D0%B5%D0%B1%D0%BD%D0%B0%D1%8F:%D0%A1%D0%BB%D1%83%D1%87%D0%B0%D0%B9%D0%BD%D0%B0%D1%8F_%D1%81%D1%82%D1%80%D0%B0%D0%BD%D0%B8%D1%86%D0%B0" , function(err,rs,body){
      var $ = cheerio.load(body);
      res.send( chance.pickone($('p').text().split('.')) );
    })
  },
  '/say': function(req,res,next) {
    request.get({
        url: 'http://api.forismatic.com/api/1.0',
        body: "method=getQuote"
      }, function(err,rs,body){
        console.log(body);
      res.send(body);
    })
  },
  '/me': function(req,res,next){
    res.send(
      chance.pickone(['да или нет?','сам такой', 'согласен', 'вот оно самое'])
    );
  }
}

for(var i in gets){
  router.get( i , gets[i] );
}






module.exports = router;
