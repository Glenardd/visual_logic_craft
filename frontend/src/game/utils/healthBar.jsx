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
        return this.healthValue;
    };
};

export default HealthBar;