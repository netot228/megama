import {levelsDescription} from './levels_desc_obj.js';
import {imageCollection} from './image_src_collect.js';
import {addUserDataFromForm, formInputHolder, endPoints} from './staticpage_control.js';

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


function getCookie(name){
    let matches = document.cookie.match(
        new RegExp(
            "(?:^|; )" +
            name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
            "=([^;]*)"
        )
    );
    return matches ? decodeURIComponent(matches[1]) : undefined;
}
function setCookie(name, value, props) {
    props = props || {};
    let exp = props.expires;

    if (typeof exp == "number" && exp) {
        let d = new Date();
        d.setTime(d.getTime() + exp * 1000);
        exp = props.expires = d;
    }

    if (exp && exp.toUTCString) {
        props.expires = exp.toUTCString();
    }

    value = encodeURIComponent(value);

    let updatedCookie = name + "=" + value;
    for (let propName in props) {
        updatedCookie += "; " + propName;
        let propValue = props[propName];
        if (propValue !== true) {
            updatedCookie += "=" + propValue;
        }
    }
    document.cookie = updatedCookie;
};
function deleteCookie(name){
    setCookie(name, null, { expires: -1 })
}

export function levelControl(level){

    if(!getCookie('holdMamaStorage')){

        localStorage.clear();
    }

    if(isMobile){
        level.classList.remove('m_loading');
    }

    // **** DOM element
        const curtain               = level.querySelector('.b_level-curtain');

        const startWindow           = window._id_start_window;
        const startBtn              = window._id_startGameBtn;
        const startGameNextMobBtn   = window._id_startGameNextMobBtn;

        const countdown             = window._id_countdown_window;
        const countdownContext      = countdown?.querySelector('.b_level-countdown-context');
        const countdownCounter      = countdown?.querySelector('.countdown-counter');

        const finishWindow          = window._id_finish_window;

        const gameFrame             = window._id_canvas_frame;

        const exitFullscreenBtn     = window._id_exitFullscreenBtn;

        const eridBlock             = root.querySelector('.b_erid_info');

    // **** DOM element

    let levelNum      = Number(level.dataset.level);
    const totalLevels   = 5;
    let goToShoppingUrl = 'https://megamarket.ru/';

    let gameContentWindow = null;
    let levelMaxLives = 3;

    let levelPassed = false;

    if(gameFrame){
        gameFrame.onload = ()=>{
            gameContentWindow = gameFrame.contentWindow;
        }
    }

    // image pre loading

        // wait for collect images

        const curtainMain = window._id_curtain; //document.getElementById('_id_curtain');
        const loader  = curtainMain.querySelector('.loader-indicator span');

        let loaderPart = 100/imageCollection.canvas.length;
        let loadingStatus = 0;

        let allImageLoading = new Promise((resolve, reject)=>{
            imageCollection.canvas.forEach(el=>{
                let img = new Image();
                img.src = el;
                img.onload = function(){

                    // console.log(`image src: ${img.src}`);

                    loadingStatus = loadingStatus + loaderPart;
                    if(Math.ceil(loadingStatus)>=100){
                        loadingStatus=100;
                    }
                    loader.style.width = loadingStatus + '%';

                    if(loadingStatus==100){

                        // console.log('loaded');

                        curtainMain.classList.add('dn');
                        return resolve(true);
                    }
                }
            })
        })


    // image pre loading

    // header

        if(isMobile && window._id_header){

            let headerMenu = window._id_header.querySelector('.b_header-menu') || null;
            let headerMenuBtn = window._id_header.querySelector('.b_header-menubtn') || null;
            if(headerMenu && headerMenuBtn){
                headerMenuBtn.addEventListener('click', ()=>{

                    gameContentWindow.postMessage({state: 'pause'}, '*');

                    headerMenu.classList.toggle('open');
                    headerMenuBtn.classList.toggle('open');
                })
            }
        }
    // header


    //


        function orientationHint(state){
            // portrait
            if(window._id_phone_rotate){
                startWindow.classList.add('hide');

                gameFrame.classList.remove('show');
                window._id_phone_rotate.classList.remove('m_scroll_hint');
                window._id_phone_rotate.classList.add('show');

                let preplayHolder = function(e){
                    if(document.documentElement.clientWidth>document.documentElement.clientHeight){
                        gameFrame.classList.add('show');
                        // landscape

                        if(isIos){


                            if(state != 'pause'){
                                if(curtain.classList.contains('hide')){
                                    curtain.classList.remove('hide');
                                }
                                window._id_phone_rotate.classList.add('m_scroll_hint');

                                window._id_iphone_gobtn.onclick = ()=>{
                                    curtain.classList.add('hide');
                                    window._id_phone_rotate.classList.remove('show');
                                    window._id_phone_rotate.classList.remove('m_scroll_hint');

                                    startLevel(state);
                                    window.removeEventListener('resize', preplayHolder);
                                }
                            } else {
                                curtain.classList.add('hide');
                                window._id_phone_rotate.classList.remove('show');
                                startLevel(state);
                            }


                        } else {

                            window._id_phone_rotate.classList.remove('show');
                            startLevel(state);

                            window.removeEventListener('resize', preplayHolder);
                        }

                        if(state!='pause' && gameContentWindow){
                            gameContentWindow.location.reload(true);
                        }

                    } else {
                        gameFrame.classList.remove('show');

                        if(!curtain.classList.contains('hide')){
                            curtain.classList.add('hide');
                        }
                        if(isIos){
                            window._id_phone_rotate.classList.remove('m_scroll_hint');
                        }
                    }
                }

                window.addEventListener('resize', preplayHolder)
            }
        }

        function fullscreenToggle(action){

            if(!isIos && (
                document.fullscreenEnabled ||
                document.webkitFullscreenEnabled
            )){
                if(action=='open'){
                    if (level.requestFullscreen) {
                        level.requestFullscreen();
                    } else if (level.webkitRequestFullscreen) {
                        level.webkitRequestFullscreen();
                    }

                    if(gameContentWindow){
                        gameContentWindow.location.reload(true);
                    }

                    exitFullscreenBtn.classList.add('show');

                } else {
                    if (document.exitFullscreen) {
                        document.exitFullscreen();
                    } else if (document.webkitExitFullscreen) {
                        document.webkitExitFullscreen();
                    }

                }
            }

        }

        function startTheGame(){

            if(isMobile){
                fullscreenToggle('open');

                // curtain.classList.add('hide');
            }

            if(isMobile && document.documentElement.clientWidth<document.documentElement.clientHeight){
                orientationHint();
            } else {
                window._id_phone_rotate.classList.remove('show');
                startWindow.classList.add('hide')
                startLevel();
            }
        }

        if(localStorage.level){

            levelNum = Number(localStorage.level);

            if(levelNum>totalLevels){
                if(localStorage.megaData){
                    window.__megama = JSON.parse(localStorage.megaData);
                }
                startWindow.classList.add('hide');
                showFinishWindow('gamePassed');
            } else if(levelNum == 1){

                // startLevel();
            } else {

                window._id_introduction.classList.add('hide');
                window._id_continue_the_game.classList.add('show');
                startWindow.classList.add('m_game_continue');

                let levelNumRoot = window._id_continue_the_game.querySelector('.b_level-startwindow-continue-level');
                levelNumRoot.innerText = localStorage.level;

                let scoreRoot = window._id_continue_the_game.querySelector('.b_level-startwindow-continue-score');
                scoreRoot.innerText = localStorage.score;

                _id_startNewGame.onclick = ()=>{

                    localStorage.score = 0;
                    localStorage.level = 1;
                    levelNum = 1;
                    localStorage.megaData = null;

                    gameFrame.contentWindow.location.reload(true);
                    startTheGame();
                }
                _id_startLastGame.onclick = ()=>{
                    if(isMobile){
                        fullscreenToggle('open');
                    }
                    if(localStorage.megaData){
                        window.__megama = JSON.parse(localStorage.megaData);
                        window._id_continue_the_game.classList.remove('show');
                        startWindow.classList.remove('m_game_continue')
                        startWindow.classList.add('hide');
                    }
                    goNextevel(localStorage.level);
                }
            }


        }

        if(isMobile && startGameNextMobBtn){
            startGameNextMobBtn.onclick = function(){

                let introduction = startWindow.querySelector('#_id_introduction_mob');

                if(introduction){

                    introduction.scrollTo({left:introduction.clientWidth, behavior: 'smooth'});
                    startGameNextMobBtn.style.display = 'none';
                    startBtn.style.display = 'block';

                }
            }
        }
        if(startBtn){

            startBtn.onclick = function(){

                // если у нас нет юзера, вызываем форму регистрации
                if(!localStorage.userId && !startBtn.dataset.validateform){

                    startBtn.dataset.validateform = true;

                    window._id_introduction.classList.add('hide');
                    window._id_registration.classList.add('show');
                    formInputHolder(window._id_registration_form);

                } else {

                    if(startBtn.dataset.validateform){
                        addUserDataFromForm(window._id_registration_form, startTheGame);
                    } else {
                        startTheGame();
                    }

                }
            }
        }

        if(isMobile && !isIos){
            exitFullscreenBtn.onclick = ()=>{
                exitFullscreenBtn.classList.remove('show');
                fullscreenToggle('exit');
            }
        }

        window.addEventListener('message', e=>{

            gameFrame.blur();

            window.__megama = e.data.megamaData;

            if(!window.__megama.userId && localStorage.userId){
                window.__megama.userId = localStorage.userId;
            }

            localStorage.level      = e.data.status == 'win' ?  levelNum+1 : levelNum;
            localStorage.score      = window.__megama.score;
            localStorage.megaData   = JSON.stringify(window.__megama);

            showFinishWindow(e.data.status)

        })

        function startLevel(state){
            levelPassed = false;
            eridBlock.classList.add('dn');

            if(state!='pause'){
                if(curtain.classList.contains('hide')){
                    curtain.classList.remove('hide');
                }
            }

            if(isMobile){

                if(state!='pause'){
                    curtain.classList.add('show');
                    level.classList.add('m_loading');
                }

                if (window.matchMedia("(orientation: landscape)").matches) {
                    window._id_header.classList.add('game_theme');

                    function holdLandscape(){

                        if(!levelPassed){
                            if(document.documentElement.clientWidth<document.documentElement.clientHeight){
                                gameContentWindow.postMessage({state: 'pause'}, '*');
                                orientationHint('pause');
                            }
                        }

                    }

                    window.addEventListener('resize', holdLandscape)
                }
            }

            if(state!='pause'){
                countdown.classList.add('show');

                if(state=='restart'){
                    if(finishWindow.classList.contains('show')){
                        // mean restart level
                        finishWindow.classList.remove('show');
                    }
                    countdownCounter.innerHTML = '03';
                    gameContentWindow.postMessage({state: state}, '*');
                }

                let countDownTimer = setTimeout(countDown, 1000);

                levelNum = localStorage.level ? Number(localStorage.level) : levelNum;

                function countDown(){

                    let secLeft = Number(countdownCounter.innerHTML)-1;
                    countdownCounter.innerHTML = '0' + secLeft;

                    if(secLeft == 0){
                        // startLevel
                        clearTimeout(countDownTimer);

                        level.classList.remove('m_loading');
                        countdown.classList.remove('show');


                        curtain.classList.add('hide');
                        curtain.classList.remove('show');

                        gameFrame.classList.add('show');
                        gameFrame.focus();

                    } else {
                        countDownTimer = setTimeout(countDown, 1000);
                    }
                }

            } else if(state=='pause'){
                // curtain.style.display = 'none';
                // gameContentWindow.postMessage({state: 'resume'}, '*');
            }

        }

        function goNextevel(nextLevelNum){
            if(nextLevelNum>totalLevels){
                showFinishWindow('gamePassed');
            } else {

                level.classList.forEach(classItem=>{
                    if(classItem.match('m_level')){
                        level.classList.remove(classItem);
                    }
                })
                level.classList.add(`m_level${nextLevelNum}`);

                countdownContext.innerHTML = '';
                countdownCounter.innerHTML = '03';

                if(curtain.classList.contains('hide')){
                    curtain.classList.remove('hide');
                } else {
                    curtain.classList.add('show');
                }
                if(finishWindow.classList.contains('show')){
                    finishWindow.classList.remove('show');
                }

                let nextLevel = levelsDescription[`level${nextLevelNum}`];
                gameFrame.src = nextLevel.levelContent;

                gameFrame.onload = function(){
                    gameContentWindow = gameFrame.contentWindow;
                    gameContentWindow.postMessage(  {
                                                        state: 'newLevel',
                                                        megamaData: window.__megama

                                                    }, '*');
                }

                // create countdown window
                    let label = document.createElement('div');
                    label.className = 'label';
                    label.innerText = `Уровень ${nextLevelNum}`;

                    let title = document.createElement('div');
                    title.className = 'title';
                    title.innerText = nextLevel.title;

                    let bonus = document.createElement('div');
                    bonus.className = 'bonus';

                    countdownContext.append(label, title, bonus);

                    let uniqBonus = [];
                    nextLevel.bonusObj.forEach(el=>{
                        if(el.id!='50sale' && !uniqBonus.includes(el.countdownImage)){

                            uniqBonus.push(el.countdownImage);

                            let bonusItem = document.createElement('div');
                            bonusItem.className = 'bonus-item';

                            let bonusImage = document.createElement('img');
                            bonusImage.src = el.countdownImage;

                            bonusItem.append(bonusImage);
                            bonus.append(bonusItem);
                        }
                    })

                    let bonus50Item = document.createElement('div');
                    bonus50Item.className = 'bonus-item';

                    let bonus50Image = document.createElement('img');
                    bonus50Image.src = './img/game/canvas/bonus/lv_50_sale_prize_x2.png';

                    bonus50Item.append(bonus50Image);
                    bonus.append(bonus50Item);

                // create countdown window

                if(isMobile && document.documentElement.clientWidth<document.documentElement.clientHeight){
                    orientationHint('nextLevel');
                } else {
                    startLevel('nextLevel');
                }

            }
        }

        function showFinishWindow(state){

            levelPassed = true;

            gameFrame.classList.remove('show');
            level.classList.add('m_loading');

            finishWindow.innerHTML = '';

            if(curtain.classList.contains('hide')){
                curtain.classList.remove('hide');
            }
            curtain.classList.add('show');

            // finish title
                if(state=='gameOver' || state=='win' || state=='gamePassed'){
                    let title = document.createElement('div');
                    title.className = 'title';

                    if(state=='gameOver'){
                        title.innerText = levelsDescription.commonLoseTitle;
                    } else if(state=='win'){
                        title.innerText = levelsDescription.commonWinTitle;
                    } else if(state=='gamePassed'){
                        title.innerText = 'Вау!';
                    }

                    finishWindow.append(title);
                }
            // finish title

            // subtitle && bonus
                if(state == 'win' || state == 'gameOver' || state=='gamePassed'){

                    let subtitle = document.createElement('div');
                    subtitle.className = 'subtitle';

                    if(state == 'win'){
                        subtitle.innerText = levelsDescription[`level${levelNum}`].winningSlogan;
                    } else if(state == 'gameOver'){
                        subtitle.innerText = `Шоппинг не удался, но не расстраивайтесь,\n у нас для вас кое-что есть.`
                    } else if(state=='gamePassed'){
                        subtitle.innerText = `Вау! Вы просто гуру онлайн-шоппинга`;
                    }

                    finishWindow.append(subtitle);

                    // bonuses

                    if(state=='gamePassed'){

                        let passedBlock = document.createElement('div');
                        passedBlock.className = 'passed';

                        finishWindow.append(passedBlock);

                        let quantity = document.createElement('div');
                            quantity.className = 'passed-item';
                            quantity.innerHTML = `<strong>${window.__megama.score}</strong><span>количество<br/>набранных<br/>баллов</span>`;

                        let eventDay = document.createElement('div');
                            eventDay.className = 'passed-item';
                            eventDay.innerHTML = `<strong>10</strong><span>декабря<br/>объявление<br/>победителей</span>`;

                        let ratingPlace = document.createElement('div');
                            ratingPlace.className = 'passed-item';

                        // сделать запрос, получить место в рейтинге
                        if(state=='gamePassed'){
                            let fromData = {
                                userId: localStorage.userId,
                                userName: localStorage.user_name,
                                userLastname: localStorage.user_lastname,
                                userMail: localStorage.user_mail,
                                userPhone: localStorage.user_phone,
                                userScore: localStorage.score
                            }
                            fetch(endPoints.SUBMIT_SCORE, {
                                method: 'POST',
                                headers: {
                                    'Content-Type': 'application/json;charset=utf-8'
                                },
                                body:  JSON.stringify(fromData)
                            })
                            .then(resp=>resp.json())
                            .then(json=>{
                                ratingPlace.innerHTML = `<strong>${json.ratingPosition}</strong><span>место<br/>в турнирной<br/>таблице</span>`;
                            })
                            passedBlock.append(quantity, ratingPlace, eventDay);
                        }

                    }

                    if(state=='win'){

                        if(window.__megama.score>0){
                            let quantity = document.createElement('div');
                            quantity.className = 'quantity';
                            quantity.innerText = `количество набранных баллов: ${window.__megama.score}`;

                            finishWindow.append(quantity);

                        }

                        if(state=='win'){
                            let bonusCollect = window.__megama.levels[`level${levelNum}`].bonusCollect;
                            if(Object.keys(bonusCollect).length > 0){

                                let bonusWrapper = document.createElement('div');
                                bonusWrapper.className = 'bonus';

                                finishWindow.append(bonusWrapper);

                                for(let item in bonusCollect){

                                    let bonusItem = document.createElement('a');
                                        bonusItem.className = 'bonus-item';
                                        bonusItem.href = bonusCollect[item].link;
                                        bonusItem.target = '_blank';

                                        bonusWrapper.append(bonusItem);

                                        let bonusImagePlace = document.createElement('div');
                                            bonusImagePlace.className = 'bonus-item-image';

                                        bonusItem.append(bonusImagePlace);

                                            let bonusImage = document.createElement('img');
                                                bonusImage.src = bonusCollect[item].imageUrl;

                                            bonusImagePlace.append(bonusImage);

                                        let bonusImageLabel = document.createElement('div');
                                            bonusImageLabel.className = 'bonus-item-label';
                                            bonusImageLabel.innerText = bonusCollect[item].name;

                                        bonusItem.append(bonusImageLabel);
                                }
                            }
                        }

                    }
                }
            // subtitle && bonus

            // promocode block
                if(state=='getOff' || state=='gameOver' || state=='gamePassed'){
                    let promocodeBlock = document.createElement('div');
                    promocodeBlock.className = 'b_promocode';

                    if(state=='gamePassed'){
                        promocodeBlock.classList.add('m_passed');
                    }

                    finishWindow.append(promocodeBlock);

                        let promocodeWrapper = document.createElement('div');
                        promocodeWrapper.className = 'b_promocode-wrapper';

                        promocodeBlock.append(promocodeWrapper);

                            if(state=='getOff'){

                                let promocodeTitle = document.createElement('div');
                                promocodeTitle.className = 'title';
                                promocodeTitle.innerHTML = `У нас для вас кое-что есть!`;

                                promocodeWrapper.append(promocodeTitle);

                            }

                            let promocodeSubTitle = document.createElement('div');
                            promocodeSubTitle.className = 'subtitle';

                            if(state=='gamePassed'){
                                promocodeSubTitle.innerHTML = `У нас для вас кое-что есть!<br/>Промокод на скидку 1000 ₽ на первую покупку от 5000 ₽ на Мегамаркете.`;
                            } else {
                                promocodeSubTitle.innerHTML = `Промокод на скидку 1000 ₽ на первую покупку от 5000 ₽ на Мегамаркете.`;
                            }


                            promocodeWrapper.append(promocodeSubTitle);

                            let codePlace = document.createElement('div');
                            codePlace.className = 'code';
                            codePlace.dataset.code = window.__megama.promocode || 'МЕГАМА';
                            codePlace.onclick = function(){

                                navigator.clipboard.writeText(codePlace.dataset.code)
                                    .then(()=>{
                                        // console.log('promocode copied');

                                        let codeCopiedNotice = document.createElement('div');
                                        codeCopiedNotice.className = 'code-copiedNotice';
                                        codeCopiedNotice.innerText = 'промокод скопирован';
                                        codePlace.append(codeCopiedNotice);


                                        setTimeout(()=>{
                                            codeCopiedNotice.classList.add('show');
                                            setTimeout(()=>{
                                                codeCopiedNotice.classList.remove('show');
                                                setTimeout(()=>{
                                                    codeCopiedNotice.remove();
                                                },500);
                                            }, 1000)
                                        },50);
                                    })
                            }

                            promocodeWrapper.append(codePlace);

                                let codeText = document.createElement('div');
                                codeText.className = 'code-text';
                                codeText.innerText = window.__megama.promocode || 'МЕГАМА';

                                let codeHint = document.createElement('div');
                                codeHint.className = 'code-hint';
                                codeHint.innerText = `Нажмите, чтобы скопировать промокод`;

                                codePlace.append(codeText);
                                codePlace.append(codeHint);


                            let linkRules = document.createElement('a');
                            linkRules.className = 'b_promocode-link';
                            linkRules.href = 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkku&pr=RANDOM';
                            linkRules.target = '_blank';
                            linkRules.innerText = 'Читать правила';

                            promocodeBlock.append(linkRules);
                }
            // promocode block

            // btns
                let btnsWrapper = document.createElement('div');
                btnsWrapper.className = 'buttons';

                finishWindow.append(btnsWrapper);

                if(state !='getOff'){
                    let goNextBtn = document.createElement('button');
                    goNextBtn.className = 'buttons-item';

                    if(state=='win'){
                        goNextBtn.innerText = 'Продолжить';
                        goNextBtn.classList.add('m_next');
                        goNextBtn.onclick = function(){
                            goNextevel(levelNum+1);
                        }
                    } else if(state=='gameOver'){
                        goNextBtn.innerText = 'Начать заново';
                        goNextBtn.classList.add('m_again');
                        goNextBtn.onclick = function(){
                            startLevel('restart')
                        }
                    } else if(state=='gamePassed'){
                        goNextBtn.innerText = 'К покупкам';
                        goNextBtn.classList.add('m_next');
                        goNextBtn.classList.add('m_finishbtn');
                        goNextBtn.onclick = function(){
                            window.open(goToShoppingUrl, '_blank').focus();
                            window.location.reload();
                        }
                    }

                    btnsWrapper.append(goNextBtn);

                }

                let getOffBtn = document.createElement('button');
                getOffBtn.className = 'buttons-item';

                if(state=='win'){
                    getOffBtn.classList.add('m_close');
                    getOffBtn.innerText = 'Закончить';
                    getOffBtn.onclick = function(){
                        showFinishWindow('getOff');
                    }
                } else if(state=='gameOver' || state=='getOff'){
                    getOffBtn.classList.add('m_goShopping');
                    getOffBtn.innerText = 'К покупкам';
                    getOffBtn.onclick = function(){
                        window.open(goToShoppingUrl, '_blank').focus();
                        window.location.reload();
                    }
                } else if(state=='gamePassed') {
                    getOffBtn.innerText = '? доступ к секретам';
                    getOffBtn.classList.add('m_finishbtn');
                    getOffBtn.onclick = function(){
                        window.open('./lifehacks.html', '_self').focus();
                        // window.location.reload();
                    }
                }

                btnsWrapper.append(getOffBtn);

                // if(state=='gamePassed'){
                //     let newGameBtn = document.createElement('button');
                //     newGameBtn.className = 'buttons-item m_newgame_btn m_again';
                //     newGameBtn.innerText = 'Новая игра';
                //     newGameBtn.onclick = function(){
                //         localStorage.level = 1;
                //         localStorage.score = 0;
                //         localStorage.removeItem('megaData')
                //         window.location.reload();
                //     }
                //     btnsWrapper.append(newGameBtn);
                // }

            // btns

            if(!finishWindow.classList.contains('show')){
                finishWindow.classList.add('show');
            }



        }


}