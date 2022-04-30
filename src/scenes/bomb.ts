import Phaser from "phaser";

function hitBomb(this_: any, player: any, bomb: any) {
  this_.physics.pause();

  player.setTint(0xff0000);

  player.anims.play("turn");

  // gameOver = true;
}

export const createBombs = (this_: any, player: any, platforms: any) => {
  let bombs = this_.physics.add.group();
  this_.physics.add.collider(bombs, platforms);
  let x =
    player.x < 400
      ? Phaser.Math.Between(400, 800)
      : Phaser.Math.Between(0, 400);

  const bomb = bombs.create(x, 16, "bomb");
  bomb.setBounce(1);
  bomb.setCollideWorldBounds(true);
  bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);

  this_.physics.add.collider(
    player,
    bombs,
    () => hitBomb(this_, player, bomb),
    undefined,
    this_
  );
};
