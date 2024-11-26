import ButtonCreate from "../../../utils/addButton";
import AddLine from "../../../utils/addLayoutGuide";

class MissionAccomplish extends Phaser.Scene{
    constructor(){
        super({key: "missionFinish"});
    };

    create(data){

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const visibility = 1;

        const line = new AddLine(this, this.width, this.height);
        const lineY = line.createHorizontalLine(0.5, visibility).PosY;
        const lineX = line.createVerticalLine(0.5, visibility).PosX; 

        this.layout = this.add.container(lineX, lineY);

        this.livesRemaining = data.livesRemaining;
        this.destroyedEnemies = data.destroyedEnemies;
        this.previousScene = data.previousScene;
        this.assetImg = data.assetImg;

        this.missionAccomplish = this.add.text(0,0,"Objective Complete", {fontSize: "80px"});
        this.missionAccomplish.setOrigin(0.5); 

        this.layout.add(this.missionAccomplish);

        this.restartBtn();
        this.levelSelectBtn();
    };

    restartBtn(){
        const restartBtn = new ButtonCreate(this, 0, 60, "Restart", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene(this.previousScene));
        restartBtn.setInteractivity(true)
        restartBtn.setCenter();
        this.layout.add(restartBtn);
    };

    levelSelectBtn(){
        //go back to level select
        const levelSelect = new ButtonCreate(this, 0, 120, "Exit", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene("levelSelect"), true);
        levelSelect.setInteractivity(true)
        levelSelect.setCenter();
        this.layout.add(levelSelect);
    };

    changeScene(sceneName){
        this.scene.start(sceneName, {destroyedEnemies: this.destroyedEnemies,livesRemaining: this.lives, assetImg: this.assetImg}); 
        this.scene.stop();
    };

};

export default MissionAccomplish;