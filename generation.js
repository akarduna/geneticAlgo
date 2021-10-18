import rocketRend from "./rendObjs/rocketRend";

class Generation {
    constructor(hyper,Rockets, targ) {
        this.hyper = hyper;
        this.Rockets = Rockets;
        this.tarX = targ.x;
        this.tarY = targ.y;
        this.sorted = false;
        this.targ = targ;
    }
    lowScore() {
        return this.Rockets[0].score;
    }
    createGenes(){
        let genes = []
        for (let i = 0; i < this.hyper.numGenes; i++){
            genes.push([Math.random()*10 - 5, Math.random()*10 - 5]);
        }
        return genes;
    }
    update() {
        for(let rocket of this.Rockets) {
            rocket.update();
        }
    }
    check() {
        return (!this.Rockets[0].alive);
    }
    rend() {
        for(let rocket of this.Rockets) {
            rocket.rend();
        } 
    }
    computeScore() {
        for(let rocket of this.Rockets) {
            rocket.computeScore(this.tarX, this.tarY);
        }
    }
    sortRockets(){
        this.computeScore();
        this.Rockets.sort((a,b) => a.score - b.score);
        this.sorted = true;
    }
    reset() {
        for ( let rocket of this.Rockets){
            rocket.reset();
        }
    }
    next() {
        this.reset();
        let newRocks = this.Rockets.slice(0, this.hyper.popSize*this.hyper.samePer);
        for (let i = 0; i < this.hyper.popSize*this.hyper.newPer; i++){
            let genes = this.createGenes();
            let rock = new rocketRend(this.Rockets[0].startX, this.Rockets[0].startY, this.Rockets[0].ctx, this.tarX, this.tarY, genes)
            newRocks.push(rock);
        }
        for (let i = 0; newRocks.length < this.hyper.popSize; i+=2) {
            newRocks.push(this.Rockets[i].breed(this.Rockets[i+1], this.hyper.mutPer));
        }
        return new Generation(this.hyper, newRocks, this.targ);
    }
}
export default Generation