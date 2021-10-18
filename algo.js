import Generation from "./generation";
import rocketRend from "./rendObjs/rocketRend";

class algo {
    constructor(hyper, startX, startY, targ ,ctx){
        this.hyper = hyper;
        this.Rockets = [];
        this.ctx = ctx;
        this.startX = startX;
        this.startY = startY;
        this.targ = targ;
        this.gen;
    }
    reset() {
        this.Rockets = [];
        for (let i = 0; i < this.hyper.popSize; i++)
        {
            this.Rockets.push(new rocketRend(this.startX, this.startY, this.ctx, this.targ.x, this.targ.y, []))
            this.Rockets[this.Rockets.length-1].fillGenes(this.hyper.numGenes);
        }
        this.gen = new Generation(this.hyper, this.Rockets, this.targ)
    }
    singleFrame() {
        this.gen.update();
    }
    genDone(threshold) {
        if (this.gen.lowScore() < threshold) {
            this.ctx.clearRect(0,0,1000,1000);
            this.targ.rend();
            this.gen.rend();
            this.reset();
            return true;
        }
        else {
            this.gen.sortRockets();
            let tempGen = this.gen.next();
            this.gen = undefined;
            this.gen = tempGen;
            return false;
        }
    }
    runGeneration() {
        for (let i = 0; i < this.hyper.numGenes; i++) {
            this.singleFrame();
        }
    }
    run(threshold = 100, generations = 10){
        this.reset();
        for(let i = 0; i <generations; i++) {
            do {
                this.runGeneration();
            }while(!this.genDone(threshold));
            console.log("finished")
        }
    }
}
export default algo