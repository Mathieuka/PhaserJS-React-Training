import Phaser from "phaser";

export const createPlayer = (this_: any, platforms: any) => {
  let player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  player = this_.physics.add.sprite(100, 450, "dude");
  player.setBounce(0.3);
  player.setCollideWorldBounds(true);
  this_.physics.add.collider(platforms, player);

  this_.anims.create({
    key: "left",
    frames: this_.anims.generateFrameNumbers("dude", { start: 0, end: 3 }),
    frameRate: 10,
    repeat: -1,
  });

  this_.anims.create({
    key: "turn",
    frames: [{ key: "dude", frame: 4 }],
    frameRate: 20,
  });

  this_.anims.create({
    key: "right",
    frames: this_.anims.generateFrameNumbers("dude", { start: 5, end: 8 }),
    frameRate: 10,
    repeat: -1,
  });

  return player;
};
