'use strict'

let gCanvas = document.getElementById('myCanvas');
let gCtx = gCanvas.getContext('2d');




function onInit() {
    getSaved()
    renderImgs()
}

function onChooseImg(src) {
    
    onOpenModal()
    resizeCanvas()
    createMeme()
    createStkr() 
    let imgSrc = src.getAttribute('src');
    updateMemeImg(imgSrc);
    drawImg()
}

function renderImgs() {
    let strHtml = gImgs.map(function(img) {
        return `<img src="${img.url}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml.join('')
}

function onToggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onGetSavedMemes() {
    onCloseModal()
    onToggleMenu()
    let strHtml = gSavedMemes.map(function(meme) {
        return `<img src="${meme}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml.join('')
}

function onOpenGallery() {
    onCloseModal()
    onToggleMenu()
    renderImgs()
}



function onGetText() {
    let text = document.querySelector('.text-line').value
    updateMemeTxt(text)
    updateLineWidth(gMeme.selectedLineIdx)
    drawImg()

}

function onIncreaseText() {
    UpdateGctxFont() 
    getMemeLine()
    if (gCurrentLine.size === 60) return
    gCurrentLine.size++
        drawImg()
    updateLineWidth(gMeme.selectedLineIdx)
}

function onDecreaseText() {
    UpdateGctxFont()
    getMemeLine()
    if (gCurrentLine.size === 20) return
    gCurrentLine.size--
        drawImg()
    updateLineWidth(gMeme.selectedLineIdx)
}



function onGetFillColor(event) {
    let elColor = event.target.value
    updateFillColor(elColor);
    drawImg()

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
    drawImg()
}

function onChangeStrokeColor() {
    let colorWell = document.querySelector("#stroke-color");
    colorWell.addEventListener("input", onGetStrokeColor, false);
    colorWell.addEventListener("change", onGetStrokeColor, false);
    colorWell.select();
}

function onDeleteLine() {
    deleteLine()
    document.querySelector('.text-line').value = ''
    drawImg()
}

function onChangeLine() {
    let lineIdx = gMeme.selectedLineIdx
    if (lineIdx === 2) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
        getMemeLine()
    let lineRect = getLineREct(gCurrentLine)
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
        drawRect(lineRect.x, lineRect.y, lineRect.width, lineRect.size)
    }
    img.src = gMeme.imgUrl;
    drawStickers()
    document.querySelector('.text-line').value = gCurrentLine.txt
}

function getLineREct(line) {
    let lineRect = {
        x: (line.x - (line.width / 2)) - 3,
        y: line.y - line.size + 3,
        width: line.width + 6,
        size: line.size + 3
    }
    return lineRect
}

function onTextRight() {
    getMemeLine()
    gCurrentLine.x = gCanvas.width - 30
    gCurrentLine.align = 'right'
    drawImg()
}

function onTextLeft() {
    getMemeLine()
    gCurrentLine.x = 30
    gCurrentLine.align = 'left'
    drawImg()
}

function onTextCenter() {
    getMemeLine()
    gCurrentLine.x = gCanvas.width / 2
    gCurrentLine.align = 'center'
    drawImg()

} 

function onChangeFont() {
    getMemeLine()
    let elFont = document.querySelector('#fonts').value
    gCurrentLine.font = elFont
    drawImg()

}

function onChooseSticker(src) {
    let elSticUrl = src.getAttribute('src');
    updateMemeSticer(elSticUrl)
    gCurrentStkr = gStickers.findIndex(function(stkr) {
        return stkr.url === elSticUrl
    })
    createStkr()
    drawImg()
}


function onIncreaseStkr() {
    if (gStickers[gCurrentStkr].size === 120) return
    gStickers[gCurrentStkr].size++
        drawImg()
}

function onDecreaseStkr() {
    if (gStickers[gCurrentStkr].size === 30) return
    gStickers[gCurrentStkr].size--
        drawImg()
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

function drawImg() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height);
        drawText()
    }
    img.src = gMeme.imgUrl;
    drawStickers()

}


function onMouseDown(ev) { 
    gIsDown = true 
    const { offsetX, offsetY } = ev;
    gLineIdx = getLineIdx(offsetX, offsetY)
    gStkrIdx = getStickerIdx(offsetX, offsetY);

}

function onTouchDown(ev) {
    ev.preventDefault()
    gIsDown = true // 
    gLineIdx = getLineIdx(ev.touches[0].clientX, ev.touches[0].clientY)
    gStkrIdx = getStickerIdx(ev.touches[0].clientX, ev.touches[0].clientY);

}


function onMoveElm(ev) {
    const { offsetX, offsetY } = ev;
    if (gIsDown && gLineIdx !== -1) {
        gMeme.lines[gLineIdx].y = offsetY
        gMeme.lines[gLineIdx].x = offsetX
        drawImg()
    }
    if (gIsDown && gStkrIdx !== -1) {
        gStickers[gCurrentStkr].y = offsetY
        gStickers[gCurrentStkr].x = offsetX
        drawImg()
    }
}

function onTouchMoveElm(ev) {
    ev.preventDefault()
    if (gIsDown && gLineIdx !== -1) {
        gMeme.lines[gLineIdx].y = ev.touches[0].clientY
        gMeme.lines[gLineIdx].x = ev.touches[0].clientX
        drawImg()
    }

    if (gIsDown && gStkrIdx !== -1) {
        gStickers[gCurrentStkr].y = ev.touches[0].clientY
        gStickers[gCurrentStkr].x = ev.touches[0].clientX
        drawImg()
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

function drawRect(x, y, width, height) {
    gCtx.beginPath();
    gCtx.rect(x, y, width, height);
    gCtx.strokeStyle = 'yellow';
    gCtx.stroke();
}