import './style.css'
import Generation from  './generation'
import rocketRend from './rendObjs/rocketRend';
import targetRend from './rendObjs/targRend';

var canvas = document.getElementById('can');
var ctx = canvas.getContext('2d'); 
let oldTime = Date.now();
let objs = []
const startX = 500;
const startY = 500;
let tarX = 100;
let tarY = 0;
let tarW = 2;
let tarH = 2;
let genCount = 0;
const targ = new targetRend(tarX, tarY, tarW, tarH, ctx);
let gen;
function reset(){
  genCount = 0;
  objs = [];
  for (let i = 0; i < 100; i++) {
    objs.push(new rocketRend(startX, startY, ctx, tarX, tarY, []));
  }
  for (let obj of objs) {
    obj.fillGenes(500);
  }
  oldTime = Date.now();
  gen = new Generation([30,20,100,95] , objs, tarX, tarY);
}
reset();

async function frame() {
  for (let i = 0; i < 500; i++){
    gen.update();
    if(gen.check()) {
      if (gen.lowScore() < 100){
        console.log(oldTime-Date.now() + ": generations: " + genCount)
        ctx.clearRect(0, 0, 1000, 1000)
        targ.rend();
        gen.rend();
        reset();
      }
      else{
        gen.sortRockets();
        let tempGen = gen.next();
        gen = undefined;
        gen = tempGen;
        genCount++;
      }
    }
  }
  setTimeout(() => {
    frame();
  }, 1);
}
frame()