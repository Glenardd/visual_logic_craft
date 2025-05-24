class Enemy extends Phaser.Physics.Arcade.Sprite{
    constructor(scene, x, y, collides, name){
        super(scene,x,y,'Slime_blue');

        this.scene = scene;
        this.health = 0;
        this.name = name;
        this.x_ =x;
        this.y_ = y;

        this.setOrigin(0.5, 0.5);
        this.setScale(4); // Optional scale adjustment
        this.setDepth(1);   // Optional layering

        this.scene.add.existing(this);
        this.scene.physics.add.existing(this);
        
        this.body.setGravityY(220);

        this.body.setSize(16,16);   
        this.body.setOffset(16, 16);

        this.scene.physics.add.collider(this,collides);

        //patrolling from point a to b
        //starts from 0 to X
        const patrolDistance = Phaser.Math.Between(70, 100);
        this.scene.tweens.add({
            targets: this,
            x: this.x_ + patrolDistance,
            repeat: -1,
            ease:"linear",
            yoyo:true,
            onUpdate: () => {
                // Update the text position to follow the enemy
                this.nameText.setPosition(this.x_, this.y_ - this.x / 2 - 10);

                if(this.x > this.prevX){
                    this.flipX = true;
                    this.anims.play("slime_wander", true);
                }else if(this.x < this.prevX){
                    this.flipX = false;
                };

                this.prevX = this.x;
            } 
        });

        this.prevX = this.x;

        // Create text for the enemy name above the enemy rectangle
        // Adjust the y-position to avoid overlapping with the ground
        this.nameText = this.scene.add.text(this.x, this.y - this.height - 20, `${name}`, {
            fontFamily: "Dosis",
            fontSize: '50px',
            color: '#ffffff', // Set text color to white
            stroke: '#000000', // Add black stroke
            strokeThickness: 1, // Set stroke thickness to 1
        });
        this.nameText.setOrigin(0.5, 0.5);

        // Update the text position to follow the enemy's position
        this.scene.events.on('update', () => {
            this.nameText.setPosition(this.x, this.y - this.height - 20);
        });

        this.nameText.setDepth(1);

        this.nameText.setVisible(false);

        // Add the text to the scene
        this.scene.add.existing(this.nameText);
    };
};

export default Enemy;