// Loading JavaScript
var modalLoading={init:function(start){var _this=this;if(start){_this.construct();window.location.href="#openModalLoading";}},construct:function(){var _this=this;var html='<div id="openModalLoading" class="modalDialog wow fadeIn"><div><div class="loading-spinner"/></div></div>';_this.appendHtml(document.body,html);_this.appendCss();},appendHtml:function(el,str){var div=document.createElement('div');div.innerHTML=str;while(div.children.length>0){el.appendChild(div.children[0]);}},appendCss:function(){var css='.modalDialog {position: fixed;font-family: Arial, Helvetica, sans-serif;top: 0;right: 0;bottom: 0;left: 0; background: rgba(0, 0, 0, 0.8);z-index: 99999;opacity:0; -webkit-transition: opacity 400ms ease-in; -moz-transition: opacity 400ms ease-in;transition: opacity 400ms ease-in; pointer-events: none;}  .modalDialog:target {opacity:1;pointer-events: auto;}  .modalDialog > div {width: 100%;position: relative;margin: 20% auto;}@-webkit-keyframes rotate-forever { 0% { -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -ms-transform: rotate(0deg); -o-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); -moz-transform: rotate(360deg); -ms-transform: rotate(360deg); -o-transform: rotate(360deg); transform: rotate(360deg); } } @-moz-keyframes rotate-forever { 0% { -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -ms-transform: rotate(0deg); -o-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); -moz-transform: rotate(360deg); -ms-transform: rotate(360deg); -o-transform: rotate(360deg); transform: rotate(360deg); } } @keyframes rotate-forever { 0% { -webkit-transform: rotate(0deg); -moz-transform: rotate(0deg); -ms-transform: rotate(0deg); -o-transform: rotate(0deg); transform: rotate(0deg); } 100% { -webkit-transform: rotate(360deg); -moz-transform: rotate(360deg); -ms-transform: rotate(360deg); -o-transform: rotate(360deg); transform: rotate(360deg); } } .loading-spinner { -webkit-animation-duration: 0.75s; -moz-animation-duration: 0.75s; animation-duration: 0.75s; -webkit-animation-iteration-count: infinite; -moz-animation-iteration-count: infinite; animation-iteration-count: infinite; -webkit-animation-name: rotate-forever; -moz-animation-name: rotate-forever; animation-name: rotate-forever; -webkit-animation-timing-function: linear; -moz-animation-timing-function: linear; animation-timing-function: linear; height: 30px; width: 30px; border: 8px solid #ffffff; border-right-color: transparent; border-radius: 50%; display: inline-block; }.loading-spinner { position: absolute; top: 50%; right: 0; bottom: 0; left: 50%; margin: -15px 0 -15px;}',head=document.head||document.getElementsByTagName('head')[0],style=document.createElement('style');style.type='text/css';if(style.styleSheet){style.styleSheet.cssText=css;}else{style.appendChild(document.createTextNode(css));}
head.appendChild(style);}};modalLoading.init(false);

modalLoading.init(true);
// Loading

var listmusik = document.querySelector('#listmusik');
var uli =  document.createElement('ul');
var listpopuler = document.querySelector('#populer');
var listpop = document.querySelector('#listpop');
var group = document.querySelector("#list-group");
var botNavBar = document.querySelector("#b-navbar")
var awal,akhir,total = 0;
var json = {};
var popmusik = {};

var names = {};

// Fetch UID Usernames Datas
fetch('https://teammusic-tw.firebaseio.com/profile/text.json')
.then((response) => {
  return response.json();
})
.then((data) => {
  names = data;
  console.log(data)
});

// Fetch musics data from server
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

    card(img, c[i].view, c[i].uid, c[i].name, total, c[i].url);

    console.log(c[i]);

    total = total + 1;
  }
  document.getElementById("openModalLoading").remove();
}


