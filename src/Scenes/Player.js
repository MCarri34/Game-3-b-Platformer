// Player.js
class Player {
    constructor(scene, x, y) {
        this.scene = scene;
        this.sprite = scene.physics.add.sprite(x, y, "playerIdle").setScale(1);
        scene.physics.world.once("worldstep", () => {
            this.sprite.body.setSize(18, 18);
        });
        this.sprite.setCollideWorldBounds(true);
        this.facingRight = true;
        this.jumpPressed = false;

        // Floaty feel: lower gravity
        this.sprite.body.setGravityY(400);

        // Input
        this.cursors = scene.input.keyboard.createCursorKeys();

        // Particle emitters
        this.runVfx = scene.add.particles(0, 0, "smokeRun", {
            lifespan: 200,
            speedX: { min: -10, max: -15 },
            scale: { start: 0.05, end: 0 },
            quantity: 1,
            frequency: 500
        });

        this.jumpVfx = scene.add.particles(0, 0, "smokeJump", {
            lifespan: 250,
            speedY: { min: -20, max: -30 },
            scale: { start: 0.05, end: 0 },
            quantity: 1,
            frequency: 600
        });

        // Sound
        this.jumpSound = scene.sound.add("jump", { volume: 0.15 });
    }

    update() {
        const accel = 600;   // Slower build-up
        const maxSpeed = 300; // Lower top speed
        const decel = 400;   // Gentle slowdown

        const body = this.sprite.body;

        // Horizontal movement
        if (this.cursors.left.isDown) {
            this.sprite.setAccelerationX(-accel);
            this.sprite.setFlipX(false);
            this.facingRight = false;
        } else if (this.cursors.right.isDown) {
            this.sprite.setAccelerationX(accel);
            this.sprite.setFlipX(true);
            this.facingRight = true;
        } else {
            this.sprite.setAccelerationX(0);
            if (body.velocity.x > 0) {
                this.sprite.setVelocityX(Math.max(body.velocity.x - decel * this.scene.game.loop.delta / 1000, 0));
            } else if (body.velocity.x < 0) {
                this.sprite.setVelocityX(Math.min(body.velocity.x + decel * this.scene.game.loop.delta / 1000, 0));
            }
        }

        // Limit max horizontal speed
        if (body.velocity.x > maxSpeed) body.setVelocityX(maxSpeed);
        if (body.velocity.x < -maxSpeed) body.setVelocityX(-maxSpeed);

        // Texture swap + directional VFX
        if (Math.abs(body.velocity.x) > 0) {
            this.sprite.setTexture("playerRun");
            const offset = this.facingRight ? -10 : 10;
            this.runVfx.emitParticleAt(this.sprite.x + offset, this.sprite.y + 20);
        } else {
            this.sprite.setTexture("playerIdle");
        }

        // Floaty jump
        if (this.cursors.up.isDown && !this.jumpPressed) {
            this.jumpSound.play();
            this.sprite.setVelocityY(-600); // Moderate jump height
            this.jumpVfx.emitParticleAt(this.sprite.x, this.sprite.y + 10);
            this.jumpPressed = true;
        }

        if (this.cursors.up.isUp) {
            this.jumpPressed = false;
        }
    }
}
