import Phaser from "phaser";
import GameObject = Phaser.GameObjects.GameObject;
import Sprite = Phaser.Physics.Arcade.Sprite;
import { state } from "./store";
import { createBomb } from "./bomb";

export const onCollectStart = ({
  player,
  stars,
  star,
  bombs,
}: {
  player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody;
  stars: any;
  star: GameObject & Sprite;
  bombs: any;
}) => {
  star.disableBody(true, true);
  state.incScore();
  if (stars.countActive(true) === 0) {
    stars.children.iterate((child: any) => {
      child.enableBody(true, child.x, 0, true, true);
    });
    createBomb(player, bombs);
  }
};

export const createStars = (this_: any) => {
  const stars = this_.physics.add.group({
    key: "star",
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 },
  });

  stars.children.iterate((child: GameObject) => {
    (child as GameObject & Sprite).setBounceY(
      Phaser.Math.FloatBetween(0.2, 0.5)
    );
  });

  return stars;
};
