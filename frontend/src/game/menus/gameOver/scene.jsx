import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

class GameOver extends Phaser.Scene{
    constructor(){
        super({key: "gameOver"});
    };

    create(data){
        console.log("Game over");

        this.lives = data.lives;
        this.previousScene = data.previousScene;
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const visibility = 0.2;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX;
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; 

        this.layout = this.add.container(lineX, lineY);

        this.gameOverText = this.add.text(0,0,"GAME OVER", {fontSize: "80px"});
        this.gameOverText.setOrigin(0.5); 

        
        //go to level select

        this.layout.add(this.gameOverText);
        this.restartBtn();
    };

    restartBtn(){
        //restart
        const restartBtn = new ButtonCreate(this, 0, 60, "Restart", 25, 80, 200, 0x88d17b, 0x5e9654, ()=>this.changeScene(this.previousScene), true);
        restartBtn.setInteractivity(true)
        restartBtn.setCenter();
        this.layout.add(restartBtn);
    }

    //changes scene
    changeScene(sceneName){
        this.scene.start(sceneName, {livesRemaining: this.lives}); 
        this.scene.stop("gameOver");
    };
};

export default GameOver;