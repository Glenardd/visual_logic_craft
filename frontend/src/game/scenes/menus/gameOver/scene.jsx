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

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const visibility = 0;

        const addLine = new AddLine(this, this.width, this.height);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX;
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; 

        this.layout = this.add.container(lineX, lineY);

        this.gameOverText = this.add.text(0,0,"GAME OVER", {fontSize: "80px"});
        this.gameOverText.setOrigin(0.5); 

        this.layout.add(this.gameOverText);
        this.restartBtn();
        this.exitBtn();

        const assets = {
            background: this.assets.background,
            foreground: this.assets.foreground,
            foreground_two: this.assets.foreground_two,
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
        // this.scene.launch("forestBackground");
    };

    restartBtn(){
        //restart
        const restartBtn = new ButtonCreate(this, 0, 60, "Restart", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene(this.previousScene), true);
        restartBtn.setInteractivity(true)
        restartBtn.setCenter();
        this.layout.add(restartBtn);
    };

    exitBtn(){
        //go back to level select
        const levelSelect = new ButtonCreate(this, 0, 120, "Exit", 25, 80, 200, 0x88d17b, 0x5e9654,  ()=>this.changeScene("homeManager"), true);
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