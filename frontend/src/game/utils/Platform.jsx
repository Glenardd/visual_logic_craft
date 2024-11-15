class Platform extends Phaser.GameObjects.Rectangle {
    constructor(scene, x, y, width, height, color, collides) {
        super(scene, x, y, width, height, color);

        this.setOrigin(0, 0.5);

        scene.add.existing(this);

        scene.physics.add.existing(this, true); // Static platform

        scene.physics.add.collider(this, collides);

        this.body.immovable = true;
        this.setStrokeStyle(4, "#000000")
    }
};

export default Platform;