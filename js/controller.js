'use strict'
gCanvas = document.getElementById('myCanvas');
gCtx = gCanvas.getContext('2d');
let gIsDown = false

function onGetText() {

    gText = document.querySelector('.text-line').value
    updateMemeTxt(gText)

    drawImg2()

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
    UpdateGctxFont()
    if (gMeme.lines[gMeme.selectedLineIdx].size === 60) return
    gMeme.lines[gMeme.selectedLineIdx].size++
        drawImg2()
}

function onDecreaseText() {
    UpdateGctxFont()
    if (gMeme.lines[gMeme.selectedLineIdx].size === 20) return
    gMeme.lines[gMeme.selectedLineIdx].size--
        drawImg2()
}

function onTextDown() {
    if (gMeme.lines[gMeme.selectedLineIdx].y === gCanvas.height - 15) return
    gMeme.lines[gMeme.selectedLineIdx].y++
        drawImg2()
    console.log(gMeme.lines);


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
    console.log(offsetX, offsetY);

}

function onMoveElm(ev) {
    if (gIsDown) {
        const { offsetX, offsetY } = ev;
        console.log(offsetX, offsetY);
    }

}
// function draw(ev) {
//     const { offsetX, offsetY } = ev;
//     // const offsetX = ev.offsetX;
//     // const offsetY = ev.offsetY;
//     console.log(offsetX, offsetY);

//     switch (gCurrShape) {
//         case 'triangle':
//             drawTriangle(offsetX, offsetY);
//             break;
//         case 'rect':
//             drawRect(offsetX, offsetY);
//             break;
//         case 'text':
//             drawText('Puki', offsetX, offsetY);
//             break;
//         case 'line':
//             drawLine(offsetX, offsetY);
//             break;
//     }
// }