"use strict";

// window.addEventListener('scroll', function() {
//   var a = document.getElementById('js-scroll').pageYOffset;
//   console.log(a);

// });
//
// var elem = document.getElementById('js-scroll');

// window.addEventListener('scroll', function() {
// if (elem.getBoundingClientRect().top < window.innerHeight && elem.getBoundingClientRect().bottom > 1) {
//   document.body.style.backgroundColor = "#100F0F";

//   let h1 = document.querySelectorAll('.g-h1'),
//       h2 = document.querySelectorAll('.g-h2'),
//       h3 = document.querySelectorAll('.g-h3'),
//       h4 = document.querySelectorAll('.g-h4'),
//       h5 = document.querySelectorAll('.g-h5'),
//       h6 = document.querySelectorAll('.g-h6'),
//       p = document.querySelectorAll('.g-p'),
//       a = document.querySelectorAll('.g-a');

//   for (let i = 0; i < h2.length; i++) {
//     h2[i].style.color = "#DCDBDA"
//   }

// }
//   else {
//   document.body.style.backgroundColor = "#ffffff";
//   }
// });

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
// window.addEventListener('scroll', function(){
// let pos = document.querySelector('#js-scroll');
// console.log(pos.getBoundingClientRect().top);
// })

new Vue({
  el: '#js-scroll',
  methods: {
    position: function (evt, el) {
      if (el.getBoundingClientRect().top < window.innerHeight / 2 && el.getBoundingClientRect().bottom > 1) {
        document.body.style.backgroundColor = '#100F0F';
        document.querySelectorAll('.g-h1').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-h2').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-h3').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-h4').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-h5').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-h6').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-tag').forEach(function(i){i.classList.add('g_grey40')});
        document.querySelectorAll('.g-p_grey70').forEach(function(i){i.classList.add('g_grey30')});
        document.querySelectorAll('.service-items__type_style').forEach(function(i){i.classList.add('g_hr40')});
        document.querySelectorAll('.g-a').forEach(function(i){i.classList.add('g_grey20')});
        document.querySelectorAll('.a_style').forEach(function(i){i.classList.add('a_style-grey20')});
      } else {
          document.body.style.backgroundColor = 'white';
          document.querySelectorAll('.g-h1').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-h2').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-h3').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-h4').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-h5').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-h6').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-tag').forEach(function(i){i.classList.remove('g_grey40')});
          document.querySelectorAll('.g-p_grey70').forEach(function(i){i.classList.remove('g_grey30')});
          document.querySelectorAll('.service-items__type_style').forEach(function(i){i.classList.remove('g_hr40')});
          document.querySelectorAll('.g-a').forEach(function(i){i.classList.remove('g_grey20')});
          document.querySelectorAll('.a_style').forEach(function(i){i.classList.remove('a_style-grey20')});
      }
    }
  }
})


