import PlatformCreate from "../../../utils/addPlatforms";
import EnemyCreate from "../../../utils/addEnemies";
import Player from "../../../utils/Player";

import { platformsDataMissionTwo } from "../../../objData/platformData";
import PlayerLivesCount from "../../../utils/playerLivesCount";
import AddLine from "../../../utils/addLayoutGuide";

import Button from "../../../utils/addButton";
import GridContainer from "../../../utils/grid_container/gridContainer";

class MissionTwo extends Phaser.Scene {
    constructor() {
        super({ key: "Mission Two" });
    };

    create(data) {
        console.log("Mission Two data: ",data);

        this.data_ = data[1];

        //lives count
        this.livesRemaining = this.data_.livesRemaining !== undefined ? this.data_.livesRemaining : 3;

        // //enemy names when defeated contained here
        this.destroyedEnemies = this.data_.destroyedEnemies || [];

        const enemyNewHp = this.data_.enemyNewHp;
        const enemyName = this.data_.enemyName;

        //camera area
        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        //json the preloaded assets
        const assetLoad = this.data_.assetImg;
        const assets = {
            background: assetLoad.background,
            foreground: assetLoad.foreground,
            foreground_two: assetLoad.foreground_two,
        };

        //add the bg
        this.backGround = this.add.image(0, 0, assets.background);
        this.backGround.setScrollFactor(0);
        this.backGround.setOrigin(0);
        this.backGround.setDisplaySize(this.width_, this.height_);

        //add the fg
        this.foreGround = this.add.tileSprite(0, 0, this.width_, 0, assets.foreground);
        this.foreGround.setScrollFactor(0.25);
        this.foreGround.setOrigin(0);
        this.foreGround.setScale(5);

        //add second fg
        this.foreGround_two = this.add.tileSprite(0, 100, this.width_, 0, assets.foreground_two);
        this.foreGround_two.setScrollFactor(0.5);
        this.foreGround_two.setOrigin(0);
        this.foreGround_two.setScale(5);

        //when player returns to this scene
        const playerX = this.data_.playerPrevPos?.x || 0;
        const playerY = this.data_.playerPrevPos?.y || 0;

        const visibility = 0;

        const addLine = new AddLine(this, this.width_, this.height_);
        const lineX = addLine.createVerticalLine(0.07, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line
        this.livesCount = new PlayerLivesCount(this, lineX, lineY, this.livesRemaining, 3, this.destroyedEnemies, assets);
        this.maxLives = this.livesCount.lives;

        this.player = new Player(this, playerX, playerY, 90, 90, 0xed5f5f, "Player 1");
        this.player.addPhysics();
        this.player.setCamera(this.cameras, this.width_, this.height_);

        //create the object platform class
        this.platformGroup = this.physics.add.staticGroup();
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionTwo, 0xc9a85b);
        addNewPlatform.addPlatforms();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[1], 2, this.player, "Enemy 1", this.destroyedEnemies, this.livesRemaining, assetLoad, 0xc9a85b);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 2, this.player, "Enemy 2", this.destroyedEnemies, this.livesRemaining, assetLoad, 0xc9a85b);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 1, this.player, "Enemy 3", this.destroyedEnemies, this.livesRemaining, assetLoad, 0xc9a85b);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if (enemyNewHp === 0) {
                enemyGroup.destroyEnemy(enemyName);
            };
        });

        const x = data.playerPrevPos?.x || platform[0].width / 2 + platform[0].x;
        const y = data.playerPrevPos?.y || platform[0].y - platform[0].height / 2;
        this.player.x = x
        this.player.y = y;

        //checks if all enemies are destroyed empty
        const allEmpty = [platformEnemy1, platformEnemy2, platformEnemy3].every(platform => platform.allEnemies.length === 0);
        if (allEmpty) {
            addNewPlatform.door(5, this.maxLives, assets);
        };

        if (this.livesRemaining < 0) {
            this.scene.start("gameOver", { assetImg: assetLoad, previousScene: this.scene.key, livesRemaining: this.maxLives });
            this.scene.stop();
        };

        this.pauseBtn();
    };

    pauseBtn(){

        const labelsMenu = [
            {text: "Menu"},
        ];

        const data_ = {
            previousScene: this.scene.key,
            livesRemaining: this.livesCount.lives,
            destroyedEnemies: this.destroyedEnemies,
            assetImg: this.data_.assetImg,
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
            isPausetype: true,
            data: data_,
        });
        
        button.button_only_layout();
        const container = new GridContainer(this, { 
            x: this.width_, 
            y: this.height_,
        });

        container.insert(button, 41, 2);
    };

    update() {
        this.player.setCameraOffset(this.cameras);
        this.player.setPlayerMovement(this.foreGround);

        //if player falls subtract the lives
        if (this.player.y > this.Height) {
            this.livesCount.Subtract(1);
        };
    };
};

export default MissionTwo;