var views = document.querySelector("#aaa");
var titlesong = document.querySelector("#title-song");
var download = document.querySelector("#d");
var image = document.querySelector("#i");
var topaudio = document.querySelector("#topaudio");
var source = document.createElement('source');
var awal,akhir,total = 0;
var json = {};
var popmusik = {};
var data = {};

// Untuk elements
fetch('https://teammusic-tw.firebaseio.com/upload/text.json')
.then((response) => {
    return response.json();
})
.then((data) => {
  json = Object.values(data);
  popmusik = Object.values(data).sort(function(a,b) {
    return b.view - a.view;
  });
  data = popmusik[0];
  titlesong.innerHTML = data.name;
  views.innerHTML = data.view + " views";
  download.setAttribute("href", data.url);

  let img;
  if(data.img === undefined) {
      img = 'https://img.icons8.com/bubbles/2x/music.png';
  } else {
      img = data.img;
  }
  image.setAttribute("src", img);
  source.setAttribute("src", data.url);
  source.setAttribute("type", "audio/mpeg");
  topaudio.appendChild(source);
});

// Stay updated With new TeamMusic APK
var btn = document.getElementById('tmmusicdownload');
var txt = document.getElementById('txt');

fetch('https://teammusic-tw.firebaseio.com/update/version/-Lj06YCr3nTQAidRfSmZ.json')
.then((response) => {
  return response.json();
})
.then((data) => {
  json = Object.values(data);

  btn.setAttribute("href", json[7]);
  txt.innerHTML = json[3];
})
