import ButtonCreate from "../../../utils/addButton";
import AddLine from "../../../utils/addLayoutGuide";

class MissionAccomplish extends Phaser.Scene{
    constructor(){
        super({key: "missionFinish"});
    };

    create(data){

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const visibility = 0;

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

        const assets = {
            background: this.assetImg.background,
            foreground: this.assetImg.foreground,
            foreground_two: this.assetImg.foreground_two,
        };

        //add the bg
        this.backGround = this.add.image(0,0, assets.background).setDepth(-1);
        this.backGround.setScrollFactor(0);
        this.backGround.setOrigin(0);
        this.backGround.setDisplaySize(this.width, this.height);

        //add the fg
        this.foreGround = this.add.tileSprite(0,0,this.width,0, assets.foreground).setDepth(-1);
        this.foreGround.setScrollFactor(0.25);
        this.foreGround.setOrigin(0);
        this.foreGround.setScale(5);

        //add second fg
        this.foreGround_two = this.add.tileSprite(0,100,this.width,0, assets.foreground_two).setDepth(-1);
        this.foreGround_two.setScrollFactor(0.5);
        this.foreGround_two.setOrigin(0);
        this.foreGround_two.setScale(5);

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
        const exit = () =>{
            this.scene.launch("levelSelect", {levelAccomplished: this.previousScene});
            this.scene.start("forestBackground");
        };

        const levelSelect = new ButtonCreate(this, 0, 120, "Exit", 25, 80, 200, 0x88d17b, 0x5e9654, exit, true);
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