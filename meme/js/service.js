'use strict'



var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] }];
var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I never eat Falafel',
        size: 20,
        align: 'left',
        color: 'red'
    }]
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


function drawText(text, x = 250, y = 40) {
    gCtx.lineWidth = '2';
    gCtx.fillStyle = 'white'
    gCtx.font = '40px IMPACT';
    gCtx.textAlign = 'center';
    gCtx.fillText(text, x, y);
    gCtx.strokeText(text, x, y);
}



function clearCanvas() {
    gCtx.clearRect(0, 0, gCanvas.width, gCanvas.height);
    // You may clear part of the canvas
    // gCtx.clearRect(0, 0, gCanvas.width / 2, gCanvas.height / 2);
}

function drawImg() {
    const elImg = document.querySelector('img');
    gCtx.drawImage(elImg, 0, 0, gCanvas.width, gCanvas.height);
}

function drawImg2(url) {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
    }
    img.src = url;
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