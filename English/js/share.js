$(document).ready(function() {
    new WOW().init()
    var $window = $(window)

    //錨點下滑
    $("a[href^='#']").click(function() {
        //console.log($(this.hash).offset().top-40)
        let hashDistance = $(this.hash).offset().top - 100
        $('html,body').stop().animate({
            scrollTop: hashDistance
        }, 1000)
        return false
    })

    let isOverflowHidden = false

    function updateOverflow() {
        document.body.style.overflow = 'auto' // 啟用捲動
        $('.header').removeClass('click')
        $('.menuBtn').removeClass('closeBtn')
    }
    $('.menuBtn').click(function(e) {
        e.preventDefault()
        // menuActive()
        if (window.innerWidth <= 980) {
            if (isOverflowHidden) {
                document.body.style.overflow = 'auto' // 啟用捲動
            } else {
                document.body.style.overflow = 'hidden' // 禁用捲動
            }

            isOverflowHidden = !isOverflowHidden // 切換當前狀態
        }
    })

    // 監聽視窗大小變化事件
    window.addEventListener('resize', updateOverflow)

    // 頁面加載時初始化 overflow 狀態
    window.addEventListener('load', updateOverflow)
    // const getFullVh = window.innerHeight

    $('.menuBtn').click(function(e) {
        e.preventDefault()
        $(this).toggleClass('closeBtn')
        $('.header').toggleClass('click')
        $('.header nav a').toggleClass('click')

        $('.gotop').removeClass('show')

        if (!$(this).hasClass('closeBtn')) {
            $('.drop_list').removeClass('click')
        }
    })
    $('.header nav a').click(function(e) {
        e.preventDefault()
        $('.menuBtn').toggleClass('closeBtn')
        $('.header').toggleClass('click')
        if (window.innerWidth <= 980) {
            if (isOverflowHidden) {
                document.body.style.overflow = 'auto' // 啟用捲動
            } else {
                document.body.style.overflow = 'hidden' // 禁用捲動
            }

            isOverflowHidden = !isOverflowHidden // 切換當前狀態
        }
    })

    $window
        .on('scroll', function() {
            if ($window.scrollTop() > 1200) {
                $('.gotop').addClass('show')
            } else {
                $('.gotop').removeClass('show')
            }
        })
        .scroll()
    $window
        .on('scroll', function() {
            if ($window.scrollTop() > 134) {
                $('.header .row .lang ').addClass('none')
                $('.header').addClass('scroll')
            } else {
                $('.header .row .lang').removeClass('none')
                $('.header').removeClass('scroll')
            }
        })
        .scroll()

    $('.gotop').click(function() {
        $('html, body').animate({
            scrollTop: 0, //屬性
        })
        return false
    })

})


