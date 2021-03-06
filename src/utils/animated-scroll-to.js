const easeInOutCubic = require('./ease-in-out-cubic');

function animatedScrollTo(scrollTo, duration, element, windowScroll, callback) {
  const scrollFrom = windowScroll ? window.scrollY : element.scrollTop;
  const scrollDiff = scrollTo - scrollFrom;
  let currentTime = 0;
  const increment = 20;

  (function animateScroll() {
    currentTime += increment;
    const newScrollPos = easeInOutCubic(currentTime, scrollFrom, scrollDiff, duration);

    try {
      windowScroll ? window.scrollTo(0, newScrollPos) : element.scrollTo(0, newScrollPos);
    } catch (e) {
      windowScroll ? window.scrollTo(0, newScrollPos) : (element.scrollTop = newScrollPos);
    }

    if (currentTime > duration) {
      return callback();
    }

    setTimeout(animateScroll, increment);
  })();
}

module.exports = animatedScrollTo;
