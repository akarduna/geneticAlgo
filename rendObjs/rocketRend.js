class rocketRend { 
    constructor (x, y, ctx, tarX, tarY, genes) {
        this.x = x;
        this.startX = x;
        this.y = y;
        this.startY = y;
        this.ctx = ctx;
        this.xLen = 5;
        this.yLen = 10;
        this.genes = genes;
        this.genesPerm = JSON.parse(JSON.stringify(genes));
        this.alive = true;
        this.score = 0;
        this.tarX = tarX;
        this.tarY = tarY;
    }
    rend(){
        this.ctx.beginPath();
        this.ctx.moveTo(this.x, this.y);
        this.ctx.lineTo(this.x+this.xLen, this.y+this.yLen);
        this.ctx.lineTo(this.x-this.xLen, this.y+this.yLen);
        this.ctx.fill();
    }
    update() {
        if (this.alive) {
            let [xval, yval] = this.genes.pop()
            this.x += xval;
            this.y += yval;
            if (this.genes.length == 0) {
                this.alive = false;
            }
            if(!this.alive && this.score >= 0) {
                this.computeScore(this.tarX, this.tarY)
            }
        }
    }
    fillGenes(len){
        this.genes = []
        for (let i = 0; i < len; i++){
            this.genes.push([Math.random()*10 - 5, Math.random()*10 - 5]);
        }
        this.genesPerm = JSON.parse(JSON.stringify(this.genes));
    }
    computeScore(tarX, tarY) {
        this.score = Math.sqrt(((tarX - this.x)**2) + ((tarY - this.y)**2));
    }
    reset() {
        this.alive = true;
        this.x = this.startX;
        this.y = this.startY;
        this.genes = JSON.parse(JSON.stringify(this.genesPerm));
        this.score = 0;
    }
    breed(r2, mutPer) {
        let newGenes = []
        for(let i = 0; i < this.genes.length; i++) {
            if (Math.random()*100 > mutPer) {
                newGenes.push([Math.random()*10 - 5, Math.random()*10 - 5]);
            }
            else{
                let newX = (this.genes[i][0] + r2.genes[i][0])/2;
                let newY = (this.genes[i][1] + r2.genes[i][1])/2;
                newGenes.push([newX, newY]);
            }
        }
        return new rocketRend(this.startX, this.startY, this.ctx, this.tarX, this.tarY, newGenes);
    }
}
export default rocketRend