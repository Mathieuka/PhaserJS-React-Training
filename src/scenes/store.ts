import { proxy, snapshot, subscribe } from "valtio";
import { devtools, subscribeKey, watch } from "valtio/utils";

export const state = proxy({ score: 0 });
devtools(state, "score");

// watch((get) => {
//     console.log('state has changed to', get(state)) // auto-subscribe on use
// })

// subscribe(state, () => {
//     console.log('state is mutated')
//     const obj = snapshot(state) // A snapshot is an immutable object
// })

subscribeKey(state, "score", (v) =>
  console.log("state.score has changed to", v)
);
