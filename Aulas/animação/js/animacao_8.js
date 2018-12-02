let my_req;
window.onload = function () {
    let canvas = document.getElementById('canvas');
    let context = canvas.getContext('2d');

    let numImages = 2;
    let numLoaded = 0;

    function imageLoaded() {
        numLoaded++;
        if (numLoaded === numImages) {
            bg = new Background (0, 0, im);
            enm = new Enemies(0, 10, im1);
            function drawFrame() {
                context.clearRect(0, 0, canvas.width, canvas.height);
                bg.draw(canvas);
                enm.draw(canvas);
                my_req = window.requestAnimationFrame(drawFrame);
            }
            my_req = window.requestAnimationFrame(drawFrame);
        }
    }

    let im = new Image();
    im.onload = function () {
       imageLoaded();
    }
    im.src = "images/bg.png";

    let im1 = new Image();
    im1.onload = function () {
        imageLoaded();
    }
    im1.src = "images/enemy.png";

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

class Enemies {
    constructor(x, y, e_img)
    {
        this.x = x;
        this.y = y;
        this.speed = 1;
        this.e_img = e_img;
        this.n_enemies = 5;
        this.vx = 50;
    }

    draw (cnv) {
        let ctx = cnv.getContext("2d");

        this.x += this.speed;
        for (let i = 0; i < this.n_enemies; i++){
            ctx.drawImage(this.e_img, this.x + (i * this.vx), this.y);
        }
        if ((this.x + this.n_enemies * this.vx) > cnv.width) {
            this.speed = -this.speed;
        }

        if (this.x < 0) {
            this.speed = -this.speed;
        }

    }
}