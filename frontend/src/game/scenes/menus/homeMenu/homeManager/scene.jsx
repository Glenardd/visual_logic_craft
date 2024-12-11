//title screen and level select bg
import forestJson from "../../../../../assets/background_levelSelect/pixel_art_forest.json";
import forestBg from "../../../../../assets/background_levelSelect/pixel_art_forest.png";

class HomeManager extends Phaser.Scene{
    constructor(){
        super({key: "homeManager"});
    };

    preload(){

        this.cameras.main.setBackgroundColor('#1d1d1d');

        const loadingText = this.add.text(this.cameras.main.width / 2, this.cameras.main.height / 2, 'LOADING...', {
            fontSize: "50px",
            align: 'center',
        }).setOrigin(0.5);

        this.rexUI.add.sizer({
            x: this.cameras.main.width/2,
            y: this.cameras.main.height/2,
        }).add(
            this.rexUI.add.label({
                text: loadingText,
            }),
            "0",
            "center"
        ).layout();
      
        // Once loading is complete, launch the title screen (or the next scene)
        this.load.on("complete", () => {
            this.scene.start("login");
        });

        this.load.atlas("forest_bg", forestBg, forestJson);
    };

    create(){
        this.scene.start("forestBackground");
    };
};

export default HomeManager;