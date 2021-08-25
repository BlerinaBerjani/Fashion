var Cookie = {
	setCookie: function (key, value, expiry) {
	    var expires = new Date();
	    expires.setTime(expires.getTime() + (expiry * 24 * 60 * 60 * 1000));
	    document.cookie = key + '=' + value + ';path=/' + ';expires=' + expires.toUTCString();
	}, 
	getCookie: function (key) {
	    var keyValue = document.cookie.match('(^|;) ?' + key + '=([^;]*)(;|$)');
	    return keyValue ? keyValue[2] : null;
	},
	eraseCookie: function (key) {
	    var keyValue = Cookie.getCookie(key);
	    Cookie.setCookie(key, keyValue, '-1');
	}
}


$("body").on("click", ".wishlit", function() {
	var texts = ["Add to wishlist", "Remove from wishlist"];
	var icons = ["<i class='flaticon-like'></i>", "<i class='flaticon-close'></i>", "<i class='flaticon-loading-circle'></i>"];

	var element = $(this);
	var pid = element.closest('a').attr("p-id");
	
	element.html(icons[2]);
	element.find("i").addClass("added-wishlist");

	if(Cookie.getCookie(pid)){
		Cookie.eraseCookie(pid);
		setTimeout(function () {
			element.html(icons[0]);
			element.attr("aria-label", texts[0]);
			element.find("i").removeClass("added-wishlist");
		},1500);
	} else {
		Cookie.setCookie(pid, pid, 30);
		setTimeout(function () {
			element.html(icons[1]);
			element.attr("aria-label", texts[1]);
			element.find("i").removeClass("added-wishlist");
		},1500);
	}
});

function quantityVal(elem){
	var input_value = parseInt(elem.val());
	var input_min = parseInt(elem.attr("min"));
	var input_max = parseInt(elem.attr("max"));
	return {"element": elem, "value": input_value, "min": input_min, "max": input_max};
}

$(".quantity-dec").click(function() {
	var qty = quantityVal($(this).siblings(".quanity-val"));
	if(qty['value'] - 1 >= qty['min']) 
		qty['element'].val(qty['value'] - 1);
});
$(".quantity-inc").click(function() {
	var qty = quantityVal($(this).siblings(".quanity-val"));
	if(qty['value'] + 1 <= qty['max']) 
		qty['element'].val(qty['value'] + 1);
});

$(".hamburger-menu").click(function() {
	$('.mobile-menu-overlay, .mobile-menu-container').toggleClass('show');
	$(this).toggleClass('opened').attr('aria-expanded', $(this).hasClass('opened'));
});

$(".description-reviews .tablist .tabs").click(function (){
	var index = $(this).index();
	$(".description-reviews .tablist .tabs").removeClass("active").eq(index).addClass("active");
	$(".description-reviews .contents > div").fadeOut(300).eq(index).delay(300).fadeIn();
});

$(".indicator-container").click(function (){
	$("#shopping-container").toggleClass("show");
	$("#shopping-overlay").toggleClass("show");
});

$(".remove-product").click(function (){
	var toDelete = $(this).closest("a");
	$(this).find("i").attr("class", "flaticon-loading-circle").addClass("shopping-cart-remove");
	setTimeout(function(){
		toDelete.remove();
		if($(".shopping-products > a").length < 1) {
			$("#shopping-cart-prices").fadeOut(300);
			$("#shopping-cart-empty").delay(300).fadeIn();
		}
	}, 1500);
});

$(".remove-product-cart").click(function() {
	var toDelete = $(this).closest("tr");
	$(this).find("i").attr("class", "flaticon-loading-circle").addClass("shopping-cart-remove");
	setTimeout(function(){
		if($(".view-cart-container table tbody tr").length <= 1) {
			$(".view-cart-container table tfoot th button").addClass("disabled");
			$("#shopping-total-price").html("0.00");
			toDelete.html("<td class='align-center' colspan='6'>Your shopping cart is empty.</td>");
		}else {
			toDelete.remove();
		}
	}, 1500);
});

