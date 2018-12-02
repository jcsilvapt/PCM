let my_req;
window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let ball = new Ball(canvas.width / 2, canvas.height / 2, 40, "red");
    let angle = 0;

    function drawFrame() {
        context.clearRect(0, 0, canvas.width, canvas.height);
        ball.x = canvas.width / 2 + Math.sin(angle) * 50;
        ball.y = canvas.height / 2 + Math.cos(angle) * 80;
        angle += 0.05;
        ball.draw(canvas);
        my_req = window.requestAnimationFrame(drawFrame);
    }

    window.requestAnimationFrame(drawFrame);
}

function stop() {
    window.cancelAnimationFrame(my_req);
}


if (!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    function (callback) {
        return window.setTimeout(callback, 17, 1000 / 60);
    });
}

if (!window.cancelAnimationFrame) {
    window.cancelAnimationFrame = (window.webkitcancelAnimationFrame ||
    window.mozCancelRequestAnimationFrame);
}

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