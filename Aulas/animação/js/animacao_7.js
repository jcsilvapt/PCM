let my_req;
window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let im = new Image();
    im.onload = function () {
        bg = new Background (0, 0, im);

        function drawFrame() {
            context.clearRect(0, 0, canvas.width, canvas.height);
            bg.draw(canvas);
            my_req = window.requestAnimationFrame(drawFrame);
        }
        my_req = window.requestAnimationFrame(drawFrame);
    }
    im.src = "images/bg.png";
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

class Background {
    constructor(x, y, bg_img) {
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.bg_img = bg_img;
    }

    draw (cnv) {
        let ctx = cnv.getContext("2d");

        this.y += this.speed;
        ctx.drawImage(this.bg_img, this.x, this.y);
        ctx.drawImage(this.bg_img, this.x, this.y - cnv.height);
        if (this.y >= cnv.height) this.y = 0;
    }
}