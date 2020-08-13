'use strict'

function onGetText() {
    gText = document.querySelector('.text-line').value
    updateMemeTxt(gText)
    drawImg2()
    document.querySelector('.text-line').value = ''
}

function onChooseImg(src) {
    onOpenModal()
    resizeCanvas()
    createMeme()
    let elImgUrl = src.getAttribute('src');
    updateMemeImg(elImgUrl);
    drawImg2()

}

function onIncreaseText() {
    if (gFontSize === 120) return
    gMeme.lines[gMeme.selectedLineIdx].size++
        drawImg2()
}

function onDecreaseText() {
    if (gFontSize === 20) return
    gMeme.lines[gMeme.selectedLineIdx].size--
        drawImg2()
}

function onTextDown() {
    gMeme.lines[gMeme.selectedLineIdx].y++
        drawImg2()


}

function onTextUp() {
    gMeme.lines[gMeme.selectedLineIdx].y--
        drawImg2()


}

function onChangeLine() {
    let lineIdx = gMeme.selectedLineIdx
    if (lineIdx === 2) {
        gMeme.selectedLineIdx = 0
    } else gMeme.selectedLineIdx++

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