import Phaser from 'phaser'
import {createPlatforms} from "./platform";
import {createPlayer} from "./player";
import {createStars} from "./stars";

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
    this.add.image(400, 300, 'sky');
    const platforms = createPlatforms(this)
    player = createPlayer(this, platforms)
    createStars(this, player,platforms)
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