$(".close-open").click(function() {
	$(this).parent("li.menu-has-children").siblings("li.menu-has-children").find("ul.sub-menu").slideUp();
	$(this).parent("li.menu-has-children").siblings("li.menu-has-children").find(".close-open").attr("class", "flaticon-plus close-open");
	if($(this).siblings("ul.sub-menu").is(":hidden")){
		$(this).siblings("ul.sub-menu").slideDown();
		$(this).attr("class", "flaticon-remove close-open");
	}else {
		$(this).siblings("ul.sub-menu").slideUp();
		$(this).attr("class", "flaticon-plus close-open");
	}
});

$("#open-filters").click(function() {
	$(".search-divider > div.search").slideToggle();
});

$(".checkout-mobile-orders").click(function() {
	var txt = ["Show order summary", "Hide order summary", "flaticon-down-arrow", "flaticon-up-arrow-angle"];
	if($(".cart-container").is(":hidden")){
		$(".cart-container").slideDown();
		$(this).find("span#checkout-desc-label").html(txt[1]);
		$(this).find("i#checkout-up-down-icon").attr("class", txt[2]);
	}else {
		$(".cart-container").slideUp();
		$(this).find("span#checkout-desc-label").html(txt[0]);
		$(this).find("i#checkout-up-down-icon").attr("class", txt[3]);
	}
});


AOS.init();

