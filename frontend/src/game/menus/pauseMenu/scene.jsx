import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

class PauseMenu extends Phaser.Scene{
    constructor(){
        super({key: "pauseMenu"});
    };
    
    create(data){
        console.log("pause menu");
        
        console.log("prev: ",data.previousScene);

        const visibility = 0;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; // Half visibility for horizontal line

        this.previousScene = data.previousScene;

        this.scene.pause(this.previousScene);
        this.cameras.main.setBackgroundColor("#74874e");

        this.layout = this.add.container(lineX, lineY);
        
        this.resumeBtn();
        this.LevelSelectBtn();
    };

    resumeBtn(){
        const resumeEvent = () =>{
            console.log("resume: ",`${this.previousScene}` );
            this.scene.resume(this.previousScene);
            this.scene.stop("pauseMenu");
        };

        const resumeBtn = new ButtonCreate(this,0,-50, "Resume", 25, 100, 300, 0xe85f5f,0x914c4c, resumeEvent, true).setCenter();
        this.layout.add(resumeBtn);
    };

    LevelSelectBtn(){
        const goLevelSelect = () =>{
            console.log("resume: ",`${this.previousScene}` );
            this.scene.start("levelSelect");
            this.scene.stop("pauseMenu");
            this.scene.stop(this.previousScene);
        };

        const levelSelectBtn = new ButtonCreate(this,0,100, "Quit", 25, 100, 300, 0xe85f5f,0x914c4c, goLevelSelect, true).setCenter();
        this.layout.add(levelSelectBtn);
    }
};

export default PauseMenu;