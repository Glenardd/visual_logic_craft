import Platform from "./Platform";

class PlatformCreate {
    constructor(scene, player, platformGroup, missionMap) {
        this.missionMap = missionMap;
        this.scene = scene;
        this.player = player;
        this.platformGroup = platformGroup;
    }

    addPlatforms() {
        const width = this.scene.cameras.main.width;
        const height = this.scene.cameras.main.height;

        const platformHeight = 700;
        const platformY = height * 1.2;
        
        const bridgeY1 = height * 0.8;
        const bridgeY2 = height * 0.9;

        // Fetch platform data from the utility function
        const platforms = this.missionMap(width, platformY, bridgeY1, bridgeY2, platformHeight);

        // Loop through the platform data and create platforms
        platforms.forEach(p => {
            const platform = new Platform(this.scene, p.x, p.y, p.width, p.height, 0x5e8c51, this.player);
            this.platformGroup.add(platform);
        });
    }
}

export default PlatformCreate;
