let score = 0;
let points = 100;
let perdeu = 0;
let tamanho = 3;

function pontos() {
   // Score, tamanho da cobra e respawn da fruta
   if (sel == 1) {
      if (xfruit == xsnake && yfruit == ysnake) {
         score++;
         tamanho++;
         if (score % 8 == 0) {
            fps++;
         }
         document.getElementById('score').innerHTML = "Score: " + score;
         document.getElementById('speed').innerHTML = "Speed: " + fps;
         xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
         yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      }
   }
}
// corpo da cobra
snakebody = []
partes = []
lost = []
var snake_sprite = new Image();
snake_sprite.src = 'sprites/snake.png';
var snake_lost = new Image();
snake_lost.src = 'sprites/snake_lost.png';
var fruit = new Image();
fruit.src = 'sprites/fruit.png';

function entidades() {
   c.drawImage(snake_sprite, xsnake, ysnake, size, size);
   c.drawImage(fruit, xfruit, yfruit, size, size);
   for (let i = 0; i < snakebody.length; i++) {
      c.drawImage(snake_sprite, snakebody[i].x, snakebody[i].y, size, size)
      if (xfruit == snakebody[i].x && yfruit == snakebody[i].y) {
         xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
         yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      }
   }
   snakebody.push({ x: xsnake, y: ysnake });
   if (snakebody.length > tamanho) {
      snakebody.splice(0, 1);
   }
}

var velocity = size;
var dx = 0;
var dy = 0;
var sx = 0;
var sy = 0;
if (Math.random() < 0.5) {
   var sx = velocity;
} else {
   var sy = velocity;
}

function movimento() {
   // movimento
   dx = sx;
   dy = sy;
   xsnake += dx;
   ysnake += dy;

   // colisão com as bordas
   if (xsnake >= canvas.width - size * 2 + 1) {
      xsnake = size;
   }
   if (xsnake < size) {
      xsnake = canvas.width - size * 2;
   }
   if (ysnake >= canvas.height - size * 3 + 1) {
      ysnake = size;
   }
   if (ysnake < size) {
      ysnake = canvas.height - size * 3;
   }
}

function segmentos() {
   // verifica se houve colisão com os segmentos diminui o tamanho do corpo
   for (let i = 0; i < snakebody.length; i++) {
      if (xsnake == snakebody[i].x && ysnake == snakebody[i].y) {
         tamanho -= i + 1;
         lost = snakebody.splice(0, i);
         perdeu += lost.length;
      }
   }
   // adiciona os segmentos perdidos para se tornarem obstáculos
   for (let i = 0; i < lost.length; i++) {
      partes.push(lost[i]);
      if (partes.length > perdeu) {
         partes.pop();
      }
   }
   // desenha os segmentos perdidos
   for (let i = 0; i < partes.length; i++) {
      c.drawImage(snake_lost, partes[i].x, partes[i].y, size, size);
      // verifica se fruta renasceu dentro dos segmentos perdidos e cria uma nova coordenada
      if (xfruit == partes[i].x && yfruit == partes[i].y) {
         xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
         yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      }
      // verifica colisão da cabeça com os segmentos perdidos e resulta em gameover
      if (xsnake == partes[i].x && ysnake == partes[i].y) {
         gameover = true;
         document.getElementById('title').style.display = "block";
      }
   }
}
function snake() {
   borda();
   entidades();
   movimento();
   segmentos();
   pontos();
   if (pause) {
      borda();
      document.getElementById('GO').innerHTML = "the game is paused";
      return;
   }
   else if (gameover) {
      borda();
      document.getElementById('GO').innerHTML = "game over";
      return;
   }
   setTimeout(function() {
      requestAnimationFrame(snake)
   }, 1000 / fps);
}

