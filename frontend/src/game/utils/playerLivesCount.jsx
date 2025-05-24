class PlayerLivesCount extends Phaser.GameObjects.Container {
    constructor(scene, x, y, currentLives) {
        super(scene, x, y);

        this.x =x;
        this.y =y;
        this.scene = scene;
        this.currentLives = currentLives; // Remaining lives
        this.heartSprites = []; // Initialize heartSprites array

        this.drawLives();
        this.scene.add.existing(this);
    };

    Subtract(value) {
        this.currentLives -= value;

        this.drawLives(); // Update the visual representation of lives

        if (this.currentLives < 0) {
            this.scene.scene.pause();
        } else {
        }
    };

    drawLives() {
        // Clear existing graphics
        this.removeAll(true);

        const spacing = 30; // Spacing between circles

        for (let i = 0; i < this.currentLives; i++) {
            const xOffset = i * (32 * 2 + spacing);

           const heartSprite = this.scene.add.sprite(xOffset, 0, 'hearts', 1);
           heartSprite.setTint(0xff0000); // Tint the sprite to red
            heartSprite.setScale(5);
            heartSprite.setScrollFactor(0); // Hearts don't move with camera
            heartSprite.setOrigin(0);
            
            this.add(heartSprite);
            this.heartSprites.push(heartSprite);
        };
    }
}

export default PlayerLivesCount;
