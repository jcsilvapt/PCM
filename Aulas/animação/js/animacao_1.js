window.onload = function () {
    let canvas = document.getElementById('canvas');
    let ctx = canvas.getContext("2d");
    let ball = new Ball(canvas.width/2, canvas.height/2, 40, "red");

    function drawFrame() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ball.x += 3;
        if (ball.x + ball.radius > canvas.width) ball.x = ball.radius;
        ball.draw(canvas);
    }
    window.setInterval(drawFrame, 1000 / 60);
};

class Ball {
    constructor (x, y, r, color) {
        this.x = x;
        this.y = y;
        this.radius = r;
        this.color = color;
        this.scaleX = 1;
        this.scaleY = 1;
    }

    draw (cnv) {
        let ctx = cnv.getContext("2d");

        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.scale(this.scaleX, this.scaleY);
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(0, 0, this.radius, 0, (Math.PI * 2), true);
        ctx.closePath();
        ctx.fill();
        ctx.restore();
    }
}
