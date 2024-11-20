class PlayerLivesCount extends Phaser.GameObjects.Container {
    constructor(scene, x, y, value) {
        super(scene, x, y);

        this.scene = scene;
        this.lives = value;

        this.drawLives();
        this.scene.add.existing(this);
    }

    drawLives() {

        const circleRadius = 10; // Smaller, more manageable size
        const spacing = 5; // Spacing between circles

        for (let i = 0; i < this.lives; i++) {
            const xOffset = i * (circleRadius * 2 + spacing);

            const livesCount = this.scene.add.circle(xOffset, 0, circleRadius, 0xff0000);
            livesCount.setStrokeStyle(4, "#00000")
            livesCount.setScrollFactor(0);
            livesCount.setOrigin(0);
            this.add(livesCount);
        };
    };
}

export default PlayerLivesCount;
