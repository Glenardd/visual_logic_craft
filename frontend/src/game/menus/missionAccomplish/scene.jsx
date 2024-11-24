import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

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

        console.log(this.assetImg);

        this.restartBtn();
    };

    restartBtn(){
        const restartBtn = new ButtonCreate(this, 0, 0, "Restart", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene(this.previousScene));
        restartBtn.setInteractivity(true)
        restartBtn.setCenter();
        this.layout.add(restartBtn);
    };

    changeScene(sceneName){
        this.scene.start(sceneName, {destroyedEnemies: this.destroyedEnemies,livesRemaining: this.lives, assetImg: this.assetImg}); 
        this.scene.stop("gameOver");
    };

};

export default MissionAccomplish;