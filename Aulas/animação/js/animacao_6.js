let my_req;
window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');
    let ball = new Ball(canvas.width / 2, canvas.height / 2, 20, "red");
    let vx = 5;
    let vy = 2;
    let running = false;

    function drawFrame() {
        //context.clearRect(0, 0, canvas.width, canvas.height);
        context.fillStyle = 'rgba(255,255,255,0.3)';
        context.fillRect(0,0,canvas.width,canvas.height);

        if ((ball.y + vy > canvas.height) || (ball.y + vy < 0)) {
            vy = -vy;
        }
        ball.y += vy;
        if ((ball.x + vx > canvas.width) || (ball.x + vx < 0)) {
            vx = -vx;
        }
        ball.x += vx;

        ball.draw(canvas);
        my_req = window.requestAnimationFrame(drawFrame);
    }

    canvas.addEventListener('mousemove', function(e){
        if (!running) {
            context.fillStyle = 'rgba(255,255,255,0.3)';
            context.fillRect(0,0,canvas.width,canvas.height);
            ball.x = e.clientX;
            ball.y = e.clientY;
            ball.draw(canvas);
        }
    });

    canvas.addEventListener("click",function(e){
        if (!running) {
            my_req = window.requestAnimationFrame(drawFrame);
            running = true;
        }
    });

    canvas.addEventListener("mouseout",function(e){
        window.cancelAnimationFrame(my_req);
        running = false;
    });
    ball.draw(canvas);
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