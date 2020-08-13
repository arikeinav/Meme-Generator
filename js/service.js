'use strict'

let gFontSize = 40
let gText;
var gCanvas = document.getElementById('myCanvas')
var gCtx;
var gCurrShape = 'text';
var firstLoc;
var gMeme = {}


var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['happy'] },
    { id: 2, url: 'img/2.jpg', keywords: ['happy'] },
    { id: 3, url: 'img/3.jpg', keywords: ['happy'] },
    { id: 4, url: 'img/4.jpg', keywords: ['happy'] },
    { id: 5, url: 'img/5.jpg', keywords: ['happy'] },
    { id: 6, url: 'img/6.jpg', keywords: ['happy'] },
    { id: 7, url: 'img/7.jpg', keywords: ['happy'] },
    { id: 8, url: 'img/8.jpg', keywords: ['happy'] },
    { id: 9, url: 'img/9.jpg', keywords: ['happy'] },
    { id: 10, url: 'img/10.jpg', keywords: ['happy'] },
    { id: 11, url: 'img/11.jpg', keywords: ['happy'] },
    { id: 12, url: 'img/12.jpg', keywords: ['happy'] },
    { id: 13, url: 'img/13.jpg', keywords: ['happy'] },
    { id: 14, url: 'img/14.jpg', keywords: ['happy'] },
    { id: 15, url: 'img/15.jpg', keywords: ['happy'] },
    { id: 16, url: 'img/16.jpg', keywords: ['happy'] },
    { id: 17, url: 'img/17.jpg', keywords: ['happy'] },
    { id: 18, url: 'img/18.jpg', keywords: ['happy'] },

];




function init() {
    renderImgs()
    gCanvas = document.getElementById('myCanvas');
    gCtx = gCanvas.getContext('2d');

}

function createMeme() {
    gMeme = {
        selectedImgId: 1,
        imgUrl: '',
        selectedLineIdx: 0,
        lines: addLine()
    }
    return gMeme
}



function addLine() {
    let lines = []
    for (let i = 0; i < 3; i++) {
        let y;
        if (i === 0) {
            y = 40
        } else if (i === 1) {
            y = gCanvas.height - 15
        } else y = gCanvas.height / 2

        let line = {
            txt: '',
            size: 40,
            x: gCanvas.width / 2,
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
    elLink.href = data;
    elLink.download = 'my-image.jpg';
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container');
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