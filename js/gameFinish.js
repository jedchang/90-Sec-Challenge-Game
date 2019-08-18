const gameFinish = {
  key: 'gameFinish',

  preload: function() {
    this.load.image('bgPlayFront', './images/bg-play-front.png');
    this.load.image('bgPlayMiddle', './images/bg-play-middle.png');
    this.load.image('bgPlayBack', './images/bg-play-back.png');
    this.load.image('bgPlayColor', './images/bg-play-color.png');
    this.load.image('bgPlayGround', './images/bg-play-ground.png');
    this.load.image('finishDandelion', './images/player-finish.png');
    this.load.image('iconTime', './images/play-icon-time.png');
    this.load.spritesheet('btnSpace', './images/play-btn-space.png', { frameWidth: 173, frameHeight: 30 });
    this.load.image('congrats', './images/clear-congratulations.png');
    this.load.image('bgTopColor', './images/clear-topBg.png');
    this.load.spritesheet('bgTilt', './images/clear-tiltBg.png', { frameWidth: 200, frameHeight: 296 });
    this.load.spritesheet('bgTilt2', './images/clear-tiltBg2.png', { frameWidth: 200, frameHeight: 296 });
    this.load.image('playAgainBtn', '../images/btn-play-again.png');
  },

  create: function() {
    this.bgPlayColor = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayColor');
    this.bgPlayBack = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayBack');
    this.bgPlayMiddle = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayMiddle');
    this.bgPlayFront = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayFront');
    this.bgPlayGround = this.add.tileSprite(width / 2, 700, width, 200, 'bgPlayGround');
    this.bgTopColor = this.add.tileSprite(width / 2, 100, width, 200, 'bgTopColor');
    this.iconTime = this.add.image(width / 2 + 450, height / 2 + 348, 'iconTime');
    this.btnSpace = this.add.image(width / 2 - 480, height / 2 + 348, 'btnSpace');

    this.bgTilt1 = this.add.sprite(width / 2 - 450, 148, 'bgTilt');
    this.bgTilt2 = this.add.sprite(width / 2 - 230, 148, 'bgTilt2');
    this.bgTilt3 = this.add.sprite(width / 2 + 300, 148, 'bgTilt');
    this.bgTilt4 = this.add.sprite(width / 2 + 390, 148, 'bgTilt2');

    this.timeText = this.add.text(width - 170, height - 70, '00 : 00', {
      fontFamily: '"Roboto"',
      color: '#fff',
      fontSize: '32px'
    });

    var graphics = this.add.graphics();
    graphics.fillStyle(0xffffff, 0.16);
    graphics.fillCircle(width / 2, height / 2 + 105, 200);
    graphics.fillStyle(0xffffff, 0.14);
    graphics.fillCircle(width / 2, height / 2 + 105, 180);
    graphics.fillStyle(0xffffff, 0.12);
    graphics.fillCircle(width / 2, height / 2 + 105, 160);

    this.finishDandelion = this.add.image(width / 2, height / 2 + 105, 'finishDandelion');
    this.finishDandelion.setScale(1);

    this.congrats = this.add.image(width / 2, height / 2 - 280, 'congrats');
    this.congrats.setScale(1);

    let playAgainBtn = this.add.image(width / 2, height / 2 - 160, 'playAgainBtn');
    playAgainBtn.setInteractive({ cursor: 'pointer' });
    playAgainBtn.on('pointerdown', () => {
      this.scene.start('gameStart');
    });

    keyFrame2(this);
  },

  update: function() {
    this.bgTilt1.anims.play('flicker', true);
    this.bgTilt2.anims.play('flicker2', true);
    this.bgTilt3.anims.play('flicker', true);
    this.bgTilt4.anims.play('flicker2', true);
  }
};
