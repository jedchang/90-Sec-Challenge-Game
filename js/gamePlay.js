const getRandom = function(max, min) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const gamePlay = {
  key: 'gamePlay',

  preload: function() {
    this.load.image('bgPlayFront', './images/bg-play-front.png');
    this.load.image('bgPlayMiddle', './images/bg-play-middle.png');
    this.load.image('bgPlayBack', './images/bg-play-back.png');
    this.load.image('bgPlayColor', './images/bg-play-color.png');
    this.load.image('bgPlayGround', './images/bg-play-ground.png');
    this.load.spritesheet('user', './images/player.png', { frameWidth: 144, frameHeight: 120 });
    this.load.spritesheet('btnSpace', './images/play-btn-space.png', { frameWidth: 173, frameHeight: 30 });
    this.load.spritesheet('skillBall', './images/skill-ball.png', { frameWidth: 64, frameHeight: 64 });
    this.load.image('bgGameOverColor', './images/bg-game-over.png');
    this.load.image('iconTime', './images/play-icon-time.png');
    this.load.image('gameOver', './images/end-title.png');
    this.load.image('tryAgainBtn', './images/btn-try-again.png');
    this.load.image('bgLv2Color', './images/bg-Lv2-color.png');
    this.load.image('bgUpgrade', './images/bg-upgrade.png');
    this.load.image('lv1obstacle1', './images/block-Lv1-branch.png');
    this.load.image('lv1obstacle2', './images/block-Lv1-rock.png');
    this.load.image('lv1obstacle3', './images/block-Lv1-branch.png');
    this.load.image('lv1obstacle4', './images/block-Lv1-rock.png');
    this.load.image('lv1obstacle5', './images/block-Lv1-branch.png');
    this.load.image('lv1obstacle6', './images/block-Lv1-rock.png');

    this.load.image('lv2obstacle1', './images/block-Lv2-smoke-lg.png');
    this.load.image('lv2obstacle2', './images/block-Lv2-smoke-sm.png');
    this.load.image('lv2obstacle3', './images/block-Lv2-smoke-lg.png');
    this.load.image('lv2obstacle4', './images/block-Lv2-smoke-sm.png');

    this.load.image('lv3obstacle1', './images/block-Lv3-fire-lg.png');
    this.load.image('lv3obstacle2', './images/block-Lv3-fire-sm.png');
    this.load.image('lv3obstacle3', './images/block-Lv3-fire-sm.png');

    this.timer = 90;
    this.bgSpeed = 1.5;
    this.gameStop = false;
    this.gameOver = false;
    this.finish = false;

    this.obstacleIdx1 = getRandom(5, 0);
    this.obstacleIdx2 = getRandom(3, 0);
    this.obstacleIdx3 = getRandom(2, 0);

    this.obstacleAry1 = [];
    this.obstacleAry2 = [];
    this.obstacleAry3 = [];
  },

  create: function() {
    this.bgPlayColor = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayColor');
    this.bgPlayBack = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayBack');
    this.bgPlayMiddle = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayMiddle');
    this.bgPlayFront = this.add.tileSprite(width / 2, height / 2, width, height, 'bgPlayFront');
    this.bgPlayGround = this.add.tileSprite(width / 2, 700, width, 200, 'bgPlayGround');

    this.levelBg = this.add.rectangle(width / 2, height / 2, width, height, 0xff0000, 0);
    this.lightBg = this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 1);
    this.lightBg.alpha = 0;
    this.lightBg.depth = 10;

    this.iconTime = this.add.image(width / 2 + 450, height / 2 + 348, 'iconTime');
    this.btnSpace = this.add.image(width / 2 - 480, height / 2 + 348, 'btnSpace');

    const addPhysics = obj => {
      this.physics.add.existing(obj);
      obj.body.immovable = true;
      obj.body.moves = false;
    };

    this.player = this.physics.add.sprite(120, 120, 'user');
    this.player.setScale(0.6);
    this.player.setCollideWorldBounds(true);

    addPhysics(this.bgPlayGround);
    this.physics.add.collider(this.player, this.bgPlayGround);

    keyFrame(this);

    let hitBlock = () => {
      this.gameStop = true;
      this.finish = false;
      this.player.setSize(120, 120, 0);
      this.player.anims.play('dead', true);
      clearInterval(gameTime);

      let gameOver = this.add.image(width / 2, height / 2 - 70, 'gameOver');
      gameOver.setScale(1);
      let tryAgainBtn = this.add.image(width / 2, height / 2 + 60, 'tryAgainBtn');
      tryAgainBtn.setScale(1);
    };

    let blockPos1 = [
      { name: 'lv1obstacle1', x: width + 200, y: 152, w: 248, h: 304 },
      { name: 'lv1obstacle2', x: width + 230, y: height / 2 + 110, w: 368, h: 192 },
      { name: 'lv1obstacle3', x: width + 250, y: 152, w: 248, h: 304 },
      { name: 'lv1obstacle4', x: width + 230, y: height / 2 + 110, w: 368, h: 192 },
      { name: 'lv1obstacle5', x: width + 260, y: 152, w: 248, h: 304 },
      { name: 'lv1obstacle6', x: width + 230, y: height / 2 + 110, w: 368, h: 192 }
    ];
    let blockPos2 = [
      { name: 'lv2obstacle1', x: width + 300, y: height / 2 - 86, w: 368, h: 192 },
      { name: 'lv2obstacle2', x: width + 320, y: height / 2 + 140, w: 288, h: 136 },
      { name: 'lv2obstacle3', x: width + 400, y: height / 2 - 86, w: 368, h: 192 },
      { name: 'lv2obstacle4', x: width + 420, y: height / 2 + 140, w: 288, h: 136 }
    ];
    let blockPos3 = [
      { name: 'lv3obstacle1', x: width + 600, y: height / 2 + 90, w: 192, h: 224 },
      { name: 'lv3obstacle2', x: width + 650, y: height / 2 - 80, w: 136, h: 152 },
      { name: 'lv3obstacle3', x: width + 650, y: height / 2 + 140, w: 136, h: 152 }
    ];

    for (let i = 0; i < 10; i++) {
      let randomIdx1 = getRandom(5, 0);
      let randomIdx2 = getRandom(3, 0);
      let randomIdx3 = getRandom(2, 0);

      this['lv1obstacle' + i] = this.add.tileSprite(
        blockPos1[randomIdx1].x,
        blockPos1[randomIdx1].y,
        blockPos1[randomIdx1].w,
        blockPos1[randomIdx1].h,
        blockPos1[randomIdx1].name
      );
      this.obstacleAry1.push(this['lv1obstacle' + i]);
      addPhysics(this['lv1obstacle' + i]);
      this.physics.add.collider(this.player, this['lv1obstacle' + i], hitBlock);

      this['lv2obstacle' + i] = this.add.tileSprite(
        blockPos2[randomIdx2].x,
        blockPos2[randomIdx2].y,
        blockPos2[randomIdx2].w,
        blockPos2[randomIdx2].h,
        blockPos2[randomIdx2].name
      );
      this.obstacleAry2.push(this['lv2obstacle' + i]);
      addPhysics(this['lv2obstacle' + i]);
      this.physics.add.collider(this.player, this['lv2obstacle' + i], hitBlock);

      this['lv3obstacle' + i] = this.add.tileSprite(
        blockPos3[randomIdx3].x,
        blockPos3[randomIdx3].y,
        blockPos3[randomIdx3].w,
        blockPos3[randomIdx3].h,
        blockPos3[randomIdx3].name
      );
      this.obstacleAry3.push(this['lv3obstacle' + i]);
      addPhysics(this['lv3obstacle' + i]);
      this.physics.add.collider(this.player, this['lv3obstacle' + i], hitBlock);
    }

    let minute = Math.floor((this.timer % 3600) / 60);
    minute = minute < 10 ? '0' + minute : minute;
    let second = ((this.timer % 3600) % 60).toString();
    second = second < 10 ? '0' + second : second;

    this.timeText = this.add.text(width - 170, height - 70, `${minute} : ${second}`, {
      fontFamily: '"Roboto"',
      color: '#fff',
      fontSize: '32px'
    });

    let gameTime = setInterval(() => {
      let minute = Math.floor((this.timer % 3600) / 60);
      minute = minute < 10 ? '0' + minute : minute;
      let second = ((this.timer % 3600) % 60).toString();
      second = second < 10 ? '0' + second : second;

      this.timer--;
      this.timeText.setText(`${minute} : ${second}`);

      if (this.timer < 0) {
        this.finish = true;
        this.obstacleAry1[this.obstacleIdx1].alpha = 0;
        this.obstacleAry2[this.obstacleIdx2].alpha = 0;
        this.obstacleAry3[this.obstacleIdx3].alpha = 0;
        this.finish = true;
        this.player.flipX = false;
        this.player.flipY = false;
        this.player.body.immovable = true;
        this.player.body.moves = false;

        if (this.bgUpgrade === undefined) {
          this.bgUpgrade = this.add.tileSprite(width / 2, 300, 336, 600, 'bgUpgrade');
          this.bgUpgrade.alpha = 0;
          this.player.depth = 9;
        } else {
          this.bgUpgrade = this.add.tileSprite(width / 2, 300, 336, 600, 'bgUpgrade');
          this.bgUpgrade.alpha = 0;
          this.player.depth = 9;
        }

        clearInterval(gameTime);
      }
    }, 1000);

    this.gameOverBg = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0);
  },

  update: function() {
    if (this.gameStop === true && this.finish === false) {
      this.gameOver = true;
      this.player.anims.play('dead', true);

      if (this.gameOver) {
        this.gameOverBg.setFillStyle(0x000000, 0.8);
        this.gameOverBg.alpha += 0;
        this.gameOverBg.alpha += 0.01;
        console.log(this.gameOverBg.alpha);

        if (this.gameOverBg.alpha === 1) {
          let tryAgainBtn = this.add.image(width / 2, height / 2 + 60, 'tryAgainBtn');
          tryAgainBtn.setScale(1);
          tryAgainBtn.setInteractive({ cursor: 'pointer' });
          tryAgainBtn.on('pointerdown', () => {
            this.scene.start('gamePlay');
          });
        }
      }
      return;
    }

    this.bgPlayBack.tilePositionX += 3 * this.bgSpeed;
    this.bgPlayMiddle.tilePositionX += 4 * this.bgSpeed;
    this.bgPlayFront.tilePositionX += 5 * this.bgSpeed;
    this.bgPlayGround.tilePositionX += 5 * this.bgSpeed;
    this.obstacleAry1[this.obstacleIdx1].x -= 3 * this.bgSpeed;

    if (this.timer <= 60 && this.timer > 29) {
      this.bgSpeed = 1.8;
      this.obstacleAry1[this.obstacleIdx1].x -= 1 * this.bgSpeed;
      this.obstacleAry2[this.obstacleIdx2].x -= 4 * this.bgSpeed;
      this.levelBg.setFillStyle(0xff0000, 0.15);
    } else if (this.timer <= 29 && this.timer > 0) {
      this.bgSpeed = 2;
      this.obstacleAry1[this.obstacleIdx1].x -= 2 * this.bgSpeed;
      this.obstacleAry2[this.obstacleIdx2].x -= 5 * this.bgSpeed;
      this.obstacleAry3[this.obstacleIdx3].x -= 5 * this.bgSpeed;
      this.levelBg.setFillStyle(0xff0000, 0.3);
    } else if (this.timer <= 0) {
      clearInterval(this.gameTime);
      this.obstacleAry1[this.obstacleIdx1].x -= 2 * this.bgSpeed;
      this.obstacleAry2[this.obstacleIdx2].x -= 5 * this.bgSpeed;
      this.obstacleAry3[this.obstacleIdx3].x -= 5 * this.bgSpeed;

      let centerWidth = Math.log(Math.abs(this.player.x - width / 2));
      let centerHeight = Math.log(Math.abs(this.player.y - height / 2));
      this.lightBg.setFillStyle(0xff0000, 0);
      this.obstacleAry1[this.obstacleIdx1].destroy(); // 障礙物消失
      this.obstacleAry2[this.obstacleIdx2].destroy();
      this.obstacleAry3[this.obstacleIdx3].destroy();

      this.bgPlayBack.tilePositionX = 0;
      this.bgPlayMiddle.tilePositionX = 0;
      this.bgPlayFront.tilePositionX = 0;
      this.bgPlayGround.tilePositionX = 0;

      this.levelBg.setFillStyle(0xff0000, 0);
      this.player.x += centerWidth;

      if (this.player.y < height / 2) {
        this.player.y += centerHeight;
      } else if (this.player.y > height / 2) {
        this.player.y -= centerHeight;
      }

      if (this.player.x === 639) {
        this.player.angle = -45;
        this.player.anims.play('finish', true);
        this.player.y -= 10;
        this.bgUpgrade.alpha += 0.1;
        this.bgUpgrade.tilePositionY += 5;
        this.lightBg.setFillStyle(0xffffff, 1);
        this.lightBg.alpha += 0;
        this.lightBg.alpha += 0.01;

        if (this.lightBg.alpha === 1) {
          this.scene.start('gameFinish');
        }
      }
      return;
    }

    for (let i = 0; i < this.obstacleAry1.length; i++) {
      if (this.obstacleAry1[i].x < -184) {
        this.obstacleAry1[i].x = width + getRandom(260, 200);
        this.obstacleIdx1 = getRandom(5, 0);
        console.log('this.obstacleIdx1', this.obstacleIdx1);
      }
    }

    for (let i = 0; i < this.obstacleAry2.length; i++) {
      if (this.obstacleAry2[i].x < -184) {
        this.obstacleAry2[i].x = width + getRandom(420, 300);
        this.obstacleIdx2 = getRandom(3, 0);
        console.log('this.obstacleIdx2', this.obstacleIdx2);
      }
    }

    for (let i = 0; i < this.obstacleAry3.length; i++) {
      if (this.obstacleAry3[i].x < -184) {
        this.obstacleAry3[i].x = width + getRandom(600, 200);
        this.obstacleIdx3 = getRandom(2, 0);
        console.log('this.obstacleIdx3', this.obstacleIdx3);
      }
    }

    let keyboard = this.input.keyboard.createCursorKeys();

    if (keyboard.space.isDown) {
      this.player.anims.play('fly', true);
      this.player.flipY = false;
      this.player.setVelocityY(-200);
      this.btnSpace.setFrame(1);
    } else {
      this.btnSpace.setFrame(0);
      this.player.anims.play('normal', true);
    }
  }
};
