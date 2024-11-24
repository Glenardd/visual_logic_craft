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
        this.lives = data.lives;

        this.scene.pause(this.previousScene);
        this.cameras.main.setBackgroundColor("#74874e");

        this.layout = this.add.container(lineX, lineY);
        
        this.resumeBtn();
        this.LevelSelectBtn();
        this.toggleMusic();
        this.guideBtn();
    };

    //resume button
    resumeBtn(){
        const resumeEvent = () =>{
            console.log("resume: ",`${this.previousScene}` );
            this.scene.resume(this.previousScene);
            this.scene.stop("pauseMenu");
        };

        const resumeBtn = new ButtonCreate(this,0,-100, "Resume", 25, 100, 300, 0xe85f5f,0x914c4c, resumeEvent, true).setCenter();
        this.layout.add(resumeBtn);
    };

    guideBtn(){
        const music = () =>{
            console.log("music playing");
        };

        const toggleMusicBtn = new ButtonCreate(this,0,-25, "How to play", 25, 100, 300, 0xe85f5f,0x914c4c, music, true).setCenter()
        this.layout.add(toggleMusicBtn);
    };

    toggleMusic(){
        const music = () =>{
            console.log("music playing");
        };

        const toggleMusicBtn = new ButtonCreate(this,0,50, "music", 25, 100, 300, 0xe85f5f,0x914c4c, music, true).setCenter()
        this.layout.add(toggleMusicBtn);
    };

    //go back to level selection
    LevelSelectBtn(){
        const goLevelSelect = () =>{
            console.log("quit: ",`${this.previousScene}` );
            this.scene.stop(this.previousScene);
            this.scene.stop("pauseMenu");
            this.scene.start("levelSelect", {livesRemaining: this.lives, destroyedEnemies: []});
        };

        const levelSelectBtn = new ButtonCreate(this,0,125, "Quit", 25, 100, 300, 0xe85f5f,0x914c4c, goLevelSelect, true).setCenter();
        this.layout.add(levelSelectBtn);
    }
};

export default PauseMenu;