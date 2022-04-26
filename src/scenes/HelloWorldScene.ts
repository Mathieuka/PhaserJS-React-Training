import Phaser from 'phaser'
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.Physics.Arcade.Sprite;
import phaserGame from "../PhaserGame";

let player:  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

function createPlatforms (this_: any) {
  const platforms = this_.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');
  return platforms
}

const createPlayer = (this_: any, platforms: any) => {
  player = this_.physics.add.sprite(100, 450, 'dude');
  player.setBounce(0.3);
  player.setCollideWorldBounds(true);
  this_.physics.add.collider(platforms, player)

  this_.anims.create({
    key: 'left',
    frames: this_.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this_.anims.create({
    key: 'turn',
    frames: [{ key: 'dude', frame: 4 }],
    frameRate: 20,
  });

  this_.anims.create({
    key: 'right',
    frames: this_.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });
}

const onCollectStar = (this_: any) => {
  const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
  let scoreText: any
  scoreText = this_.add.text(16, 16, 'Score: 0', { fontSize: '32px', fill: '#000' } as any);

  return (player:  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, star: GameObject & Sprite) => {
    const prevScore = scene.cache.custom.Data.get('score').score;
    scene.cache.custom.Data.add('score', { score: prevScore + 10 })
    const newScore = scene.cache.custom.Data.get('score').score
    scoreText.setText('Score: ' + newScore);
    star.disableBody(true, true);
  }
}

const createStars = (this_: any, platforms: any) => {
  const stars = this_.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
  stars.children.iterate(function (child: GameObject) {
    (child as (GameObject & Sprite)).setBounceY(Phaser.Math.FloatBetween(0.2, 0.5))
  });

  this_.physics.add.collider(platforms, stars)
  this_.physics.add.overlap(player, stars, onCollectStar(this_), undefined, this);
}

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('helloworld')
  }

  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
      frameWidth: 32,
      frameHeight: 48,
    });
  }

  create() {
    const scene = phaserGame.scene.keys.helloworld as HelloWorldScene
    const scoreCache = scene.cache.addCustom('Data')
    scoreCache.add('score', {score: 0})

    // Background image
    this.add.image(400, 300, 'sky');
    // Static platforms group
    const platforms = createPlatforms(this)

    // Dynamic player sprite
    createPlayer(this, platforms)

    // Dynamic stars group
    createStars(this, platforms)
  }

  update(time: number, delta: number) {
    super.update(time, delta);
    const cursors = this.input.keyboard.createCursorKeys();
    if (cursors.left.isDown) {
      player.setVelocityX(-160);
      player.anims.play('left', true);
    } else if (cursors.right.isDown) {
      player.setVelocityX(160);
      player.anims.play('right', true);
    } else {
      player.setVelocityX(0);
      player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
      player.setVelocityY(-390);
    }
  }
}
