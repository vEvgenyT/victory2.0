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
