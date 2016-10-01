$(document).ready(init);


function init(){
  $.get('/api/users.get?fields=photo_100', function(d){
    var dt = d[0];
    $('.profile img').attr('src', dt['photo_100'] )
    $('.profile p').text( dt['first_name'] + ' '  + dt['last_name'])
  });


  $('.time').each(function(){
    var t = $(this).text();
    $(this).text( moment(t).lang('ru').fromNow() ) ;
  })
  // $.get('/api/groups.get', function(d){
  //   var all = chance.pickset(d.items,5);
  //   for(var n in all){
  //     all[n] = all[n] * -1;
  //   }
  //   $.get('/api/execute.comments?walls='+all,function(d){
  //       console.log(chance.pickone(d));
  //   })
  // })

  // $.get('/api/execute.news', function(d){
  //   var attack = chance.pickone(d);
  //   var cid = chance.pickone(attack.comments.items).id;
  //   attack.cid = cid;
  //   console.log(attack);
  //   $.get('/serve/wiki', function(text){
  //     req = {
  //       post_id : attack.post_id,
  //       owner_id : attack.owner_id,
  //       reply_to_comment : attack.cid,
  //       message: text
  //     };
  //     $.get( '/api/wall.createComment' , req ).done(function( data ) {
  //         console.log(data);
  //     });
  //   })
  // })

  // $.get('/api/friends.get', function(d){
  //   var all = chance.pickset(d.items,5);
  //   //var fr = chance.pickone(d.items);
  //   $.get('/api/execute.comments?walls='+all,function(d){
  //       console.log(chance.pickone(d));
  //   })
  // })
}
