'use strict';

var app = null;
var ctx = null;
var cnv = null;

function main() {
    cnv = document.getElementById('canvas');
    ctx = cnv.getContext("2d");
    ctx.canvas.width = window.innerWidth-2;
    ctx.canvas.height = window.innerHeight-160;
    drawCanvasRect(cnv);
    app = new FotoPrint();
    app.init();
    app.drawObj(cnv);
    cnv.addEventListener('mousedown', drag, false);
    cnv.addEventListener('dblclick', makenewitem, false);
    loadInitImg();
}

function drawCanvasRect(cnv) {
    let ctx = cnv.getContext("2d");

    ctx.clearRect(0, 0, cnv.width, cnv.height);
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    ctx.strokeRect(0, 0, cnv.width, cnv.height);
}

//Drag & Drop operation
//drag
function drag(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    if (app.dragObj(mx, my)) {
        cnv.style.cursor = "pointer";
        cnv.addEventListener('mousemove', move, false);
        cnv.addEventListener('mouseup', drop, false);
    }

}

//Drag & Drop operation
//move
function move(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    app.moveObj(mx, my);
    drawCanvasRect(cnv);
    app.drawObj(cnv);
}

//Drag & Drop operation
//drop
function drop() {
    let cnv = document.getElementById('canvas');

    cnv.removeEventListener('mousemove', move, false);
    cnv.removeEventListener('mouseup', drop, false);
    cnv.style.cursor = "crosshair";
}

//Insert a new Object on Canvas
//dblclick Event
function makenewitem(ev) {
    let mx = null;
    let my = null;
    let cnv = document.getElementById('canvas');

    let xPos = 0;
    let yPos = 0;
    [xPos, yPos] = getMouseCoord(cnv);
    mx = ev.x - xPos;
    my = ev.y - yPos;

    if (app.insertObj(mx, my)) {
        drawCanvasRect(cnv);
        app.drawObj(cnv);
    }
}

//Delete button
//Onclick Event
function remove() {
    let cnv = document.getElementById('canvas');

    app.removeObj();
    drawCanvasRect(cnv);
    app.drawObj(cnv);
}

//Save button
//Onclick Event
function saveasimage() {
    try {
        window.open(document.getElementById('canvas').toDataURL("imgs/png"));}
    catch(err) {
        alert("You need to change browsers OR upload the file to a server.");
    }
}


//Mouse Coordinates for all browsers
function getMouseCoord(el) {
    let xPos = 0;
    let yPos = 0;

    while (el) {
        if (el.tagName === "BODY") {
            // deal with browser quirks with body/window/document and page scroll
            let xScroll = el.scrollLeft || document.documentElement.scrollLeft;
            let yScroll = el.scrollTop || document.documentElement.scrollTop;

            xPos += (el.offsetLeft - xScroll + el.clientLeft);
            yPos += (el.offsetTop - yScroll + el.clientTop);
        } else {
            // for all other non-BODY elements
            xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
            yPos += (el.offsetTop - el.scrollTop + el.clientTop);
        }

        el = el.offsetParent;
    }
    return [xPos, yPos];
}

function writeText() {
    let path = document.getElementById("textinput");
    let button = document.getElementById("txtbtnSub");
    let color = document.getElementById("colorPicker");
    console.log(color);
    if(path.value != "") {
        let text = new insertText(window.innerWidth/2, window.innerHeight/2, 24, "black", "teste");
        app.insertOnPoll(text);
        app.drawObj(cnv);
        path.value = "";
        path.classList.remove("cenas2");
        button.classList.remove("textSubmitOn");
    }else {
        alert("Erro :'(");
    }
}

function loadInitImg() {

    let r = new Rect(100, 100, 20, 20, "red");
    let o = new Oval(150, 150, 50, 1, 1, "blue");
    let h = new Heart(250, 250, 80, "pink");
    let dad = new Picture(200, 200, 70, 70, "imgs/allison1.jpg");
    let bear = new Bear(200,100,200,200, "black");
    let ghost = new Ghost(200,100,200,200, "black");

    let cenasfixes = [r, o, h, dad, bear, ghost];

    for(let i = 0; i < cenasfixes.length; i++) {
        convImg(cenasfixes[i]);
    }

}

function convImg(obj) {
var new_img_url = cnv.toDataURL();
var fatherPath = document.getElementById("imagePosition");
var path = document.createElement('div');
path.className = "imgToInsert";
fatherPath.append(path);
var img = document.createElement('img');
img.src = new_img_url;
path.append(img);
fatherPath.append(path);
}