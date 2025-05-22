// platformer.js
class Platformer extends Phaser.Scene {
    constructor() {
        super("platformerScene");
        this.my = my;
    }

    preload() {
        this.load.setPath("assets/");
        this.load.image("playerIdle", "tile_0009.png");
        this.load.image("playerRun", "tile_0010.png");
        this.load.image("smokeRun", "smoke_01.png");
        this.load.image("smokeJump", "smoke_09.png");
        this.load.audio("jump", "jump.mp3");

        this.load.spritesheet("tilemap_sheet", "tilemap_packed.png", {
            frameWidth: 18,
            frameHeight: 18
        });
        this.load.image("bgtiles", "tilemap-backgrounds_packed.png");
        this.load.image("char", "tilemap-characters_packed.png");

        this.load.tilemapTiledJSON("map", "platformer-level.tmj");
    }

        create() {
            const map = this.make.tilemap({ key: "map" });
            this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            const bgTiles = map.addTilesetImage("tilemap-backgrounds_packed", "bgtiles");
            const tiles = map.addTilesetImage("tilemap_packed", "tiles");

            map.createLayer("Background", bgTiles);
            map.createLayer("Water", tiles);
            const groundLayer = map.createLayer("Ground-n-Platforms", tiles);
            groundLayer.setCollisionByProperty({ collides: true });

            // Load coin objects
            this.coins = map.createFromObjects("Objects", {
            name: "coin",
                key: "tilemap_sheet",
                frame: 151
            });

            // Enable Arcade Physics and add coins to group
            this.coins.forEach(coin => {
                coin.setScale(1);
                coin.setOrigin(0);
                this.physics.add.existing(coin, true);
                coin.body.setSize(18, 18);
                coin.body.setOffset(0, 0);
            });
            this.coinGroup = this.add.group(this.coins);

            // Player creation
            this.player = new Player(this, 100, 100);

            // Collisions
            this.physics.add.collider(this.player.sprite, groundLayer);
            this.physics.add.overlap(this.player.sprite, this.coinGroup, (obj1, obj2) => {
                this.physics.world.disable(obj2);
                obj2.destroy();
                this.coinCount++;
                if (this.coinCount >= this.totalCoins) {
                    this.my.text.end.setText("LEVEL COMPLETE!\nPress R to restart").setVisible(true);
                    this.player.sprite.body.enable = false;
                    this.input.keyboard.once("keydown-R", () => {
                        this.scene.restart();
                    });
                }
            });

            // UI
            this.my.text.end = this.add.text(700, 450, "", {
                fontSize: 32,
                color: "white"
            }).setScrollFactor(0).setVisible(false);

            // Input
            cursors = this.input.keyboard.createCursorKeys();
            this.jumpSound = this.sound.add("jump");

            // Camera (keep visual scale via zoom)
            this.cameras.main.setZoom(SCALE);
            this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
            this.cameras.main.startFollow(this.player.sprite, true, 1, 0);

            // Particles
            this.my.vfx.run = this.add.particles(0, 0, "smokeRun", {
                lifespan: 300,
                speedX: { min: -20, max: -40 },
                scale: { start: 0.4, end: 0 },
                quantity: 1,
                frequency: 150
            });
            this.my.vfx.jump = this.add.particles(0, 0, "smokeJump", {
                lifespan: 400,
                speedY: { min: -40, max: -60 },
                scale: { start: 0.4, end: 0 },
                quantity: 1,
                frequency: 300
            });

            this.coinCount = 0;
            this.totalCoins = this.coinGroup.getChildren().length;
            this.jumpPressed = false;
        }

    update() {
        this.player.update();
    }
}

