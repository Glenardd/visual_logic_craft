import PlatformCreate from "../../../utils/addPlatforms";
import EnemyCreate from "../../../utils/addEnemies";
import Player from "../../../utils/Player";

import { platformsDataMissionOne } from "../../../objData/platformData";
import PauseButton from "../../../utils/pauseBtn";
import PlayerLivesCount from "../../../utils/playerLivesCount";
import AddLine from "../../../utils/addLayoutGuide";

class MissionOne extends Phaser.Scene {
    constructor() {
        super({ key: "missionOne" });
    };

    create(data) {

        console.log("Mission 1");
        
        //lives count
        this.livesRemaining = data.livesRemaining !== undefined ? data.livesRemaining : 3;

        //enemy names when defeated contained here
        this.destroyedEnemies = data.destroyedEnemies || [];

        console.log(this.destroyedEnemies);
        
        const enemyNewHp = data.enemyNewHp;
        const enemyName = data.enemyName;

        //camera area
        this.Width = this.cameras.main.width;
        this.Height = this.cameras.main.height;

        //area
        const width = this.Width;
        const height = this.Height;

        //json the preloaded assets
        const assetLoad = data.assetImg;
        const assets = {
            background: assetLoad.background,
            foreground: assetLoad.foreground,
            foreground_two: assetLoad.foreground_two,
        };

        //add the bg
        this.backGround = this.add.image(0,0, assets.background);
        this.backGround.setScrollFactor(0);
        this.backGround.setOrigin(0);
        this.backGround.setDisplaySize(width, height);

        //add the fg
        this.foreGround = this.add.tileSprite(0,0,width,0, assets.foreground);
        this.foreGround.setScrollFactor(0.25);
        this.foreGround.setOrigin(0);
        this.foreGround.setScale(5);

        //add second fg
        this.foreGround_two = this.add.tileSprite(0,100,width,0, assets.foreground_two);
        this.foreGround_two.setScrollFactor(0.5);
        this.foreGround_two.setOrigin(0);
        this.foreGround_two.setScale(5);
        
        //when player returns to this scene
        const playerX =  data.playerPrevPos?.x || 0;
        const playerY =  data.playerPrevPos?.y || 0;

        const visibility = 0;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.07, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line
        this.livesCount = new PlayerLivesCount(this, lineX, lineY, this.livesRemaining, 3, this.destroyedEnemies, assets);
        this.maxLives = this.livesCount.lives;

        this.player = new Player(this, playerX,playerY, 90, 90, 0xed5f5f, "Player 1");
        this.player.addPhysics();
        this.player.setCamera(this.cameras, width, height);

        //create the object platform class
        this.platformGroup = this.physics.add.staticGroup();
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionOne, 0x78B3CE);
        addNewPlatform.addPlatforms();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[1], 1, this.player, "Enemy 1", this.destroyedEnemies, this.livesRemaining, assetLoad, 0x78B3CE);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 1, this.player, "Enemy 2", this.destroyedEnemies, this.livesRemaining, assetLoad, 0x78B3CE);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 1, this.player, "Enemy 3", this.destroyedEnemies, this.livesRemaining, assetLoad, 0x78B3CE);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if(enemyNewHp === 0){
                enemyGroup.destroyEnemy(enemyName);
            };
        });

        //checks if all enemies are destroyed empty
        const allEmpty = [platformEnemy1, platformEnemy2, platformEnemy3].every(platform => platform.allEnemies.length === 0);
        if(allEmpty){
            addNewPlatform.door(5, this.maxLives, assets);
        };

        const x = data.playerPrevPos?.x || platform[0].width/2 + platform[0].x;
        const y = data.playerPrevPos?.y || platform[0].y - platform[0].height/2;
        this.player.x = x 
        this.player.y = y; 

        //pause btn
        new PauseButton(this, this.Width, this.Height, this.destroyedEnemies, this.maxLives, assetLoad);

        if(this.livesRemaining < 0){
            this.scene.start("gameOver", {assetImg: assetLoad ,previousScene: this.scene.key,livesRemaining: this.maxLives});
            this.scene.stop();
        };
    };

    update() {
        this.player.setCameraOffset(this.cameras);
        this.player.setPlayerMovement();

        //if player falls subtract the lives
        if(this.player.y > this.Height){
            this.livesCount.Subtract(1);
        };
    };
};

export default MissionOne;