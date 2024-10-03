import {levelsDescription} from './levels_desc_obj.js';
    //detect mobile
        let isMobile = (function(){
            if(/iPhone|iPod|iPad|Android|Windows Phone|\bWindows(?:.+)ARM\b|BlackBerry|BB10|Opera Mini|\b(CriOS|Chrome)(?:.+)Mobile|Mobile(?:.+)Firefox\b/i.test(navigator.userAgent)){
                return true;
            } else {
                return false;
            }
        })();
        let isIos = (function(){
            if(/iPhone|iPod|iPad/i.test(navigator.userAgent)){
                return true;
            } else {
                return false;
            }
        })();
    //detect mobile

    // check browser and version
        let safariVersion = null;
        if(navigator.userAgent.match(/AppleWebKit.*Version.*Safari/i)){
            let version = navigator.userAgent.match(/version\/(\d+)\./i);
            if(Array.isArray(version)){
                safariVersion = +version[1];
            }
        }
    // check browser and version



export function goLevel(level){

    // DOM elements
        const finishline            = document.getElementById('_id_finishline');
        const liveCounter           = level.querySelector('.b_level-scoreboard .m_lives');
        const scoreCounter          = level.querySelector('.b_level-scoreboard .m_score');

        // mobile btns
        const runBtn                = window.canvasRunBtn;
        const jumpBtn               = window.canvasJumpBtn;





    // service
        const levelSizeRatio = levelsDescription.levelBaseWidth / levelsDescription.levelBaseHeight;
        const floorBottomPos = isMobile ? 40 : 80;
        const levelNum      = level.dataset.level;

        let levelMaxLives = 3;
        let stopAllAnimation = true;
        let orientation = document.documentElement.clientWidth<document.documentElement.clientHeight ? 'portrait' : 'ladnscape';

    // preload all image, set Stopflag for animation before all images upload

        let ladySpritePathCollect       = levelsDescription.canvasImages.ladySpritePathCollect;
        let ladyFallDownSpriteCollect   = levelsDescription.canvasImages.ladyFallDownSpriteCollect;
        let coinSpritePathCollect       = levelsDescription.canvasImages.coinSpritePathCollect;
        let blowSpritePathCollect       = levelsDescription.canvasImages.blowSpritePathCollect;

        let bonusImagePathCollect       = [];
        levelsDescription[`level${levelNum}`].bonusObj.forEach(el=>{
            if(!bonusImagePathCollect.includes(el.canvasImage)){
                bonusImagePathCollect.push(el.canvasImage)
            }
        })
        let fallImagePathCollect        = [];
        levelsDescription[`level${levelNum}`].fallObj.forEach(el=>{
            if(!fallImagePathCollect.includes(el.canvasImage)){
                fallImagePathCollect.push(el.canvasImage)
            }
        })

        let allCanvasImages             = ladySpritePathCollect.concat( ladyFallDownSpriteCollect,
                                                                        coinSpritePathCollect,
                                                                        blowSpritePathCollect,
                                                                        bonusImagePathCollect,
                                                                        fallImagePathCollect
                                                                    );
        let allCanvasImagesPart         = 100/allCanvasImages.length;
        let allCanvasImagesSatus        = 0;

        let ladySpriteImages            = {};
        let ladyFallDownSpriteImages    = {};
        let coinSpriteImages            = {};
        let bonusImagesCollect          = {};
        let fallImagesCollect           = {};
        let blowSpriteImages            = {};

        ladySpritePathCollect.forEach((el,i)=>{
            let img = new Image();
            img.src = el,
            img.onload = (e)=>{

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
        blowSpritePathCollect.forEach((el,i)=>{
            let img = new Image();
            img.src = el,
            img.onload = ()=>{
                blowSpriteImages[i] = img;
                allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
            }
        })
        levelsDescription[`level${levelNum}`].bonusObj.forEach(el=>{
            if(!bonusImagesCollect[el.id]){
                let img = new Image();
                img.src = el.canvasImage;
                bonusImagesCollect[el.id] = img;
                img.onload = ()=>{
                    allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
                }
            }
        })
        levelsDescription[`level${levelNum}`].fallObj.forEach(el=>{
            if(!fallImagesCollect[el.id]){
                let img = new Image();
                img.src = el.canvasImage;
                fallImagesCollect[el.id] = img;
                img.onload = ()=>{
                    allCanvasImagesSatus = allCanvasImagesSatus + allCanvasImagesPart;
                }
            }
        })

        let checkCanvasImageLoading = function(){

            console.log(`allCanvasImagesSatus: ${allCanvasImagesSatus}`);
            if(allCanvasImagesSatus>=100){

                console.log('allCanvasImagesSatus loaded');
                cancelAnimationFrame(checkCanvasImageLoading);

                drawObj();
                ladyRun();
                stopAllAnimation = false;

            } else {
                allCanvasImagesLoading = requestAnimationFrame(checkCanvasImageLoading);
            }
        }
        let allCanvasImagesLoading = requestAnimationFrame(checkCanvasImageLoading);

    // preload all image, set Stopflag for animation before all images upload

    // lady animataion

        const ladyArea          = document.getElementById('canvasLady');
        ladyArea.width          = 230;
        ladyArea.height         = level.clientHeight;

        let ladyAreaCtx = ladyArea.getContext('2d');

        let ladySlide = 0;
        let ladyAnimation = null;
        let lady = {

            // height: isMobile ? 140 : 210,
            // width: isMobile ? 120 : 180,

            height: isMobile ? Math.round(ladyArea.height*0.40) : 210,
            width:  isMobile ? Math.round( (6*(ladyArea.height*0.40)) / 7 ) : 180,

            fallDownHeight: isMobile ? Math.round(ladyArea.height*0.40) : 210,
            fallDownWidth:  isMobile ? Math.round( (23*(ladyArea.height*0.40)) / 21 ) : 230,

            posX: 0,
            styleLeft: (1)*(window.getComputedStyle(ladyArea).left.replace('px', ''))
        }
        lady.posY       = ladyArea.height - lady.height - floorBottomPos;
        lady.posYDyn    = ladyArea.height - lady.height - floorBottomPos;

        function drawShadow(curWidth){

            let x = lady.posX + lady.width/2;

            if(ladyFallDownFlag){
                x = lady.posX + lady.fallDownWidth/2;
            }

            let y = lady.posY + lady.height;
            let radiusX = curWidth;
            let radiusY = 16;
            let rotation = 0;
            let startAngle = 0;
            let endAngle = 2 * Math.PI;

            ladyAreaCtx.fillStyle = 'rgba(129,107,94,0.7)';
            ladyAreaCtx.beginPath();
            ladyAreaCtx.ellipse(x, y, radiusX, radiusY, rotation, startAngle, endAngle)
            ladyAreaCtx.fill();
        }

        function ladyRun(){

            ladyAreaCtx.clearRect(0,0, ladyArea.width, ladyArea.height);
            drawShadow(lady.width/2);

            ladyAreaCtx.drawImage(ladySpriteImages[ladySlide], lady.posX, lady.posY, lady.width, lady.height);

            if(ladySlide+1 == ladySpritePathCollect.length){
                ladySlide = 0;
            } else {
                ++ladySlide;
            }

            if(ladyAnimation){
                ladyAnimation = setTimeout(ladyRun, 48);
            }

        }

        let maxJumpSize         = isMobile  ? ladyArea.height - lady.height - 40
                                            : ladyArea.height - lady.height - 120;
        let jumpDuration        = 400;
        let jumpTimeStart       = null;
        let jumpDirection       = null;

        let ladyJumpingFlag     = null;
        let ladyFallDownFlag    = null;

        function ladyJump(timeNow){

            if(stopAllAnimation) return;

            // if(!levelObjAnimation){
            //     levelObjAnimation = requestAnimationFrame(drawObj);
            // }
            if(!canvasBgAnimation){
                canvasBgAnimation = requestAnimationFrame(moveAreaAndObj);
            }

            if(!jumpTimeStart){
                jumpTimeStart = timeNow;
            }

            if(!jumpDirection){
                jumpDirection = 'up';
            }

            let progress = (timeNow - jumpTimeStart)/jumpDuration;

            if(progress>1){
                progress = 1;
            }

            if(jumpDirection == 'up'){
                if(progress<0.5){
                    ladySlide = 1;
                } else if(progress<0.8){
                    ladySlide = 2;
                } else {
                    ladySlide = 3;
                }

                // коэффициент прогресса
                // https://easings.net/#easeOutCubic
                let k = 1 - Math.pow(1 - progress, 3);

                lady.posYDyn = (lady.posY - (maxJumpSize*k));

                console.log('jump change');


                ladyAreaCtx.clearRect(0,0, ladyArea.width, ladyArea.height);

                drawShadow((lady.width/2) - ((k*lady.width/4)));

                ladyAreaCtx.drawImage(ladySpriteImages[ladySlide], lady.posX, (lady.posY - (maxJumpSize*k)), lady.width, lady.height);

            } else if(jumpDirection == 'down'){
                if(progress<0.3){
                    ladySlide = 4;
                } else if(progress<0.8){
                    ladySlide = 5;
                } else {
                    ladySlide = 6;
                }

                // коэффициент прогресса
                // https://easings.net/#easeOutCubic
                let k = Math.pow(progress, 3);


                lady.posYDyn = (lady.posY - maxJumpSize) + (maxJumpSize*k);

                ladyAreaCtx.clearRect(0,0, ladyArea.width, ladyArea.height);

                // drawShadow((lady.width/2) - ((k*lady.width/4)));

                drawShadow((lady.width/4) + ((k*lady.width/4)));
                ladyAreaCtx.drawImage(ladySpriteImages[ladySlide], lady.posX, ((lady.posY - maxJumpSize) + (maxJumpSize*k)), lady.width, lady.height);
            }


            if(progress<1){
                // если прогресс еще не закончен, вызвать повторно анимацию
                ladyJumpingFlag = requestAnimationFrame(ladyJump);
            } else {

                if(jumpDirection == 'up'){
                    jumpDirection = 'down'
                    // console.log('jump up complete');
                    jumpTimeStart = null;
                    ladyJumpingFlag = requestAnimationFrame(ladyJump);
                } else if (jumpDirection == 'down'){
                    jumpDirection = null;
                    jumpTimeStart = null;

                    cancelAnimationFrame(ladyJumpingFlag);
                    ladyJumpingFlag = null;
                    ladyAnimation = setTimeout(ladyRun, 48);
                }

            }
        }

        function fallDown(){

            let fallDownDuration    = 300;
            let fallDownTimeStart   = null;
            let fallDownSlide       = 0;

            clearTimeout(ladyAnimation);
            cancelAnimationFrame(ladyJumpingFlag);
            ladyAnimation = null;
            stopAllAnimation = true;

            let y = null
            // let check;

            function fallAnimation(timeNow){

                if(!fallDownTimeStart){
                    fallDownTimeStart = timeNow;
                    // ma.classList.add('m_falldown');
                }
                let progress = (timeNow - fallDownTimeStart)/fallDownDuration;
                if(progress>1){

                    progress = 1;
                }

                // https://easings.net/#easeOutCubic
                // let k = Math.pow(progress, 3);
                // let k = progress * progress * progress;
                let k = 1 - Math.pow(1 - progress, 4);

                if(k>0.8){
                    fallDownSlide = 2;
                } else
                if(k>0.1){
                    fallDownSlide = 1;
                }

                let y = lady.posYDyn - (lady.posYDyn - lady.posY)*k;

                console.log(`lady.posYDyn: ${lady.posYDyn} - y: ${y}`);

                // let y = lady.posYDyn + (lady.posY - lady.posYDyn)*k;


                ladyAreaCtx.clearRect(0,0, ladyArea.width, ladyArea.height);

                drawShadow((lady.width + (lady.fallDownWidth-lady.width)*k)/2);

                ladyAreaCtx.drawImage(ladyFallDownSpriteImages[fallDownSlide], lady.posX, y, lady.fallDownWidth, lady.fallDownHeight);

                if(progress<1){
                    ladyFallDownFlag = requestAnimationFrame(fallAnimation);
                } else {
                    lady.posYDyn = y;
                    y = null;
                    cancelAnimationFrame(ladyFallDownFlag);
                    ladyFallDownFlag = null;
                    clearMoving();
                    fallDownCallback();

                }
            }

            ladyFallDownFlag = requestAnimationFrame(fallAnimation);

        }

    // lady animataion


    // objects animation


        const canvasObjects     = document.getElementById('canvasObjects');

        canvasObjects.width     = level.clientWidth;
        canvasObjects.height    = level.clientHeight;

        let objCtx      = canvasObjects.getContext('2d');
        let levelObj    = levelsDescription[`level${levelNum}`];

        let objStartPos = 0;
        let shift = isMobile ? 6 : 8;

        let levelObjAnimation = null;

        let coinAnimationCounter = 0;
        let coinAnimationSpriteNum = 0;

        function drawObj(){
            objCtx.clearRect(0,0, canvasObjects.width, canvasObjects.height);

            let curCanvasPos = objStartPos+canvasObjects.width;

            let ladyRightCorn   = lady.width + lady.styleLeft - (lady.width*0.1);
            let ladyBottomCorn  = lady.posYDyn + lady.height;
            let ladyTopCorn     = lady.posYDyn;

            levelObj.fallObj.forEach((el,i)=>{

                let elNativePosPCNT = (el.position*100)/levelsDescription.levelBaseWidth;
                let elPos = Math.floor((canvasBgWidth*elNativePosPCNT)/100);

                let xPos = canvasObjects.width - curCanvasPos + elPos;

                if(elPos<curCanvasPos &&
                    elPos>(curCanvasPos-(canvasObjects.width+300))
                ){

                    let gap     = isMobile ? 10 : 20; //10;

                    let fall    = fallImagesCollect[el.id];
                    let fallW   = isMobile ? Math.ceil(el.baseW*0.7) : el.baseW;
                    let fallH   = isMobile ? Math.ceil(el.baseH*0.7) : el.baseH;
                    // let fallW   = isMobile ? 92 : 144;
                    // let fallH;
                    // if(isMobile){
                    //     fallH = levelNum == 'level2' ? 92 : 70;
                    // } else {
                    //     fallH = levelNum == 'level2' ? 144 : 110;
                    // }
                    let fallY   = canvasObjects.height - fallH - floorBottomPos + gap;
                    if(fall){

                        if(xPos<ladyRightCorn && fallY<ladyBottomCorn && ladyRightCorn < (xPos + fallW)){
                            if(!ladyFallDownFlag){
                                console.log('falldown')
                                fallDown();
                            }
                        }

                        objCtx.drawImage(fall, xPos, fallY, fallW, fallH);
                        // objCtx.beginPath();
                        // objCtx.fillStyle = 'red';
                        // objCtx.rect(xPos, fallY, fallW, fallH); // Add a rectangle to the current path
                        // objCtx.fill();
                    }
                }

            })

            levelObj.bonusObj.forEach((el,i)=>{

                let elNativePosPCNT = (el.position*100)/levelsDescription.levelBaseWidth;
                let elPos = Math.floor((canvasBgWidth*elNativePosPCNT)/100);

                let xPos = canvasObjects.width - curCanvasPos + elPos;

                if(elPos<curCanvasPos &&
                    elPos>(curCanvasPos-canvasObjects.width-200)){


                    let bonus   = bonusImagesCollect[el.id];
                    let bonusW  = isMobile ? 60 : 100;
                    let bonusH  = isMobile ? 60 : 100;
                    let bonusY  = isMobile ? 100 : 140;

                    if(xPos<ladyRightCorn && lady.posYDyn<bonusY && lady.styleLeft < (xPos + bonusW)){

                        if(!el.checked){
                            el.checked = true;
                            el.blowSpriteNum = 0;
                            el.spriteCounter = 1;
                            calculateBonus(el);
                        }
                    }

                    if(el.checked){

                        let maxBlowY = bonusY - bonusH;
                        let blowStep = maxBlowY / blowSpritePathCollect.length;

                        let blowY = bonusY - el.spriteCounter;
                        let blow = blowSpriteImages[el.blowSpriteNum];

                        if(el.spriteCounter % 4 == 0){
                            if(el.blowSpriteNum + 1 > blowSpritePathCollect.length - 1){
                                el.blowSpriteNum = blowSpritePathCollect.length - 1;
                            } else {
                                el.blowSpriteNum = el.blowSpriteNum + 1;
                            }
                        }

                        el.spriteCounter = el.spriteCounter + 1;
                        objCtx.drawImage(blow, xPos, blowY, bonusW, bonusH);

                    } else {
                        if(bonus){
                            objCtx.drawImage(bonus, xPos, bonusY, bonusW, bonusH);
                            // objCtx.beginPath();
                            // objCtx.fillStyle = 'blue';
                            // objCtx.rect(xPos, bonusY, bonusW, bonusH); // Add a rectangle to the current path
                            // objCtx.fill();
                        }
                    }

                }
            })

            levelObj.coins.forEach((el,i)=>{

                let elNativePosPCNT = (el.position*100)/levelsDescription.levelBaseWidth;
                let elPos = Math.floor((canvasBgWidth*elNativePosPCNT)/100);

                let xPos = canvasObjects.width - curCanvasPos + elPos;

                if(elPos<curCanvasPos &&
                    elPos>(curCanvasPos-canvasObjects.width-200)
                ) {

                    // coinAnimationCounter++;
                    // if(coinAnimationCounter>16){
                    //     ++coinAnimationSpriteNum;
                    //     coinAnimationCounter = 0;
                    //     if(!coinSpriteImages[coinAnimationSpriteNum]){
                    //         coinAnimationSpriteNum = 0;
                    //     }
                    // }
                    let coin = coinSpriteImages[coinAnimationSpriteNum];
                    let coinW  = isMobile ? 30 : 40;
                    let coinH  = isMobile ? 30 : 40;
                    let coinY;
                    let coinGap = isMobile ? 40 : 60;
                    if(isMobile){
                        coinY = 120;
                    } else {
                        coinY = el.classModificator == 'm_high' ? 140 : 200
                    }

                    if(xPos<ladyRightCorn && lady.posYDyn<coinY && lady.styleLeft < (xPos + coinW)){

                        if(!el.checked){
                            el.checked = true;
                            el.blowSpriteNum = 0;
                            el.spriteCounter = 1;
                            calculateBonus(el);
                        }

                    }

                    if(el.checked){

                        let maxBlowY = coinY - coinH;

                        let blowY = coinY - el.spriteCounter;
                        let blow = blowSpriteImages[el.blowSpriteNum];

                        if(el.spriteCounter % 4 == 0){
                            if(el.blowSpriteNum + 1 > blowSpritePathCollect.length - 1){
                                el.blowSpriteNum = blowSpritePathCollect.length - 1;
                            } else {
                                el.blowSpriteNum = el.blowSpriteNum + 1;
                            }
                        }

                        el.spriteCounter = el.spriteCounter + 1;
                        objCtx.drawImage(blow, xPos, blowY, coinW, coinH);

                    } else {
                        objCtx.drawImage(coin, xPos, coinY, coinW, coinH);
                        objCtx.drawImage(coin, (xPos+coinGap), coinY, coinW, coinH);

                        // objCtx.beginPath();
                        // objCtx.fillStyle = 'gold';
                        // objCtx.rect(xPos, 200, 40, 40); // Add a rectangle to the current path
                        // objCtx.fill();
                    }

                }

            })

            objStartPos = objStartPos + shift;


        }

    // objects animation

    // background move
        const canvasBg = document.getElementById('canvasBackground');
        let canvasBgWidth = Math.floor(level.clientHeight * levelSizeRatio);

        canvasBg.style.width = (canvasBgWidth + 2*document.documentElement.clientWidth) + 'px';

        let bgLeft = 0;
        let canvasBgAnimation = null;


        function bgMove(){
            bgLeft = bgLeft + shift;

            if(finishline.getBoundingClientRect().left<lady.posX + (lady.width/2)) {
                console.log('finish');
                clearMoving();
                sendMessage('win');
            } else {
                if(bgLeft>canvasBgWidth + document.documentElement.clientWidth){
                    bgLeft=canvasBgWidth;
                    clearMoving();
                }

                canvasBg.style.left = (-1)*(bgLeft) + 'px';
            }
        }

    // background move

        let prevTime = 0;
        function moveAreaAndObj(time){

            console.log(`timing :   ${time-prevTime}`);

            // if(time-prevTime<9){
            //     requestAnimationFrame(moveAreaAndObj);
            //     return;
            // } else {
                prevTime = time;
            // }

            drawObj();
            bgMove();

            if( (bgLeft<canvasBgWidth + document.documentElement.clientWidth)
                && (ladyAnimation || ladyJumpingFlag || ladyFallDownFlag))

            {
                canvasBgAnimation = requestAnimationFrame(moveAreaAndObj);
            }
        }

    // service funcs

        // rating
            if(localStorage.megaData && localStorage.megaData !=='null'){
                window.__megama = JSON.parse(localStorage.megaData);
            }
            else {
                window.__megama = {
                    userId: localStorage.userId || null,
                    score: 0,
                    lives: levelMaxLives,
                    levels: {}
                }

                window.__megama.levels[`level${levelNum}`] = {
                    bonusCollect: {},
                    score: 0
                };
            }

            if(localStorage.level==1){
                scoreCounter.innerHTML = 0;
                liveCounter.innerHTML = levelMaxLives;
            } else {
                scoreCounter.innerHTML = window.__megama.score;
                // liveCounter.innerHTML = window.__megama.lives; // если сохранять счет жизней до конца
                liveCounter.innerHTML = levelMaxLives;
            }



        // rating

        function clearMoving(){

            clearTimeout(ladyAnimation);
            ladyAnimation = null;

            // cancelAnimationFrame(levelObjAnimation);
            // levelObjAnimation = null;

            cancelAnimationFrame(canvasBgAnimation);
            canvasBgAnimation = null;

            cancelAnimationFrame(ladyFallDownFlag);
            ladyFallDownFlag = null;

            // clear all jump data
            cancelAnimationFrame(ladyJumpingFlag);
            ladyJumpingFlag = null;
            jumpDirection = null;
            jumpTimeStart = null;
            // lady.posYDyn = ladyArea.height - lady.height - floorBottomPos;

            stopAllAnimation = false;

            // mobile btn clear
            runBtn.classList.remove('pause');
        }

        function clearCheckingAttributes(){
            levelObj.bonusObj.forEach(el=>{
                delete el.checked;
                delete el.blowSpriteNum;
                delete el.spriteCounter;
            })
            levelObj.coins.forEach(el=>{
                delete el.checked;
                delete el.blowSpriteNum;
                delete el.spriteCounter;
            })
        }

        function holdPastScore(){

            let holdScore = 0;

            if(Object.keys(window.__megama.levels).length){

                for(let level of Object.keys(window.__megama.levels)){
                    if(!level.toString().match(levelNum)){
                        holdScore += window.__megama.levels[level].score;
                    } else {
                        window.__megama.levels[level].score = 0;
                        window.__megama.levels[level].bonusCollect = {};
                    }
                }
            }

            window.__megama.score   = holdScore;
        }

        function restartLevel(state){
            // обнуляем все значения
                objStartPos = 0;
                bgLeft      = 0;
                canvasBg.style.left     = '0px';

                if(state=='restart'){
                    liveCounter.innerHTML   = levelMaxLives;
                    window.__megama.lives   = levelMaxLives;
                } else {
                    liveCounter.innerHTML   = window.__megama.lives - 1 < 0 ? 0 : window.__megama.lives - 1;
                    window.__megama.lives   = window.__megama.lives - 1 < 0 ? 0 : window.__megama.lives - 1;
                }

                holdPastScore();
                scoreCounter.innerHTML  = window.__megama.score;

                clearCheckingAttributes();
                clearMoving();
                drawObj();
                ladyRun();

                stopAllAnimation = false;
        }

        function calculateBonus(el){

            scoreCounter.innerHTML  = Number(window.__megama.score) + Number(el.cost);
            window.__megama.score   = Number(window.__megama.score) + Number(el.cost);
            window.__megama.levels[`level${levelNum}`].score = Number(window.__megama.levels[`level${levelNum}`].score) + Number(el.cost);

            if(el.id && el.id!='50sale'){
                if(!window.__megama.levels[`level${levelNum}`].bonusCollect[el.id]){
                    window.__megama.levels[`level${levelNum}`].bonusCollect[el.id] = {
                        name: el.name,
                        imageUrl: el.imageUrl,
                        link: el.link
                    }
                }
            }
        }

        function fallDownCallback(){

            stopAllAnimation = true;
            lady.posYDyn = ladyArea.height - lady.height - floorBottomPos;
            setTimeout(()=>{

                if(window.__megama.lives == 0){
                    // игра окончена по потери жизни
                    holdPastScore();
                    sendMessage('gameOver');
                } else {
                    restartLevel();
                }

            }, 1000)

        }

        function sendMessage(status){
            let message = {
                status: status,
                megamaData: window.__megama
            }
            window.parent.postMessage(message, '*');
        }


        // ui

            function goRunLady(){

                if(ladyAnimation || ladyJumpingFlag) return;

                ladyAnimation = setTimeout(()=>{
                    ladyRun();
                    // levelObjAnimation = requestAnimationFrame(drawObj);
                    canvasBgAnimation = requestAnimationFrame(moveAreaAndObj);
                }, 48);

            }

            function goJumpLady(){
                if(ladyJumpingFlag || ladyFallDownFlag) return;
                clearTimeout(ladyAnimation);
                ladyJumpingFlag = requestAnimationFrame(ladyJump);
            }

            function rebuildCanvasElements(){

                orientation = document.documentElement.clientWidth<document.documentElement.clientHeight ? 'portrait' : 'ladnscape';

                ladyArea.height = level.clientHeight;

                lady = {

                    height: isMobile ? Math.round(ladyArea.height*0.40) : 210,
                    width:  isMobile ? Math.round( (6*(ladyArea.height*0.40)) / 7 ) : 180,

                    fallDownHeight: isMobile ? Math.round(ladyArea.height*0.40) : 210,
                    fallDownWidth:  isMobile ? Math.round( (23*(ladyArea.height*0.40)) / 21 ) : 230,

                    posX: 0,
                    styleLeft: (1)*(window.getComputedStyle(ladyArea).left.replace('px', ''))

                }

                lady.posY       = ladyArea.height - lady.height - floorBottomPos;
                lady.posYDyn    = ladyArea.height - lady.height - floorBottomPos;

                maxJumpSize     = isMobile  ? ladyArea.height - lady.height - 40
                                            : ladyArea.height - lady.height - 120;

                canvasObjects.width     = level.clientWidth;
                canvasObjects.height    = level.clientHeight;

                canvasBgWidth           = Math.floor(level.clientHeight * levelSizeRatio);
                canvasBg.style.width    = (canvasBgWidth + 2*document.documentElement.clientWidth) + 'px';
                drawObj();
                ladyRun();
            }

            if(isMobile) {
                runBtn.addEventListener('click',()=>{
                    if(stopAllAnimation)return;

                    if(runBtn.classList.contains('pause')){
                        clearMoving();
                        runBtn.classList.remove('pause');
                    } else {
                        runBtn.classList.add('pause');
                        goRunLady()
                    }
                })
                jumpBtn.addEventListener('click',()=>{
                    goJumpLady();
                    runBtn.classList.add('pause');
                })

                window.addEventListener("resize", rebuildCanvasElements);
            }

            window.addEventListener("keydown", (e) => {

                if(stopAllAnimation)return;

                if(e.code == 'ArrowRight'){
                    e.preventDefault();
                    goRunLady()
                }
                else if(e.code == 'ArrowLeft') {
                    e.preventDefault();
                    clearMoving();
                }
                else if(e.code == 'ArrowUp') {
                    e.preventDefault();
                    goJumpLady();
                }

            });

            let megaParent = null;

            window.addEventListener('message', e=>{

                if(e.data.state == 'newLevel'){
                    if(e.data.megamaData){

                        window.__megama = e.data.megamaData;
                        window.__megama.levels[`level${levelNum}`] = {
                            bonusCollect: {},
                            score: 0
                        };

                        window.__megama.lives   = levelMaxLives;
                        liveCounter.innerHTML   = levelMaxLives;
                        scoreCounter.innerHTML  = window.__megama.score;
                    }
                } else if(e.data.state == 'restart'){
                    restartLevel('restart');
                } else if(e.data.state == 'pause') {
                    clearMoving();
                } else if(e.data.state == 'resume') {
                    // setTimeout(()=>{
                    //     goRunLady()
                    // }, 1000)
                } else if(e.data.state == 'fullScreenEnable') {
                    exitFullscreenBtn.classList.add('show');
                }

            })

        // ui


}