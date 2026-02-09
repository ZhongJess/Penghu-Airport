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




// 語言選單功能
document.addEventListener('DOMContentLoaded', () => {
  const parent = document.querySelector('.nav_lang_parent');
  const menu = document.querySelector('.tc_nav_lang');
  const navWrapper = document.getElementById('nav_lang');

  parent.setAttribute('aria-expanded', 'false');

  function toggleMenu(force) {
    const isOpen = parent.getAttribute('aria-expanded') === 'true';
    const shouldOpen = typeof force === 'boolean' ? force : !isOpen;
    parent.setAttribute('aria-expanded', String(shouldOpen));
    menu.classList.toggle('open', shouldOpen);
  }

  // 點擊展開/收合
  parent.addEventListener('click', e => {
    e.preventDefault();
    e.stopPropagation();
    toggleMenu();
  });

  // 鍵盤 Enter/Space 開關
  parent.addEventListener('keydown', e => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleMenu();
    }
  });

  // 防止下拉內部點擊冒泡
  menu.addEventListener('click', e => e.stopPropagation());

  // 點其他區域收回
  document.addEventListener('click', () => {
    toggleMenu(false);
  });

  // Esc 收回
  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') toggleMenu(false);
  });

  // ✅ 鍵盤 tab 鍵離開選單時自動收回
  navWrapper.addEventListener('focusout', e => {
    // 如果「新焦點」不在 navWrapper 裡面，就收起來
    setTimeout(() => {
      if (!navWrapper.contains(document.activeElement)) {
        toggleMenu(false);
      }
    }, 0);
  });

  // ✅ 滑鼠移出收回
  menu.addEventListener('mouseleave', () => {
    toggleMenu(false);
  });

  // ✅ 點選語言時呼叫 setLanguage 並收回
  menu.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', e => {
      e.preventDefault();
      const selectedLang = a.getAttribute('lang');
      setLanguage(selectedLang);
      toggleMenu(false);
    });
  });
});











        function animateSVG() {
            const boat = document.getElementById('_boat_');
            const bus = document.getElementById('_bus_');
            const airplain = document.getElementById('_airplain_');

            // 初始位置
            let boatX, busX, airplainY;

            function resetPositions() {
                boatX = -300;    // 船從左側外面
                busX = 300;      // 公車從右側外面
                airplainY = 200; // 飛機從下方外面
                // 立即設定初始位置
                boat.setAttribute('transform', `translate(${boatX}, 0)`);
                bus.setAttribute('transform', `translate(${busX}, 0)`);
                airplain.setAttribute('transform', `translate(0, ${airplainY})`);
            }

            function animate() {
                let moving = false;

                if (boatX < 0) {
                    boatX += 0.8;
                    boat.setAttribute('transform', `translate(${boatX}, 0)`);
                    moving = true;
                }

                if (busX > 0) {
                    busX -= 0.8;
                    bus.setAttribute('transform', `translate(${busX}, 0)`);
                    moving = true;
                }

                if (airplainY > 0) {
                    airplainY -= 1;
                    airplain.setAttribute('transform', `translate(0, ${airplainY})`);
                    moving = true;
                }

                if (moving) {
                    requestAnimationFrame(animate);
                } else {
                    // 動畫結束，重設位置並重新開始
                    setTimeout(() => {
                        resetPositions();
                        requestAnimationFrame(animate);
                    }, 500); // 停留0.5秒再重播，可自行調整
                }
            }

            resetPositions();
            animate();
        }

document.addEventListener('DOMContentLoaded', () => {
  const el = document.getElementById('tabU');
  if (el) {
    el.addEventListener('focus', () => {
      // 第一次聚焦時就自動滾回頂部
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});



        window.addEventListener('DOMContentLoaded', animateSVG);
