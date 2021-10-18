class targetRend {
    constructor (x, y, w, h, ctx){
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.ctx = ctx;
    }
    rend() {
        this.ctx.fillStyle = "#FF0000";
        this.ctx.fillRect(this.x, this.y, this.w, this.h);
        this.ctx.fillStyle ="#000000";
    }
}
export default targetRend