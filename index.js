var albums = [
  
  {
    name: "[ Favorites ]",
    image: "https://raw.githubusercontent.com/Qyther/weaw/master/Album3.png",
    songs: [
      {
        name: "Imagine Dragons - Believer",
        link: "./bg.mp3"
      },
      {
        name: "Patsanskaya",
        link: "./bg1.mp3"
      },
      {
        name: "Inova - Isolation",
        link: "./bg2.mp3"
      },
      {
        name: "AJR - I'm Ready",
        link: "./bg3.mp3"
      }
    ]
  },
  
  {
    name: "[ Album Title 2 ]",
    image: "https://raw.githubusercontent.com/Qyther/weaw/master/Album2.png",
    songs: [
      {
        name: "Freezingkeys",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Nitemare (F. Frisel)",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Blinding ligts",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Teratoas",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      }
    ]
  },
  
  {
    name: "[ Album Title 3 ]",
    image: "https://raw.githubusercontent.com/Qyther/weaw/master/Album1.png",
    songs: [
      {
        name: "Freezing kes",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Nitemare (Ft. Frise)",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Blinding light",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      },
      {
        name: "Tratomas",
        link: "http://dehdyoutubers.paperplane.io/bg.mp3"
      }
    ]
  }
  
];
var currentalbumindex = 0;
var audio;
var currentplay;
var playableSongs = [];

(()=>{
  setTimeout(()=>{
    var an = Math.min(albums[currentalbumindex].songs.length,document.getElementsByClassName("song").length);
    for(var i=0;i<an;i++) {
      document.getElementsByClassName("firstletter")[i].innerHTML = albums[currentalbumindex].songs[i].name.slice(0,1);
      document.getElementsByClassName("otherletters")[i].innerHTML = albums[currentalbumindex].songs[i].name.slice(1);
      playableSongs.push(albums[currentalbumindex].songs[i].link);
    }
  });
})();

function handletrack(a,b) {
  if(currentplay!==a&&audio) {
    audio.pause();
    audio2.pause();
    audio = undefined;
    audio2 = undefined;
    document.getElementsByClassName("audiobutton")[currentplay].className="playbutton audiobutton";
  }
  if(currentplay===undefined) currentplay = a;
  for(var i=0;i<document.getElementsByClassName("audiobutton").length;i++) {
    document.getElementsByClassName("audiobutton")[i].className="playbutton audiobutton";
  }
  if(!audio) {
    playUnformattedSong(playableSongs[a]);
    
    currentplay = a;
    switchopacity = 1;
    document.getElementsByClassName("albummainimage")[0].style.boxShadow="0 0 40px 7px #469bab";
    document.getElementsByClassName("audiobutton")[a].className="pausebutton audiobutton";
  } else {
    switchopacity = 0;
    audio.pause();
    audio2.pause();
    audio = undefined;
    audio2 = undefined;
    currentplay = undefined;
    document.getElementsByClassName("albummainimage")[0].style.boxShadow="";
    document.getElementsByClassName("audiobutton")[a].className="playbutton audiobutton";
  }
}


function handlealbumswitch(a) {
  switchopacity = 0;
  document.getElementsByClassName("albummainimage")[0].style.boxShadow="";
  if(audio!==undefined) audio.pause();
  if(audio2!==undefined) audio2.pause();
  audio = undefined;
  currentplay = undefined;
  for(var i=0;i<document.getElementsByClassName("audiobutton").length;i++) {
    document.getElementsByClassName("audiobutton")[i].className="playbutton audiobutton";
  }
  currentalbumindex+=a;
  if(currentalbumindex<0) currentalbumindex = albums.length-1;
  if(currentalbumindex>albums.length-1) currentalbumindex = 0;
  playablesongs = [];
  for(var i=0;i<document.getElementsByClassName("albumimage").length;i++) {
    document.getElementsByClassName("albumimage")[i].style.opacity = 0;
  }
  setTimeout(()=>{
    for(var i=0;i<document.getElementsByClassName("albumsideimage").length;i++) {
      document.getElementsByClassName("albumsideimage")[i].style.opacity = .6;
    }
    for(var i=0;i<document.getElementsByClassName("albumimage").length;i++) {
      var newIndex = i+currentalbumindex;
      if(newIndex>albums.length-1) newIndex-=albums.length;
      if(newIndex<0) newIndex+=albums.length-1;
      var newImage = albums[newIndex].image;
      document.getElementsByClassName("albumimage")[i].style.backgroundImage = "url("+newImage+")";
    }
    document.getElementsByClassName("albummainimage")[0].style.opacity = 1;
  },850);
  document.getElementsByClassName("albumtitle")[0].innerHTML = albums[currentalbumindex].name
  var an = Math.min(albums[currentalbumindex].songs.length,document.getElementsByClassName("song").length);
  for(var i=0;i<an;i++) {
    document.getElementsByClassName("firstletter")[i].innerHTML = albums[currentalbumindex].songs[i].name.slice(0,1);
    document.getElementsByClassName("otherletters")[i].innerHTML = albums[currentalbumindex].songs[i].name.slice(1);
    playableSongs.push(albums[currentalbumindex].songs[i].link);
  }
}

var flakes = [];
function genFlake() {
  if(op>0)
  flakes.push([innerWidth/2+(Math.random()*Math.min(c.width,c.height)-Math.min(c.width,c.height)/2),-flakesize,Math.random()*6,Math.random()*(Math.PI*2)-Math.PI]);
}
function gdis(a,b) {
  return Math.sqrt(Math.pow(a[0]-b[0],2)+Math.pow(a[1]-b[1],2));
}
var bgn = 0;
var end = Math.PI*2;
var formulas = [
  "size*pow(sin(t),3)",
  "size*cos(t)-size/3*cos(2*t)-size/6*cos(3*t)-cos(4*t)"
];
var op = 0;
var movespeed = .2;
var swingspeed = .01;
var fallspeed = .6;

var pushdistance;
var ringmaxdistance;
var flakesize;
var perspective;

var perspectivespeed = .9;
var fps = 120;
var logosize;
var glowsize = 1.8;
var glowopacity = .3;
var switchopacity = 0;
var brightness = .6;
var fadeinspeed = .004;
var fadeoutspeed = .008;
var pushpower = 1.4;
var pushmult = 2;
var r = [30,45,60];
var rings = [];
var logorotation = 0;
var colors = ["blue","aqua","deeppink","red","lightpink","yellow","hotpink","lime","purple"];
var ncol = 0;
var bse = 3;
var swdelay = 175;
var flakedelay = 100;
var spawndenum = 75;
var spawnaspect = .75;

function colorSwitch() {
  rings.push(0);
  logorotation+=.4;
  ncol++;
  if(ncol>=colors.length) ncol=0;
  var c = 0;
  var loop = setInterval(()=>{
    c+=bse;
    if(c<bars) {
      for(var i=0;i<bse;i++) {
        colorarray[c-i]=colors[ncol];
      }
    } else clearInterval(loop);
  });
}
var audio;
var audio2;
var loop;
var data;
var bars = 650;
var colorarray = new Array(bars).fill(colors[0]);
var actx;
var analyser;
function process(stream) {
  actx = new(AudioContext || webkitAudioContext)();
  analyser = actx.createAnalyser();
  var source = actx.createMediaElementSource(stream);
  source.connect(analyser);
  data = new Uint8Array(analyser.frequencyBinCount);
  loading = false;
}
      var des = 0;
      var mes = 0;
      var les = 0;
      var last;
var loading = false;
function frame() {
  c=document.querySelector("canvas");
  c.width=innerWidth;
  c.style.top = "calc(36.5vw - "+ document.documentElement.scrollTop +"px)";
  c.height=innerWidth/10*8;
  c.style.opacity = op;
  ctx=c.getContext("2d");
  var now = Date.now();
  if(!last) last = now;
  var delta = now-last;
  var average = delta/(1000/fps);
  if(op>switchopacity) op-=fadeoutspeed*average;
  if(op<switchopacity) op+=fadeinspeed*average;
  if(Math.abs(op)<.05) {
    last=now;
    flakes = [];
          return;
        }
        var now = Date.now();
        flakedelay = delta*3;
        spawndenum = flakedelay*spawnaspect;
        des+=delta;
        mes+=delta;
        pushdistance = Math.min(c.width,c.height)/2.6;
        ringmaxdistance = Math.min(c.width,c.height)/2;
        flakesize = Math.min(c.width,c.height)/160;
        perspective = flakesize/6.2;
        r = [Math.min(c.width,c.height)/25.6,Math.min(c.width,c.height)/17,Math.min(c.width,c.height)/12.8];
        logosize = Math.min(c.width,c.height)/22;
        //-=-//
        if(!loading)
        ctx.fillStyle="rgba(0,0,0,.4)";
        ctx.fillRect(0,0,innerWidth,innerHeight);
        var datta = data;
        if(data===undefined) datta = new Array(bars).fill(0);
        var len = datta.length;
        var h = c.height / len;
        var x = c.width - 1;
        if(data!==undefined) analyser.getByteFrequencyData(data);
        var av = 0;
        for(var i=0;i<bars;i++) { 
          if(datta[i]!==0)
          av+=datta[i];
        }
        av/=bars;
        if(av>=150&&des>=swdelay) {
          des = 0;
          colorSwitch();
        }
        if(mes>=flakedelay) {
          mes = 0;
          for(var i=0;i<av/spawndenum;i++) {
            genFlake();
          }
        }
        ctx.translate(c.width/2,c.height/2);
        var ads = [];
        ctx.strokeStyle="blue";
        for(var j=0;j<r.length;j++) {
          ctx.beginPath();
          for(var i=0;i<bars;i++) {
            var size = (r[j]+av/15+datta[i]/10);
            var t = (end+Math.abs(bgn))/bars*i-Math.abs(bgn);
            var xf = eval(formulas[0].replace(/sqrt/g,"Math.sqrt").replace(/pow/g,"Math.pow").replace(/cos/g,"Math.cos").replace(/sin/g,"Math.sin").replace(/log/g,"Math.log"));
            var yf = eval(formulas[1].replace(/sqrt/g,"Math.sqrt").replace(/pow/g,"Math.pow").replace(/cos/g,"Math.cos").replace(/sin/g,"Math.sin").replace(/log/g,"Math.log"));
            ctx.lineTo(xf,yf);
            ads.push([xf-1,yf-1,i]);
          }
          var t = 0;
          var size = (r[j]+av/15+datta[0]/10);
          var xf = eval(formulas[0].replace(/sqrt/g,"Math.sqrt").replace(/pow/g,"Math.pow").replace(/cos/g,"Math.cos").replace(/sin/g,"Math.sin").replace(/log/g,"Math.log"));
          var yf = eval(formulas[1].replace(/sqrt/g,"Math.sqrt").replace(/pow/g,"Math.pow").replace(/cos/g,"Math.cos").replace(/sin/g,"Math.sin").replace(/log/g,"Math.log"));
          ctx.lineTo(xf,yf);
          ctx.stroke();
          ctx.closePath();
        }
        for(var i=0;i<ads.length;i++) {
          ctx.fillStyle=colorarray[ads[i][2]];
          ctx.fillRect(ads[i][0],ads[i][1],2,2);
        } 
        ctx.rotate(logorotation);
        var img = new Image();
        img.src="./musicicon.png";
        ctx.drawImage(img,-(logosize+av/15)/2,-(logosize+av/15)/2,logosize+av/15,logosize+av/15);
        logorotation+=av/10000;
        ctx.resetTransform();
        ctx.fillStyle="black";
        ctx.strokeStyle="black";
        for(var i=0;i<flakes.length;i++) {
          var angle = Math.atan2(flakes[i][1]-c.height/2,flakes[i][0]-c.width/2);
          var dist = 1-gdis(flakes[i],[c.width/2,c.height/2])/pushdistance;
          if(dist<0) dist = 0;
          var offset = [
            Math.cos(angle)*av*pushpower*dist*pushmult,
            Math.sin(angle)*av*pushpower*dist*pushmult
          ];
          var dpo = (1-av/600);
          if(dpo<0) dpo = 0;
          var opo = (1-dist)*dpo;
          if(opo>1) opo=1;
          ctx.lineWidth=glowsize;
          var ewo = glowopacity-opo;
          if(ewo<0) ewo = 0;
          var owe = (flakesize-flakes[i][2]*perspective)/flakesize/(1/brightness)+brightness-opo;
          if(owe<0) owe = 0;
          ctx.strokeStyle="rgba(46,234,249,"+ewo+")";
          ctx.fillStyle="rgba(46,234,249,+"+owe+")";
          ctx.beginPath();
          ctx.arc(flakes[i][0]+offset[0]*perspective,flakes[i][1]+offset[1]*perspective,flakesize-flakes[i][2]*perspective,0,2*Math.PI);
          ctx.fill();
          ctx.closePath();
          flakes[i][1]+=fallspeed*average;
          flakes[i][3]+=swingspeed*average;
          flakes[i][0]+=Math.cos(flakes[i][3])/(1/movespeed+flakes[i][2]*perspectivespeed)*average;
          if(flakes[i][1]>c.height+(flakesize-flakes[i][2]*perspective)) flakes.splice(i,1);
        }
        ctx.translate(c.width/2,c.height/2);
        ctx.lineWidth = c.width/160;
        for(var i=0;i<rings.length;i++) {
          ctx.beginPath();
          ctx.strokeStyle="rgba(46,234,249,"+(1-rings[i]/ringmaxdistance)+")";
          ctx.arc(0,0,rings[i]+av/5,0,2*Math.PI);
          ctx.stroke();
          ctx.closePath();
          if(rings[i]>ringmaxdistance) rings.splice(i,1);
          rings[i]+=average*6;
        }
        if(logorotation>Math.PI*2) logorotation-=Math.PI*2;
        last=now;
        if(loading) {
          ctx.fillStyle="rgba(0,0,0,.6)";
          ctx.fillRect(-c.width/2,-c.height/2,c.width,c.height);
          ctx.fillStyle="white";
          ctx.font=c.width/18+"px monospace";
          les+=delta;
          if(les>=150*4) les = 0;
          ctx.fillText("Loading"+new Array(Math.ceil(les/150)).join("."),-innerWidth/2,c.height/2-c.width/30);
        } else les = 0;
      }

function playSong(a) {
  loading = true;
  flakes = [];
  colorarray = new Array(bars).fill(colors[0]);
      if(audio) {
        audio.pause();
        audio=undefined;
      }
      if(audio2) {
        audio2.pause();
        audio2=undefined;
      }
  data = undefined;
  audio = new Audio(a);
  audio2 = new Audio(a);
  audio2.play();
  audio.play();
  process(audio);
}
function playUnformattedSong(a) {
  loading = true;
  var xhr = new XMLHttpRequest(); 
  xhr.open("GET", a); 
  xhr.responseType = "blob";
  xhr.addEventListener("load",()=>{
    var blob = xhr.response;
    var fr = new FileReader();
    fr.readAsDataURL(blob);
    fr.addEventListener("loadend",e=>{
      var base64 = e.target.result;
      playSong(base64);
    });
  });
  xhr.send();
}

(()=>{
  setTimeout(()=>{
    loop=setInterval(frame);
  });
})();
