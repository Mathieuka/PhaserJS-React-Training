import Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.Physics.Arcade.Sprite;
import { state } from "./store";

const onCollectStar = (this_: any) => {
  let scoreText: any;
  scoreText = this_.add.text(16, 16, `Score: ${state.score}`, {
    fontSize: "32px",
    fill: "#000",
  } as any);

  return (
    player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
    star: GameObject & Sprite
  ) => {
    state.score = state.score + 10;
    scoreText.setText("Score: " + state.score);
    star.disableBody(true, true);
  };
};

export const createStars = (
  this_: any,
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody,
  platforms: any
) => {
  const stars = this_.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });
  stars.children.iterate(function (child: GameObject) {
    (child as GameObject & Sprite).setBounceY(
      Phaser.Math.FloatBetween(0.2, 0.5)
    );
  });

  this_.physics.add.collider(platforms, stars);
  this_.physics.add.overlap(
    player,
    stars,
    onCollectStar(this_),
    undefined,
    this
  );
};
