class HealthBar extends Phaser.GameObjects.Container{
    constructor(scene,x, y, value, role){
        super(scene,x, y);

        this.scene = scene;
        this.maxHealth = value;
        this.currentHealth = this.maxHealth;
        this.healthBarWidth = 700;
        this.role = role;

        //health progress bar
        this.healthProgressBar = this.scene.add.rectangle(0, 0, this.healthBarWidth, 40, 0x74db4f);
        this.healthProgressBar.setOrigin(0);
        this.healthProgressBar.setStrokeStyle(4, 0x00000);

        //health progress value
        this.healthValue = this.scene.add.text(0,3, `${this.currentHealth}`, {fontSize: 35});
        this.healthValue.x = (this.healthProgressBar.x + this.healthProgressBar.width) -680;
        this.healthValue.setOrigin(0);

        this.updateHealthValuePosition();

        this.add([this.healthProgressBar, this.healthValue]);  
        
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

        this.healthValue.setText(this.currentHealth);

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

    // Update the position of the health value text based on the bar's width
    updateHealthValuePosition() {
        if(this.role === "enemy"){
            //right
            this.healthValue.x = this.healthProgressBar.x + this.healthProgressBar.width - 80;
        }else if(this.role === "player"){
            //left
            this.healthValue.x = this.healthProgressBar.x + 10;
        };
    };
};

export default HealthBar;