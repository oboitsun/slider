var isBreakPoint = function (bp) {
  var bps = [0, 600, 1600],
    w = $(window).width(),
    min,
    max
  for (var i = 0, l = bps.length; i < l; i++) {
    if (bps[i] === bp) {
      min = bps[i - 1] || 0
      max = bps[i]
      break
    }
  }
  return w > min && w <= max
}
let carousel = $('#carousel'),
  threshold = 150,
  slideWidth = 425,
  dragStart,
  dragEnd
const slides = carousel.children()
const duplicates = slides.length <= 4 ? slides.length * 2 : slides.slides.length

if (isBreakPoint(600)) {
  console.log('600px')
  slideWidth = $(window).width()
} //

for (let i = slides.length, b = 0; i < duplicates; i++, b++) {
  const child = $(slides[b])
  carousel.append(`<div class='slide'>${child.html()}</div>`)
}

if (isBreakPoint(1600)) {
  slideWidth = 425
  console.log('1600px')
}
if (carousel.children().length % 2 === 0) {
  carousel.css({ left: `-${slideWidth / 2}` })
}
$('#next').click(function () {
  shiftSlide(-1)
})
$('#prev').click(function () {
  shiftSlide(1)
})

carousel.on('mousedown', function () {
  if (carousel.hasClass('transition')) return
  dragStart = event.pageX
  $(this).on('mousemove', function () {
    dragEnd = event.pageX
    $(this).css('transform', 'translateX(' + dragPos() + 'px)')
  })
  $(document).on('mouseup', function () {
    if (dragPos() > threshold) {
      return shiftSlide(1)
    }
    if (dragPos() < -threshold) {
      return shiftSlide(-1)
    }
    shiftSlide(0)
  })
})
carousel.on('swipe', function () {
  if (carousel.hasClass('transition')) return
  dragStart = event.pageX
  $(this).on('mousemove', function () {
    dragEnd = event.pageX
    $(this).css('transform', 'translateX(' + dragPos() + 'px)')
  })
  $(document).on('mouseup', function () {
    if (dragPos() > threshold) {
      return shiftSlide(1)
    }
    if (dragPos() < -threshold) {
      return shiftSlide(-1)
    }
    shiftSlide(0)
  })
})
function dragPos() {
  return dragEnd - dragStart
}

function shiftSlide(direction) {
  if (carousel.hasClass('transition')) return
  dragEnd = dragStart
  $(document).off('mouseup')
  carousel
    .off('mousemove')
    .addClass('transition')
    .css('transform', 'translateX(' + direction * slideWidth + 'px)')
  setTimeout(function () {
    if (direction === 1) {
      $('.slide:first').before($('.slide:last'))
    } else if (direction === -1) {
      $('.slide:last').after($('.slide:first'))
    }
    carousel.removeClass('transition')
    carousel.css('transform', 'translateX(0px)')
  }, 700)
}
