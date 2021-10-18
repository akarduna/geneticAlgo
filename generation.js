import rocketRend from "./rendObjs/rocketRend";

class Generation {
    constructor(hyper,Rockets, tarX, tarY) {
        this.hyper = hyper;
        const [sameNum, newNum, childNum, mutPer] = hyper;
        this.sameNum = sameNum;
        this.newNum = newNum;
        this.childNum = childNum;
        this.mutPer = mutPer;
        this.Rockets = Rockets;
        this.tarX = tarX;
        this.tarY = tarY;
        this.sorted = false;
    }
    lowScore() {
        return this.Rockets[0].score;
    }
    createGenes(len){
        let genes = []
        for (let i = 0; i < len; i++){
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
        let newRocks = this.Rockets.slice(0, this.sameNum);
        for (let i = 0; i < (this.childNum); i+=2) {
            newRocks.push(this.Rockets[i].breed(this.Rockets[i+1], this.mutPer));
        }
        for (let i = 0; i < this.newNum; i++){
            let genes = this.createGenes(500);
            let rock = new rocketRend(this.Rockets[0].startX, this.Rockets[0].startY, this.Rockets[0].ctx, this.tarX, this.tarY, genes)
            newRocks.push(rock);
        }
        return new Generation(this.hyper, newRocks, this.tarX, this.tarY);
    }
}
export default Generation