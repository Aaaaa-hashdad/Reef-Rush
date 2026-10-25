# Reef Rush

A tropical arcade game: swim through Coral Cove, collect pearls, avoid jellyfish, and beat your best score in 45 seconds. Original canvas artwork inspired by the mint, coral, cream, and purple beach palette in the supplied reference.

## Run

Requires Node.js 20 or newer. No dependencies or installation required.

```sh
npm start
```

Open http://localhost:4175. Set `PORT` to use a different port. Move with arrow keys, WASD, or the touch controls. Press P or Escape to pause. Sound is optional. High scores stay in the browser. Fonts have local fallbacks if offline.

## Test

```sh
npm test
```

This is the **fixed reference**. All 12 deterministic tests pass. Its matching buggy repository has exactly the same artwork, game interface, and tests. Only `src/engine.js` differs. The engine uses seconds for time, normalizes diagonal input, respects the full fish radius at borders, makes collection idempotent, provides a damage cooldown, freezes paused rounds, and resets all state on restart.

The test harness imports the actual engine used by the browser, without a DOM or external services. Model fixes should preserve the tests and interface and repair production code. The reference implementation is the answer key; do not share it with competing repair models.
