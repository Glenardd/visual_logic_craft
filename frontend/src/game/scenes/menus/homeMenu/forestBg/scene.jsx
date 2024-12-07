//title screen and level select bg
import forestJson from "../../../../../assets/background_levelSelect/pixel_art_forest.json";
import forestBg from "../../../../../assets/background_levelSelect/pixel_art_forest.png"

class ForestBackGround extends Phaser.Scene {
    constructor() {
        super({ key: "forestBackground" });
        this.bg = [];
    };

    preload() {

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

        this.load.on("progress", () => {
            this.scene.stop("titleScreen"); // Stop the title screen once loading starts
        });
      
        // Once loading is complete, launch the title screen (or the next scene)
        this.load.on("complete", () => {
            loadingText.destroy()
            this.scene.launch("titleScreen");
        });

        this.load.atlas("forest_bg", forestBg, forestJson);
    };

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        //for title screen and level select bg
        this.forest_bg_frames = this.textures.get('forest_bg').getFrameNames().sort().reverse();
        this.forest_bg_frames.map((forest, i) => {
            const x = this.textures.get('forest_bg').get(forest).x + width / 2;
            const y = this.textures.get('forest_bg').get(forest).y + height / 2 - 450;
            const textureWidth = this.textures.get('forest_bg').get(forest).width + width;
            const textureHeight = this.textures.get('forest_bg').get(forest).height;

            const forest_bg = this.add.tileSprite(x, y, textureWidth, textureHeight, "forest_bg", forest);

            if (forest === this.forest_bg_frames[2]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[3]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[4]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[5]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[6]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[7]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[8]) {
                forest_bg.setScale(3.7);
            };
            if (forest === this.forest_bg_frames[9]) {
                forest_bg.setScale(3.7);
                forest_bg.y = -200;
            };
            if (forest === this.forest_bg_frames[10]) {
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + height;
            };
            if (forest === this.forest_bg_frames[11]) {
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + height;
            };

            this.bg.push({ sprite: forest_bg, speed: (i + 1) * 0.03 });
            forest_bg.setDepth(-1);
        });
    };

    update() {
        this.bg.forEach(bg => { bg.sprite.tilePositionX += bg.speed; });
    };
};

export default ForestBackGround;