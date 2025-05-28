class PlayerLivesCount extends Phaser.GameObjects.Container {
    constructor(scene, x, y, currentLives) {
        super(scene, x, y);

        this.x = x;
        this.y = y;
        this.scene = scene;
        this.currentLives = currentLives; // Remaining lives
        this.heartSprites = []; // Initialize heartSprites array
        this.heartSpritesEmpty = []; // Initialize empty heartSprites array

        this.drawLivesEmpty(); // Draw empty hearts
        this.drawLives();

        this.scene.add.existing(this);
    };

    Subtract(value) {
        this.currentLives -= value;

        this.drawLivesEmpty(); // Update the empty hearts
        this.drawLives(); // Update the visual representation of lives

        if (this.currentLives < 0) {
            this.scene.scene.pause();
        } else {
        }
    };

    drawLives() {
        // Clear existing graphics

        const spacing = 30; // Spacing between hearts

        for (let i = 0; i < this.currentLives; i++) {
            const xOffset = i * (32 * 2 + spacing);

            const heartSprite = this.scene.add.sprite(xOffset, 0, 'hearts', 1);
            heartSprite.setScale(5);
            heartSprite.setScrollFactor(0); // Hearts don't move with camera
            heartSprite.setOrigin(0);

            this.add(heartSprite);
            this.heartSprites.push(heartSprite);
        };
    };

    // Draw empty hearts for remaining lives
    drawLivesEmpty() {
        this.removeAll(true);
        const spacing = 30; // Spacing between hearts

        for (let i = 0; i < 3; i++) {
            const xOffset = i * (32 * 2 + spacing);

            const heartSpriteEmpty = this.scene.add.sprite(xOffset, 0, 'hearts_empty', 1);
            heartSpriteEmpty.setScale(5);
            heartSpriteEmpty.setScrollFactor(0); // Hearts don't move with camera
            heartSpriteEmpty.setOrigin(0);

            this.add(heartSpriteEmpty);
            this.heartSpritesEmpty.push(heartSpriteEmpty);
        };
    };
};

export default PlayerLivesCount;
