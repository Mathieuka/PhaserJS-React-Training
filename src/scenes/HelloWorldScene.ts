import Phaser from "phaser";
import { createPlatforms } from "./platform";
import { createPlayer, playerMovement } from "./player";
import { createStars } from "./stars";
import { createScore, scoreSubscription } from "./hooks/updateScore";
import { onCollectStart } from "./stars";
import { createBombs, hitBomb } from "./bomb";

export default class HelloWorldScene extends Phaser.Scene {
  private player: Phaser.Types.Physics.Arcade.SpriteWithDynamicBody | undefined;
  public cursors: any;

  constructor() {
    super("helloworld");
  }

  preload = () => {
    this.load.image("sky", "assets/sky.png");
    this.load.image("ground", "assets/platform.png");
    this.load.image("star", "assets/star.png");
    this.load.image("bomb", "assets/bomb.png");
    this.load.spritesheet("dude", "assets/dude.png", {
      frameWidth: 32,
      frameHeight: 48,
    });
    this.cursors = this.input.keyboard.createCursorKeys();
  };

  create = () => {
    this.add.image(400, 300, "sky");
    this.player = createPlayer(this);
    const platforms = createPlatforms(this);
    const stars = createStars(this);
    const scoreText = createScore(this);
    const bombs = createBombs(this);

    this.physics.add.collider(bombs, platforms);
    this.physics.add.collider(
      this.player,
      bombs,
      () => hitBomb(this, this.player),
      undefined,
      this
    );
    this.physics.add.collider(platforms, this.player);
    this.physics.add.collider(platforms, stars);
    this.physics.add.overlap(
      this.player,
      stars,
      (player: any, star: any) =>
        onCollectStart({ player, star, stars, bombs }),
      undefined,
      this
    );

    scoreSubscription(scoreText);
  };

  update = (time: number, delta: number) => {
    super.update(time, delta);
    playerMovement(this.player, this.cursors);
  };
}
