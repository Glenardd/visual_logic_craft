import PlatformCreate from "../../utils/addPlatforms";
import EnemyCreate from "../../utils/addEnemies";
import Player from "../../utils/Player";

import {pauseBtn} from "../../buttons/pauseButton/pauseBtn";
import { platformsDataMissionTwo } from "../../objData/platformData";
import PlayerLivesCount from "../../utils/playerLivesCount";
import AddLine from "../../utils/addLayoutGuide";

class MissionTwo extends Phaser.Scene {
    constructor() {
        super({ key: "missionTwo" });
    };

    create(data) {

        console.log("Mission 2");

        //lives count
        this.livesRemaining = data.livesRemaining !== undefined ? data.livesRemaining : 3;

        //enemy names when defeated contained here
        this.destroyedEnemies = data.destroyedEnemies || [];   
        
        const enemyNewHp = data.enemyNewHp;
        const enemyName = data.enemyName;

        //camera area
        this.Width = this.cameras.main.width;
        this.Height = this.cameras.main.height;

        //area
        const width = this.Width;
        const height = this.Height;

        //container
        const container = this.add.container(width/2, height / 2);
        
        //when player returns to this scene
        const playerX =  data.playerPrevPos?.x || width*-0.4;
        const playerY =  data.playerPrevPos?.y || 0;

        const visibility = 0;

        const addLine = new AddLine(this, width, height);
        const lineX = addLine.createVerticalLine(0.07, visibility).PosX; // Full visibility for vertical line
        const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line
        this.livesCount = new PlayerLivesCount(this, lineX, lineY, this.livesRemaining, 3, this.destroyedEnemies);

        this.player = new Player(this, playerX,playerY, 90, 90, 0xed5f5f, "Player 1");
        this.player.addPhysics();
        this.player.setCamera(this.cameras, width, height);
        container.add(this.player);

        //create the object platform class
        this.platformGroup = this.physics.add.staticGroup();
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionTwo, 0xc9a85b);
        addNewPlatform.addPlatforms();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[1], 1, this.player, "Enemy 1", this.destroyedEnemies, this.livesRemaining);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 1, this.player, "Enemy 2", this.destroyedEnemies, this.livesRemaining);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 1, this.player, "Enemy 3", this.destroyedEnemies, this.livesRemaining);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if(enemyNewHp === 0){
                enemyGroup.destroyEnemy(enemyName);
            };
        });
        pauseBtn(this, this.Width, this.Height, this.destroyedEnemies, this.livesCount.lives);
    };  

    update() {
        this.player.setCameraOffset(this.cameras, this.Width);
        this.player.setPlayerMovement();

        //if player falls subtract the lives
        if(this.player.y >= 700){
            this.livesCount.Subtract(1);
        };
    };
};

export default MissionTwo;