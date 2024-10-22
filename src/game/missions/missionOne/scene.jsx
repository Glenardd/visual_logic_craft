import PlatformCreate from "../../utils/addPlatforms";
import EnemyCreate from "../../utils/addEnemies";
import Player from "../../utils/Player";

import { platformsDataMissionOne } from "../../objData/platformsDataMissionOne";

class MissionOne extends Phaser.Scene {
    constructor() {
        super({ key: "missionOne" });
    };

    create(data) {

        //enemy names when defeated contained here
        const destroyedEnemies = data.destroyedEnemies || [];   
        
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
        const addNewPlatform = new PlatformCreate(this, this.player, this.platformGroup, platformsDataMissionOne);
        addNewPlatform.addPlatforms();

        const platform = addNewPlatform.platformGroup.children.entries;
        const platformEnemy1 = new EnemyCreate(this, platform[1], 2, this.player, "group 1", destroyedEnemies);
        const platformEnemy2 = new EnemyCreate(this, platform[2], 1, this.player, "group 2", destroyedEnemies);
        const platformEnemy3 = new EnemyCreate(this, platform[4], 2, this.player, "group 3", destroyedEnemies);

        [platformEnemy1, platformEnemy2, platformEnemy3].forEach(enemyGroup => {
            if(enemyNewHp === 0){
                enemyGroup.destroyEnemy(enemyName);
            };
        });
    };

    update() {
        this.cameras.main.followOffset.x = -this.Width / 2;

        // Handle keydown events
        this.input.keyboard.on('keydown', (event) => {
            // Move Right
            if (event.key === "d") {
                this.player.body.setVelocityX(360);
                this.cameras.main.followOffset.x = -this.Width / 2;
            }
            // Move Left
            else if (event.key === "a") {
                this.player.body.setVelocityX(-360);
            }
            // Jump
            if (event.key === "w" && this.player.body.touching.down) {
                this.player.body.setVelocityY(-380);
            };
        });

        // Handle keyup events to stop the player
        this.input.keyboard.on("keyup", (event) => {
            if (["a", "d"].includes(event.key)) {
                this.player.body.setVelocityX(0);
            }
        });
    };
};

export default MissionOne;