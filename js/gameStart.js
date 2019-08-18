const gameStart = {
  key: 'gameStart',

  preload: function() {
    this.load.image('dandelion', './images/start-dandelion.png');
    this.load.image('title', './images/start-title.png');
    this.load.image('subTitle', './images/start-subtitle.png');
    this.load.image('playBtn', './images/btn-press-start.png');
  },

  create: function() {
    this.dandelion = this.add.image(width / 2 - 250, height / 2 + 30, 'dandelion');
    this.dandelion.setScale(1);

    let graphic = this.add.graphics();
    graphic.fillStyle(0xffffff, 1);
    graphic.fillRoundedRect(width / 2 + 130, height / 2 - 360, 445, 736, 10);

    this.title = this.add.image(width / 2 + 350, height / 2 - 80, 'title');
    this.title.setScale(1);

    this.subTitle = this.add.image(width / 2 + 350, height / 2 + 100, 'subTitle');
    this.subTitle.setScale(1);

    this.playBtn = this.add.image(width / 2 + 350, height / 2 + 200, 'playBtn');

    this.playBtn.setScale(1);

    this.playBtn.setInteractive({
      cursor: 'pointer'
    });
    this.playBtn.on('pointerdown', () => {
      this.scene.start('gamePlay');
    });
  },

  update: function() {}
};
