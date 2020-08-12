'use strict'

function onGetText() {
    let elTxt = document.querySelector('.text-line').value
    gMeme.lines[gMeme.selectedLineIdx].txt = elTxt
    drawText(gMeme.lines[gMeme.selectedLineIdx].txt)
    document.querySelector('.text-line').value = ''
}

function onChooseImg(src) {
    let elImgUrl = src.getAttribute('src');
    drawImg2(elImgUrl)

}