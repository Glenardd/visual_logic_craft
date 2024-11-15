class Enemy extends Phaser.GameObjects.Rectangle{
    constructor(scene, x, y, width, height, color, collides, name){
        super(scene,x,y,width,height,color);

        this.health = 0;

        this.name = name;

        this.setOrigin(0.5, 0.5);

        this.setStrokeStyle(4, "#00000");

        scene.physics.add.existing(this);
        
        this.body.setGravityY(220);

        scene.physics.add.collider(this,collides);

        //patrolling from point a to b
        scene.tweens.add({
            targets: this,
            x: 0,
            repeat: -1,
            ease:"linear",
            onUpdate: () => {
                // Update the text position to follow the enemy
                this.nameText.setPosition(this.x, this.y - this.height / 2 - 10);
            }
        });
        scene.tweens.add({
            targets: this,
            x: x+ Phaser.Math.Between(50, 100),
            repeat: -1,
            ease:"linear",
            yoyo: true,
            onUpdate: () => {
                // Update the text position to follow the enemy
                this.nameText.setPosition(this.x, this.y - this.height / 2 - 30);
            }
        });

        // Create text for the enemy name above the enemy rectangle
        this.nameText = scene.add.text(x, y - height / 2 - 10, this.name, {
            fontSize: '30px',
            color: '#ffffff',
            fontStyle: 'bold',
        });
        this.nameText.setOrigin(0.5, 0.5);

        // Link the text's position to the enemy's position
        scene.add.existing(this.nameText);
        //add the rect to the scene
        scene.add.existing(this);
    };
};

export default Enemy;