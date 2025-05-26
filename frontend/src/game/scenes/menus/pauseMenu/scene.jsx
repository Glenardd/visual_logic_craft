import Button from "../../../utils/addButton.jsx";
import AddLine from "../../../utils/addLayoutGuide.jsx";
import { menuLabels } from "./buttonLabels";
import { mission_bg } from "../../../utils/mission_bg.js";

class PauseMenu extends Phaser.Scene {
    constructor() {
        super({ key: "Menu" });
    };

    create(data) {
        console.log("Pause Menu data: ", data);
        const visibility = 0;

        console.log(data);
        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        const addLine = new AddLine(this, this.width_, this.height_);
        const lineX = addLine.createVerticalLine(0.5, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.5, visibility).PosY; // Half visibility for horizontal line

        this.previousScene = data?.previousScene;
        this.missionScene = data?.missionScene;
        this.livesRemaining = data.livesRemaining;

        //checks if mission 1 or mission 2
        const sceneCheck = this.previousScene || this.missionScene === "Mission One" ? [mission_bg[0].bg1_mission1, mission_bg[0].bg2_mission1] : this.previousScene === "Mission Two" ? [mission_bg[1].bg1_mission2, mission_bg[1].bg3_mission2] : [];

        const assets = {
            background: sceneCheck[0] || null,
            foreground: sceneCheck[1] || null,
        };

        //background
        this.bg = this.add.image(0, 0, assets.background);
        this.bg.setScrollFactor(0);
        this.bg.setOrigin(0);
        this.bg.setScale(5);

        //foreground
        this.fg = this.add.tileSprite(0, 0, this.width_, 0, assets.foreground);
        this.fg.setOrigin(0);
        this.fg.setScale(5);

        this.layout = this.add.container(lineX, lineY);

        this.menuBtns();
    };

    menuBtns() {
        const data_ = {
            previousScene: this.previousScene,
            menuScene: this.scene.key,
            missionScene: this.missionScene
        };

        const button = new Button(this, menuLabels, {
            x: this.width_,
            y: this.height_,
            orientation: "y",
            btn_width: 200,
            btn_height: 50,
            fontSize: 30,
            isGrid: false,
            text_spacing: 15,
            button_spacing: 20,
            data: data_,
            btn_color: 0xB2393B,
        });

        button.button_header_layout("Menu", { fontSize: 60, space: 40 });
    };
    update() {
        this.fg.tilePositionX += 0.25;
    };
};

export default PauseMenu;