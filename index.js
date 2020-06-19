$("html, body").animate({ scrollTop: 0 });

// ローディング
function pageLoading() {
  setTimeout(function () {
    $(".loading").fadeOut();
  }, 3000);
}

// スクロールトップ
const upBtn = $(".scroll_top");
upBtn.hide();

function scrollTop() {
  if ($(this).scrollTop() > 400) {
    upBtn.fadeIn();
  } else {
    upBtn.fadeOut();
  }
}

// テキストフェードイン
function textFadeIn() {
  $(".posts_item").each(function () {
    const objH = $(this).offset().top;
    const windowH = $(window).height();
    const scroll = $(window).scrollTop();
    if (scroll > objH - windowH + 100) {
      $(this).addClass("fade-in");
    }
  });
}

// イベントリスナー
$(window).on({
  load: function () {
    pageLoading();
  },
  scroll: function () {
    scrollTop();
    textFadeIn();
  },
});

// ハンバーガーメニュー
const modal = $(".modal");
const mobileMenu = $(".mobile_menu");

mobileMenu.on("click", () => {
  mobileMenu.toggleClass("menu_animate");
  modal.toggleClass("menu_show");
});

// スライドショー
$(function () {
  const slide = $(".slide");
  let page = 0;
  const lastPage = parseInt(slide.length - 1);
  slide.css("display", "none");
  slide.eq(page).css("display", "block");

  function changePage() {
    slide.fadeOut(1000);
    slide.eq(page).fadeIn(1000);
  }

  function slideshow() {
    setInterval(function () {
      if (page === lastPage) {
        page = 0;
        changePage();
      } else {
        page++;
        changePage();
      }
    }, 7000);
  }
  slideshow();
});

// ページ遷移
function move(tag) {
  const tagH = tag.offset().top;
  $("html,body").animate({ scrollTop: tagH - 95 }, 500);
  modal.removeClass("menu_show");
  mobileMenu.removeClass("menu_animate");
}

const menuEvents = [
  { active: $(".to-top"), target: $("body") },
  { active: $(".to-posts"), target: $(".posts") },
  { active: $(".to-profile"), target: $(".other") },
  { active: upBtn, target: $("body") },
];
menuEvents.forEach((event) => {
  return event.active.on("click", () => {
    move(event.target);
  });
});
