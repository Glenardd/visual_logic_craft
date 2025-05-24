import PlatformCreate from "../../../utils/addPlatforms";
import EnemyCreate from "../../../utils/addEnemies";
import Player from "../../../utils/Player";
import { platformsDataMissionOne } from "../../../objData/platformData";
import PlayerLivesCount from "../../../utils/playerLivesCount";
import AddLine from "../../../utils/addLayoutGuide";
import Button from "../../../utils/addButton";
import GridContainer from "../../../utils/grid_container/gridContainer";
import { mission_bg } from "../../../utils/mission_bg";

class MissionOne extends Phaser.Scene {
    constructor() {
        super({ key: "Mission One" });
    };

    create(data) {
        console.log("Mission One data: ", data);

        this.physics.world.createDebugGraphic();

        //animation for character
        if(!this.anims.exists("walk")){
            this.anims.create({
                key: 'walk',
                frames: this.anims.generateFrameNumbers('Bob', { start: 24, end: 25 }),
                frameRate: 8,
                repeat: -1
            });
        };

        if(!this.anims.exists("slime_wander")){
            this.anims.create({
                key: 'slime_wander',
                frames: this.anims.generateFrameNumbers('Slime_blue', { start: 0, end: 5 }),
                frameRate: 8,
                repeat: -1
            });
        };

        //lives count
        this.livesRemaining = data?.livesRemaining || 3;
        //enemy names when defeated contained here
        this.destroyedEnemies = data?.destroyedEnemies || [];
        // this.previousScene = data?.previousScene

        // this.enemyNewHp = this.data_?.enemyNewHp;
        // this.enemyName = this.data_?.enemyName;

        //camera area
        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        //json the preloaded assets
        const assets = {
            background: mission_bg[0].bg1_mission1,
            foreground: mission_bg[0].bg2_mission1,
            foreground_two: mission_bg[0].bg3_mission1,
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
        const visibility = 0;

        const addLine = new AddLine(this, this.width_, this.height_);
        const lineX = addLine.createVerticalLine(0.07, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line
        this.livesCount = new PlayerLivesCount(this, lineX, lineY, this.livesRemaining);

        this.lastPosition = { x: 0, y: 0 };

        //player itself
        const playerX = this.player?.x || 0;
        const playerY = this.player?.y || 0;
        this.player = new Player(this, playerX, playerY,"Player");
        this.player.setCamera(this.cameras, this.width_, this.height_);

        //create the object platform class
        this.platformGroup = this.physics.add.staticGroup();
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionOne, 0x78B3CE);
        addNewPlatform.addPlatforms();

        //use the platforms tho set initial position
        this.setPlayerInitialPosition();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[0], 1, this.player, "Enemy 1", this.destroyedEnemies, this.livesRemaining,0x78B3CE);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 1, this.player, "Enemy 2", this.destroyedEnemies, this.livesRemaining,0x78B3CE);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 1, this.player, "Enemy 3", this.destroyedEnemies, this.livesRemaining,0x78B3CE);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if (this.enemyNewHp === 0) {
                enemyGroup.destroyEnemy(this.enemyName);
            };
        });

        //checks if all enemies are destroyed empty
        const allEmpty = [platformEnemy1, platformEnemy2, platformEnemy3].every(platform => platform.allEnemies.length === 0);
        if (allEmpty) {
            addNewPlatform.door(5, assets);
        };

        if (this.livesRemaining <= 0) {
            this.scene.launch("gameOver", { assetImg: assetLoad, previousScene: this.scene.key });
        };

        this.pauseBtn();
    };

    //initial position of player
    setPlayerInitialPosition() {
        const platform = this.platformGroup.children.entries[0];  // Assuming first platform
        const x = platform.width / 2 + platform.x;
        const y = platform.y - platform.height / 2;

        this.player.setPosition(x, y);
        this.lastPosition = { x, y };  // Save the last position
    };

    pauseBtn() {

        const labelsMenu = [
            { text: "Menu" },
        ];

        const data_ = {
            previousScene: this.scene.key,
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
        const container = new GridContainer(this, {
            x: this.width_,
            y: this.height_,
        });

        container.insert(button, 41, 2);
    };

    update() {
        this.player.setCameraOffset(this.cameras);
        this.player.setPlayerMovement();

        // Detect fall
        if (this.player.y > this.height_) {
            // Subtract life and check if game over happens inside drawLives
            this.livesCount.Subtract(1);

            // Respawn at last saved position
            this.player.setPosition(this.lastPosition.x, this.lastPosition.y - 50);
        }

        // Save last safe position if player is grounded
        if (this.player.body.touching.down) {
            this.lastPosition = { x: this.player.x, y: this.player.y };
        }
    }
};

export default MissionOne;