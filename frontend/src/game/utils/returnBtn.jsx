import ButtonCreate from "./addButton";

class ReturnButton extends Phaser.GameObjects.Container{
    constructor(scene, x, y, sceneName){
        super(scene, x, y);
        
        this.scene = scene;
        this.sceneName = sceneName;
        this.returnBtn();
    };

    returnBtn(){
        const returnEvent = () => {
            this.scene.scene.start(this.sceneName);
            this.scene.scene.stop();
        };

        const returnbtn = new ButtonCreate(this.scene,0,0, "Return", 25, 50, 150, 0xe85f5f, 0x914c4c,returnEvent, true);
        returnbtn.setInteractivity(true);
        this.add(returnbtn);

        this.scene.add.existing(this);
    };
};

export default ReturnButton;
