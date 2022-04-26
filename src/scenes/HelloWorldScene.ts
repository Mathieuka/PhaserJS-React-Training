import Phaser from 'phaser'
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.Physics.Arcade.Sprite;

let player:  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody

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
    // Background image
    this.add.image(400, 300, 'sky');

    // Static platforms group
    const platforms = this.physics.add.staticGroup();
    platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    platforms.create(600, 400, 'ground');
    platforms.create(50, 250, 'ground');
    platforms.create(750, 220, 'ground');

    // Static Stars group
    const stars = this.physics.add.group({
      key: 'star',
      repeat: 11,
      setXY: { x: 12, y: 0, stepX: 70 }
    });
    stars.children.iterate(function (child: GameObject) {
      (child as (GameObject & Sprite)).setBounceY(Phaser.Math.FloatBetween(0.2, 0.5))
    });

    this.physics.add.collider(platforms, stars)

    const collectStar =  (player:  Phaser.Types.Physics.Arcade.SpriteWithDynamicBody, star: GameObject & Sprite) => {
      star.disableBody(true, true);
    }

    this.physics.add.overlap(player, stars, collectStar as any, undefined, this);

    // Player sprite
    player = this.physics.add.sprite(100, 450, 'dude');
    player.setBounce(0.3);
    player.setCollideWorldBounds(true);
    this.physics.add.collider(platforms, player)

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'turn',
      frames: [{ key: 'dude', frame: 4 }],
      frameRate: 20,
    });

    this.anims.create({
      key: 'right',
      frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
      frameRate: 10,
      repeat: -1,
    });
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
