import './style.css'
import Generation from  './generation'
import rocketRend from './rendObjs/rocketRend';

var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d'); 
let oldTime = Date.now();
let objs = []
const startX = 500;
const startY = 500;
for (let i = 0; i < 100; i++) {
  objs.push(new rocketRend(startX, startY, ctx, 100, 0, []));
}
for (let obj of objs) {
  obj.fillGenes(500);
}
let gen = new Generation([30,20,100,95] , objs, 100, 0);
function step() {
  const deltaTime = Date.now() - oldTime;
  if (deltaTime >= 1){
    frame();
    oldTime = Date.now()
  }
  window.requestAnimationFrame(step);
}
async function frame() {
  for (let i = 0; i < 500; i++){
    gen.update();
    if(gen.check()) {
      console.log("genereation DOne")
      ctx.clearRect(0, 0, 1000, 1000)
      gen.rend();
      gen.sortRockets();
      let tempGen = gen.next();
      gen = undefined;
      gen = tempGen;
    }
  }
  setTimeout(() => {
    frame();
  }, 10);
}
frame()