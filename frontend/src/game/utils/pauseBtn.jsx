import ButtonCreate from "./addButton";
import AddLine from "./addLayoutGuide";

class PauseButton extends Phaser.GameObjects.Container {
    constructor(scene, width, height, destroyedEnemies, lives, assetImg) {
        super(scene);

        this.scene = scene;
        this.width = width;
        this.height = height;
        this.destroyedEnemies = destroyedEnemies;
        this.lives = lives;
        this.assetImg = assetImg;

        this.createPauseButton();
    }

    createPauseButton() {
        const returnEvent = () => {
            this.scene.scene.launch("pauseMenu", {
                previousScene: this.scene.scene.key,
                destroyedEnemies: this.destroyedEnemies,
                lives: this.lives,
                assetImg: this.assetImg
            });
            this.scene.scene.sendToBack();
        };

        const visibility = 0;

        const addLine = new AddLine(this.scene, this.width, this.height);
        const lineX = addLine.createVerticalLine(0.85, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line

        this.pause = new ButtonCreate(this.scene, 0, 0, "Menu", 25, 50, 150, 0xe85f5f, 0x914c4c, returnEvent, true);
        this.scene.add.container(lineX, lineY).add(this.pause);
    };

    //stop event
    stopListener(){
        this.pause.DisableListners();
    };
};

export default PauseButton;
