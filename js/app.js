const easyModeButton = document.querySelector('.easyModeButton');
const hardModeButton = document.querySelector('.hardModeButton');
const topBlock = document.querySelector('.topBlock');
const bottomBlock = document.querySelector('.bottomBlock');
const easyModeTiles = document.querySelectorAll('.easyMode');
const hardModeTiles = document.querySelectorAll('.hardMode');
const newColorsButton = document.querySelector('.newColorsButton');
const colorCode = document.querySelector('.colorCode');
const topInterface = document.querySelector('.topInterface');
let isModeHard = false;
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const generateIndex = () => getRandomInt(0, 2);

const generateIndexForMode = () => getRandomInt(0, 1);
// Easy mode button

easyModeButton.addEventListener('click', () => {
    easyModeButton.style.backgroundColor = '#151515';
    easyModeButton.style.color = 'white';
    hardModeButton.style.backgroundColor = 'white';
    hardModeButton.style.color = '#151515';
    topBlock.style.paddingTop = '120px';
    bottomBlock.style.marginTop = '0px';
    hardModeTiles.forEach((tile) => {
        tile.style.width = "0";
        tile.style.height = "0";
        tile.style.transition = '0ms';
    })

    if (!isModeHard) return;
    isModeHard = false;

    easyModeTiles.forEach((tile) => {
        tile.style.backgroundColor = '#313131';
        tile.style.borderRadius = '100px'
    })
    colorCode.textContent = 'color code';
});
// Hard mode button

hardModeButton.addEventListener('click', () => {
    easyModeButton.style.backgroundColor = 'white';
    easyModeButton.style.color = '#151515';
    hardModeButton.style.backgroundColor = '#151515';
    hardModeButton.style.color = 'white';
    topBlock.style.paddingTop = '25px';
    bottomBlock.style.marginTop = '25px';

    if (isModeHard) return;

    isModeHard = true;

    hardModeTiles.forEach((tile) => {
        tile.style.width = "180px";
        tile.style.height = "180px";
        tile.style.backgroundColor = '#313131';
        tile.style.borderRadius = '100px'
        setTimeout(() => {
            tile.style.transition = '150ms';
        }, 1)
    })

    easyModeTiles.forEach((tile) => {
        tile.style.backgroundColor = '#313131';
        tile.style.borderRadius = '100px'
    })
    colorCode.textContent = 'color code';
});
// New colors button

newColorsButton.addEventListener('click', () => {
    easyModeTiles.forEach((tile) => {
        const color = chroma.random();
        tile.style.backgroundColor = color.toString();
        tile.style.borderRadius = '20px'
    })

    if (isModeHard) {
        hardModeTiles.forEach((tile) => {
            const color = chroma.random();
            tile.style.backgroundColor = color.toString();
            tile.style.borderRadius = '20px'
        })
        const mode = [easyModeTiles[generateIndex()], hardModeTiles[generateIndex()]];
        colorCode.textContent = mode[generateIndexForMode()].style.backgroundColor;
        return;
    }
    colorCode.textContent = easyModeTiles[generateIndex()].style.backgroundColor;
});
// Color guessing
const allTiles = document.querySelectorAll('.allTiles');

allTiles.forEach((tile) => {
    tile.addEventListener('click', () => {
        if (tile.style.backgroundColor === colorCode.textContent) {
            console.log('Correct!')
            const correct = document.querySelector('#correct');
            correct.style.color = 'rgba(255, 255, 255, 1)';
            setTimeout(() => {
                correct.style.color = 'rgba(255, 255, 255, 0)';
            }, 1000)
            topInterface.style.backgroundColor = tile.style.backgroundColor;
            if (isModeHard) {
                allTiles.forEach((tile) => {
                    const color = chroma.random();
                    tile.style.backgroundColor = color.toString();
                    tile.style.borderRadius = '20px'
                });
                const mode = [easyModeTiles[generateIndex()], hardModeTiles[generateIndex()]];
                colorCode.textContent = mode[generateIndexForMode()].style.backgroundColor;
                return;
            }
            easyModeTiles.forEach((tile) => {
                const color = chroma.random();
                tile.style.backgroundColor = color.toString();
                tile.style.borderRadius = '20px'
            })
            colorCode.textContent = easyModeTiles[generateIndex()].style.backgroundColor;
        } else {
            tile.style.backgroundColor = '#313131';
            tile.style.borderRadius = '100px';
        }
    })
})
