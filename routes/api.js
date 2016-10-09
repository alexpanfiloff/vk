var vk_api = require('vk-api');
var express = require('express');
var busboy = require('connect-busboy');
var downloader = require('../scripts/downloader');
var genimg = require('../scripts/genimg');
var request = require('request');
var fs = require('fs');
var qs = require('qs');
var querystring = require('querystring');


var router = express.Router();
var VK = new vk_api({appID: 4978898, appSecret: "zSaRVftQZzewl9RvVVdw"}, "https://oauth.vk.com/blank.html");
var token = fs.readFileSync('./token.txt', 'utf-8');

router.get('/',function(req,res,next){
    res.send("to auth go to <a href='https://oauth.vk.com/authorize?client_id=5622311&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,messages,wall,photos,audio,video,offline,group,status&response_type=token&v=5.53'>link</a>");
});

router.get('/stk', function(req,res,next){
  if(req.query.url){
    var q = req.query;
    console.log( req.originalUrl );
    if( req.query.url.indexOf('#') != -1){
      var e = querystring.parse( (req.query.url).split('#')[1] );
      for(var i in e){
        q[i] = e[i];
      }
      delete q.url;
    }
    res.json(q);
  }else{
    if(req.query.token){
      res.send( token );
    }else{
      res.json({error: "no url passed"});
    }
  }
});

router.get('/test', function(req,res,next){
  genimg.test(function(n){
    res.redirect(n.replace('./public',''));
  });
});

router.get('/parse', function(req,res,next){
  request.get('http://project94622.tilda.ws/', function(er,rs,body){
    var st = fs.createWriteStream('../index.html');
    st.write(body);
    st.end();
    res.end();
  })
})

///api/photos.getUploadServer?album_id=235820836

//photos.save?album_id=235820836

router.get('/upload', function(req,res,next){

  VK.api( 'photos.getUploadServer' , {
    album_id: 235820836 ,
    v: 5.53,
    access_token: token.trim(),
    sig : '3f2a1097fd1dff003d',
    user_id : 210149434
  } , nextstep );

  function nextstep(err,result) {
    console.log(result);
    if(result.response){
      var r = request.post(result.response.upload_url, function(err, httpResponse, body) {
        err?res.send(err):step2(body);
      })
      var form = r.form();
      form.append('file1',
        fs.createReadStream('./mass.jpg'),
        {filename: 'mass.jpg'});
    }else{
      res.json(result);
    }
  }

  function step2(dt){
    var data = JSON.parse(dt);
    data['album_id'] =  235820836;
    data['v'] =  5.53;
    data['access_token'] = token.trim();
    data['sig'] = '3f2a1097fd1dff003d';
    console.log(data);
    VK.api( 'photos.save' , data , function(err,result){
      err?res.json(err):result.response?res.json(result.response):res.json(result);
    })
  }

});

// router.get('/up', function(req,res,next){
//   if(req.query.url){
//     downloader.base64url(req.query.url, function(d){
//         res.send(d);
//     })
//   }else{
//     res.json({error: "no url passed"});
//   }
// });

//210149434
//https://oauth.vk.com/blank.html#access_token=fd78e0097aa45e519b85eed1fc8398bb836ad5baaf171da7a0a656f7b06aecac4cea36816158e4be4345e&expires_in=0&user_id=210149434&secret=3f2a1097fd1dff003d
router.get('/:method', function(req,res,next){ //user_ids
  var q = req.query;
  q.access_token = token.trim();
  //q.sig = 'QvGMRWCZCXB3sRVUlnHG';
  q.v? void(0) : q.v = 5.53;
  q.user_id ? void(0) : q.user_id = 210149434;
  request.get('https://api.vk.com/method/' + req.params.method + '?' + qs.stringify(q), function(er,rs,body){
      var body = JSON.parse(body);
      body = body.response ? body.response : body ;
      res.json(body);
  })
  // VK.api( req.params.method , q , function(err,result) {
  //     err?res.json(err):res.json(result.response);
  // });
});

module.exports = router;
