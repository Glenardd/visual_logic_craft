//backgrounds
//title screen and missions bg
import forestJson from "../../../../../assets/background_levelSelect/pixel_art_forest.json";
import forestBg from "../../../../../assets/background_levelSelect/pixel_art_forest.png";

//Mission one
import background_1 from "../../../../../assets/background_mission_one/cloud_bg.png";
import foreground_1 from "../../../../../assets/background_mission_one/cloud_fg.png";
import foreground_two_1 from "../../../../../assets/background_mission_one/cloud_fg_two.png"

//mission two
import background_2 from "../../../../../assets/background_mission_two/Hills_Layer_01.png";
import foreground_2 from "../../../../../assets/background_mission_two/Hills_Layer_02.png";
import foreground_two_2 from "../../../../../assets/background_mission_two/Hills_Layer_03.png";

//character or player
import Bob from "../../../../../assets/character/Character.png"
import Slime_blue from "../../../../../assets/character/Slime_Blue.png"

//life bar 
import heart from "../../../../../assets/life_bar/heart.png"

import { mission_bg } from "../../../../utils/mission_bg";


class HomeManager extends Phaser.Scene {
    constructor() {
        super({ key: "Home Manager" });
    };

    preload() {
        //font style
        WebFont.load({
            google: {
                families: ['Dosis'],
            },
        });

        //player sprite
        this.load.spritesheet('Bob', Bob, {
            frameWidth: 64,
            frameHeight: 64
        });

        //enemy sprite
        this.load.spritesheet('Slime_blue', Slime_blue, {
            frameWidth: 32,
            frameHeight: 32
        });

        //life bar
        this.load.spritesheet('hearts', heart, { 
            frameWidth: 16, 
            frameHeight: 16
        });

        //backgrounds for mission
        this.load.image(mission_bg[0].bg1_mission1, background_1);
        this.load.image(mission_bg[0].bg2_mission1, foreground_1);
        this.load.image(mission_bg[0].bg3_mission1, foreground_two_1);

        this.load.image(mission_bg[1].bg1_mission2, background_2);
        this.load.image(mission_bg[1].bg2_mission2, foreground_2);
        this.load.image(mission_bg[1].bg3_mission2, foreground_two_2);

        this.cameras.main.setBackgroundColor('#1d1d1d');

        const loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'LOADING...', {
            fontSize: "50px",
            fontFamily: 'Dosis',
            align: 'center',
        }).setOrigin(0.5);

        this.rexUI.add.sizer({
            x: this.cameras.main.width / 2,
            y: this.cameras.main.height / 2,
        }).add(
            this.rexUI.add.label({
                text: loadingText,
            }),
            "0",
            "center"
        ).layout();

        // Once loading is complete, launch the title screen (or the next scene)
        this.load.on("complete", () => {
            this.scene.start("Login");
        });

        this.load.atlas("forest_bg", forestBg, forestJson);
    };

    create() {
        this.scene.start("forestBackground");
    };
};

export default HomeManager;