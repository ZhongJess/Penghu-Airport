$(document).ready(function() {
    $(window)
        .resize(function() {
            var w = $(window).width()

            // 區塊取最大值調整為一樣高度
            if (w > 980) {
                let getBannerUrl = $('.banner')
                getBannerUrl.each(function(index, element) {
                    // console.log(element.dataset.pc);
                    let pcUrl = element.dataset.pc
                    element.style.backgroundImage = `url(${pcUrl})`
                })
            } else {
                let getUrl = $('.banner')
                getUrl.each(function(index, element) {
                    // console.log(element.dataset.mobile);
                    let mobileUrl = element.dataset.mobile
                    element.style.backgroundImage = `url(${mobileUrl})`
                })
            }
        })
        .resize()

    $('.coll .btn').click(function() {
        let hashDistance = $(this.hash).offset().top - 100
        $('html,body').stop().animate({
            scrollTop: hashDistance
        }, 0)
        return false
    })

    $('.departure .btn').click(function() {
        $('.departure ').toggleClass('hidden')
    })
    $('.return .btn').click(function() {
        $('.return ').toggleClass('hidden')
    })

    // 燈箱

    function noOverflow() {
        document.body.style.overflow = 'hidden' // 禁用滾動
    }

    function enableOverflow() {
        document.body.style.overflow = '' // 恢復滾動
    }

    // 偵測視窗大小變化，若燈箱開啟則保持禁用滾動
    function handleResize() {
        const lightbox = document.querySelector('.lightbox')
        if (lightbox && window.getComputedStyle(lightbox).display !== 'none') {
            noOverflow() // 燈箱開啟時禁用滾動
        } else {
            enableOverflow() // 燈箱關閉時恢復滾動
        }
    }

    // 初始執行
    handleResize()
    window.addEventListener('resize', handleResize)
    window.addEventListener('load', handleResize)

    // 取得關閉按鈕與燈箱元素
    const closeLightboxBtn = document.querySelector('.close_btn')
    const lightbox = closeLightboxBtn.closest('.lightbox')

    // 點擊關閉按鈕時，恢復滾動並隱藏燈箱
    if (closeLightboxBtn) {
        closeLightboxBtn.addEventListener('click', () => {
            enableOverflow()
            if (lightbox) {
                lightbox.style.display = 'none'
            }
        })
    }

    // 確保滾動狀態與燈箱顯示一致（假設燈箱可能被其他操作顯示/隱藏）
    const lightboxObserver = new MutationObserver(() => handleResize())
    if (lightbox) {
        lightboxObserver.observe(lightbox, {
            attributes: true,
            attributeFilter: ['style']
        })
    }

// ...existing code...
$('.menuBtn').on('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).click();
    }
})

// ...existing code...
$('.menuBtn, .close_btn').on('keydown', function(e) {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        $(this).click();
    }
});
// ...existing code...

function closeLightbox() {
  document.querySelector('.lightbox').style.display = 'none';
}

// 1. 點擊按鈕可關閉
document.querySelector('.close_btn').addEventListener('click', closeLightbox);

// 2. 鍵盤 ESC 可關閉
document.addEventListener('keydown', function(e) {
  if (e.key === "Escape") {
    closeLightbox();
  }
});


})


gsap.registerPlugin(ScrollTrigger);

// 飛機
gsap.from("#_airplain_", {
  y: 50,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".bg",
    start: "top 80%"
  }
});

// 巴士
gsap.from("#_bus_", {
  x: -100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".bg",
    start: "top 85%"
  }
});

// 船
gsap.from("#_boat_", {
  x: 100,
  opacity: 0,
  duration: 1,
  scrollTrigger: {
    trigger: ".bg",
    start: "top 85%"
  }
});


function changeLanguage() {
    var lang = document.getElementById("language").value;
    console.log("Language selected:", lang);
    // 執行你的語言切換邏輯
}

function setLanguage(lang) {
    console.log("Language button clicked:", lang);
    // 同樣執行切換
}






document.addEventListener('DOMContentLoaded', () => {
  const parent = document.querySelector('.nav_lang_parent');
  const menu = document.querySelector('.tc_nav_lang');

  parent.setAttribute('aria-expanded', 'false');

  function toggleMenu() {
    const isOpen = parent.getAttribute('aria-expanded') === 'true';
    parent.setAttribute('aria-expanded', String(!isOpen));
    menu.classList.toggle('open', !isOpen);
  }

  parent.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });
  parent.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  menu.addEventListener('click', e => e.stopPropagation());
  document.addEventListener('click', () => {
    parent.setAttribute('aria-expanded', 'false');
    menu.classList.remove('open');
  });
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });
});


