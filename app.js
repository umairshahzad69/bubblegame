function loco(){
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll
    
    const locoScroll = new LocomotiveScroll({
      el: document.querySelector("#main"),
      smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);
    
    // tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy("#main", {
      scrollTop(value) {
        return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
      }, // we don't have to define a scrollLeft because we're only scrolling vertically.
      getBoundingClientRect() {
        return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
      },
      // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
      pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
    });
    
    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());
    
    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();
    
}
loco()

let hitrnd=0;
let score = 0;
function makeBubble(){
  var clutter='';
for(let i = 1; i<=319; i++){
  let rnd = Math.floor(Math.random()*10);
  clutter+=`<div class="bubble">${rnd}</div>`
}
document.querySelector(".pbtm").innerHTML=clutter;
}

function timer(){
  var timer = 60;
  var timeint = setInterval(() => {
    if (timer>0) {
      timer--;
      document.querySelector("#timer").textContent=timer;
      // console.log(timer)
    }
    else{
      clearInterval(timeint);
      document.querySelector(".pbtm").innerHTML="<h1>Game Over</h1>";
    }
  }, 1000);
}

function newHit(){
  hitrnd = Math.floor(Math.random()*10);
  document.querySelector("#hit").textContent=hitrnd;
}
function increaseScore(){
  score += 10;
  document.querySelector("#score").textContent = score;
}
document.querySelector(".pbtm").addEventListener("click", function(dets){
  var hitted = Number(dets.target.textContent);
  if (hitrnd===hitted) {
    increaseScore();
    newHit();
    makeBubble();
  }
})
newHit()
timer()
makeBubble()