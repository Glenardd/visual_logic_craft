import Platform from "./Platform";

class PlatformCreate {
    constructor(scene, player, platformGroup, missionMap, platformColor) {
        this.missionMap = missionMap;
        this.scene = scene;
        this.player = player;
        this.platformGroup = platformGroup;
        this.platformColor = platformColor;
    };

    addPlatforms() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;

        const platformHeight = 700;
        const platformY = height * 1.2;
    
        //bridge height spacing
        const bridgeY1 = height * 0.8;
        const bridgeY2 = height * 0.9;

        // Fetch from the platform data
        this.platforms = this.missionMap(width, platformY, bridgeY1, bridgeY2, platformHeight);

        // Loop through the platform data and create platforms
        this.platforms.forEach(p => {
            const platform = new Platform(this.scene, p.x, p.y, p.width, p.height, this.platformColor, this.player);
            this.platformGroup.add(platform);
        });
    };
    
    //door exit
    door(index, assetImg){
        console.log(this.platforms[index]);

        const platformIndex = this.platforms[index];

        const doorY  = platformIndex.y - platformIndex.height/2;
        const doorX = platformIndex.width/2 + platformIndex.x;

        const collideDoor = () =>{
            this.scene.scene.start("missionFinish", {previousScene: this.scene.scene.key ,destroyedEnemies: [], livesRemaining: livesRemaining, assetImg: assetImg});
            //stop the current scene
            this.scene.scene.stop();
        };

        //door object
        const doorObj = this.scene.add.rectangle(doorX, doorY, 100, 150, 0xba7854).setOrigin(0.5, 1);
        doorObj.setStrokeStyle(4, 0x0000);
        this.scene.physics.add.existing(doorObj);
        //door collision
        this.scene.physics.add.overlap(this.player, doorObj, collideDoor, null , this.scene);
    };
};

export default PlatformCreate;
