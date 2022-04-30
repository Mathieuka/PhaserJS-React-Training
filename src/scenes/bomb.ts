import Phaser from "phaser";

export const createBomb = (player: any, bombs: any) => {
  const bombPosition =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  const bomb = bombs.create(bombPosition, 16, "bomb");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
};

export function hitBomb(this_: any, player: any) {
  this_.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  // gameOver = true;
}

export const createBombs = (this_: any) => this_.physics.add.group();
