(function(){
'use strict';
}).call(this)
"use strict";

var el;

var currentElem = null;
var parent = document.querySelector('#contacts');
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
      // merger(currentElem.id);
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
    tmp.className = 'g-a-mail char-class g_grey10';
    span.append(tmp);
  };

  document.querySelector(id).append(span);
  animation(id);
};


// function merger(id) {
//   id = '#' + id;
//   let span = document.querySelectorAll('.char-class');
//   for (let i = 0; i < span.length; i++) {
//     span[i].remove();
//   }

//   document.querySelector(id).innerText = el.join('')

//   return;
// }

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

var scroll = new Vue({
  el: '#js-scroll',
  methods: {
    position: function (evt, el) {

      if (el.getBoundingClientRect().top < window.innerHeight/2  && el.getBoundingClientRect().bottom > 0) {
        document.querySelectorAll('body, .g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6, .g-tag, .g-p_grey70, .service-items__type_style, .g-a, .a_style').forEach(function(i){i.classList.remove('fade-out')});

        document.querySelector('body').classList.add('g-body');
        document.querySelectorAll('body, .g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6, .g-tag, .g-p_grey70, .service-items__type_style, .g-a, .a_style').forEach(function(i){i.classList.add('fade-in')});
        document.querySelectorAll('.g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6').forEach(function(i){i.classList.add('g_grey10')});
        document.querySelectorAll('.g-tag').forEach(function(i){i.classList.add('g_grey40')});
        document.querySelectorAll('.g-p_grey70').forEach(function(i){i.classList.add('g_grey30')});
        document.querySelectorAll('.service-items__type_style').forEach(function(i){i.classList.add('g_hr40')});
        // document.querySelectorAll('.g-a').forEach(function(i){i.classList.add('g_grey20')});
        // document.querySelectorAll('.a_style').forEach(function(i){i.classList.add('a_style-grey20')});

      } else  {
          document.querySelectorAll('body, .g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6, .g-tag, .g-p_grey70, .service-items__type_style, .g-a, .a_style').forEach(function(i){i.classList.remove('fade-in')});
          document.querySelector('body').classList.remove('g-body');
          document.querySelectorAll('.g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6').forEach(function(i){i.classList.remove('g_grey10')});
          document.querySelectorAll('.g-tag').forEach(function(i){i.classList.remove('g_grey40')});
          document.querySelectorAll('.g-p_grey70').forEach(function(i){i.classList.remove('g_grey30')});
          document.querySelectorAll('.service-items__type_style').forEach(function(i){i.classList.remove('g_hr40')});
          // document.querySelectorAll('.g-a').forEach(function(i){i.classList.remove('g_grey20')});
          // document.querySelectorAll('.a_style').forEach(function(i){i.classList.remove('a_style-grey20')});


          document.querySelectorAll('body, .g-h1, .g-h2, .g-h3, .g-h4, .g-h5, .g-h6, .g-tag, .g-p_grey70, .service-items__type_style, .g-a, .a_style').forEach(function(i){i.classList.add('fade-out')});
      }
    }
  }
});



// ***************************************
// Курсор

const $$ = s =>
  Array.prototype.slice.call(
    document.querySelectorAll(s)
  )
const isEl = obj => obj instanceof HTMLElement
const isStr = obj => Object.prototype.toString.call(obj) === '[object String]'

const cursorDot = ({
  diameter = 80,
  borderWidth = 1,
  borderColor = '#fff',
  easing = 4,
  background = 'transparent'
} = {}) => {
  let inited = false
  const alt = { x: 0, y: 0, o: 1, d: diameter }
  const cur = { x: 0, y: 0, o: 0, d: diameter }
  const dot = document.createElement('div')
  const tim = easing / 15

  document.addEventListener('mousemove', e => {
    alt.x = e.clientX
    alt.y = e.clientY
    dot.style.opacity = 1
    if (!inited) {
      cur.x = alt.x
      cur.y = alt.y
      inited = true
    }
  })

  const draw = () => {
    dot.style.opacity = 1
    const dX = alt.x - cur.x
    const dY = alt.y - cur.y
    cur.x += (dX / easing)
    cur.y += (dY / easing)
    const t3d = `translate3d(${cur.x - cur.d / 2}px,${cur.y - cur.d / 2}px,0)`
    dot.style.webkitTransform = t3d
    dot.style.transform = t3d

    const dO = alt.o - cur.o
    cur.o += dO / easing
    dot.style.opacity = cur.o

    const dD = alt.d - cur.d
    cur.d += dD / easing
    dot.style.height = cur.d + 'px'
    dot.style.width = cur.d + 'px'

    try {
      requestAnimationFrame(draw)
    } catch(_) {
      setImmediate(draw)
    }
  }

  dot.over = (any, style) => {
    const fn = el => {
      el.addEventListener('mouseover', _ => {
        if (style.background) dot.style.backgroundColor = style.background
        if (style.borderColor) dot.style.borderColor = style.borderColor
        if (style.scale) alt.d = diameter * style.scale;
      document.body.append(dot);
      dot.id = 'cursor';
      dot.style = `position:fixed;top:0;left:0;border-radius:100%;pointer-events:none;opacity:0;height:${diameter}px;width:${diameter}px;background:${background};border:${borderWidth}px solid ${borderColor};mix-blend-mode:exclusion;transition:background ${tim}s,border ${tim}s`;
      draw();

      })
      el.addEventListener('mouseout', _ => {
        if (style.background) dot.style.backgroundColor = background
        if (style.borderColor) dot.style.borderColor = borderColor
        if (style.scale) alt.d = diameter;
        setTimeout(removeDot, 300);
      })
    }
    if (isEl(any)) fn(any)
    else if (isStr(any)) $$(any).forEach(fn)
  }
  return dot
}


