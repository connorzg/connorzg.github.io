$(document).ready(function() {
  var shine = new Shine(document.getElementById('title'));
  window.addEventListener('mousemove', function(event) {
    shine.light.position.x = event.clientX;
    shine.light.position.y = event.clientY;
    shine.config.opacity = 0.25;
    shine.draw();
  }, false);

  var didScroll;
  var lastScrollTop = 0;
  var delta = 5;
  var navbarHeight = $('nav').outerHeight();

  $(window).scroll(function(event) {
    didScroll = true;
  });

  setInterval(function() {
    if (didScroll) {
      hasScrolled();
      didScroll = false;
    }
  }, 1000);

  function hasScrolled() {
    var st = $(this).scrollTop();

    // Make sure they scroll more than delta
    if (Math.abs(lastScrollTop - st) <= delta)
      return;

    // If they scrolled down and are past the navbar, add class .nav-up.
    // This is necessary so you never see what is "behind" the navbar.
    if (st > lastScrollTop && st > navbarHeight) {
      // Scroll Down
      $('nav').removeClass('nav-down').addClass('nav-up');
    } else {
      // Scroll Up
      if (st + $(window).height() < $(document).height()) {
        $('nav').removeClass('nav-up').addClass('nav-down');
      }
    }

    lastScrollTop = st;
  }

  // Scroll to My Work
  $("#work").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(".bg-4").offset().top
    }, 600);
  });

  // Scroll to top
  $(".navbar-brand").click(function(e) {
    e.preventDefault();
    $('html, body').animate({
      scrollTop: $(".bg-1").offset().top
    }, 600);
  });

});
