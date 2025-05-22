# Coin Quest

This is a horizontally scrolling platformer game built with Phaser 3 and Tiled. The game includes player movement, collectibles, a level completion system, particle effects for game juice, and audio feedback for player actions. While it's definitely not my proudest work, I'm glad to hit all of the minimum requirements for this assignment.

## ✅ Game Features & Requirements

### 🎮 Player Avatar Movement
- The player character can move left and right using the arrow keys.
- Jumping is enabled with infinite jump capability (for fun).
- Movement feels smooth, with acceleration, deceleration, and physics-based gravity.

### 🌍 Ground and Platforms
- The game uses a Tiled map with at least one type of ground and one type of platform tile.
- These tiles block player movement appropriately using tile collision properties.

### 💎 Collectible Items
- The game includes collectible coins scattered throughout the level.
- When a coin is collected, it disappears and increments the player's score.
- Once all coins are collected, the game displays a "LEVEL COMPLETE!" message.

### 🏁 End of Level Condition
- The level ends when the player collects all coins and touches the flag (using an invisible coin).
- A "LEVEL COMPLETE!" message appears on screen, and the player can restart by pressing `R`.

### 🌐 Level Size and Scrolling
- The level is wider than it is tall and spans approximately three screen widths.
- This design ensures horizontal scrolling is required to explore the full level.

### 🎥 Camera Behavior
- The camera follows the player along the X-axis only.
- Vertical movement does not affect the camera, providing a classic side-scroller experience.
- The camera is zoomed in for a more focused view of gameplay.

### ✨ Particle Juice
- A particle system is used when the player moves horizontally (`smokeRun`) and when jumping (`smokeJump`).
- Each system uses different textures and lifespans for visual variation.
- The horizontal movement particles are less frequent and emit fewer particles for a cleaner effect.
- The jumping effect uses a burst of particles that fade as they rise.

### 🔊 Audio Juice
- A jump sound effect (`jump.mp3`) plays every time the player jumps.
- The sound is volume-adjusted for polish and subtle feedback.

## 🕹 Controls

| Key       | Action            |
|-----------|-------------------|
| ← / →     | Move left/right   |
| ↑         | Jump (infinite)   |
| R         | Restart (after level complete) |

## 🧱 Technical Details

- Designed using Tiled with multiple tile layers: background, water, ground/platforms, objects
- Scaled assets and physics to ensure accurate collision
- Manually managed collision with collectibles and completion trigger

## 📦 Assets Used

- Kenney Tileset (`tilemap_packed.png`, `tilemap-characters_packed.png`, `tilemap-backgrounds_packed.png`)
- Custom `jump.mp3` sound
- Particle textures from Kenny's effects pack (`smoke_01.png`, `smoke_09.png`)

## 🏁 How to Win

- Collect all coins and reach the flag
- Read the "LEVEL COMPLETE!" message
- Press `R` to restart
