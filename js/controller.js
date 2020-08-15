'use strict'


function onGetText() {

    gText = document.querySelector('.text-line').value
    updateMemeTxt(gText)
    updateLineWidth(gMeme.selectedLineIdx)
    drawImg2()

}

function onChooseImg(src) {
    gMeme = {}
    onOpenModal()
    resizeCanvas()
    createMeme()
    let elImgUrl = src.getAttribute('src');
    updateMemeImg(elImgUrl);
    drawImg2()

}

function onChooseSticker(src) {
    let elSticUrl = src.getAttribute('src');
    updateMemeSticer(elSticUrl)
    drawImg2()

}


function onIncreaseText() {
    UpdateGctxFont()
    if (gMeme.lines[gMeme.selectedLineIdx].size === 60) return
    gMeme.lines[gMeme.selectedLineIdx].size++
        drawImg2()
    updateLineWidth(gMeme.selectedLineIdx)
}

function onDecreaseText() {
    UpdateGctxFont()
    if (gMeme.lines[gMeme.selectedLineIdx].size === 20) return
    gMeme.lines[gMeme.selectedLineIdx].size--
        drawImg2()
    updateLineWidth(gMeme.selectedLineIdx)
}

function onTextDown() {
    if (gMeme.lines[gMeme.selectedLineIdx].y === gCanvas.height - 15) return
    gMeme.lines[gMeme.selectedLineIdx].y++
        drawImg2()


}

function onTextUp() {
    if (gMeme.lines[gMeme.selectedLineIdx].y === 40) return
    gMeme.lines[gMeme.selectedLineIdx].y--
        drawImg2()


}

function onChangeLine() {
    let lineIdx = gMeme.selectedLineIdx
    if (lineIdx === 2) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++
        document.querySelector('.text-line').value = gMeme.lines[gMeme.selectedLineIdx].txt
}

function onCloseModal() {
    document.querySelector('.modal').style.display = 'none'
    document.querySelector('.gallery').style.display = 'flex'
}

function onOpenModal() {
    document.querySelector('.modal').style.display = 'flex'
    document.querySelector('.gallery').style.display = 'none'
}

function renderImgs() {
    var strHtml = gImgs.map(function(img) {
        return `<img src="${img.url}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml.join('')
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
    let fontSize = gMeme.lines[gMeme.selectedLineIdx].size
    let fontName = gMeme.lines[gMeme.selectedLineIdx].font
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



function onTextRight() {
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width - 30
    gMeme.lines[gMeme.selectedLineIdx].align = 'right'
    drawImg2()
}

function onTextLeft() {
    gMeme.lines[gMeme.selectedLineIdx].x = 30
    gMeme.lines[gMeme.selectedLineIdx].align = 'left'
    drawImg2()
}

function onTextCenter() {
    gMeme.lines[gMeme.selectedLineIdx].x = gCanvas.width / 2
    gMeme.lines[gMeme.selectedLineIdx].align = 'center'
    drawImg2()

}

function onChangeFont() {
    let elFont = document.querySelector('#fonts').value
    gMeme.lines[gMeme.selectedLineIdx].font = elFont
    drawImg2()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function isDown(ev) {
    gIsDown = true
    const { offsetX, offsetY } = ev;
    gLineIdx = getLineIdx(offsetX, offsetY)
    gStkrIdx = getStickerIdx(offsetX, offsetY);
    console.log(gStkrIdx);

}

function onMoveElm(ev) {
    const { offsetX, offsetY } = ev;

    if (gIsDown && gLineIdx != -1) {
        gMeme.lines[gLineIdx].y = offsetY
        gMeme.lines[gLineIdx].x = offsetX
        drawImg2()
    }
    if (gIsDown && gStkrIdx != -1) {
        console.log('hi');
        gStickers[gStkrIdx].y = offsetY
        gStickers[gStkrIdx].x = offsetX

        drawImg2()
    }

}

function getStickerIdx(x, y) {
    let stkrIdx = gStickers.findIndex(function(stkr) {
        return x >= stkr.x && x <= stkr.x + stkr.size && y >= stkr.y && y <= stkr.y + stkr.size
    })
    return stkrIdx
}



function getLineIdx(x, y) {
    let lineIdx = gMeme.lines.findIndex(function(line) {
        return x >= line.x - line.width / 2 && x <= line.x + line.width / 2 && y >= line.y - line.size && y <= line.y
    })

    return lineIdx
}


function updateLineWidth(idx) {
    let lineWidth = gCtx.measureText(gMeme.lines[idx].txt).width
    gMeme.lines[idx].width = lineWidth

}

function isUp() {
    gIsDown = false
}


function drawStickers() {
    const img = new Image();
    img.onload = () => {
        gCtx.drawImage(img, gStickers[gCurrentStkr].x, gStickers[gCurrentStkr].y, gStickers[gCurrentStkr].size, gStickers[gCurrentStkr].size);

    }
    img.src = gMeme.stickerUrl;

}

function onGetSavedMemes() {
    onCloseModal()
    var strHtml = gSavedMemes.map(function(meme) {
        return `<img src="${meme}" alt="" onclick="onChooseImg(this)">`
    })
    document.querySelector('.img-container').innerHTML = strHtml
}




function saveToLocal() {
    const data = gCanvas.toDataURL()
    gSavedMemes.push(data)
    saveToStorage(KEY, gSavedMemes)

}

function onOpenGallery() {
    onCloseModal()
    renderImgs()
}