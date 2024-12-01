import AddLine from "../../../../utils/addLayoutGuide";
import ReturnButton from "../../../../utils/returnBtn";

class HowToPlay extends Phaser.Scene{
    constructor(){
        super({key: "howToPlay"});
    };

    create(data){

        this.previousScene = data?.previousScene;

        this.Width = this.cameras.main.width;
        this.Height = this.cameras.main.height;

        this.visibility = 1;
        console.log("how to play scene");
        
        this.scene.launch("forestBackground");

        this.returnHome();
    };

    returnHome(){
        const line = new AddLine(this, this.Width, this.Height);
        const lineX = line.createVerticalLine(0.03,this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03,this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, this.previousScene);
    };
};

export default HowToPlay;