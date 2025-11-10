// sorry for the spaghetti code and redundant variables, i wasn't exactly a good coder back then

const cols = 1;
const main = document.getElementById('main');
let parts = [];

let images = [
  "https://media.giphy.com/media/7EU6UPHCNznlVFrQeJ/giphy-downsized-large.gif",
  "static/IMG_6508_MOV_AdobeExpress.gif",
  "https://media.giphy.com/media/BpJWIIYcGd2Cc/giphy.gif",
  "https://media.giphy.com/media/9wUcv75M8ZhkFwVMBs/giphy.gif"
  
];
let current = 0;
let playing = false;

for (let i in images) {
  new Image().src = images[i];
}
function setH4Background() {
    let h4Links = document.querySelectorAll('h4 winnered');
    h4Links.forEach(link => {
      link.style.backgroundImage = `url(${images[current]})`;
    });
  }  
  setH4Background()
for (let col = 0; col < cols; col++) {
  let part = document.createElement('div');
  part.className = 'part';
  let el = document.createElement('div');
  el.className = "section";
  let img = document.createElement('img');
  img.src = images[current];
  el.appendChild(img);
  part.style.setProperty('--x', -100/cols*col+'vw');
  part.appendChild(el);
  main.appendChild(part);
  parts.push(part);
}

let animOptions = {
  duration: 1.2,
  ease: "power2.inOut"
};

function go(dir) {
  if (!playing) {
    playing = true;
    if (current + dir < 0) current = images.length - 1;
    else if (current + dir >= images.length) current = 0;
    else current += dir;
    setH4Background();
    function crossfade(part, next) {
      // Set new image to be invisible initially and position it behind
      gsap.set(next, {opacity: 0, zIndex: 0});
      gsap.set(part.children[0], {zIndex: 1});
      
      // Insert new image before the current one (behind it)
      part.insertBefore(next, part.children[0]);
      
      // Create timeline for synchronized crossfade
      let tl = gsap.timeline();
      
      // Fade out old image and fade in new image simultaneously
      tl.to(part.children[1], {
        opacity: 0,
        duration: animOptions.duration,
        ease: animOptions.ease
      }, 0)
      .to(next, {
        opacity: 1,
        duration: animOptions.duration,
        ease: animOptions.ease
      }, 0)
      .call(function() {
        part.children[1].remove();
        playing = false;
      });
    }

    for (let p in parts) {
        let part = parts[p];
        let next = document.createElement('div');
        next.className = 'section';
        let img = document.createElement('img');
        img.src = images[current];
        next.appendChild(img);
      
        let h6Spans = document.querySelectorAll('h6 span');
        h6Spans.forEach(span => {
          span.style.backgroundImage = `url(${images[current]})`;
        });

        crossfade(part, next);
      }
      
  }
}

window.addEventListener('keydown', function(e) {
  if (['ArrowDown', 'ArrowRight'].includes(e.key)) {
    go(1);
  }

  else if (['ArrowUp', 'ArrowLeft'].includes(e.key)) {
    go(-1);
  }
});

function lerp(start, end, amount) {
  return (1-amount)*start+amount*end
}

const cursor = document.createElement('div');
cursor.className = 'cursor';

const cursorF = document.createElement('div');
cursorF.className = 'cursor-f';
let cursorX = 0;
let cursorY = 0;
let pageX = 0;
let pageY = 0;
let size = 8;
let sizeF = 36;
let followSpeed = .16;

document.body.appendChild(cursor);
document.body.appendChild(cursorF);

if ('ontouchstart' in window) {
  cursor.style.display = 'none';
  cursorF.style.display = 'none';
}

cursor.style.setProperty('--size', size+'px');
cursorF.style.setProperty('--size', sizeF+'px');

window.addEventListener('mousemove', function(e) {
  pageX = e.clientX;
  pageY = e.clientY;
  cursor.style.left = e.clientX-size/2+'px';
  cursor.style.top = e.clientY-size/2+'px';
});

function loop() {
  cursorX = lerp(cursorX, pageX, followSpeed);
  cursorY = lerp(cursorY, pageY, followSpeed);
  cursorF.style.top = cursorY - sizeF/2 + 'px';
  cursorF.style.left = cursorX - sizeF/2 + 'px';
  requestAnimationFrame(loop);
}

loop();

let startY;
let endY;
let clicked = false;

function mousedown(e) {
  gsap.to(cursor, {scale: 4.5});
  gsap.to(cursorF, {scale: .4});

  clicked = true;
  startY = e.clientY || e.touches[0].clientY || e.targetTouches[0].clientY;
}
function mouseup(e) {
  gsap.to(cursor, {scale: 1});
  gsap.to(cursorF, {scale: 1});

  endY = e.clientY || endY;
  if (clicked && startY && Math.abs(startY - endY) >= 40) {
    go(!Math.min(0, startY - endY)?1:-1);
    clicked = false;
    startY = null;
    endY = null;
  }
}
window.addEventListener('mousedown', mousedown, false);
window.addEventListener('touchstart', mousedown, false);
window.addEventListener('touchmove', function(e) {
  if (clicked) {
    endY = e.touches[0].clientY || e.targetTouches[0].clientY;
  }
}, false);
window.addEventListener('touchend', mouseup, false);
window.addEventListener('mouseup', mouseup, false);

let scrollTimeout;
function wheel(e) {
  clearTimeout(scrollTimeout);
  setTimeout(function() {
    if (e.deltaY < -40) {
      go(-1);
    }
    else if (e.deltaY >= 40) {
      go(1);
    }
  })
}
window.addEventListener('mousewheel', wheel, false);
window.addEventListener('wheel', wheel, false);

setInterval(function(){
    go(1);
  }, 25000);
  