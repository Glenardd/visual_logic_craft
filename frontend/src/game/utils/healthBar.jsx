class HealthBar extends Phaser.GameObjects.Container{
    constructor(scene,x, y, value){
        super(scene,x, y);

        this.scene = scene;
        this.healthValue = value;

        //add to scene
        this.scene.add.existing(this);
    };

    //add health
    Add(value){
        this.healthValue +=value;
    };

    //subtract health
    Subtract(value){
        this.healthValue -=value; 
    };

    //display the progress bar
    displayHealthBar(){
        const healthProgressBar = this.scene.add.rectangle(0, 0, 700, 40, 0x74db4f);
        healthProgressBar.setOrigin(0);
        healthProgressBar.setStrokeStyle(4, 0x00000);

        this.add(healthProgressBar);
    };
};

export default HealthBar;