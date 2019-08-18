let game;
const width = 1280;
const height = 800;

/*----------  phaser 設定  ----------*/
window.onload = function() {
  let config = {
    type: Phaser.AUTO,
    width: width,
    height: height,
    parent: 'app',
    backgroundColor: '#7EBE8D',
    // 物理效果
    physics: {
      default: 'arcade',
      arcade: {
        gravity: {
          y: 700
        }
        // debug: true
      }
    },
    scene: [gameStart, gamePlay, gameFinish]
  };

  game = new Phaser.Game(config);

  resize();
  window.addEventListener('resize', resize, false);
};

function resize() {
  var canvas = document.querySelector('canvas');
  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight - 100;
  var windowRatio = windowWidth / windowHeight;
  var gameRatio = game.config.width / game.config.height;
  if (windowRatio < gameRatio) {
    canvas.style.width = windowWidth + 'px';
    canvas.style.height = windowWidth / gameRatio + 'px';
  } else {
    canvas.style.width = windowHeight * gameRatio + 'px';
    canvas.style.height = windowHeight + 'px';
  }
}
