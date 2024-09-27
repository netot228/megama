// длина площадки в абсолютных пикселях по макету
// 7 блоков по 7485x1800px - итого 52395x1800px
//
// позиции по горизонтали указаны в процентах для монтажной области шириной 52395px
// в скрипте при расчете учитывать, что положение будет меняться
export let levelsDescription = {
    levelBaseWidth: 52395,
    levelBaseHeight: 1800,
    commonWinTitle: 'Ура!',
    commonLoseTitle: 'Ой!',
    canvasImages: {
        ladySpritePathCollect: [
            './img/game/canvas/lady/1.png',
            './img/game/canvas/lady/2.png',
            './img/game/canvas/lady/3.png',
            './img/game/canvas/lady/4.png',
            './img/game/canvas/lady/5.png',
            './img/game/canvas/lady/6.png',
            './img/game/canvas/lady/7.png'
        ],
        ladyFallDownSpriteCollect: [
            './img/game/canvas/lady/falldown_1-8bit.png',
            './img/game/canvas/lady/falldown_2-8bit.png',
            './img/game/canvas/lady/falldown_3-8bit.png'
        ],
        coinSpritePathCollect: [
            './img/game/canvas/coin/1.png',
            './img/game/canvas/coin/2.png',
            './img/game/canvas/coin/3.png',
            './img/game/canvas/coin/4.png',
            './img/game/canvas/coin/5.png',
            './img/game/canvas/coin/6.png'
        ],
        blowSpritePathCollect: [
            './img/game/canvas/blow/1.png',
            './img/game/canvas/blow/2.png',
            './img/game/canvas/blow/3.png',
            './img/game/canvas/blow/4.png',
            './img/game/canvas/blow/5.png',
            './img/game/canvas/blow/6.png'
        ],

    },
    level1: {
        levelNum: 1,
        levelContent: './level1_content.html',
        winningSlogan: 'К встрече с малышом готовы',
        title: '«Встречаем малыша»',

        fallObj: [
            {
                position: 4000,
                baseW: 144,
                baseH: 100,
                id: 'lv1_fall1',
                canvasImage: './img/game/canvas/fall/lv1_fall1.png'
            },
            {
                position: 6833,
                baseW: 144,
                baseH: 108,
                id: 'lv1_fall2',
                canvasImage: './img/game/canvas/fall/lv1_fall2.png'
            },
            {
                position: 9819,
                baseW: 144,
                baseH: 96,
                id: 'lv1_fall3',
                canvasImage: './img/game/canvas/fall/lv1_fall3.png'
            },
            {
                position: 12844,
                baseW: 144,
                baseH: 100,
                id: 'lv1_fall1',
                canvasImage: './img/game/canvas/fall/lv1_fall1.png'
            },
            {
                position: 14686,
                baseW: 144,
                baseH: 96,
                id: 'lv1_fall3',
                canvasImage: './img/game/canvas/fall/lv1_fall3.png'
            },
            {
                position: 18878,
                baseW: 144,
                baseH: 108,
                id: 'lv1_fall2',
                canvasImage: './img/game/canvas/fall/lv1_fall2.png'
            },
            {
                position: 22267,
                baseW: 144,
                baseH: 96,
                id: 'lv1_fall3',
                canvasImage: './img/game/canvas/fall/lv1_fall3.png'
            },
            {
                position: 26335,
                baseW: 144,
                baseH: 100,
                id: 'lv1_fall1',
                canvasImage: './img/game/canvas/fall/lv1_fall1.png'
            },
            {
                position: 30069,
                baseW: 144,
                baseH: 96,
                id: 'lv1_fall3',
                canvasImage: './img/game/canvas/fall/lv1_fall3.png'
            },
            {
                position: 34103,
                baseW: 144,
                baseH: 108,
                id: 'lv1_fall2',
                canvasImage: './img/game/canvas/fall/lv1_fall2.png'
            },
            {
                position: 36322,
                baseW: 144,
                baseH: 100,
                id: 'lv1_fall1',
                canvasImage: './img/game/canvas/fall/lv1_fall1.png'
            },
            {
                position: 40171,
                baseW: 144,
                baseH: 96,
                id: 'lv1_fall3',
                canvasImage: './img/game/canvas/fall/lv1_fall3.png'
            },
            {
                position: 44523,
                baseW: 144,
                baseH: 108,
                id: 'lv1_fall2',
                canvasImage: './img/game/canvas/fall/lv1_fall2.png'
            },
            {
                position: 49016,
                baseW: 144,
                baseH: 100,
                id: 'lv1_fall1',
                canvasImage: './img/game/canvas/fall/lv1_fall1.png'
            },

        ],
        bonusObj: [
            {
                position: 4000,
                classModificator: '',
                id: 'lv1_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv1_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv1_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv1_1_origin.png',
                name: 'Развивающая игрушка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkat&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 10060,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 16110,
                classModificator: '',
                id: 'lv1_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv1_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv1_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv1_3_origin.png',
                name: 'Подгузники Merries',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkak&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 22160,
                classModificator: '',
                id: 'lv1_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv1_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv1_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv1_1_origin.png',
                name: 'Развивающая игрушка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkat&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 28210,
                classModificator: '',
                id: 'lv1_2',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv1_2_prize.png',
                countdownImage: './img/game/canvas/bonus/lv1_2_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv1_2_origin.png',
                name: 'Назальный аспиратор',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkbo&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 34250,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 40300,
                classModificator: '',
                id: 'lv1_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv1_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv1_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv1_3_origin.png',
                name: 'Подгузники Merries',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkak&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 46350,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            }
        ],
        coins: [
            {
                position: 2070,
                classModificator: '',
                cost: '10',
            },
            {
                position: 5700,
                classModificator: '',
                cost: '10',

            },
            {
                position: 11690,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 14180,
                classModificator: '',
                cost: '10',

            },
            {
                position: 20340,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 29190,
                classModificator: '',
                cost: '10',

            },
            {
                position: 32635,
                classModificator: '',
                cost: '10',

            },
            {
                position: 37770,
                classModificator: '',
                cost: '10',

            },
            {
                position: 43480,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 50310,
                classModificator: '',
                cost: '10',
            }

        ]
    },
    level2: {
        levelNum: 2,
        levelContent: './level2_content.html',
        winningSlogan: 'Купание прошло успешно!',
        title: '«Приключения в ванной»',

        fallObj: [
            {
                position: 4000,
                baseW: 112,
                baseH: 108,
                id: 'lv2_fall1',
                canvasImage: './img/game/canvas/fall/lv2_fall1.png'
            },
            {
                position: 6833,
                baseW: 98,
                baseH: 108,
                id: 'lv2_fall2',
                canvasImage: './img/game/canvas/fall/lv2_fall2.png'
            },
            {
                position: 9819,
                baseW: 124,
                baseH: 108,
                id: 'lv2_fall3',
                canvasImage: './img/game/canvas/fall/lv2_fall3.png'
            },
            {
                position: 12844,
                baseW: 112,
                baseH: 108,
                id: 'lv2_fall1',
                canvasImage: './img/game/canvas/fall/lv2_fall1.png'
            },
            {
                position: 14686,
                baseW: 124,
                baseH: 108,
                id: 'lv2_fall3',
                canvasImage: './img/game/canvas/fall/lv2_fall3.png'
            },
            {
                position: 18878,
                baseW: 98,
                baseH: 108,
                id: 'lv2_fall2',
                canvasImage: './img/game/canvas/fall/lv2_fall2.png'
            },
            {
                position: 22267,
                baseW: 124,
                baseH: 108,
                id: 'lv2_fall3',
                canvasImage: './img/game/canvas/fall/lv2_fall3.png'
            },
            {
                position: 26335,
                baseW: 112,
                baseH: 108,
                id: 'lv2_fall1',
                canvasImage: './img/game/canvas/fall/lv2_fall1.png'
            },
            {
                position: 30069,
                baseW: 124,
                baseH: 108,
                id: 'lv2_fall3',
                canvasImage: './img/game/canvas/fall/lv2_fall3.png'
            },
            {
                position: 34103,
                baseW: 98,
                baseH: 108,
                id: 'lv2_fall2',
                canvasImage: './img/game/canvas/fall/lv2_fall2.png'
            },
            {
                position: 36322,
                baseW: 112,
                baseH: 108,
                id: 'lv2_fall1',
                canvasImage: './img/game/canvas/fall/lv2_fall1.png'
            },
            {
                position: 40171,
                baseW: 124,
                baseH: 108,
                id: 'lv2_fall3',
                canvasImage: './img/game/canvas/fall/lv2_fall3.png'
            },
            {
                position: 44523,
                baseW: 98,
                baseH: 108,
                id: 'lv2_fall2',
                canvasImage: './img/game/canvas/fall/lv2_fall2.png'
            },
            {
                position: 49016,
                baseW: 112,
                baseH: 108,
                id: 'lv2_fall1',
                canvasImage: './img/game/canvas/fall/lv2_fall1.png'
            },

        ],
        bonusObj: [
            {
                position: 4000,
                classModificator: '',
                id: 'lv2_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv2_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv2_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv2_1_origin.png',
                name: 'Детский горшок',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkce&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 10060,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 16110,
                classModificator: '',
                id: 'lv2_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv2_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv2_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv2_3_origin.png',
                name: 'Расческа и щетка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchknv&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 22160,
                classModificator: '',
                id: 'lv2_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv2_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv2_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv2_1_origin.png',
                name: 'Детский горшок',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkce&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 28210,
                classModificator: '',
                id: 'lv2_2',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv2_2_prize.png',
                countdownImage: './img/game/canvas/bonus/lv2_2_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv2_2_origin.png',
                name: 'Ванночка для купания',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkcu&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 34250,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 40300,
                classModificator: '',
                id: 'lv2_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv2_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv2_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv2_3_origin.png',
                name: 'Расческа и щетка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchknv&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 46350,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            }
        ],
        coins: [
            {
                position: 2070,
                classModificator: '',
                cost: '10',
            },
            {
                position: 5700,
                classModificator: '',
                cost: '10',

            },
            {
                position: 11690,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 14180,
                classModificator: '',
                cost: '10',

            },
            {
                position: 20340,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 29190,
                classModificator: '',
                cost: '10',

            },
            {
                position: 32635,
                classModificator: '',
                cost: '10',

            },
            {
                position: 37770,
                classModificator: '',
                cost: '10',

            },
            {
                position: 43480,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 50310,
                classModificator: '',
                cost: '10',
            }

        ]
    },
    level3: {
        levelNum: 3,
        levelContent: './level3_content.html',
        winningSlogan: 'Теперь с кормлением не будет проблем!',
        title: '«Кухонные баталии»',

        fallObj: [
            {
                position: 4000,
                baseW: 64,
                baseH: 108,
                id: 'lv3_fall1',
                canvasImage: './img/game/canvas/fall/lv3_fall1.png'
            },
            {
                position: 6833,
                baseW: 66,
                baseH: 108,
                id: 'lv3_fall2',
                canvasImage: './img/game/canvas/fall/lv3_fall2.png'
            },
            {
                position: 9819,
                baseW: 118,
                baseH: 108,
                id: 'lv3_fall3',
                canvasImage: './img/game/canvas/fall/lv3_fall3.png'
            },
            {
                position: 12844,
                baseW: 64,
                baseH: 108,
                id: 'lv3_fall1',
                canvasImage: './img/game/canvas/fall/lv3_fall1.png'
            },
            {
                position: 14686,
                baseW: 118,
                baseH: 108,
                id: 'lv3_fall3',
                canvasImage: './img/game/canvas/fall/lv3_fall3.png'
            },
            {
                position: 18878,
                baseW: 66,
                baseH: 108,
                id: 'lv3_fall2',
                canvasImage: './img/game/canvas/fall/lv3_fall2.png'
            },
            {
                position: 22267,
                baseW: 118,
                baseH: 108,
                id: 'lv3_fall3',
                canvasImage: './img/game/canvas/fall/lv3_fall3.png'
            },
            {
                position: 26335,
                baseW: 64,
                baseH: 108,
                id: 'lv3_fall1',
                canvasImage: './img/game/canvas/fall/lv3_fall1.png'
            },
            {
                position: 30069,
                baseW: 118,
                baseH: 108,
                id: 'lv3_fall3',
                canvasImage: './img/game/canvas/fall/lv3_fall3.png'
            },
            {
                position: 34103,
                baseW: 66,
                baseH: 108,
                id: 'lv3_fall2',
                canvasImage: './img/game/canvas/fall/lv3_fall2.png'
            },
            {
                position: 36322,
                baseW: 64,
                baseH: 108,
                id: 'lv3_fall1',
                canvasImage: './img/game/canvas/fall/lv3_fall1.png'
            },
            {
                position: 40171,
                baseW: 118,
                baseH: 108,
                id: 'lv3_fall3',
                canvasImage: './img/game/canvas/fall/lv3_fall3.png'
            },
            {
                position: 44523,
                baseW: 66,
                baseH: 108,
                id: 'lv3_fall2',
                canvasImage: './img/game/canvas/fall/lv3_fall2.png'
            },
            {
                position: 49016,
                baseW: 64,
                baseH: 108,
                id: 'lv3_fall1',
                canvasImage: './img/game/canvas/fall/lv3_fall1.png'
            },

        ],
        bonusObj: [
            {
                position: 4000,
                classModificator: '',
                id: 'lv3_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv3_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv3_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv3_1_origin.png',
                name: 'Прорезыватель-погремушка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchker&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 10060,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 16110,
                classModificator: '',
                id: 'lv3_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv3_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv3_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv3_3_origin.png',
                name: 'Стерилизатор для бутылочек',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkgm&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 22160,
                classModificator: '',
                id: 'lv3_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv3_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv3_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv3_1_origin.png',
                name: 'Прорезыватель-погремушка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchker&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 28210,
                classModificator: '',
                id: 'lv3_2',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv3_2_prize.png',
                countdownImage: './img/game/canvas/bonus/lv3_2_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv3_2_origin.png',
                name: 'Молочная смесь NAN 2 Optipro',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkfp&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 34250,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 40300,
                classModificator: '',
                id: 'lv3_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv3_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv3_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv3_3_origin.png',
                name: 'Стерилизатор для бутылочек',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkgm&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 46350,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            }
        ],
        coins: [
            {
                position: 2070,
                classModificator: '',
                cost: '10',
            },
            {
                position: 5700,
                classModificator: '',
                cost: '10',

            },
            {
                position: 11690,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 14180,
                classModificator: '',
                cost: '10',

            },
            {
                position: 20340,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 29190,
                classModificator: '',
                cost: '10',

            },
            {
                position: 32635,
                classModificator: '',
                cost: '10',

            },
            {
                position: 37770,
                classModificator: '',
                cost: '10',

            },
            {
                position: 43480,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 50310,
                classModificator: '',
                cost: '10',
            }

        ]
    },
    level4: {
        levelNum: 4,
        levelContent: './level4_content.html',
        winningSlogan: 'Чемодан собран, время купаться!',
        title: '«Песок в сандалях»',

        fallObj: [
            {
                position: 4000,
                baseW: 144,
                baseH: 86,
                id: 'lv4_fall1',
                canvasImage: './img/game/canvas/fall/lv4_fall1.png'
            },
            {
                position: 6833,
                baseW: 106,
                baseH: 108,
                id: 'lv4_fall2',
                canvasImage: './img/game/canvas/fall/lv4_fall2.png'
            },
            {
                position: 9819,
                baseW: 90,
                baseH: 108,
                id: 'lv4_fall3',
                canvasImage: './img/game/canvas/fall/lv4_fall3.png'
            },
            {
                position: 12844,
                baseW: 144,
                baseH: 86,
                id: 'lv4_fall1',
                canvasImage: './img/game/canvas/fall/lv4_fall1.png'
            },
            {
                position: 14686,
                baseW: 90,
                baseH: 108,
                id: 'lv4_fall3',
                canvasImage: './img/game/canvas/fall/lv4_fall3.png'
            },
            {
                position: 18878,
                baseW: 106,
                baseH: 108,
                id: 'lv4_fall2',
                canvasImage: './img/game/canvas/fall/lv4_fall2.png'
            },
            {
                position: 22267,
                baseW: 90,
                baseH: 108,
                id: 'lv4_fall3',
                canvasImage: './img/game/canvas/fall/lv4_fall3.png'
            },
            {
                position: 26335,
                baseW: 144,
                baseH: 86,
                id: 'lv4_fall1',
                canvasImage: './img/game/canvas/fall/lv4_fall1.png'
            },
            {
                position: 30069,
                baseW: 90,
                baseH: 108,
                id: 'lv4_fall3',
                canvasImage: './img/game/canvas/fall/lv4_fall3.png'
            },
            {
                position: 34103,
                baseW: 106,
                baseH: 108,
                id: 'lv4_fall2',
                canvasImage: './img/game/canvas/fall/lv4_fall2.png'
            },
            {
                position: 36322,
                baseW: 144,
                baseH: 86,
                id: 'lv4_fall1',
                canvasImage: './img/game/canvas/fall/lv4_fall1.png'
            },
            {
                position: 40171,
                baseW: 90,
                baseH: 108,
                id: 'lv4_fall3',
                canvasImage: './img/game/canvas/fall/lv4_fall3.png'
            },
            {
                position: 44523,
                baseW: 106,
                baseH: 108,
                id: 'lv4_fall2',
                canvasImage: './img/game/canvas/fall/lv4_fall2.png'
            },
            {
                position: 49016,
                baseW: 144,
                baseH: 86,
                id: 'lv4_fall1',
                canvasImage: './img/game/canvas/fall/lv4_fall1.png'
            },

        ],
        bonusObj: [
            {
                position: 4000,
                classModificator: '',
                id: 'lv4_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv4_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv4_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv4_1_origin.png',
                name: 'Летняя панама',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkhf&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 10060,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 16110,
                classModificator: '',
                id: 'lv4_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv4_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv4_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv4_3_origin.png',
                name: 'Детская сумка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkhz&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 22160,
                classModificator: '',
                id: 'lv4_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv4_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv4_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv4_1_origin.png',
                name: 'Летняя панама',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkhf&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 28210,
                classModificator: '',
                id: 'lv4_2',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv4_2_prize.png',
                countdownImage: './img/game/canvas/bonus/lv4_2_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv4_2_origin.png',
                name: 'Надувной плот',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkhq&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 34250,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 40300,
                classModificator: '',
                id: 'lv4_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv4_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv4_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv4_3_origin.png',
                name: 'Детская сумка',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkhz&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 46350,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            }
        ],
        coins: [
            {
                position: 2070,
                classModificator: '',
                cost: '10',
            },
            {
                position: 5700,
                classModificator: '',
                cost: '10',

            },
            {
                position: 11690,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 14180,
                classModificator: '',
                cost: '10',

            },
            {
                position: 20340,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 29190,
                classModificator: '',
                cost: '10',

            },
            {
                position: 32635,
                classModificator: '',
                cost: '10',

            },
            {
                position: 37770,
                classModificator: '',
                cost: '10',

            },
            {
                position: 43480,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 50310,
                classModificator: '',
                cost: '10',
            }

        ]
    },
    level5: {
        levelNum: 5,
        levelContent: './level5_content.html',
        winningSlogan: 'Осталось не забыть букет на линейку 1 сентября!',
        title: '«Скоро в школу»',

        fallObj: [
            {
                position: 4000,
                baseW: 80,
                baseH: 108,
                id: 'lv5_fall1',
                canvasImage: './img/game/canvas/fall/lv5_fall1.png'
            },
            {
                position: 6833,
                baseW: 84,
                baseH: 108,
                id: 'lv5_fall2',
                canvasImage: './img/game/canvas/fall/lv5_fall2.png'
            },
            {
                position: 9819,
                baseW: 92,
                baseH: 96,
                id: 'lv5_fall3',
                canvasImage: './img/game/canvas/fall/lv5_fall3.png'
            },
            {
                position: 12844,
                baseW: 80,
                baseH: 108,
                id: 'lv5_fall1',
                canvasImage: './img/game/canvas/fall/lv5_fall1.png'
            },
            {
                position: 14686,
                baseW: 92,
                baseH: 96,
                id: 'lv5_fall3',
                canvasImage: './img/game/canvas/fall/lv5_fall3.png'
            },
            {
                position: 18878,
                baseW: 84,
                baseH: 108,
                id: 'lv5_fall2',
                canvasImage: './img/game/canvas/fall/lv5_fall2.png'
            },
            {
                position: 22267,
                baseW: 92,
                baseH: 96,
                id: 'lv5_fall3',
                canvasImage: './img/game/canvas/fall/lv5_fall3.png'
            },
            {
                position: 26335,
                baseW: 80,
                baseH: 108,
                id: 'lv5_fall1',
                canvasImage: './img/game/canvas/fall/lv5_fall1.png'
            },
            {
                position: 30069,
                baseW: 92,
                baseH: 96,
                id: 'lv5_fall3',
                canvasImage: './img/game/canvas/fall/lv5_fall3.png'
            },
            {
                position: 34103,
                baseW: 84,
                baseH: 108,
                id: 'lv5_fall2',
                canvasImage: './img/game/canvas/fall/lv5_fall2.png'
            },
            {
                position: 36322,
                baseW: 80,
                baseH: 108,
                id: 'lv5_fall1',
                canvasImage: './img/game/canvas/fall/lv5_fall1.png'
            },
            {
                position: 40171,
                baseW: 92,
                baseH: 96,
                id: 'lv5_fall3',
                canvasImage: './img/game/canvas/fall/lv5_fall3.png'
            },
            {
                position: 44523,
                baseW: 84,
                baseH: 108,
                id: 'lv5_fall2',
                canvasImage: './img/game/canvas/fall/lv5_fall2.png'
            },
            {
                position: 49016,
                baseW: 80,
                baseH: 108,
                id: 'lv5_fall1',
                canvasImage: './img/game/canvas/fall/lv5_fall1.png'
            },

        ],
        bonusObj: [
            {
                position: 4000,
                classModificator: '',
                id: 'lv5_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv5_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv5_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv5_1_origin.png',
                name: 'Школьный рюкзак',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkio&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 10060,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 16110,
                classModificator: '',
                id: 'lv5_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv5_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv5_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv5_3_origin.png',
                name: 'Кроссовки Adidas',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkjw&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 22160,
                classModificator: '',
                id: 'lv5_1',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv5_1_prize.png',
                countdownImage: './img/game/canvas/bonus/lv5_1_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv5_1_origin.png',
                name: 'Школьный рюкзак',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkio&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 28210,
                classModificator: '',
                id: 'lv5_2',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv5_2_prize.png',
                countdownImage: './img/game/canvas/bonus/lv5_2_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv5_2_origin.png',
                name: 'Акварельные краски',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkjg&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 34250,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            },
            {
                position: 40300,
                classModificator: '',
                id: 'lv5_3',
                cost: '30',
                canvasImage: './img/game/canvas/bonus/lv5_3_prize.png',
                countdownImage: './img/game/canvas/bonus/lv5_3_prize_x2.png',
                imageUrl: './img/game/bonusCollect/lv5_3_origin.png',
                name: 'Кроссовки Adidas',
                link: 'https://ads.adfox.ru/257765/goLink?p1=byppy&p2=frfe&p5=bchkjw&pr=RANDOM&puid1=&puid2=&puid3=&puid4=&puid5=&puid6=&puid7=&puid8=&puid9=&puid10=&puid11=',
            },
            {
                position: 46350,
                classModificator: 'm_50',
                id: '50sale',
                cost: '20',
                canvasImage: './img/game/canvas/bonus/lv_50_sale_prize.png',
                countdownImage: './img/game/canvas/bonus/lv_50_sale_prize_x2.png',
                name: '',
                link: 'https://megamarket.ru/',
            }
        ],
        coins: [
            {
                position: 2070,
                classModificator: '',
                cost: '10',
            },
            {
                position: 5700,
                classModificator: '',
                cost: '10',

            },
            {
                position: 11690,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 14180,
                classModificator: '',
                cost: '10',

            },
            {
                position: 20340,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 29190,
                classModificator: '',
                cost: '10',

            },
            {
                position: 32635,
                classModificator: '',
                cost: '10',

            },
            {
                position: 37770,
                classModificator: '',
                cost: '10',

            },
            {
                position: 43480,
                classModificator: 'm_high',
                cost: '10',
            },
            {
                position: 50310,
                classModificator: '',
                cost: '10',
            }

        ]
    }

}
