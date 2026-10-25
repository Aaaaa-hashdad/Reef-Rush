export const WIDTH = 1000, HEIGHT = 560, ROUND_SECONDS = 45, FISH_SPEED = 300;
export function createGame(seed = 7) {
  return { seed: seed >>> 0, status: 'ready', player: { x: 200, y: 280, radius: 24 }, score: 0, combo: 0, bestCombo: 0, lives: 3, remaining: ROUND_SECONDS, invulnerable: 0, elapsed: 0, spawnIn: 0, entities: [], nextId: 1 };
}
function random(s) { s.seed = (Math.imul(s.seed, 1664525) + 1013904223) >>> 0; return s.seed / 4294967296; }
export function startGame(s) { if (s.status === 'ready') s.status = 'playing'; }
export function togglePause(s) { if (s.status === 'playing') s.status = 'paused'; else if (s.status === 'paused') s.status = 'playing'; }
export function restartGame(s, seed = 7) { Object.assign(s, createGame(seed), { status: 'playing' }); }
export function overlaps(a, b) { return Math.hypot(a.x - b.x, a.y - b.y) <= a.radius + b.radius; }
export function collectPearl(s, pearl) {
  if (s.status !== 'playing' || pearl.collected) return false;
  pearl.collected = true;
  s.combo += 1; s.bestCombo = Math.max(s.bestCombo, s.combo);
  s.score += 10 * Math.min(5, 1 + Math.floor((s.combo - 1) / 5));
  return true;
}
export function hitJelly(s) {
  if (s.status !== 'playing' || s.invulnerable > 0) return false;
  s.lives = Math.max(0, s.lives - 1); s.combo = 0; s.invulnerable = 1.5;
  if (s.lives === 0) s.status = 'over';
  return true;
}
export function update(s, input = {}, dt = 0) {
  if (s.status !== 'playing' || !Number.isFinite(dt) || dt <= 0) return;
  const seconds = Math.min(dt, s.remaining);
  s.elapsed += seconds; s.remaining = Math.max(0, s.remaining - seconds);
  s.invulnerable = Math.max(0, s.invulnerable - seconds);
  let dx = Number(Boolean(input.right)) - Number(Boolean(input.left)), dy = Number(Boolean(input.down)) - Number(Boolean(input.up));
  const len = Math.hypot(dx, dy);
  if (len > 0) { dx /= len; dy /= len; }
  const r = s.player.radius;
  s.player.x = Math.max(r, Math.min(WIDTH - r, s.player.x + dx * FISH_SPEED * seconds));
  s.player.y = Math.max(r, Math.min(HEIGHT - r, s.player.y + dy * FISH_SPEED * seconds));
  s.spawnIn -= seconds;
  if (s.spawnIn <= 0) {
    const jelly = random(s) < .32;
    s.entities.push({ id: s.nextId++, kind: jelly ? 'jelly' : 'pearl', x: WIDTH + 35, y: 65 + random(s) * (HEIGHT - 130), radius: jelly ? 25 : 16, speed: 100 + random(s) * 75 });
    s.spawnIn = .65;
  }
  for (const e of s.entities) {
    e.x -= e.speed * seconds;
    if (e.collected || !overlaps(s.player, e)) continue;
    if (e.kind === 'pearl') collectPearl(s, e);
    else if (hitJelly(s)) e.collected = true;
  }
  s.entities = s.entities.filter(e => !e.collected && e.x > -50);
  if (s.remaining === 0) s.status = 'over';
}
