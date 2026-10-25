# Reef Rush rules

- A round lasts 45 seconds and starts with three hearts and zero points.
- Movement is 300 game units per second, regardless of refresh rate or direction.
- The fish stays entirely inside the 1000 × 560 playfield, including its radius.
- A pearl is collected once. Each is worth 10 points, increasing by 10 after every five consecutive pearls, to a maximum of 50.
- A jellyfish sting costs one heart and clears the current streak. The fish is immune to further stings for 1.5 seconds afterward.
- Pausing freezes the complete simulation. Resume continues the same round.
- Losing the final heart or reaching zero seconds ends the round. Finished rounds cannot score or lose additional hearts.
- Restart creates a fresh round: no old score, combo, encounters, cooldown, or timers survive.
- The same seed and inputs produce the same result. Invalid time deltas must not change the game.
