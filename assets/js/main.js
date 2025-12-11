document.addEventListener("DOMContentLoaded", function () {
  var path = window.location.pathname;

  var map = [
    { selector: '[data-nav="home"]', test: /\/amanekanata\/?$/ },
    { selector: '[data-nav="history"]', test: /\/amanekanata\/history\/?/ },
    { selector: '[data-nav="music"]', test: /\/amanekanata\/music\/?/ },
    { selector: '[data-nav="message"]', test: /\/amanekanata\/message\/?/ },
    { selector: '[data-nav="game"]', test: /\/amanekanata\/game\/?/ },
    { selector: '[data-nav="legal"]', test: /\/amanekanata\/legal\/?/ }
  ];

  map.forEach(function (item) {
    var link = document.querySelector(item.selector);
    if (!link) return;
    if (item.test.test(path)) {
      link.classList.add("is-active");
      link.setAttribute("aria-current", "page");
    }
  });
});
