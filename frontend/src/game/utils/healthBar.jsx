class HealthBar extends Phaser.GameObjects.Container{
    constructor(scene,x, y, value){
        super(scene,x, y);

        this.scene = scene;
        this.maxHealth = 100;
        this.currentHealth = this.maxHealth;
        this.healthBarWidth = 700;

        this.healthProgressBar = this.scene.add.rectangle(0, 0, this.healthBarWidth, 40, 0x74db4f);
        this.healthProgressBar.setOrigin(0);
        this.healthProgressBar.setStrokeStyle(4, 0x00000);

        this.add(this.healthProgressBar);

        //add to scene
        this.scene.add.existing(this);
    };

    //add health
    Add(value){
        this.currentHealth +=value;
        this.updateHp();
    };

    //subtract health
    Subtract(value){
        this.currentHealth -=value;
        this.updateHp();
        
    };

    //display the progress bar
    updateHp(){
        this.currentHealth = Phaser.Math.Clamp(this.currentHealth,0, this.maxHealth);
        let hpPercent = (this.currentHealth / this.maxHealth) * this.healthBarWidth

        this.scene.tweens.add({
            targets: this.healthProgressBar,
            width: hpPercent,
            duration: 500, // Adjust duration for desired speed
            ease: 'Power 1',
            onUpdate: () =>{
                hpPercent = this.healthProgressBar.width * this.healthBarWidth; 
            },
        });
    };
};

export default HealthBar;