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
        $(this).toggleClass('closeBtn')
        $('.header').toggleClass('click')
        
        // 處理 Body 捲動鎖定
        if (window.innerWidth <= 980) {
            isOverflowHidden = !isOverflowHidden
            document.body.style.overflow = isOverflowHidden ? 'hidden' : 'auto'
        }
        
        $('.gotop').removeClass('show')
    })

    // 監聽視窗大小變化事件
    window.addEventListener('resize', updateOverflow)
    
    // 點擊選單連結後自動收合選單
    $('.header nav a').click(function(e) {
        // 不要阻止預設行為，否則錨點跳轉會失效
        $('.menuBtn').removeClass('closeBtn')
        $('.header').removeClass('click')
        
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
