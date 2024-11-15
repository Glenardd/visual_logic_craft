import PlatformCreate from "../../utils/addPlatforms";
import EnemyCreate from "../../utils/addEnemies";
import Player from "../../utils/Player";
import {pauseBtn} from "../../buttons/pauseButton/pauseBtn";

import { platformsDataMissionTwo } from "../../objData/platformData";

class MissionTwo extends Phaser.Scene {
    constructor() {
        super({ key: "missionTwo" });
    };

    create(data) {

        console.log("Mission 2");

        //enemy names when defeated contained here
        this.destroyedEnemies = data.destroyedEnemies || [];   
        
        const enemyNewHp = data.enemyNewHp;
        const enemyName = data.enemyName;
        const playerNewPos = data.playerNewPos;

        //camera area
        this.Width = this.cameras.main.width;
        this.Height = this.cameras.main.height;

        //area
        const width = this.Width;
        const height = this.Height;

        //container
        const container = this.add.container(width/2, height / 2);
        
        //when player returns to this scene
        const playerX = playerNewPos === undefined ? width*-0.4 : playerNewPos.x;
        const playerY = playerNewPos === undefined ? 0 : playerNewPos.y;

        this.player = new Player(this, playerX,playerY, 90, 90, 0xed5f5f, "Player 1");
        this.player.addPhysics();
        this.player.setCamera(this.cameras, width, height);
        container.add(this.player);

        //create the object platform class
        this.platformGroup = this.physics.add.staticGroup();
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionTwo, 0xc9a85b);
        addNewPlatform.addPlatforms();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[1], 2, this.player, "group 1", this.destroyedEnemies);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 1, this.player, "group 2", this.destroyedEnemies);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 2, this.player, "group 3", this.destroyedEnemies);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if(enemyNewHp === 0){
                enemyGroup.destroyEnemy(enemyName);
            };
        });
    };

    update() {
        pauseBtn(this, this.Width, this.Height, this.destroyedEnemies);
        this.player.setCameraOffset(this.cameras, this.Width);
        this.player.setPlayerMovement();
    };
};

export default MissionTwo;