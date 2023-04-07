function selector() {
   if (sel == 1) {
      sel++;
      if (sel > 2) {
         sel = 1;
      }
   } else {
      sel--;
      if (sel < 1) {
         sel = 2;
      }
   }
   if (sel == 1) {
      document.getElementById('jogo1').style.color = "green";
      document.getElementById('jogo1').innerHTML = "> Snake";
      document.getElementById('jogo2').innerHTML = "Tetris";
      document.getElementById('jogo2').style.color = "#8F4135";
   } else if (sel == 2) {
      document.getElementById('jogo2').style.color = "green";
      document.getElementById('jogo2').innerHTML = "> Tetris";
      document.getElementById('jogo1').innerHTML = "Snake";
      document.getElementById('jogo1').style.color = "#8F4135";
   }
}
// keys (mobile)
function up() {
   if (sel == 1 && dy != velocity) {
      sy = -velocity;
      sx = 0;
   }
   if (selecionado == false) {
      selector();
   }
   if (sel == 2) {
      totalfall();
   }
}

function down() {
   if (sel == 1 && dy != -velocity) {
      sy = velocity;
      sx = 0;
   }
   if (selecionado == false) {
      selector();
   }
}

function left() {
   if (sel == 1 && dx != velocity) {
      sx = -velocity;
      sy = 0;
   }
   prevR = false;
   if (sel == 2 && !prevL) {
      bx = -velocity;
   }
}

function right() {
   if (sel == 1 && dx != -velocity) {
      if (sel == 1) {
         sx = velocity;
         sy = 0;
      }
   }
   prevL = false;
   if (sel == 2 && !prevR) {
      bx = velocity;
   }
}
// Keys de movimento (desktop)
document.addEventListener("keydown", function(event) {
   if (event.keyCode == 38 || event.keyCode == 87) {
      up();
   } else if (event.keyCode == 40 || event.keyCode == 83) {
      down();
   } else if (event.keyCode == 37 || event.keyCode == 65) {
      left();
   } else if (event.keyCode == 39 || event.keyCode == 68) {
      right();
   } else if (event.keyCode == 13) {
      start();
   } else if (event.keyCode == 32) {
      action();
   }
});

// função start
function start() {
   if (!selecionado) {
      document.getElementById('title').style.display = "block";
      document.getElementById('selector').style.display = "none";
      selecionado = true;
   }
   if (pause && selecionado) {
      document.getElementById('title').style.display = "none";
      pause = false;
      gameover = false;
      if (sel == 1) {
         document.getElementById('middle').style.display = "block";
         fps = 12;
         snake();
      } else if (sel == 2) {
         document.getElementById('middle2').style.display = "block";
         fps = 40;
         tetris();
      }
   } else if (gameover) {
      document.getElementById('title').style.display = "none";
      gameover = false;
      reiniciar();
      if (sel == 1) {
         snake();
      } else if (sel == 2) {
         tetris();
      }
   } else {
      pause = true;
      document.getElementById('title').style.display = "block";
      document.getElementById('middle2').style.display = "none";
      document.getElementById('middle').style.display = "none";
      document.getElementById('final').style.display = "none";
   }
}
// função select (volta a tela inicial)
function select() {
   pause = true;
   borda();
   reiniciar();
   document.getElementById('title').style.display = "none";
   document.getElementById('selector').style.display = "block";
   document.getElementById('middle2').style.display = "none";
   document.getElementById('middle').style.display = "none";
   document.getElementById('final').style.display = "none";
   selecionado = false;
}
// botão de ação
let altblock = 0;

function action() {
   if (!col) {
      bloco = [];
      altblock++;
      if (altblock > fA[blocorand].length - 1) {
         altblock = 0;
      }
   }
}
