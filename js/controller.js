'use strict'

let gCanvas = document.getElementById('myCanvas');
let gCtx = gCanvas.getContext('2d');


// gallery functions

function init() { //onInit()
    getSaved()
    renderImgs()
}

function onChooseImg(src) {
    gMeme = {} //service
    onOpenModal()
    resizeCanvas()
    createMeme()
    createStkr() // can call one function in service
    let elImgUrl = src.getAttribute('src'); //imgSrc
    updateMemeImg(elImgUrl);
    drawImg2() // remove 2
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
    renderImgs() // maybe it can be inside one func
}

// editor functions

function onGetText() {
    gText = document.querySelector('.text-line').value // let text
    updateMemeTxt(gText) // updateMemeText(text)
    updateLineWidth(gMeme.selectedLineIdx)
    drawImg2()

}

function onIncreaseText() {
    UpdateGctxFont() //updateCtxFont
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

} // try to align in one func

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


function onMouseDown(ev) { //function name should be a verb
    gIsDown = true // sevice -> isMouseDown
    const { offsetX, offsetY } = ev;
    gLineIdx = getLineIdx(offsetX, offsetY)
    gStkrIdx = getStickerIdx(offsetX, offsetY); //try on mobile (clientX, clientY)

}

function onTouchDown(ev) {
    ev.preventDefault()
    gIsDown = true // sevice -> isMouseDown
    gLineIdx = getLineIdx(ev.touches[0].clientX, ev.touches[0].clientY)
    gStkrIdx = getStickerIdx(ev.touches[0].clientX, ev.touches[0].clientY); //try on mobile (clientX, clientY)

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

function onTouchMoveElm(ev) {
    ev.preventDefault()
    if (gIsDown && gLineIdx !== -1) {
        console.log('hi');
        gMeme.lines[gLineIdx].y = ev.touches[0].clientY
        gMeme.lines[gLineIdx].x = ev.touches[0].clientX
        drawImg2()
    }
    if (gIsDown && gStkrIdx !== -1) {
        gStickers[gStkrIdx].y = ev.touches[0].clientY
        gStickers[gStkrIdx].x = ev.touches[0].clientX
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
} // onToggleModal


function saveToLocal() { //onSaveCanvas
    const data = gCanvas.toDataURL()
        // saveMeme(data) in service
    gSavedMemes.push(data) // service
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