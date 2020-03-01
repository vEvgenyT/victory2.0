"use strict";

// window.addEventListener('scroll', function() {
//   var a = document.getElementById('js-scroll').pageYOffset;
//   console.log(a);

// });
//
var elem = document.getElementById('js-scroll');

window.addEventListener('scroll', function() {
if (elem.getBoundingClientRect().top < window.innerHeight && elem.getBoundingClientRect().bottom > 1) {
  document.body.style.backgroundColor = "#100F0F";

  let h1 = document.querySelectorAll('.g-h1'),
      h2 = document.querySelectorAll('.g-h2'),
      h3 = document.querySelectorAll('.g-h3'),
      h4 = document.querySelectorAll('.g-h4'),
      h5 = document.querySelectorAll('.g-h5'),
      h6 = document.querySelectorAll('.g-h6'),
      p = document.querySelectorAll('.g-p'),
      a = document.querySelectorAll('.g-a');

  for (let i = 0; i < h2.length; i++) {
    h2[i].style.color = "#DCDBDA"
  }

}
  else {
  document.body.style.backgroundColor = "#ffffff";
  }
});

Vue.directive('scroll', {
  inserted: function (el, binding) {
    let f = function (evt) {
      if (binding.value(evt, el)) {
        window.removeEventListener('scroll', f)
      }
    }
    window.addEventListener('scroll', f)
  }
})


var app = new Vue({
  el: '#js-scroll',
  data: {
  },
  // computed: {
  //   position: function() {
  //       if (document.getElementById('js-scroll').getBoundingClientRect().top < window.innerHeight && document.getElementById('js-scroll').getBoundingClientRect().bottom > 1) {
  //         return 'g-p_grey70';
  //       } else return 'null';

  //   }
  // }
  methods: {
    handleScroll: function (evt, el) {
      if (window.scrollY > 50) {
        el.classList.add('g-p_grey70');
      }
    }

}
})


