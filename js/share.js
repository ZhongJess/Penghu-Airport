

$(document).ready(function() {
    new WOW().init();

    const $window = $(window);
    const $header = $('.header');
    const $headerRight = $('.header .right');
    const $goTop = $('.gotop'); // 選取 gotop 按鈕

    // 1. 處理 Header 與 GoTop 顯示邏輯
    function handleScrollEffects() {
        const windowWidth = window.innerWidth;
        const scrollTop = $window.scrollTop();

        // --- GoTop 顯示/隱藏邏輯 (捲動超過 300px 顯示) ---
        if (scrollTop > 300) {
            $goTop.fadeIn(300); // 或是用 $goTop.addClass('active')
        } else {
            $goTop.fadeOut(300);
        }

        // --- 原有的 Header 邏輯 ---
        if (windowWidth < 980) {
            $header.removeClass('scroll is-compact');
            $headerRight.addClass('none');
            return; 
        }

        if (scrollTop > 134) {
            $header.addClass('scroll');
            if (windowWidth <= 1200) {
                $headerRight.removeClass('none');
                $header.removeClass('is-compact');
            } else {
                $headerRight.addClass('none');
                $header.addClass('is-compact');
            }
        } else {
            $header.removeClass('scroll is-compact');
            $headerRight.removeClass('none');
        }
    }

    // 2. 監聽捲動與縮放
    $window.on('scroll resize', handleScrollEffects).trigger('scroll');

    // 3. 點擊 GoTop 捲動回頂部
    $goTop.on('click', function(e) {
        e.preventDefault();
        $('html, body').stop().animate({ scrollTop: 0 }, 600);
    });

    // 4. 錨點平滑捲動
    $("a[href^='#']:not(.gotop)").on('click', function(e) {
        e.preventDefault();
        const target = $(this.hash);
        if (target.length) {
            const hashDistance = target.offset().top - 100;
            $('html, body').stop().animate({ scrollTop: hashDistance }, 1000);
        }
    });

// 5. 漢堡選單點擊切換 (新增這段)
    $('.menuBtn').on('click', function() {
        $header.toggleClass('click'); // 讓選單出現/消失
        $(this).toggleClass('closeBtn'); // 讓按鈕切換成 X

        // 開啟選單時鎖定身體捲動，關閉時恢復
        if ($header.hasClass('click')) {
            $('body').css('overflow', 'hidden');
        } else {
            $('body').css('overflow', 'auto');
        }
    });

    // 6. 視窗縮放重設選單 (優化原本的第 5 點)
    $window.on('resize', function() {
        if (window.innerWidth >= 980) {
            $('body').css('overflow', 'auto');
            $header.removeClass('click');
            $('.menuBtn').removeClass('closeBtn');
        }
    });

    // --- 5. 錨點平滑捲動 (補回原本的功能) ---
    // 點擊 href 為 # 開頭的連結時，平滑捲動到目標位置
    $("a[href^='#']:not(.gotop)").on('click', function(e) {
        const target = $(this.hash);
        if (target.length) {
            e.preventDefault();
            // 捲動時自動解鎖 body (防止在手機選單點擊後頁面鎖死)
            $body.css('overflow', 'auto');
            $header.removeClass('click');
            $menuBtn.removeClass('closeBtn');

            const hashDistance = target.offset().top - 100;
            $('html, body').stop().animate({
                scrollTop: hashDistance
            }, 1000);
        }
    });

    // --- 6. 初始化動畫套件 ---
    if (typeof WOW === 'function') {
        new WOW().init();
    }

    
});