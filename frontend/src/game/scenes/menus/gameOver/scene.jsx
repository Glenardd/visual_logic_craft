import ButtonCreate from "../../../utils/addButton";
import AddLine from "../../../utils/addLayoutGuide";

class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "gameOver"});
    };

    create(data){
        console.log(data);
        
        this.assets = data.assetImg;
        this.lives = data.lives;
        this.previousScene = data.previousScene;
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const visibility = 0;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX;
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; 

        this.layout = this.add.container(lineX, lineY);

        this.gameOverText = this.add.text(0,0,"GAME OVER", {fontSize: "80px"});
        this.gameOverText.setOrigin(0.5); 

        this.layout.add(this.gameOverText);
        this.restartBtn();
        this.levelSelectBtn();

        this.scene.launch("forestBackground");
    };

    restartBtn(){
        //restart
        const restartBtn = new ButtonCreate(this, 0, 60, "Restart", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene(this.previousScene), true);
        restartBtn.setInteractivity(true)
        restartBtn.setCenter();
        this.layout.add(restartBtn);
    };

    levelSelectBtn(){
        //go back to level select
        const levelSelect = new ButtonCreate(this, 0, 120, "Level Select", 25, 80, 200, 0x88d17b, 0x5e9654,  ()=>this.changeScene("levelSelect"), true);
        levelSelect.setInteractivity(true)
        levelSelect.setCenter();
        this.layout.add(levelSelect);
    };

    //changes scene
    changeScene(sceneName){
        this.scene.start(sceneName, {livesRemaining: this.lives, assetImg: this.assets}); 
        this.scene.stop("gameOver");
    };
};

export default GameOver;