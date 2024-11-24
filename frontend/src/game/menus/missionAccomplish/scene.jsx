import AddLine from "../../utils/addLayoutGuide";

class MissionAccomplish extends Phaser.Scene{
    constructor(){
        super({key: "missionFinish"});
    };

    create(){

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const visibility = 1;

        const line = new AddLine(this, this.width, this.height);
        const lineY = line.createHorizontalLine(0.5, visibility).PosY;
        const lineX = line.createVerticalLine(0.5, visibility).PosX; 
        
    };
};

export default MissionAccomplish;