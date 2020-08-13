'use strict'

function onGetText() {
    gText = document.querySelector('.text-line').value
    updateMemeTxt(gText)
    renderCanvas()
    console.log(gMeme);
    document.querySelector('.text-line').value = ''
}

function onChooseImg(src) {
    let elImgUrl = src.getAttribute('src');
    updateMemeImg(elImgUrl);
    renderCanvas()

}

function renderCanvas() {
    gMeme.lines.forEach(function() {
        return drawImg2()
    })
}

function onIncreaseText() {
    if (gFontSize === 120) return
    gMeme.lines[gMeme.selectedLineIdx].size++
        renderCanvas()
}

function onDecreaseText() {
    if (gFontSize === 20) return
    console.log(gMeme.lines[gMeme.selectedLineIdx].size)
    gMeme.lines[gMeme.selectedLineIdx].size--
        console.log(gMeme.lines[gMeme.selectedLineIdx].size)
    renderCanvas()
}

function onTextDown() {
    gMeme.lines[gMeme.selectedLineIdx].y++
        renderCanvas()


}

function onTextUp() {
    gMeme.lines[gMeme.selectedLineIdx].y--
        renderCanvas()


}

function onChangeLine() {
    let lineIdx = gMeme.selectedLineIdx
    console.log(lineIdx);
    if (lineIdx === 3) {
        gMeme.selectedLineIdx = 0
        console.log(lineIdx)
    } else gMeme.selectedLineIdx++
        console.log(lineIdx)

}