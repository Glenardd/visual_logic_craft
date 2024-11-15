import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

class PauseMenu extends Phaser.Scene{
    constructor(){
        super({key: "pauseMenu"});
    };
    
    create(data){
        console.log("pause menu");
        
        console.log("prev: ",data.previousScene);

        const visibility = 0.5;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; // Half visibility for horizontal line

        this.scene.pause(data.previousScene);
        this.cameras.main.setBackgroundColor("#74874e");

        const resumeEvent = () =>{
            console.log("resume: ",`${data.previousScene}` );
            this.scene.resume(`${data.previousScene}`);
            this.scene.stop("pauseMenu");
        };

        this.add.container(lineX, lineY).add(new ButtonCreate(this,0,0, "Resume", 25, 50, 150, 0xe85f5f,0x914c4c, resumeEvent, true).setCenter());

    };
};

export default PauseMenu;