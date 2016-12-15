$(document).ready(function() {
  $('.board').on('mousedown', 'td', playerClicked);

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
  });

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

// TIC TAC TOE
player = 0;

function playerClicked(e) {
  e.preventDefault();
  $('.winner').slideUp();
  if ($(this).hasClass('x')) {} else if ($(this).hasClass('o')) {} else if (player === 0) {
    $(this).addClass('x');
    isWinner();
    player = 1;
  } else if (player === 1) {
    $(this).addClass('o');
    isWinner();
    player = 0;
  }
}
function oWin() {
  setTimeout(resetBoard, 1000);
  $('.winner').text('Player 2 Wins!').slideDown();
}
function xWin() {
  setTimeout(resetBoard, 1000);
  $('.winner').text('Player 1 Wins!').slideDown();
}
function resetBoard() {
  $('.board').find('td').removeClass('x o');
}
function isWinner() {
  if ($('#row1 .x').length === 3 || $('#row2 .x').length === 3 || $('#row3 .x').length === 3) {
    xWin();
  } else if ($('#row1 .o').length === 3 || $('#row2 .o').length === 3 || $('#row3 .o').length === 3) {
    oWin();
  } else if ($('.col1.x').length === 3 || $('.col2.x').length === 3 || $('.col3.x').length === 3) {
    xWin();
  } else if ($('.col1.o').length === 3 || $('.col2.o').length === 3 || $('.col3.o').length === 3) {
    oWin();
  } else if ($('.d1.o').length === 3 || $('.d2.o').length === 3) {
    oWin();
  } else if ($('.d1.x').length === 3 || $('.d2.x').length === 3) {
    xWin();
  } else if ($(".board td.o, .board td.x").length == $(".board td").length) {
    $('.winner').text('Cat Game').slideDown();
    setTimeout(resetBoard, 1000);
  }
}
