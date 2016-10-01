'use strict';

var gm = require('gm');
var Chance = require('chance');
var fs = require('fs');
var cmd = require('node-cmd');

var chance = new Chance();


module.exports = {
  'test': function(callback){
    cmd.run("cd /Users/arspop/vk/public/gen && rm -rf *.jpg")
    var name = './public/gen/' + chance.word({length: 10}) + '.jpg';
    gm('./test.jpg')
    //.append("./mass.jpg", true)
  //   .recolor(`0.2126 0.7152 0.0722
  // 0.2126 0.7152 0.0722
  // 0.2126 0.7152 0.0722`) норм
    //.median(4) забавно
    //.fill('red')
    //.drawCircle(100, 100, 40, 40)
    //.noise("laplacian")
    //.thumbnail(150, 150)
    //.extent(300, 300)
    //.paint(6) забавный эффект
    //.noise(2) странная штука
    //.monochrome() пиздатый эффект
    //.equalize()
    //.colorize(200, 200, 256) смена цвета
    //.blur(30, 20)
    //.implode(-1.2) искажение шариком
    //.contrast(-6) мощненько
    //.charcoal(1) карандаш
    //.chop(100, 100, 30, 30) сдвиг как в текстурах
    //.clip()
    //.coalesce()
    //.colors(20) чуть темнее делает
    //.comment('hello world') хз
    //.contrast(20) ну контраст
    //.crop(700, 1000, 20, 20)
    //.lower(20, 20) тупые грани
    //.enhance()
    //.filter('Triangle')
    //.flatten()
    //.label('test')
    //.level(10,0.2,250) тоже норм
    //.gamma(1, 0.5, 2) крутая штука ееее
    //.edge(1) просто края
    //.border(20, 20)
    //.borderColor('red')
    //.rotate('green', -25) поворот изображения и цвет подложки
    //.resize(700, 700)
    //.region(101, 112, 90, 87) скручивание
    //.swirl(200)
    .autoOrient()
    .write( name , function (err) {
      err?callback(err):callback(name);
    });
  }
}
