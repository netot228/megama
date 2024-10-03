import {imageCollection} from './image_src_collect.js';


// game url
let gameUrl = './game.html';

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

export const endPoints = {
    REGISTRATION_ENDPOINT: '',
    SUBMIT_SCORE: '',
    RATING: './js/ratingObject.json'
}

export function addUserDataFromForm(form, callback){
    let validation = true;
    let inputs = form.querySelectorAll('input');
    console.log('validation');
    inputs.forEach(input=>{
        if(input.dataset.required && input.value==''){

            validation = false;
            input.parentElement.classList.add('alarm');
            setTimeout(()=>{
                input.parentElement.classList.remove('alarm');
            }, 1500)

        } else {
            if(input.name=='name'){
                localStorage.userId = input.value + '_' + Math.floor(Math.random()*100000);
            }
            localStorage[`user_${input.name}`] = input.value;
        }
    })

    if(validation){
        // если валидация пройдена, здесь отправляем данные на сервер
            let fromData = {
                userId: localStorage.userId,
                userName: localStorage.user_name,
                userLastname: localStorage.user_lastname,
                userMail: localStorage.user_mail,
                userPhone: localStorage.user_phone
            }
            fetch(endPoints.REGISTRATION_ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                body:  JSON.stringify(fromData)
            })

        // и переводим на игру
        if(callback){
            callback();
        } else {
            window.location = gameUrl;
        }

        setCookie('holdMamaStorage', '1', {path: '/', expires: 1*86400});

    } else {
        localStorage.clear();
    }
}

export function formInputHolder(form){
    let formInputFields = form.querySelectorAll('input');

    function inputHolder(input){
        // add validation for phone && mail
        input.addEventListener('blur', (e)=>{
            if(input.value!=''){
                input.classList.add('checked');
            } else {
                input.classList.remove('checked');
            }
        })
    }
    formInputFields.forEach(input=>{
        inputHolder(input);
    })
}