var textWrapper = document.querySelector('.ml2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: true})
  .add({
    targets: '.ml2 .letter',
    scale: [4,1],
    opacity: [0,1],
    translateZ: 0,
    easing: "easeOutExpo",
    duration: 950,
    delay: (el, i) => 70*i
  }).add({
    targets: '.ml2',
    opacity: 1,
    duration: 1000,
    easing: "easeOutExpo",
    delay: 1000
  });


  var mySlider = {
  config: {
    slider: ".slider-content",
    activeSlide: ".slide.active",
    footerButtons: ".footer-wrapper .box",
    bgPicture: ".image-mask img",
    nav: ".control-nav",
    position: {
      x: 350,
      alpha: 1
    },
    nextPosition: {
      x: 150,
      alpha: 1
    }
  },

  init: function (config) {
    this.canvasInit();
    $(mySlider.config.footerButtons).click(function () {
      mySlider.changeButton($(this));
    });
  },

  canvasInit: function () {
    var canvas = $(".canvas")[0];
    var ctx = canvas.getContext("2d");
    var w = $(mySlider.config.activeSlide).width();
    var h = $(mySlider.config.activeSlide).height();
    var img = document.createElement("IMG");
    img.src =
      "https://s3-us-west-2.amazonaws.com/s.cdpn.io/42764/mask-karlie.jpg";
    var position = {
      x: 150,
      alpha: 1
    };

    if (window.matchMedia("(min-width: 860px)").matches) {
      position = {
        x: 200,
        alpha: 1
      };
    }

    if (window.matchMedia("(min-width: 1200px)").matches) {
      position = {
        x: 250,
        alpha: 1
      };
    }

    canvas.width = w;
    canvas.height = h;
    mySlider.drawMask(canvas, ctx, position, img);
  },

  drawMask: function (canvas, ctx, position, img) {
    var w = $(mySlider.config.activeSlide).width();
    var h = $(mySlider.config.activeSlide).height();
    var cy = 50;
    var mStroke = 25;
    var mWidth = 180;
    var mHeight = 300;

    if (window.matchMedia("(min-width: 860px)").matches) {
      mStroke = 35;
      cy = 80;
      mWidth = 260;
      mHeight = 380;
    }

    if (window.matchMedia("(min-width: 1200px)").matches) {
      mStroke = 40;
      cy = 120;
      mWidth = 360;
      mHeight = 460;
    }

    ctx.globalAlpha = position.alpha;
    ctx.clearRect(0, 0, w, h);
    ctx.save();
    ctx.beginPath();
    ctx.rect(position.x, cy, mWidth, mStroke);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.rect(position.x, cy, mStroke, mHeight);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.rect(position.x + mWidth, cy, mStroke, mHeight);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();

    ctx.save();
    ctx.rect(position.x, cy + (mHeight - mStroke), mWidth, mStroke);
    ctx.clip();
    ctx.drawImage(img, 0, 0, w, h);
    ctx.restore();
  },

  changeSlide: function (id) {
    var activeSlide = $(mySlider.config.activeSlide);
    var newSlide = $(mySlider.config.slider).find('[data-order="' + id + '"]');

    this.animateSlide(activeSlide, newSlide);
    this.createMask(activeSlide, newSlide);
  },

  changeNav: function (id) {
    var activeNav = $(mySlider.config.nav).find("li");

    activeNav.removeClass("active");
    activeNav.eq(id - 1).addClass("active");
  },

  changeButton: function (el) {
    var activeButton = $(mySlider.config.slider).find(".box.active");
    var target = el.data("id");

    if (!el.hasClass("active")) {
      activeButton.removeClass("active");
      el.addClass("active");
      this.changeSlide(target);
      this.changeNav(target);
    }
  },

  createMask: function (active, newSlide) {
    var currentCanvas = active.find(".canvas")[0];
    var nextCanvas = newSlide.find(".canvas")[0];
    var position = mySlider.config.position;
    var positionNext = mySlider.config.nextPosition;

    var currentctx = currentCanvas.getContext("2d");
    var nextctx = nextCanvas.getContext("2d");

    var w = $(mySlider.config.activeSlide).width();
    var h = $(mySlider.config.activeSlide).height();

    var currentImg = document.createElement("IMG");
    var nextImg = document.createElement("IMG");
    var movex = 200;

    var position = {
      x: 350,
      alpha: 1
    };
    var nextPosition = {
      x: 150,
      alpha: 1
    };

    TweenMax.set(positionNext, { x: "150" });

    if (window.matchMedia("(min-width: 860px)").matches) {
      position = {
        x: 400,
        alpha: 1
      };

      nextPosition = {
        x: 200,
        alpha: 1
      };

      movex = 200;

      TweenMax.set(positionNext, { x: "200" });
    }

    if (window.matchMedia("(min-width: 1200px)").matches) {
      position = {
        x: 450,
        alpha: 1
      };

      nextPosition = {
        x: 250,
        alpha: 1
      };

      movex = 200;
      TweenMax.set(positionNext, { x: "250" });
    }

    currentImg.src = active.find("canvas").data("image");
    nextImg.src = newSlide.find("canvas").data("image");

    currentCanvas.width = nextCanvas.width = w;
    currentCanvas.height = nextCanvas.height = h;

    TweenMax.to(newSlide.find(".canvas"), 0.3, { autoAlpha: 1, delay: 1.5 });

    TweenMax.to(positionNext, 0.5, {
      x: "-=" + movex + "",
      onUpdate: function () {
        mySlider.drawMask(currentCanvas, currentctx, positionNext, currentImg);
      },
      onComplete: function () {
        TweenMax.to(active.find(".canvas"), 0.3, { autoAlpha: 0 }, "-=0.2");
        TweenMax.to(newSlide.find(".canvas"), 0.3, { autoAlpha: 0 }, "-=0.2");
      }
    });

    nextImg.onload = function () {
      mySlider.drawMask(nextCanvas, nextctx, positionNext, nextImg);

      TweenMax.to(position, 1, {
        x: "-=" + movex + "",
        delay: 1.3,
        onUpdate: function () {
          mySlider.drawMask(nextCanvas, nextctx, position, nextImg);
        }
      });

      console.log(position);
    };
  },

  animateSlide: function (active, newSlide) {
    var w = $(mySlider.config.slider).width();
    var backgroundImg = $(mySlider.config.bgPicture);
    var activeTitleBg = active.find(".title-background .mask-wrap");
    var activeMainTitle = active.find(".title-wrapper h1 .mask-wrap");
    var activeSlideContent = active.find(".slide-content");
    var activefakeBg = active.find(".fake-bg");
    var activeImageCaption = active.find(".image-caption");

    var newTitleBg = newSlide.find(".title-background .mask-wrap");
    var newTitle = newSlide.find(".title-wrapper h1 .mask-wrap");
    var newBgPicture = newSlide.data("img");
    var newfakeBg = newSlide.find(".fake-bg");
    var nextImageCaption = newSlide.find(".image-caption");
    var img = $("<img />");

    newSlide.addClass("next");

    activeMainTitle.addClass("mask-up");
    activeTitleBg.addClass("mask-down");
    activeImageCaption.addClass("mask-up");
    newTitle.addClass("mask-down");
    newTitleBg.addClass("mask-up");
    nextImageCaption.addClass("mask-down");

    TweenMax.set(activeSlideContent, { width: w });
    TweenMax.set(activefakeBg, { width: w });
    TweenMax.set(newfakeBg, { autoAlpha: 0 });

    TweenMax.to(active, 0.8, { width: "0%", ease: Power4.easeIn });
    TweenMax.to(activefakeBg, 0.3, { autoAlpha: 0, delay: 0.4 });
    TweenMax.to(backgroundImg, 0.3, { autoAlpha: 0, delay: 0.4 });

    setTimeout(function () {
      backgroundImg.remove();
      img.attr("src", newBgPicture).css("opacity", 0);

      $(".image-mask").append(img);
    }, 600);

    TweenMax.to(newfakeBg, 0.5, { autoAlpha: 1, delay: 1 });
    TweenMax.to(img, 0.5, { autoAlpha: 1, delay: 1 });

    setTimeout(function () {
      newTitle.removeClass("mask-down");
      newTitleBg.removeClass("mask-up");
    }, 800);

    setTimeout(function () {
      active.removeClass("active");
      newSlide.addClass("active").removeClass("next");
      TweenMax.set(active, { width: "100%" });
      activeMainTitle.removeClass("mask-up");
      activeTitleBg.removeClass("mask-down");
      activeImageCaption.removeClass("mask-up");
      nextImageCaption.removeClass("mask-down");
    }, 1500);
  }
};

function debounce(func, wait, immediate) {
  var timeout;
  return function () {
    var context = this,
      args = arguments;
    var later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    var callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

$(document).ready(function () {
  mySlider.init();

  var fn = debounce(function () {
    mySlider.init();
  }, 250);

  $(window).on("resize", fn);
});

$("#products .item").hide().each(function(i) {
  $(this).delay(i*400).fadeIn(400);
});

$(function () {
	$('.slider-image').slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	arrows: true,
	  	fade: true,
	  	dots: true,
	  	asNavFor: '.slider-nav',
	  	prevArrow:"<button type='button' class='slick-arrow slick-prev'><i class='flaticon-left-arrow'></i></button>",
        nextArrow:"<button type='button' class='slick-arrow slick-next'><i class='flaticon-right-arrow-angle'></i></button>"
	});
	$('.slider-nav').slick({
	  	slidesToShow: 3,
	  	slidesToScroll: 1,
	  	asNavFor: '.slider-image',
	  	dots: false,
	  	centerMode: true,
	  	focusOnSelect: true,
	  	arrows: false,
	  	vertical: true,
	  	verticalSwiping: true,
	});
});

$(".addToCart").click(function (){
	$("#shopping-container").toggleClass("show");
	$("#shopping-overlay").toggleClass("show");
});


// $(document).ready(function() {

//     setTimeout(function() {
//         $('body').addClass('homepageload');
//     }, 3500);
 
// });

// (function(){
//   var spinner =document.getElementById("sign_in_button");
//   var loading = 0;
//   var id = setInterval(frame,20);

//   function frame(){
//     if(loading==100){
//       clearInterval(id);
//       window.open("index.html","_self");
//     } else {
//       loading = loading + 1;
//       if(loading==90){
//         spinner.style.animation ="fadeout 1s ease";

//       }
//     }
//   }
// })();