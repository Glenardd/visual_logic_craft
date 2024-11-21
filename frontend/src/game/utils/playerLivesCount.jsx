class PlayerLivesCount extends Phaser.GameObjects.Container {
    constructor(scene, x, y, currentLives, maxLives) {
        super(scene, x, y);

        this.scene = scene;
        this.lives = maxLives; // Total lives (fixed)
        this.currentLives = currentLives; // Remaining lives

        this.drawLives();
        this.scene.add.existing(this);
    }

    Subtract(value) {
        this.currentLives -= value;

        if (this.currentLives < 0) {
            this.scene.scene.start("gameOver", { previousScene: this.scene.scene.key, lives: this.lives});
            this.currentLives = this.lives; // Reset lives for next session
        } else {
            // Restart the current scene with remaining lives
            this.scene.scene.restart({ livesRemaining: this.currentLives });
        };
    };

    drawLives() {
        // Clear existing graphics
        this.removeAll(true);

        const circleRadius = 20; // Circle size
        const spacing = 10; // Spacing between circles

        for (let i = 0; i < this.currentLives; i++) {
            const xOffset = i * (circleRadius * 2 + spacing);

            const lifeCircle = this.scene.add.circle(xOffset, 0, circleRadius, 0xff0000);
            lifeCircle.setStrokeStyle(4, "#00000");
            lifeCircle.setScrollFactor(0); // Lives don't move with camera
            lifeCircle.setOrigin(0);
            this.add(lifeCircle);
        }
    }
}

export default PlayerLivesCount;
