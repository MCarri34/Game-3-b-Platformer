// Load.js
class Load extends Phaser.Scene {
    constructor() {
        super("loadScene");
    }

    preload() {
        // Load bar setup (optional aesthetic enhancement)
        let loadingBar = this.add.graphics({ fillStyle: { color: 0xffffff } });
        this.load.on("progress", (percent) => {
            loadingBar.fillRect(0, this.cameras.main.height / 2, this.cameras.main.width * percent, 5);
        });

        this.load.setPath("assets/");

        // Player sprites
        this.load.image("playerIdle", "tile_0009.png");
        this.load.image("playerRun", "tile_0010.png");

        // Particles
        this.load.image("smokeRun", "smoke_01.png");
        this.load.image("smokeJump", "smoke_09.png");

        // Tilesets
        this.load.image("tiles", "tilemap_packed.png");
        this.load.image("bgtiles", "tilemap-backgrounds_packed.png");
        this.load.image("char", "tilemap-characters_packed.png");

        // Tiled map
        this.load.tilemapTiledJSON("map", "platformer-level.tmj");

        // Audio
        this.load.audio("jump", "jump.mp3");
    }

    create() {
        this.scene.start("platformerScene");
    }
}