export function rootControl(root){

    // service

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

            window.__isMobile   = isMobile;
            window.__isIos      = isIos;

        // check browser and version
            let safariVersion = null;
            if(navigator.userAgent.match(/AppleWebKit.*Version.*Safari/i)){
                let version = navigator.userAgent.match(/version\/(\d+)\./i);
                if(Array.isArray(version)){
                    safariVersion = +version[1];
                }
            }

        // fetch for rating
            let getRatingJsonUrl = endPoints.RATING;

        if(!getCookie('holdMamaStorage')){
            localStorage.clear();
        }

    // service

    const curtain = window._id_curtain; //document.getElementById('_id_curtain');
    const loader  = curtain.querySelector('.loader-indicator span');

    let pixelRatio = window.devicePixelRatio;


    // image pre loading

        // wait for collect images

        let imageCollect = pixelRatio>1? imageCollection.staticPageX2 : imageCollection.staticPage;

        let loaderPart = 100/imageCollect.length;
        let loadingStatus = 0;

        let allImageLoading = new Promise((resolve, reject)=>{
            imageCollect.forEach(el=>{
                let img = new Image();
                img.src = el;
                img.onload = function(){
                    loadingStatus = loadingStatus + loaderPart;
                    if(loadingStatus>=100){
                        loadingStatus=100;
                    }
                    loader.style.width = loadingStatus + '%';

                    if(loadingStatus==100){
                        curtain.classList.add('dn');

                        return resolve(true);
                    }
                }
            })
        })



    // image pre loading

    // rating block
        if(window._id_ratingblock){

            let ratingSlider = window._id_rating_root;
            let ratingPoints = window._id_rating_points;
            fetch(getRatingJsonUrl)
            .then(response=>{
                if(response.ok){
                    return response.json();
                }
            })
            .then(json=>{
                if(Array.isArray(json.users)){

                    let userArr = json.users;

                    // нам нужно сгененировать слайды рейтинга
                    // в одном слайде (в соответствии с макетом) 6 юзеров (видимо, есть ограничение в 7 слайдов)
                    // таким образом берем 6*7=42 первые записи

                    let itemsPerSlide = 6;
                    let totalSlides = Math.ceil(userArr.length/itemsPerSlide);
                    // let slideNum = 1;
                    for(let slideNum = 0;slideNum<totalSlides; slideNum++){

                        let slideItem = document.createElement('div');
                        slideItem.className = 'item';
                        ratingSlider.append(slideItem);

                        let slideWrapper = document.createElement('div');
                        slideWrapper.className = 'item-wrapper';
                        slideItem.append(slideWrapper);


                        if(totalSlides>1){
                            let pointItem = document.createElement('div');
                            pointItem.className = slideNum == 0 ? 'points-item active' : 'points-item';
                            pointItem.dataset.slide = slideNum;
                            ratingPoints.append(pointItem);
                        } else {
                            window._id_rating_control_btns.remove();
                        }

                        for(let userNum = slideNum*itemsPerSlide; userNum<(slideNum+1)*itemsPerSlide; userNum++){
                            if(userArr[userNum]){
                                let userRow = document.createElement('div');
                                userRow.className = 'item-row';
                                if(userNum>=0 && userNum<3){
                                    userRow.classList.add(`m_place${userNum+1}`);
                                }

                                slideWrapper.append(userRow);

                                let userPos = document.createElement('div');
                                userPos.className = 'item-pos';
                                userPos.innerText = userNum+1;



                                let userItem = document.createElement('div');
                                userItem.className = 'item-user';

                                userRow.append(userPos, userItem);

                                let userPerson = document.createElement('div');
                                userPerson.className = 'item-person';

                                userItem.append(userPerson);

                                let userAvatar = document.createElement('div');
                                userAvatar.className = 'item-avatar';
                                if(userArr[userNum].avatar!=''){
                                    userAvatar.style.backgroundImage = `url(${userArr[userNum].avatar})`;
                                    userAvatar.style.backgroundSize = 'cover';
                                }

                                let userName = document.createElement('div');
                                userName.className = 'item-name';

                                //Добавить: если id юзера совпадает с текущим пометить, что это он
                                if(userArr[userNum].userid==localStorage.userId){
                                    userName.innerHTML = userArr[userNum].name + ' <span>(это вы)</span>';
                                    userItem.classList.add('current');
                                } else {
                                    userName.innerText = userArr[userNum].name;
                                }

                                userPerson.append(userAvatar, userName);

                                let userScore = document.createElement('div');
                                userScore.className = 'item-score';
                                userScore.innerText = userArr[userNum].score;

                                userItem.append(userScore);

                            }
                        }
                    }
                    if(totalSlides>1){
                        iGallery(window._id_ratingblock);
                    }
                }
            })
        }
    // rating block

    // first_screen btnHolder

        if(window._id_index_go_btn){
            window._id_index_go_btn.addEventListener('click', ()=>{

                if(localStorage.userId){
                    window.location = gameUrl;
                } else {
                    window._id_index_intro_1.classList.remove('show');
                    window._id_index_intro_2.classList.add('show');
                }

            })
        }

        if(window._id_index_checkform){
            window._id_index_checkform.addEventListener('click', ()=>{
                addUserDataFromForm(window._id_registration_form);
            })
        }

    // first_screen btnHolder

    // authorization form holder

        if(window._id_registration_form){
            formInputHolder(window._id_registration_form);
        }
    // authorization form holder


    // slideGallery
        function iGallery(gallery){

            const slider        = gallery.querySelector('.s_slider')    || null;

            window.___slider = slider;
            const leftBtn       = gallery.querySelector('.s_leftbtn')   || null;
            const rightBtn      = gallery.querySelector('.s_rightbtn')  || null;

            let itemsArr        = Array.from(slider.querySelectorAll('.item'));
            let arrSize         = itemsArr.length;

            let curItem         = 0;
            let newItem         = null;

            const pointRoot     = gallery.querySelector('.s_points')    || null;
            let points;
            if(pointRoot){
                points = pointRoot.querySelectorAll('.points-item');
                points.forEach(point=>{
                    point.addEventListener('click', ()=>{
                        changeItem(+point.dataset.slide);
                    })
                })
            }

            if(rightBtn){
                rightBtn.addEventListener('click', ()=>{
                    if(rightBtn.classList.contains('disable')) return;
                    changeItem(curItem+1);
                })
            }

            if(leftBtn){
                leftBtn.addEventListener('click', ()=>{
                    if(leftBtn.classList.contains('disable')) return;
                    changeItem(curItem-1);
                })
            }
            function changeItem(itemNum, slideMoveType){

                if(rightBtn){
                    if(itemNum == itemsArr.length-1){
                        rightBtn.classList.add('disable');
                    } else {
                        rightBtn.classList.remove('disable');
                    }
                }
                if(leftBtn){
                    if(itemNum == 0){
                        leftBtn.classList.add('disable');
                    } else {
                        leftBtn.classList.remove('disable');
                    }
                }

                slideMove(itemsArr[itemNum].offsetLeft, slideMoveType);
                curItem = itemNum;

                if(pointRoot){
                    pointsItemHolder(itemNum);
                }

            }

            function pointsItemHolder(itemNum){
                let activePoint = pointRoot.querySelector('.points-item.active');
                activePoint.classList.remove('active');
                points[itemNum].classList.add('active');
            }

            function slideMove(pos, behavior){
                if(behavior=='instant'){

                    slider.scrollLeft = pos;

                } else {

                    let duration        = 500;
                    let timeStart       = null;
                    let sliderStartPos  = slider.scrollLeft;

                    let animateSliderScrollFlag = null;

                    // используется функция из https://easings.net/ru
                    function easing(t){
                        // return 1 - Math.pow(1 - t, 4); // easeOutQuart
                        return 1 - Math.pow(1 - t, 3); //easeOutCubic
                    }

                    function animateSliderScroll(timeNow){

                        if(!timeStart){
                            timeStart = timeNow;
                        }

                        let progress = (timeNow-timeStart)/duration;
                            if(progress>1){
                                progress = 1;
                            }

                        let k = easing(progress);
                        let scrollToPos = sliderStartPos + ((pos - sliderStartPos)*k);

                        // slider.scrollTo(scrollToPos, 0);
                        slider.scrollLeft = scrollToPos;

                        if(progress<1){
                            animateSliderScrollFlag = requestAnimationFrame(animateSliderScroll);
                        } else {
                            cancelAnimationFrame(animateSliderScrollFlag);
                        }
                    }
                    animateSliderScrollFlag = requestAnimationFrame(animateSliderScroll);
                }
            }

            window.addEventListener('resize', ()=>{
                changeItem(curItem, 'instant');
            })
        }

        if(window._id_gifts_gallery && !isMobile){
            iGallery(window._id_gifts_gallery);
        }
    // slideGallery




    // header

        if(isMobile && window._id_header){

            let headerMenu = window._id_header.querySelector('.b_header-menu') || null;
            let headerMenuBtn = window._id_header.querySelector('.b_header-menubtn') || null;
            if(headerMenu && headerMenuBtn){
                headerMenuBtn.addEventListener('click', ()=>{
                    headerMenu.classList.toggle('open');
                    headerMenuBtn.classList.toggle('open');
                })
            }
        }
    // header

    document.addEventListener("DOMContentLoaded", ()=>{

        allImageLoading.then(()=>{
            if(root.dataset.current=='_id_lifeHacks'){
                let fingerHack = window._id_fingerHack || null;
                let articleBlocks = document.querySelectorAll('.b_lifeHacks-article .block') || null;

                function checkBlock(block, i){
                    if(i<2){
                        block.classList.add('show');
                    } else {
                        if(block.getBoundingClientRect().top<(document.documentElement.clientHeight - document.documentElement.clientHeight*0.2)){
                            if(!block.classList.contains('show')){
                                block.classList.add('show');
                                if(i>1 && fingerHack){
                                    if(!fingerHack.classList.contains('providential')){
                                        fingerHack.classList.add('providential')
                                    }
                                    fingerHack.classList.toggle('fingerCheck')
                                }
                            }

                        }
                    }

                }

                if(articleBlocks){
                    articleBlocks.forEach((block, i)=>{
                        checkBlock(block, i);
                        window.addEventListener('scroll', ()=>{
                            checkBlock(block, i);
                        })

                    })
                }

                let goUpBtn = window._id_goupbtn || null;
                if(goUpBtn){
                    goUpBtn.addEventListener('click', ()=>{
                        window.scrollTo({top: 0,behavior: "smooth"});
                        if(fingerHack){
                            fingerHack.classList.toggle('fingerCheck')
                        }
                    })
                }

            }

            let curMenuItem = window._id_header.querySelector(`.b_header-menu-item[data-dest="${root.dataset.current}"]`) || null;
            if(curMenuItem){
                curMenuItem.classList.add('active');
            }

            setTimeout(()=>{
                if(window[`${root.dataset.current}`]){
                    window[`${root.dataset.current}`].classList.add('show');
                }
            }, 500);
        })

    })

}