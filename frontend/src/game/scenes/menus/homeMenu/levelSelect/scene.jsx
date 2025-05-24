import Button from "../../../../utils/addButton";
import GridContainer from "../../../../utils/grid_container/gridContainer";
import { levels } from "./buttonLabels";

class LevelSelect extends Phaser.Scene {
    constructor() {
        super({ key: "Level Select" });
    };

    create(data) {

        console.log("Level Select data: ", data);

        //will detect if a mission is done when returned to level select
        // console.log(data?.levelAccomplished || "none accomplished yet!");

        // this.missionDone = data?.levelAccomplished;

        // this.livesRemaining = data.livesRemaining;
        // this.destroyedEnemies = data.destroyedEnemies;

        this.previousScene = data?.previousScene;
        console.log(this.previousScene);

        this.width_ = this.scale.width;
        this.height_ = this.scale.height;

        // const line = new AddLine(this, this.width_, this.Height);

        // this.visibility = 0;

        // this.levelSelection = this.add.container(
        //     line.createVerticalLine(0.5,this.visibility).PosX,
        //     line.createHorizontalLine(0.5,this.visibility).PosY,
        // );

        this.levelSelectbtn();
        this.returnBtn();
    };

    levelSelectbtn() {
        //empty only since this is a mission select only
        const data_ = {};

        //instance of the button
        const button = new Button(this, levels, {
            x: this.width_,
            y: this.height_,
            orientation: "y",
            btn_width: 300,
            btn_height: 50,
            fontSize: 30,
            isGrid: false,
            btn_color: 0x349354,
            text_spacing: 15,
            button_spacing: 20,
            data: data_,
        });

        button.button_header_layout("Level Select", { fontSize: 60, space: 40 });
    };

    //this will return the button from the previous scene
    returnBtn() {
        const data_ = {
            previousScene: this.previousScene,
        };

        const button = new Button(this, [{text: "Return"}], {
            x: this.width_,
            y: this.height_,
            btn_color: 0xB2393B,
            orientation: "y",
            btn_width: 200,
            btn_height: 50,
            fontSize: 30,
            isGrid: true,
            text_spacing: 15,
            button_spacing: 20,
            data: data_,
        });
        
        //activate the one button only layout
        button.button_only_layout();

        //get the grid container
        const container = new GridContainer(this, { 
            x: this.width_, 
            y: this.height_,
        });

        //insert the button object
        container.insert(button, 3, 3);
    };
};

export default LevelSelect;