import SceneChange from "../../utils/sceneManager";
import AddLine from "../../utils/addLayoutGuide";
import ButtonCreate from "../../utils/addButton";

class LevelSelect extends Phaser.Scene{
    constructor(){
        super({key: "levelSelect"});
        this.changeScene = this.changeScene.bind(this);
    };

    create(){

        this.Width = this.scale.width;
        this.Height = this.scale.height

        const line = new AddLine(this, this.Width, this.Height);

        const visibility = 0;

        this.levelSelection = this.add.container(
            line.createVerticalLine(0.5,visibility).PosX,
            line.createHorizontalLine(0.5,visibility).PosY,
        );

        this.welcomeText();
    };

    welcomeText(){

        const missionOneBtn = new ButtonCreate(this,0,0, "Mission Two",25, 100,200, 0x88d17b,0x5e9654,this.changeScene,true);
        missionOneBtn.setInteractivivity(true);
        missionOneBtn.setCenter();
        this.levelSelection.add(missionOneBtn);
    };

    changeScene(){
        this.scene.start("missionTwo"); 
        this.scene.stop("levelSelect");
        // console.log("mission two");
    };
};

export default LevelSelect;