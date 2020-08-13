'use strict'

let gFontSize = 40
let gText;

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    imgUrl: '',
    selectedLineIdx: 0,
    lines: addLine()
}

function addLine() {
    let lines = []
    for (let i = 0; i < 4; i++) {
        let y;
        if (i === 0) {
            y = 40
        } else if (i === 1) {
            y = 260
        } else y = 150
        let line = {
            txt: '',
            size: 40,
            x: 250,
            y: y,
            align: 'center',
            color: 'red',
            font: 'Impact'
        }
        lines.push(line)
    }
    return lines
}

function updateMemeImg(url) {
    return gMeme.imgUrl = url

}

function updateMemeTxt(txt) {
    return gMeme.lines[gMeme.selectedLineIdx].txt = txt

}

function getText() {
    let text = gMeme.lines[gMeme.selectedLineIdx].txt
    return text
}



var gCanvas;
var gCtx;
var gCurrShape = 'text';
var firstLoc;

function init() {
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

}



function drawText(text, x, y) {
    gMeme.lines.forEach(function(line) {
        text = line.txt
        x = line.x
        y = line.y
        gCtx.lineWidth = '2';
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    })
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);

}

function drawImg() {
    const elImg = document.querySelector('img');
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg2() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    }
    img.src = gMeme.imgUrl;
}



function downloadCanvas(elLink) {
    const data = gCanvas.toDataURL();
    console.log(data); /// show base64 string
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
    // Note: changing the canvas dimension this way clears the canvas
    gCanvas.width = elContainer.offsetWidth;
    gCanvas.height = elContainer.offsetHeight;
}


function setShape(shape) {
    gCurrShape = shape;
}



function draw(ev) {

    switch (gCurrShape) {
        case 'triangle':
            drawTriangle(offsetX, offsetY);
            break;
        case 'rect':
            drawRect(offsetX, offsetY);
            break;
        case 'text':
            drawText(getText(), 250, 50);
            break;
        case 'line':
            drawLine(offsetX, offsetY);
            break;

    }
}

function getStrokeStyle() {
    return document.querySelector('#stroke-color').value
}

function getFillStyle() {
    return document.querySelector('#fill-color').value
}