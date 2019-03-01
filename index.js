var flakes = [];
function genFlake() {
  if(op>0)
  flakes.push([Math.random()*innerWidth,-flakesize,Math.random()*6,Math.random()*(Math.PI*2)-Math.PI]);
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
var op = 1;
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
var start = true;
function frame() {
        c=document.querySelector("canvas");
        c.width=innerWidth;
        c.height=innerHeight;
        ctx=c.getContext("2d");
        var now = Date.now();
        if(start) {
          start = false;
          c.addEventListener("mousedown",()=>{
            playUnformattedSong("./bg.mp3");
          });
        }
        if(!last) last = now;
        var delta = now-last;
        var average = delta/(1000/fps);
        flakedelay = delta*3;
        spawndenum = flakedelay*spawnaspect;
        des+=delta;
        mes+=delta;
        pushdistance = Math.min(c.width,c.height)/2.6;
        ringmaxdistance = Math.min(c.width,c.height)/2;
        flakesize = Math.min(c.width,c.height)/160;
        perspective = flakesize/6.2;
        r = [Math.min(c.width,c.height)/25.6,Math.min(c.width,c.height)/17,Math.min(c.width,c.height)/12.8];
        logosize = Math.min(innerWidth,innerHeight)/22;
        //-=-//
        if(audio!==undefined)
        audio.volume = document.getElementsByClassName("volume")[0].value/100;
        if(audio2!==undefined)
        audio2.volume = document.getElementsByClassName("volume")[0].value/100;
        var datta = data;
        if(data===undefined) datta = new Array(bars).fill(0);
        var len = datta.length;
        var h = innerHeight / len;
        var x = innerWidth - 1;
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
        ctx.translate(innerWidth/2,innerHeight/2);
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
          var angle = Math.atan2(flakes[i][1]-innerHeight/2,flakes[i][0]-innerWidth/2);
          var dist = 1-gdis(flakes[i],[innerWidth/2,innerHeight/2])/pushdistance;
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
          if(flakes[i][1]>innerHeight+(flakesize-flakes[i][2]*perspective)) flakes.splice(i,1);
        }
        ctx.translate(innerWidth/2,innerHeight/2);
        ctx.lineWidth = innerWidth/160;
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
          ctx.fillRect(-innerWidth/2,-innerHeight/2,innerWidth,innerHeight);
          ctx.fillStyle="white";
          ctx.font=Math.min(innerWidth,innerHeight)/10+"px monospace";
          ctx.textAlign="center";
          les+=delta;
          if(les>=150*4) les = 0;
          ctx.fillText("Loading"+new Array(Math.ceil(les/150)).join("."),0,innerHeight/2-Math.min(innerWidth,innerHeight)/30);
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
