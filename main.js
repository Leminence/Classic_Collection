var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');
// configs canvas
let campo = 20;
let size = 7;
canvas.width = campo * size;
canvas.height = campo * size + size * (campo / 4);
let inicial = 12;
let fps = inicial;
// mecânica de pause
var pause = true;
var gameover = false;
// spawn inicial
let xsnake = Math.floor(Math.random() * (campo - 2) + 1) * size;
let ysnake = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
let xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
let yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
// seleção de jogo
let sel = 2;
let selecionado = false;
// reiniciar os jogos
function reiniciar() {
   if (sel == 1) {
      score = 0;
      tamanho = 3;
      snakebody = []
      partes = []
      perdeu = 0;
      xsnake = Math.floor(Math.random() * (campo - 2) + 1) * size;
      ysnake = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      xfruit = Math.floor(Math.random() * (campo - 2) + 1) * size;
      yfruit = Math.floor(Math.random() * (campo + (campo / 4) - 3) + 1) * size;
      document.getElementById('middle').style.display = "block";
      document.getElementById('score').innerHTML = "Score: " + score;
      document.getElementById('speed').innerHTML = "Lines: " + lines;
   } else if (sel == 2) {
      bloco = []
      momentum = []
      proximo = []
      hpos = 0;
      wpos = 0;
      altblock = 0;
      next.shift()
      next.push(Math.floor(Math.random() * fA.length));
      blocorand = next[0];
      score = 0;
      lines = 0;
      document.getElementById('middle2').style.display = "block";
      document.getElementById('score2').innerHTML = "Score:<br>" + score;
      document.getElementById('lines').innerHTML = "Lines:<br>" + lines;
   }
}
// cria as bordas no canvas
function borda() {
   if (!selecionado || gameover || pause) {
      c.clearRect(0, 0, canvas.width, canvas.height);
      c.fillRect(size - 1, size * 4 - 1, canvas.width - size * 2 + 2, canvas.height - size * 8 + 2)
      c.clearRect(size, size * 4, canvas.width - size * 2, canvas.height - size * 8)
   } else {
      c.clearRect(0, 0, canvas.width, canvas.height);
      if (sel == 1) {
         c.fillStyle = "black";
         c.fillRect(size - 1, size - 1, canvas.width - size * 2 + 2, canvas.height - size * 3 + 2)
         c.clearRect(size, size, canvas.width - size * 2, canvas.height - size * 3);
      } else if (sel == 2) {
         c.fillStyle = "black";
         c.fillRect(size - 1, size - 1, canvas.width - size * 8 + 2, canvas.height - size * 2 + 2)
         c.clearRect(size, size, canvas.width - size * 8, canvas.height - size * 2);
         c.fillRect(size * 14 - 1, size - 1, canvas.width - size * 15 + 2, canvas.height - size * 18 + 2)
         c.clearRect(size * 14, size, canvas.width - size * 15, canvas.height - size * 18);
      }
   }
}
borda();