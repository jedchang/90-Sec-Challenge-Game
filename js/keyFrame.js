const keyFrame = function(self) {
  self.anims.create({
    key: 'normal',
    frames: self.anims.generateFrameNumbers('user', { start: 0, end: 1 }),
    frameRate: 4,
    repeat: -1
  });

  self.anims.create({
    key: 'fly',
    frames: self.anims.generateFrameNumbers('user', { start: 2, end: 3 }),
    frameRate: 5,
    repeat: -1
  });

  self.anims.create({
    key: 'powerful',
    frames: self.anims.generateFrameNumbers('user', { start: 4, end: 5 }),
    frameRate: 5,
    repeat: -1
  });

  self.anims.create({
    key: 'dead',
    frames: self.anims.generateFrameNumbers('user', { start: 6, end: 6 }),
    frameRate: 5,
    repeat: -1
  });

  self.anims.create({
    key: 'finish',
    frames: self.anims.generateFrameNumbers('user', { start: 0, end: 0 }),
    frameRate: 5,
    repeat: -1
  });

  self.anims.create({
    key: 'showBall',
    frames: self.anims.generateFrameNumbers('skillBall', { start: 0, end: 1 }),
    frameRate: 5,
    repeat: -1
  });

  self.anims.create({
    key: 'btnStatus',
    frames: self.anims.generateFrameNumbers('btnSpace', { start: 0, end: 1 }),
    frameRate: 5,
    repeat: 0
  });
};

const keyFrame2 = function(self) {
  self.anims.create({
    key: 'flicker',
    frames: self.anims.generateFrameNumbers('bgTilt', { start: 0, end: 6 }),
    frameRate: 8,
    repeat: -1
  });

  self.anims.create({
    key: 'flicker2',
    frames: self.anims.generateFrameNumbers('bgTilt2', { start: 0, end: 6 }),
    frameRate: 8,
    repeat: -1
  });
};
