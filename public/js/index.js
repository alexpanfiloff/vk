$(document).ready(init);


function init(){
  $.get('/api/users.get?fields=photo_100', function(d){
    var dt = d[0];
    $('.profile img').attr('src', dt['photo_100'] )
    $('.profile p').text( dt['first_name'] + ' '  + dt['last_name'])
  });

  $.get('/api/groups.get', function(d){
    var all = chance.pickset(d.items,5);
    for(var n in all){
      all[n] = all[n] * -1;
    }
    $.get('/api/execute.comments?walls='+all,function(d){
        console.log(chance.pickone(d));
    })
  })

  $.get('/api/friends.get', function(d){
    var all = chance.pickset(d.items,5);
    //var fr = chance.pickone(d.items);
    $.get('/api/execute.comments?walls='+all,function(d){
        console.log(chance.pickone(d));
    })
  })
}
