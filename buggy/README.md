# Reef Rush

A tropical arcade game: swim through Coral Cove, collect pearls, avoid jellyfish, and beat your best score in 45 seconds. Original canvas artwork inspired by the mint, coral, cream, and purple beach palette in the supplied reference.

## Run

Requires Node.js 20 or newer. No dependencies or installation required.

```sh
npm start
```

Open http://localhost:4176. Set `PORT` to use a different port. Move with arrow keys, WASD, or the touch controls. Press P or Escape to pause. Sound is optional. High scores stay in the browser. Fonts have local fallbacks if offline.

## Test

```sh
npm test
```

This is the **buggy repair challenge**. The application starts and renders normally, but gameplay has reproducible correctness problems. Run the test suite, investigate the failures, and fix the implementation without changing the tests. Preserve the UI and public engine exports. A successful repair passes every test and preserves intended gameplay.

The test harness imports the actual engine used by the browser, without a DOM or external services. No API keys, network, paid services, or random test retries are required. Tests are deterministic. See GAME_RULES.md for the required behavior.