const $ = s => document.querySelector(s)

const cursor = cursorDot({
  easing: 16,
  background: '#0652C5',
  diameter: 5,
  borderWidth: 1 ,
  borderColor: 'transparent'
})

cursor.over($('#js-a-about'), {
  scale: 12,
  background: '#0652C5',
  borderColor: 'transparent'
})

cursor.over($('#js-a-portfolio'), {
  scale: 12,
  background: '#2A2928',
  borderColor: 'transparent'
})

cursor.over($('#js-a-service'), {
  scale: 12,
  background: '#DCDBDA',
  borderColor: 'transparent'
})

cursor.over($('#js-a-contacts'), {
  scale: 12,
  background: '#DCDBDA',
  borderColor: 'transparent'
})

// cursor.over($('.contacts_big-link'), {
//   scale: 20,
//   background: '#2A2928',
//   borderColor: 'transparent'
// })



function removeDot() {

  if (document.querySelector('#cursor')) {
    document.querySelector('#cursor').remove();
  } else {
    return;
  }

  return;
}


// *************************** Скролл портфолио ***************************
//


// var textPath = document.querySelector('#text-path');

// var textContainer = document.querySelector('#text-container');

// var path = document.querySelector( textPath.getAttribute('href') );

// var pathLength = path.getTotalLength();

// function updateTextPathOffset(offset){
//   textPath.setAttribute('startOffset', offset);
// }

// updateTextPathOffset(pathLength);

// function onScroll(){
//   requestAnimationFrame(function(){
//     var rect = textContainer.getBoundingClientRect();
//     var scrollPercent = rect.y / window.innerHeight;
//     updateTextPathOffset( scrollPercent * 2 * pathLength );
//   });
// }

// window.addEventListener('scroll',onScroll);



// *************************** Волновой эффект ***************************
//


// function linkDistored() {

//   var tl = gsap.timeline({repeat:-1, yoyo:true, repeatDelay: 0});
//   tl.to('#turbwave', {
//     ease: 'none',
//     attr: {"baseFrequency":0.0112}
//   })
//   .to('#turbwave', {
//     ease: 'none',
//     attr: {"baseFrequency":0.0149}
//   })
// . to('#turbwave', {
//     ease: 'none',
//     duration: 3,
//     attr: {"baseFrequency":0.0},
//   });
// }

// function linkDistoredMain() {

//   var tl = gsap.timeline({repeat:-1, yoyo:true, repeatDelay: 0});
//   tl.to('#turbwave', {
//     ease: 'none',
//     duration: 2,
//     attr: {"baseFrequency":0.01400}
//   })
//   .to('#turbwave', {
//     ease: 'none',
//     duration: 1,
//     attr: {"baseFrequency":0.01000}
//   })
//   .to('#turbwave', {
//     ease: 'none',
//     duration: 0,
//     attr: {"baseFrequency":0.0600}
//   });
// }

// function rndnum() {
//   return Math.random() * (0.0119 - 0.001) + 0.001;
// }


/* *********************** Анимация появления текста при скролле *************************************** */

var title = document.querySelectorAll('#js-title_animation');
var paragraph = document.querySelectorAll('#js-paragraphg_animation');
var moveIn = document.querySelectorAll('.service-items__type');
var picture = document.querySelectorAll('.portfolio__item-img');



window.addEventListener('scroll', function() {

  title.forEach(function(i) {
    if (i.getBoundingClientRect().top < window.innerHeight && i.getBoundingClientRect().top > 0) {i.classList.add('g-title_animation')}
  })

  paragraph.forEach(function(i) {
    if (i.getBoundingClientRect().top < window.innerHeight && i.getBoundingClientRect().top > 0) {i.classList.add('g-paragraph_animation')}
  })

    // desc.forEach(function(i) {
    // if (i.getBoundingClientRect().top < window.innerHeight && i.getBoundingClientRect().top > 0) {i.classList.add('animation-desc')}
    // })

    // picture.forEach(function(i) {
    // if (i.getBoundingClientRect().top < window.innerHeight && i.getBoundingClientRect().top > 0) {
    //     i.classList.add('animation-picture');
    //     // i.style.transform = `scale(${1+(30/i.getBoundingClientRect().top)})`;

    //     console.log(i.getBoundingClientRect().top);
    //   }
    // })



})









