// import * as monaco from "monaco-editor";
// import AddLine from "../../utils/addLayoutGuide";
// import HealthBar from "../../utils/healthBar";
// import ButtonCreate from "../../utils/addButton_temp";
// import { CreateCard } from "../../utils/addCards";

import { mission_bg } from "../../utils/mission_bg";

import Panel from "./panels/panel";
import Button from "../../utils/addButton";
import GridContainer from "../../utils/grid_container/gridContainer";

class FightScene extends Phaser.Scene {
    constructor() {
        super({ key: "fightScene" });
        this.editor = "";
        this.attempts = 0;
        this.selectedCase = [];
        this.selectedCaseOutput = [];

        this.enemyHealth = 0;
        this.enemyName = "";
        this.currentScene = "";
    };

    pauseBtn() {
        const labelsMenu = [
            { text: "Menu" },
        ];

        const data_ = {
            previousScene: this.scene.key,
            missionScene: this.missionScene,
        };

        const button = new Button(this, labelsMenu, {
            x: this.width_,
            y: this.height_,
            orientation: "y",
            btn_width: 200,
            btn_height: 50,
            fontSize: 30,
            isGrid: true,
            text_spacing: 15,
            button_spacing: 0,
            data: data_,
            btn_color: 0xB2393B,
        });

        button.button_only_layout();

        const MenuBtn = new GridContainer(this, {
            x: this.width_,
            y: this.height_,
        });
        MenuBtn.insert(button, 41, 2);
    };

    create(data) {
        //sleep the forestBg
        this.scene.sleep("forestBackground");

        console.log("Fight Scene data: ", data);
        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        //the main menu
        this.pauseBtn();
        
        //for the panels
        //of cards
        //editors
        //buttons
        new Panel(this);
    };
}

export default FightScene;