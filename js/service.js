'use strict'
let gCanvas = document.getElementById('myCanvas');
let gCtx = gCanvas.getContext('2d');
let gIsDown = false
let gLineIdx;
let gStkrIdx;
let gText;
let gCurrentStkr = 0
const KEY = 'memes'
var firstLoc;
var gMeme = {}
let gSavedMemes;


var gImgs = [
    { id: 1, url: 'img/1.jpg', keywords: ['happy'] },
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

var gStickers = [
    { url: 'svg/stk1.svg', x: gCanvas.width / 2, y: gCanvas.height / 2, size: 50 },
    { url: 'svg/stk2.svg', x: gCanvas.width / 2, y: gCanvas.height / 2, size: 50 },
    { url: 'svg/stk3.svg', x: gCanvas.width / 2, y: gCanvas.height / 2, size: 50 },
    { url: 'svg/stk4.svg', x: gCanvas.width / 2, y: gCanvas.height / 2, size: 50 }
];








function init() {
    getSaved()
    renderImgs()

}

function getSaved() {
    gSavedMemes = loadFromStorage(KEY)
    if (!gSavedMemes) gSavedMemes = []
}

function createMeme() {
    gMeme = {
        selectedImgId: 1,
        imgUrl: '',
        stickerUrl: '',
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
            y = 50
        } else if (i === 1) {
            y = gCanvas.height - 20
        } else y = gCanvas.height / 2

        let line = {
            txt: '',
            size: 40,
            x: gCanvas.width / 2,
            y: y,
            align: 'center',
            color: 'white',
            stroke: 'black',
            font: 'Impact',
            width: 0
        }
        lines.push(line)
    }
    return lines
}

function updateFillColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color;

}

function updateStrokeColor(color) {

    gMeme.lines[gMeme.selectedLineIdx].stroke = color;
}

function updateMemeImg(url) {
    return gMeme.imgUrl = url

}

function updateMemeSticer(url) {
    return gMeme.stickerUrl = url

}


function updateMemeTxt(txt) {
    return gMeme.lines[gMeme.selectedLineIdx].txt = txt

}

function getText() {
    let text = gMeme.lines[gMeme.selectedLineIdx].txt
    return text
}

function deleteLine() {
    gMeme.lines[gMeme.selectedLineIdx].txt = ''
}

function deletStkr() {
    gMeme.stickerUrl = ''
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


function getStrokeStyle() {
    return document.querySelector('#stroke-color').value
}

function getFillStyle() {
    return document.querySelector('#fill-color').value
}