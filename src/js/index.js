"use strict";

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


var navLine = new Vue ({
  el: '#js-nav',
  data: {
    message: 'hello'
  }
})





















