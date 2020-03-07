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
  el: '#js-nav-line',
  data: {
    isActive: {
      'header__line_about': false,
      'header__line_portfolio': false,
      'header__line_service': false,
      'header__line_contacts': false
    },
    lineConst: ''
  },
  methods: {
    click: function(el) {
      this.lineConst = el;
      this.clear();
      this.isActive[this.lineConst] = true;
    },
    hover: function(el) {
      this.clear();
      this.isActive[el] = true;
    },
    leave: function(){
      this.clear();
      this.isActive[this.lineConst] = true;
    },
    clear: function() {
      for (var key in this.isActive) {
        this.isActive[key] = false;
      };
    }
  }
});


// **********************
//

// получили элемент
var el;

var currentElem = null;
var parent = document.querySelector('#mail');
parent.onmouseover = function(event) {
  if (currentElem) return;
  let target = event.target.closest('a.g-a-mail');
  if (!target) return;
  currentElem = target;
  splitter(currentElem.id);
};

parent.onmouseout = function(event) {
  if (!currentElem) return;
  let relatedTarget = event.relatedTarget;
  while (relatedTarget) {

    if (relatedTarget == currentElem) return;

    relatedTarget = relatedTarget.parentNode;

  }
      merger(currentElem.id);
  currentElem = null;
};

function splitter(id) {

  id = '#' + id;
  el = document.querySelector(id).innerText.split("")
  document.querySelector(id).innerText = '';

  let span = new DocumentFragment();

  for (let i = 0; i < el.length; i++) {
    let tmp = document.createElement('span');
    tmp.innerText = el[i];
    tmp.className = 'g-a-mail char-class';
    span.append(tmp);
  };

  document.querySelector(id).append(span);
  animation(id);
};


function merger(id) {
  id = '#' + id;
  let span = document.querySelectorAll('.char-class');
  for (let i = 0; i < span.length; i++) {
    span[i].remove();
  }

  document.querySelector(id).innerText = el.join('')

  return;
}

function animation(id) {
  let dom = {el: document.querySelector(id)};
  dom.letters = [dom.el.querySelectorAll('span')];


            TweenMax.killTweensOf(dom.letters);
            TweenMax.set(dom.letters, {opacity: 0});
            TweenMax.staggerTo(dom.letters, 0.8, {
                ease: Elastic.easeOut.config(1,0.6),
                startAt: {y: '-70%'},
                y: '0%',
                opacity: 1
            }, 0.025);
}
















