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
      if (el.getBoundingClientRect().top < window.innerHeight  && el.getBoundingClientRect().bottom > 1) {
        // document.body.style.backgroundColor = '#100F0F';
        let color = {
          a: window.innerHeight,
          b: el.getBoundingClientRect().top,
          c: window.innerHeight / 2,
          d: 94 / (window.innerHeight / 2),
          e: (el.getBoundingClientRect().top / (el.getBoundingClientRect().top / 100)) - 94 / (window.innerHeight / 2),
          f: 100 - ((window.innerHeight - el.getBoundingClientRect().top) / 2)
        };
        console.log(
          Math.round(color.f)
          // 100 - (el.getBoundingClientRect().top  * color)
          // el.getBoundingClientRect().top

          );
        const [h,s,l] = [31, 3, color.f].map(Math.round)
        document.body.style.backgroundColor = `rgb(${h}, ${s}, ${l})`;

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
  background: '#fff',
  diameter: 5,
  borderWidth: 0 ,
  borderColor: 'transparent'
})

cursor.over($('#js-a-about'), {
  scale: 12,
  background: '#2A2928',
  borderColor: 'transparent'
})

cursor.over($('#js-a-portfolio'), {
  scale: 12,
  background: '#2A2928',
  borderColor: 'transparent'
})

cursor.over($('#js-a-service'), {
  scale: 12,
  background: '#2A2928',
  borderColor: 'transparent'
})

cursor.over($('#js-a-contacts'), {
  scale: 12,
  background: '#2A2928',
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














