/*
DISCLAIMER-----------------------------------------
if you can read this just know that I'm NOT a webdev. this is a hobby for killing time. I'm sure there are a million better ways to do it (feedback appreciated), but I stumbled upon a way that works.

ideas
------------
-fix zooming process
-as you zoom, increase/decrease the max iterations for level of detail
-gfx preset
  |-inversion toggle for reverse()
  |-add space to beginning of block to improve distinction between infinity and a value within the set
*/

const graphP = document.querySelector("#graph");
const coordP = document.querySelector("#coord");
const fontSize = 0.6;
graphP.style.fontSize = `${fontSize}em`;

// let block = ["&blk14;", "&blk34;", "&block;"]
let block = " $@B%8&WM#*oahkbdpqwmZO0QLCJUYXzcvunxrjft/\\|()1{}[]?-_+~<>i!lI;:,\"^\' ";
// let block = " ,-=+caxX$&%#@";
block = block.split('');
// block.reverse();


const width = 125;
const height = 125;
let maxIterations = 0;
let zoomScale = 0.5;
let value = 1; //zoom
let inf = 1000;
const o = {  //x,y offset tuning
  x: -0.5,
  y: 0,
}



function map(v, a1, a2, b1, b2){
  return b1 + ((v - a1) * (b2 - b1) / (a2 - a1));
}

function loadBrot(){
  let minValue = -value;
  let maxValue = value;
  let temp = "";

  for(let i = 0; i < height; i++){
    for(let j = 0; j < width; j++){
      let cc = block[0];

      let a = map(
        j,
        0, width,
        minValue + o.x, maxValue + o.x
      );

      let b = map(
        i,
        0, height,
        minValue + o.y, maxValue + o.y
      );

      let ca = a;
      let cb = b;

      let n = 0;

      while(n < maxIterations){

        let darkness = Math.floor(
          map(
            n,
            0, maxIterations,
            0, block.length)
          );

        let aa = a * a - b * b;
        let bb = 2 * a * b;
        a = aa + ca;
        b = bb + cb;
        if(a * a + b * b > inf){
          break; //if we approach infinity then break
        }

        n++;
        cc = block[darkness];
      }
      temp += cc;
    }
    temp += '\n';
  }

  graphP.innerText = temp;
  coordP.innerHTML = `x: ${o.x.toPrecision(10)},<br>y: ${o.y.toPrecision(10)}<br>at ${value} zoom`;
}

maxIterations = 2000;
loadBrot();

window.addEventListener("keydown", (e) => {
  let changerate = value * zoomScale * 0.1;
  switch (e.key) {
    case "ArrowUp":
      o.y -= changerate;
      break;
    case "ArrowDown":
      o.y += changerate;
      break;
    case "ArrowLeft":
      o.x -= changerate;
      break;
    case "ArrowRight":
      o.x += changerate;
      break;
    case "z":
      value *= zoomScale;
      break;
    case "x":
      value /= zoomScale;
      break;
  }
  loadBrot();
}, false);
