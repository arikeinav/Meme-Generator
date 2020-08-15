'use strict'

let gCanvas = document.getElementById('myCanvas');
let gCtx = gCanvas.getContext('2d');


// gallery functions

function init() {
    getSaved()
    renderImgs()
}

function onChooseImg(src) {
    gMeme = {}
    onOpenModal()
    resizeCanvas()
    createMeme()
    createStkr()
    let elImgUrl = src.getAttribute('src');
    updateMemeImg(elImgUrl);
    drawImg2()
}

function renderImgs() {
    let strHtml = gImgs.map(function(img) {
        return `<img src="${img.url}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml.join('')
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onGetSavedMemes() {
    onCloseModal()
    toggleMenu()
    let strHtml = gSavedMemes.map(function(meme) {
        return `<img src="${meme}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml.join('')
}

function onOpenGallery() {
    onCloseModal()
    toggleMenu()
    renderImgs()
}

// editor functions

function onGetText() {
    gText = document.querySelector('.text-line').value
    updateMemeTxt(gText)
    updateLineWidth(gMeme.selectedLineIdx)
    drawImg2()

}

function onIncreaseText() {
    UpdateGctxFont()
    getMemeLine()
    if (gCurrentLine.size === 60) return
    gCurrentLine.size++
        drawImg2()
    updateLineWidth(gMeme.selectedLineIdx)
}

function onDecreaseText() {
    UpdateGctxFont()
    getMemeLine()
    if (gCurrentLine.size === 20) return
    gCurrentLine.size--
        drawImg2()
    updateLineWidth(gMeme.selectedLineIdx)
}



function onGetFillColor(event) {
    let elColor = event.target.value
    updateFillColor(elColor);
    drawImg2()

}

function onChangeFillColor() {
    let colorWell = document.querySelector("#font-color");
    colorWell.addEventListener("input", onGetFillColor, false);
    colorWell.addEventListener("change", onGetFillColor, false);
    colorWell.select();
}

function onGetStrokeColor(event) {
    let elColor = event.target.value
    updateStrokeColor(elColor);
    drawImg2()
}

function onChangeStrokeColor() {
    let colorWell = document.querySelector("#stroke-color");
    colorWell.addEventListener("input", onGetStrokeColor, false);
    colorWell.addEventListener("change", onGetStrokeColor, false);
    colorWell.select();
}

function onDeleteLine() {
    deleteLine()
    drawImg2()
}

function onChangeLine() {
    let lineIdx = gMeme.selectedLineIdx
    if (lineIdx === 2) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
        getMemeLine()
    document.querySelector('.text-line').value = gCurrentLine.txt
}

function onTextRight() {
    getMemeLine()
    gCurrentLine.x = gCanvas.width - 30
    gCurrentLine.align = 'right'
    drawImg2()
}

function onTextLeft() {
    getMemeLine()
    gCurrentLine.x = 30
    gCurrentLine.align = 'left'
    drawImg2()
}

function onTextCenter() {
    getMemeLine()
    gCurrentLine.x = gCanvas.width / 2
    gCurrentLine.align = 'center'
    drawImg2()

}

function onChangeFont() {
    getMemeLine()
    let elFont = document.querySelector('#fonts').value
    gCurrentLine.font = elFont
    drawImg2()

}

function onChooseSticker(src) {
    let elSticUrl = src.getAttribute('src');
    updateMemeSticer(elSticUrl)
    gCurrentStkr = gStickers.findIndex(function(stkr) {
        return stkr.url === elSticUrl
    })
    createStkr()
    drawImg2()
}


function onIncreaseStkr() {
    if (gStickers[gCurrentStkr].size === 120) return
    gStickers[gCurrentStkr].size++
        drawImg2()
}

function onDecreaseStkr() {
    if (gStickers[gCurrentStkr].size === 30) return
    gStickers[gCurrentStkr].size--
        drawImg2()
}

function drawStickers() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, gStickers[gCurrentStkr].x, gStickers[gCurrentStkr].y, gStickers[gCurrentStkr].size, gStickers[gCurrentStkr].size);

    }
    img.src = gMeme.stickerUrl;

}


function drawText(text, x, y) {
    gMeme.lines.forEach(function(line) {
        text = line.txt
        x = line.x
        y = line.y
        gCtx.lineWidth = '2';
        gCtx.fillStyle = line.color
        gCtx.strokeStyle = line.stroke
        gCtx.font = line.size + 'px ' + line.font;
        gCtx.textAlign = line.align;
        gCtx.fillText(text, x, y);
        gCtx.strokeText(text, x, y);
    })
}

function UpdateGctxFont() {
    getMemeLine()
    let fontSize = gCurrentLine.size
    let fontName = gCurrentLine.font
    gCtx.font = fontSize + 'px ' + fontName
}

function drawImg2() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    }
    img.src = gMeme.imgUrl;
    drawStickers()

}


function isDown(ev) {
    gIsDown = true
    const { offsetX, offsetY } = ev;
    gLineIdx = getLineIdx(offsetX, offsetY)
    gStkrIdx = getStickerIdx(offsetX, offsetY);

}

function onMoveElm(ev) {
    const { offsetX, offsetY } = ev;
    if (gIsDown && gLineIdx != -1) {
        gMeme.lines[gLineIdx].y = offsetY
        gMeme.lines[gLineIdx].x = offsetX
        drawImg2()
    }
    if (gIsDown && gStkrIdx != -1) {
        gStickers[gStkrIdx].y = offsetY
        gStickers[gStkrIdx].x = offsetX
        drawImg2()
    }
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.gallery').style.display = 'flex'
}

function onOpenModal() {
    document.querySelector('.modal').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
}
s

function saveToLocal() {
    const data = gCanvas.toDataURL()
    gSavedMemes.push(data)
    saveToStorage(KEY, gSavedMemes)

}


// function onTextDown() {
//     getMemeLine()
//     if (gCurrentLine.y === gCanvas.height - 15) return
//     gCurrentLine.y++
//         drawImg2()


// }

// function onTextUp() {
//     getMemeLine()
//     if (gCurrentLine.y === 40) return
//     gCurrentLine.y--
//         drawImg2()

// }