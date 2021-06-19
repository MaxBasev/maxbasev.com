!(function ($) {
  "use strict";

  // Hero typed
  // if ($('.typed').length) {
  //   var typed_strings = $(".typed").data('typed-items');
  //   typed_strings = typed_strings.split(',')
  //   new Typed('.typed', {
  //     strings: typed_strings,
  //     loop: true,
  //     typeSpeed: 100,
  //     backSpeed: 50,
  //     backDelay: 2000
  //   });
  // }

  // Smooth scroll for the navigation menu and links with .scrollto classes
  $(document).on('click', '.nav-menu a, .scrollto', function (e) {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      e.preventDefault();
      var target = $(this.hash);
      if (target.length) {

        var scrollto = target.offset().top;

        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');

        if ($(this).parents('.nav-menu, .mobile-nav').length) {
          $('.nav-menu .active, .mobile-nav .active').removeClass('active');
          $(this).closest('li').addClass('active');
        }

        if ($('body').hasClass('mobile-nav-active')) {
          $('body').removeClass('mobile-nav-active');
          $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
        }
        return false;
      }
    }
  });

  // Activate smooth scroll on page load with hash links in the url
  $(document).ready(function () {
    if (window.location.hash) {
      var initial_nav = window.location.hash;
      if ($(initial_nav).length) {
        var scrollto = $(initial_nav).offset().top;
        $('html, body').animate({
          scrollTop: scrollto
        }, 1500, 'easeInOutExpo');
      }
    }
  });

  $(document).on('click', '.mobile-nav-toggle', function (e) {
    $('body').toggleClass('mobile-nav-active');
    $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
  });

  $(document).click(function (e) {
    var container = $(".mobile-nav-toggle");
    if (!container.is(e.target) && container.has(e.target).length === 0) {
      if ($('body').hasClass('mobile-nav-active')) {
        $('body').removeClass('mobile-nav-active');
        $('.mobile-nav-toggle i').toggleClass('icofont-navigation-menu icofont-close');
      }
    }
  });

  // Navigation active state on scroll
  var nav_sections = $('section');
  var main_nav = $('.nav-menu, .mobile-nav');

  $(window).on('scroll', function () {
    var cur_pos = $(this).scrollTop() + 200;

    nav_sections.each(function () {
      var top = $(this).offset().top,
        bottom = top + $(this).outerHeight();

      if (cur_pos >= top && cur_pos <= bottom) {
        if (cur_pos <= bottom) {
          main_nav.find('li').removeClass('active');
        }
        main_nav.find('a[href="#' + $(this).attr('id') + '"]').parent('li').addClass('active');
      }
      if (cur_pos < 300) {
        $(".nav-menu ul:first li:first").addClass('active');
      }
    });
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('.back-to-top').fadeIn('slow');
    } else {
      $('.back-to-top').fadeOut('slow');
    }
  });

  $('.back-to-top').click(function () {
    $('html, body').animate({
      scrollTop: 0
    }, 1500, 'easeInOutExpo');
    return false;
  });

  // // jQuery counterUp
  // $('[data-toggle="counter-up"]').counterUp({
  //   delay: 10,
  //   time: 1000
  // });

  // Skills section
  $('.skills-content').waypoint(function () {
    $('.progress .progress-bar').each(function () {
      $(this).css("width", $(this).attr("aria-valuenow") + '%');
    });
  }, {
    offset: '80%'
  });

  // Porfolio isotope and filter
  $(window).on('load', function () {
    var portfolioIsotope = $('.portfolio-container').isotope({
      itemSelector: '.portfolio-item',
      layoutMode: 'fitRows'
    });

    $('#portfolio-flters li').on('click', function () {
      $("#portfolio-flters li").removeClass('filter-active');
      $(this).addClass('filter-active');

      portfolioIsotope.isotope({
        filter: $(this).data('filter')
      });
      aos_init();
    });

    // Initiate venobox (lightbox feature used in portofilo)
    $(document).ready(function () {
      $('.venobox').venobox();
    });
  });

  // $("#owl").owlCarousel({

  //   navigation: true, // Show next and prev buttons
  //   slideSpeed: 300,
  //   paginationSpeed: 400,
  //   singleItem: true,

  //   items: 1,
  //   itemsDesktop: false,
  //   itemsDesktopSmall: false,
  //   itemsTablet: false,
  //   itemsMobile: false

  // });






  // Init AOS
  function aos_init() {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out-back",
      once: true
    });
  }
  $(window).on('load', function () {
    aos_init();
  });

})(jQuery);



///-----------------------------------------
/// Progress Scroll
///-----------------------------------------


var ProgressScroll = function () {
  var s = void 0;

  return {
    settings: function settings() {
      return {
        // top: $('.progress-top'),
        right: $('.progress-right'),
        // bottom: $('.progress-bottom'),
        // left: $('.progress-left'),
        windowHeight: $(window).height(),
        windowWidth: $(window).width(),
        scrollHeight: $(document).height() - $(window).height(),
        progressTotal: $(window).height() * 2 + $(window).width() * 2,
        scrollPosition: $(document).scrollTop()
      };
    },
    init: function init() {
      s = this.settings();
      this.bindEvents();
    },
    bindEvents: function bindEvents() {
      $(window).on('scroll', this.onScroll);
      $(window).on('resize', this.onResize);

      this.progress();
    },
    onScroll: function onScroll() {
      s.scrollPosition = $(document).scrollTop();

      ProgressScroll.requestTick();
    },
    onResize: function onResize() {
      s.windowHeight = $(window).height();
      s.windowWidth = $(window).width();
      s.scrollHeight = $(document).height() - s.windowHeight;
      s.progressTotal = s.windowHeight * 2 + s.windowWidth * 2;

      ProgressScroll.requestTick();
    },
    requestTick: function requestTick() {
      requestAnimationFrame(this.progress);
    },
    progress: function progress() {
      var percentage = s.scrollPosition / s.scrollHeight;
      var width = s.windowWidth / s.progressTotal;
      var height = s.windowHeight / s.progressTotal;

      // s.top.css('width', percentage / width * 100 + '%');
      s.right.css('height', percentage / height * 100 + '%');
      // s.bottom.css('width', (percentage - width - height) / width * 100 + '%');
      // s.left.css('height', (percentage - width - height - width) / height * 100 + '%');
    }
  };
}();

// Init
$(function () {
  ProgressScroll.init();
});