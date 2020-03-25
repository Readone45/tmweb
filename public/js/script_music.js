var listmusik = document.querySelector('#listmusik');
var uli =  document.createElement('ul');
var listpopuler = document.querySelector('#populer');
var listpop = document.querySelector('#listpop');
var group = document.querySelector("#list-group");
var botNavBar = document.querySelector("#b-navbar")
var awal,akhir,total = 0;
var json = {};
var popmusik = {};

fetch('https://teammusic-tw.firebaseio.com/upload/text.json')
.then((response) => {
    return response.json();
})
.then((data) => {
  json = Object.values(data);
  popmusik = Object.values(data).sort(function(a,b){
    return b.view - a.view;
  });
  json = json.reverse();
  tampil();
});

function tampil(){
  awal = 0;
  akhir = 9;
  var c = json.slice(awal,akhir);

  for(i in c){
    let img;
    if(c[i].img === undefined){
      img = 'https://img.icons8.com/bubbles/2x/music.png';
    } else {
      img = c[i].img;
    }

    card(img, c[i].view, c[i].uid, c[i].name, total);

    console.log(c[i]);

    total = total + 1;
  }
}


function card(img, view, uid, name, total){
  var tes = document.createElement('div');
    tes.setAttribute('class','col-md-4 wow fadeInLeft');
   tes.innerHTML =  '<div class="card-group" id="grp"><div class="card card-personal mb-4" style="width:22rem;">'+
      '<!--Card image-->'+
      '<div class="view">'+
        '<img class="card-img-top" src="' + img + '" alt="Card image cap">'+
        '<a href="#!">'+
          '<div class="mask rgba-white-slight"></div>'+
        '</a>'+
      '</div>'+
      '<!--Card image-->'+
      '<ul align="right">'+
        '<li class="list-inline-item pt-auto">'+
          '<a class="btn btn-primary btn-action ml-auto mr-2 btn-sm waves-effect waves-light" onclick="playMusic(' + total + ')"><i class="fas fa-play pl-1"></i></a></li>'+
        '<li class="list-inline-item">'+
          '<a class="btn btn-primary btn-action ml-auto mr-4 btn-sm waves-effect waves-light"><i class="fas fa-download pl-1"></i></a></li>'+
      '</ul>'+

      '<!--Card content-->'+
      '<div class="card-body">'+
       ' <!--Title-->'+
        '<a>'+
          '<h4 class="card-title">' + name + '</h4>'+
        '</a>'+
      '</div>'+

      '<div class="rounded-bottom blue-gradient text-center pt-3 mt-auto">'+
        '<ul class="list-unstyled list-inline font-small">'+
          '<li class="list-inline-item pr-2 white-text"><i class="fas fa-eye pr-1"></i>' + view + '</li>'+
          '<li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fas fa-comments pr-1"></i>3</a></li>'+

          '<li class="list-inline-item"><a  class="white-text"><i class="fas fa-heart pr-1"> </i>3</a></li>'+
          '<li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fas fa-user pr-1"></i>' + uid + '</a></li>'+
        '</ul>'+
      '</div>'+
      '<!--Card content-->'+

    '</div></div>';
    group.appendChild(tes);
    tes = document.createElement('div');
}

function loadMore(){
  awal = awal + 9;
  akhir = akhir + 9;
  var c = json.slice(awal,akhir);

  for(i in c){
    let img;
    if(c[i].img === undefined){
      img = 'https://img.icons8.com/bubbles/2x/music.png';
    } else {
      img = c[i].img;
    }
    card(img,c[i].view,c[i].uid,c[i].name);
    total = total + 1;
  }
}

var audio = document.querySelector("#audio");
var source = document.createElement("source");
var musicname = document.querySelector("#mscname");

var prog = document.querySelector("progress_");

function stopDel() {
  botNavBar.setAttribute("style", "display: none;");
  audio.removeChild(source);
  pause_aud();
}

function playMusic(num) {
  botNavBar.setAttribute("style", "");

  source.setAttribute("src", json[num].url);
  source.setAttribute("type", "audio/mpeg");
  source.setAttribute("id", "source-audio")
  audio.appendChild(source);
  musicname.innerHTML = json[num].name;
  play_aud()
}

// Custom Music Player
document.addEventListener("DOMContentLoaded", function() { startplayer(); }, false);
var player;

function startplayer()
{
  player = document.getElementById('audio');
  player.controls = false;
}

function play_aud()
{
  player.play();
}

function pause_aud()
{
  player.pause();
}

function stop_aud()
{
  player.pause();
  player.currentTime = 0;
}

function change_vol()
{
  player.volume=document.getElementById("change_vol").value;
}
