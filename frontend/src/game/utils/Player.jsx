class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y, playerName) {
        super(scene, x, y, 'Bob'); // 'Bob' is the sprite key you preloaded

        this.health = 100;
        this.scene = scene;
        this.playerName = playerName;

        this.setOrigin(0.5, 1);
        this.setScale(4); // Optional scale adjustment
        this.setDepth(1);   // Optional layering

        // Add to scene and enable physics
        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);

        // Gravity and bounce
        this.body.setGravityY(350);

        this.body.setSize(16, 31);
        this.body.setOffset(25, 17);
    }

    setCamera(camera, width, height) {
        camera.main.setBounds(0, 200, width * 3.3, height);
        camera.main.startFollow(this);
        this.scene.time.delayedCall(50, () => {
            camera.main.setLerp(0.1, 0.1);
        });
    };

    setCameraOffset(camera) {
        camera.main.followOffset?.set(0, 0);
    }

    setPlayerMovement() {
        this.keys = this.scene.input.keyboard.addKeys({
            left: Phaser.Input.Keyboard.KeyCodes.A,
            right: Phaser.Input.Keyboard.KeyCodes.D,
            jump: Phaser.Input.Keyboard.KeyCodes.W
        });

        const { left, right, jump } = this.keys;

        if (left.isDown) {
            this.body.setVelocityX(-360);
            this.anims.play("walk", true);
            this.flipX = true;
        } else if (right.isDown) {
            this.body.setVelocityX(360);
            this.anims.play("walk", true);
            this.flipX = false;
        } else {
            this.body.setVelocityX(0);
            this.anims.stop();
        };

        if (jump.isDown && this.body.blocked.down) {
            this.body.setVelocityY(-380);
        };
    };
};

export default Player;
