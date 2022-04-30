import { subscribeKey } from "valtio/utils";
import { state } from "../store";

export const scoreSubscription = (scoreText: any) => {
  subscribeKey(state, "score", (v) => {
    scoreText.setText("Score: " + state.score);
    if (state.score === 120) {
      state.resetScore();
    }
  });
};

export const createScore = (this_: any) => {
  return this_.add.text(16, 16, `Score: ${state.score}`, {
    fontSize: "32px",
    fill: "#000",
  } as any);
};
