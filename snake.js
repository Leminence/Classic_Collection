var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
// configs canvas
var campo = 32;
var size = 7;
canvas.width = campo * size;
canvas.height = campo * size + size * (campo / 4);
var xpos = campo * size;
var ypos = campo * size;
var inicial = 12;
var fps = inicial;
// keys (mobile)
function up() {
   if (dy != velocity) {
      sy = -velocity;
      sx = 0;
   }
}
function down() {
   if (dy != -velocity) {
      sy = velocity;
      sx = 0;
   }
}
function left() {
   if (dx != velocity) {
      sx = -velocity;
      sy = 0;
   }
}
function right() {
   if (dx != -velocity) {
      sx = velocity;
      sy = 0;
   }
}
// Keys de movimento (desktop)
document.addEventListener("keydown", function(event) {
   if (event.key == "ArrowUp" || event.key == 87) {
      up();
   } else if (event.key == "ArrowDown" || event.key == 83 ) {
      down();
   } else if (event.key == "ArrowLeft" || event.key == 65) {
      left();
   } else if (event.key == "ArrowRight" || event.key == 68) {
      right();
   }
});
document.addEventListener('keypress', function(e) {
   if (e.key === 'Enter') {
      start();
   }
});
// mecânica de pause
var pause = true;
var gameover = false;
function start() {
   if (pause) {
      document.getElementById('title').style.display = "none";
      document.getElementById('GO').innerHTML = "GAME OVER";
      pause = false;
      gameover = false;
      game();
   } else if (gameover) {
      document.getElementById('title').style.display = "none";
      gameover = false;
      reiniciar();
   } else {
      pause = true;
   }
}
// esconder UI mobile
var esconder = false;
function hide() {
   if (esconder) {
      esconder = false;
      document.getElementById('inputs').style.display = "flex";
      document.getElementById('canvas').style.width = "44vh";
      document.getElementById('title').style.top = "30vh";
      document.getElementById('title').style.fontSize = "5vh";
      document.getElementById('score').style.width = "44vh";
      document.getElementById('score').style.fontSize = "3vh";
      document.getElementById('score').style.top = "54vh";
   } else {
      esconder = true;
      document.getElementById('inputs').style.display = "none";
      document.getElementById('canvas').style.width = "69vh";
      document.getElementById('title').style.top = "50vh";
      document.getElementById('title').style.fontSize = "10vh";
      document.getElementById('title').style.width = "66vh";
      document.getElementById('score').style.width = "69vh";
      document.getElementById('score').style.fontSize = "4vh";
      document.getElementById('score').style.top = "84.5vh";
   }
}
// variaveis ingame
var score = 0;
var perdeu = 0;
var tamanho = 3;
function pontos() {
   // Score, tamanho da cobra e respawn da fruta
   if (xfruit == xsnake && yfruit == ysnake) {
      score++;
      tamanho++;
      if (score % 6 == 0) {
         fps++;
      }
      xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
      yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
   }
   document.getElementById('score').innerHTML = "Score: " + score;
}
// spawn inicial
var xsnake = Math.floor(Math.random() * (campo - 2) + 1) * size;
var ysnake = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
var xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
var yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
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
   // cria a cobra
   c.drawImage(snake_sprite, xsnake, ysnake, size, size);
   // cria a fruta
   c.drawImage(fruit, xfruit, yfruit, size, size);
   // cria o corpo da cobra
   for (let i = 0; i < snakebody.length; i++) {
      c.drawImage(snake_sprite, snakebody[i].x, snakebody[i].y, size, size)
      // verifica se a fruta renasceu dentro da cobra e cria uma nova coordenada
      if (xfruit == snakebody[i].x && yfruit == snakebody[i].y) {
         xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
         yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      }
   }
   // cria as coordenadas dos segmentos e apaga o último segmento da cobra no array
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

function reiniciar() {
   tamanho = 3;
   score = 0;
   fps = inicial;
   snakebody = []
   partes = []
   lost = []
   xsnake = Math.floor(Math.random() * (campo - 2) + 1) * size;
   ysnake = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
   xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
   yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
   game();
}
// borda preta
c.fillStyle = "black";
c.fillRect(size - 1, size - 1, canvas.width - size * 2 + 2, canvas.height - size * 3 + 2)
// desenha no canvas o game
function game() {
   c.clearRect(size, size, canvas.width - size * 2, canvas.height - size * 3);
   // funções do jogo
   entidades();
   movimento();
   segmentos();
   pontos();
   // pausa a animação
   if (pause || gameover) {
      return;
   }
   // define o framerate da animação
   setTimeout(function() {
      requestAnimationFrame(game)
   }, 1000 / fps);
}
game();