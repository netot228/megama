// promise loading all images
import {levelsDescription} from './levels_desc_obj.js';

let levelNum = 'level1';

let ladySpritePathCollect = [
    './img/game/canvas/lady/1.png',
    './img/game/canvas/lady/2.png',
    './img/game/canvas/lady/3.png',
    './img/game/canvas/lady/4.png',
    './img/game/canvas/lady/5.png',
    './img/game/canvas/lady/6.png',
    './img/game/canvas/lady/7.png'
];

let ladyFallDownSpriteCollect = [
    './img/game/canvas/lady/falldown_1-8bit.png',
    './img/game/canvas/lady/falldown_2-8bit.png',
    './img/game/canvas/lady/falldown_3-8bit.png'
];

let coinSpritePathCollect = [
    './img/game/canvas/coin/1.png',
    './img/game/canvas/coin/2.png',
    './img/game/canvas/coin/3.png',
    './img/game/canvas/coin/4.png',
    './img/game/canvas/coin/5.png',
    './img/game/canvas/coin/6.png'
]

let blowSpritePathCollect = [
    './img/game/canvas/blow/1.png',
    './img/game/canvas/blow/2.png',
    './img/game/canvas/blow/3.png',
    './img/game/canvas/blow/4.png',
    './img/game/canvas/blow/5.png',
    './img/game/canvas/blow/6.png'
]

let bonusImagePathCollect   = [];
levelsDescription.level1.bonusObj.forEach(el=>{
    if(!bonusImagePathCollect.includes(el.canvasImage)){
        bonusImagePathCollect.push(el.canvasImage)
    }
})
let fallImagePathCollect    = [];
levelsDescription.level1.fallObj.forEach(el=>{
    if(!fallImagePathCollect.includes(el.canvasImage)){
        fallImagePathCollect.push(el.canvasImage)
    }
})

let allCanvasImages = ladySpritePathCollect.concat( ladyFallDownSpriteCollect,
                                                    coinSpritePathCollect,
                                                    blowSpritePathCollect,
                                                    bonusImagePathCollect,
                                                    fallImagePathCollect
                                                );
let allCanvasImagesPart     = 100/allCanvasImages.length;
let allCanvasImagesSatus    = 0;

let ladySpriteImages            = {};
let ladyFallDownSpriteImages    = {};
let coinSpriteImages            = {};
let bonusImagesCollect          = {};
let fallImagesCollect           = {};
let blowSpriteImages            = {};


ladySpritePathCollect.forEach((el,i)=>{
    let img = new Image();
    img.src = el,
    img.onload = ()=>{
        ladySpriteImages[i] = img;
        allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
    }
})
ladyFallDownSpriteCollect.forEach((el,i)=>{
    let img = new Image();
    img.src = el,
    img.onload = ()=>{
        ladyFallDownSpriteImages[i] = img;
        allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
    }
})
coinSpritePathCollect.forEach((el,i)=>{
    let img = new Image();
    img.src = el,
    img.onload = ()=>{
        coinSpriteImages[i] = img;
        allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
    }
})

levelsDescription[levelNum].bonusObj.forEach(el=>{
    if(!bonusImagesCollect[el.id]){
        let img = new Image();
        img.src = el.canvasImage;
        img.onload = ()=>{
            bonusImagesCollect[el.id] = img;
            allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
        }
    }
})

levelsDescription[levelNum].fallObj.forEach(el=>{
    if(!fallImagesCollect[el.id]){
        let img = new Image();
        img.src = el.canvasImage;
        img.onload = ()=>{
            fallImagesCollect[el.id] = img;
            allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
        }
    }
})

blowSpritePathCollect.forEach((el,i)=>{
    let img = new Image();
    img.src = el,
    img.onload = ()=>{
        blowSpriteImages[i] = img;
        allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
    }
})

let checkCanvasImageLoading = function(){
    // console.log('checking');

    if(allCanvasImagesSatus>=100){

        console.log('allCanvasImagesSatus loaded');
        window.cancelAnimationFrame(checkCanvasImageLoading);

    } else {
        allCanvasImagesLoading = window.requestAnimationFrame(checkCanvasImageLoading);
    }
}
let allCanvasImagesLoading = window.requestAnimationFrame(checkCanvasImageLoading);
