next = []
for (let i = 0; i < 2; i++) {
   next.push(Math.floor(Math.random() * fA.length));
}
let blocorand = next[0];
bloco = [];
proximo = [];
momentum = [];
let max = 0;

function formas() {
   m = 0;
   for (let i = 0; i < fA[blocorand][altblock][0].length; i++) {
      for (let k = 0; k < fA[blocorand][altblock][0].length; k++) {
         if (fA[blocorand][altblock][i][k] === 1) {
            bloco.push({ x: (k + 5) * size + wpos, y: (i + 1) * size + hpos });
            m++;
         }
      }
      max = m;
      for (let i = 0; i < fA[next[1]][1][0].length; i++) {
         for (let k = 0; k < fA[next[1]][1][0].length; k++) {
            if (fA[next[1]][1][i][k] === 1) {
               proximo.push({ x: (k + 15) * size + wpos - 3, y: (i + 3) * size + hpos })
            }
         }
      }
   }
}

var block_sprite = new Image();
block_sprite.src = 'sprites/block.png';

function blocos() {
   formas();
   for (let i = 0; i < fA[blocorand][altblock][0].length; i++) {
      if (bloco.length > max) {
         bloco.splice(max)
         proximo.splice(max)
      }
   }
   for (let i = 0; i < bloco.length; i++) {
      c.drawImage(block_sprite, bloco[i].x, bloco[i].y, size, size);
      c.drawImage(block_sprite, proximo[i].x, proximo[i].y, size, size);
   }
   for (let i = 0; i < momentum.length; i++) {
      c.drawImage(block_sprite, momentum[i].x, momentum[i].y - 2, size, size);
   }
}

let bx = 0;
let by = 1;
let hpos = 0;
let wpos = 0;
let prevL = false;
let prevR = false;
let col = false;

function queda() {
   for (let i = 0; i < bloco.length; i++) {
      bloco[i].x += bx;
      bloco[i].y += by;
   }
   hpos += by;
   wpos += bx;
   bx = 0;
}

function add() {
   for (let i = 0; i < bloco.length; i++) {
      momentum.push(bloco[i]);
   }
   bloco = []
   proximo = []
   hpos = 0;
   wpos = 0;
   altblock = 0;
   if (points > 50) {
      points -= 10;
   }
   next.shift()
   next.push(Math.floor(Math.random() * fA.length));
   blocorand = next[0];
   obliterate();
   formas();
}
let destroy = 0;
let lines = 0;

function obliterate() {
   for (let i = 0; i < 24; i++) {
      for (let k = 0; k < momentum.length; k++) {
         if (momentum[k].y == (i * size + 2)) {
            destroy++;
         }
         if (momentum[k].y == size * 1 + 2) {
            document.getElementById('title').style.display = "block";
            document.getElementById('middle2').style.display = "none";
            gameover = true;
         }
      }
      if (destroy >= 12) {
         score += points;
         lines++;
         points = 100;
         document.getElementById('score2').innerHTML = "Score:<br>" + score;
         document.getElementById('lines').innerHTML = "Lines:<br>" + lines;
         for (let k = 0; k < momentum.length; k++) {
            if (momentum[k].y == (i * size + 2)) {
               momentum.splice(k, 1);
               k--;
            }
         }
         for (let k = 0; k < momentum.length; k++) {
            if (momentum[k].y <= (i * size + 2)) {
               momentum[k].y += size
            }
         }
      }
      destroy = 0;
   }
}

function colisao() {
   prevR = false;
   prevL = false;
   col = false;
   for (let i = 0; i < bloco.length; i++) {
      if (bloco[i].y == canvas.height - size * 2 + 2) {
         add();
      }
      if (bloco[i].x > canvas.width - size * 8) {
         for (let i = 0; i < bloco.length; i++) {
            bloco[i].x -= size
         }
      }
      if (bloco[i].x < size) {
         for (let i = 0; i < bloco.length; i++) {
            bloco[i].x += size
         }
      }
   }
   for (let i = 0; i < momentum.length; i++) {
      for (let k = 0; k < bloco.length; k++) {
         if (bloco[k].x == momentum[i].x && bloco[k].y + size == momentum[i].y) {
            add();
         }
         if (bloco[k].x + size === momentum[i].x) {
            if (bloco[k].y >= momentum[i].y - size && bloco[k].y <= momentum[i].y) {
               prevR = true;
               col = true;
            }
         }
         if (bloco[k].x - size === momentum[i].x) {
            if (bloco[k].y >= momentum[i].y - size && bloco[k].y <= momentum[i].y) {
               prevL = true;
               col = true;
            }
         }
      }
   }
}

function tetris() {
   borda();
   blocos();
   queda();
   colisao();
   if (pause) {
      borda();
      document.getElementById('GO').innerHTML = "PAUSED";
      return;
   }
   else if (gameover) {
      borda();
      document.getElementById('GO').innerHTML = "GAME OVER";
      return;
   }
   setTimeout(function() {
      requestAnimationFrame(tetris)
   }, 1000 / fps);
}