function card(img, view, uid, name, total, url){
  var tes = document.createElement('div');
    tes.setAttribute('class','col-md-4 wow fadeInLeft');
   tes.innerHTML =  '<div class="card-group" id="grp"><div class="card card-personal mb-4 wow fadeIn" style="width:22rem;">'+
      '<!--Card image-->'+
      '<div class="view overlay zoom">'+
        '<img class="card-img-top" src="' + img + '" alt="Card image cap">'+
        '<a onclick="playMusic(' + total + ')">'+
          '<div class="mask rgba-white-slight"></div>'+
        '</a>'+
      '</div>'+
      '<!--Card image-->'+
      '<ul align="right">'+
        '<li class="list-inline-item pt-auto">'+
          '<a class="btn btn-action ml-auto mr-4 btn-sm waves-effect waves-light" target="_blank" href="' + url + '" style="background-color: #F50057;"><i class="fas fa-download pl-1"></i></a></li>'+
      '</ul>'+

      '<!--Card content-->'+
      '<div class="card-body">'+
       ' <!--Title-->'+
        '<a onclick="playMusic(' + total + ')">'+
          '<h4 class="card-title">' + name + '</h4>'+
        '</a>'+
      '</div>'+

      '<div class="rounded-bottom blue text-center pt-3 mt-auto">'+
        '<ul class="list-unstyled list-inline font-small">'+
          '<li class="list-inline-item pr-2 white-text"><i class="fas fa-eye pr-1"></i>' + view + '</li>'+
          '<li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fas fa-comments pr-1"></i>3</a></li>'+

          '<li class="list-inline-item"><a  class="white-text"><i class="fas fa-heart pr-1"> </i>3</a></li>'+
          '<li class="list-inline-item pr-2"><a href="#" class="white-text"><i class="fas fa-user pr-1"></i>' + names[uid].username + '</a></li>'+
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
    card(img,c[i].view,c[i].uid,c[i].name, total);
    total = total + 1;
  }
}

// Custom Music Player
// Getting elements using querySelector()
var musicname = document.querySelector("#mscname");
var prog = document.querySelector("progress_");
var currentMusic;

function stopDel() {
  // Cancel button
  // Set bottom navbar invisible and stopping the audio
  document.querySelector("b-navbar").setAttribute("style", "display: none;");
  stop_aud();

  // Then delete the audio tag using document.getElementById('').remove()
  document.getElementById("audio").remove();
}

// This fuction will be triggered when the play button pressed (Inside the card)
// Function call at : Line 60
function playMusic(num) {
  currentMusic = num;
  // Remove if there is player that is playing audio
  try {
    document.getElementById("audio").remove();
    document.getElementById("mscname").innerHTML = json[num].name;
  }
  catch(err) {
    // This will happened if theres no player is playing
    console.log(err);
  }
  finally {
    console.log(json);
    musicname.innerHTML = json[num].name;
    console.log(musicname);
    document.getElementById("b-navbar").setAttribute("style", "");
    botNavBar.innerHTML += '<audio preload="none" controls id="audio" style="display: none;"> <source src="' + json[num].url + '" type="audio/mpeg"/></audio>';
    startplayer();
    play_aud();
  }
}

function setloop() {
  document.querySelector("#audio").loop = !document.querySelector("#audio").loop;
  if(document.querySelector("#audio").loop) {
    document.querySelector("#looptxt").innerHTML = "Loop (ON)";
  } else {
    document.querySelector("#looptxt").innerHTML = "Loop (OFF)";
  }
}

// This code I copy pasted from online :v
// window.onload = function() { document.getElementById("openModalLoading").remove(); };
var player;
var progressbar = document.querySelector("prog");

function startplayer()
{
  player = document.getElementById('audio');
  player.controls = false;

  player.onloadstart = function() {
      console.log("Buffering data...");
      modalLoading.init(true);
  };
  player.ondurationchange = function() {
    console.log("Audio can be played!");
    document.getElementById("openModalLoading").remove();
    document.getElementById("prog").setAttribute("aria-valuemax", player.duration);
    // player.currentTime
    // player.duration
  }
  player.ontimeupdate = function() {
    document.getElementById("prog").setAttribute("aria-valuenow", player.currentTime);
    document.getElementById("prog").setAttribute("style", "width :" + parseInt((player.currentTime / player.duration)*100) + "%;");
  }
  player.onended = function() {
    if(!player.loop){
      playMusic(currentMusic + 1);
    }
  }
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
  player.volume = document.getElementById("change_vol").value;
}
