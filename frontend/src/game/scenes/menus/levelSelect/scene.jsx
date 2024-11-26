import AddLine from "../../../utils/addLayoutGuide";
import ButtonCreate from "../../../utils/addButton";

//backgrounds
//Mission one
import background_1 from "../../../../assets/background_mission_one/cloud_bg.png";
import foreground_1 from "../../../../assets/background_mission_one/cloud_fg.png";
import foreground_two_1 from "../../../../assets/background_mission_one/cloud_fg_two.png"

//mission two
import background_2 from "../../../../assets/background_mission_two/Hills_Layer_01.png";
import foreground_2 from "../../../../assets/background_mission_two/Hills_Layer_02.png";
import foreground_two_2 from "../../../../assets/background_mission_two/Hills_Layer_03.png";

class LevelSelect extends Phaser.Scene{
    constructor(){
        super({key: "levelSelect"});
        this.changeScene = this.changeScene.bind(this);

        this.bg = [];
    };

    preload(){
        this.load.image("background_1", background_1);
        this.load.image("foreground_1", foreground_1);
        this.load.image("foreground_two_1", foreground_two_1);

        this.load.image("background_2", background_2);
        this.load.image("foreground_2", foreground_2);
        this.load.image("foreground_two_2", foreground_two_2);
    };

    create(data){

        //preloaded bg from titleScreen
        const forest_bg_frames = data.forest_bg_frames;

        //check if some scene i still running
        /*
            isPause()
            isSleeping()
            isVisible()
            isActive()
        */ 
        this.scene.manager.scenes.forEach(scene =>{
            console.log(`${scene.sys.config.key}: ${scene.sys.isPaused()}`);
        });

        this.livesRemaining = data.livesRemaining;
        this.destroyedEnemies = data.destroyedEnemies;

        this.Width = this.scale.width;
        this.Height = this.scale.height

        const line = new AddLine(this, this.Width, this.Height);

        const visibility = 0;

        this.levelSelection = this.add.container(
            line.createVerticalLine(0.5,visibility).PosX,
            line.createHorizontalLine(0.5,visibility).PosY,
        );

        this.assetsOne = {
            background: "background_1",
            foreground: "foreground_1",
            foreground_two: "foreground_two_1",
        };

        this.assetTwo = {
            background: "background_2",
            foreground: "foreground_2",
            foreground_two: "foreground_two_2",
        };

        //for level select bg
        forest_bg_frames.map((forest,i) =>{
            const x = this.textures.get('forest_bg').get(forest).x + this.Width/2;
            const y = this.textures.get('forest_bg').get(forest).y + this.Height/2 - 450;
            const textureWidth = this.textures.get('forest_bg').get(forest).width + this.Width;
            const textureHeight = this.textures.get('forest_bg').get(forest).height;

            const forest_bg = this.add.tileSprite(x,y,textureWidth ,textureHeight, "forest_bg", forest);

            if(forest ===forest_bg_frames[2]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[3]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[4]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[5]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[6]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[7]){
                forest_bg.setScale(3.7);
            };
            if(forest ===forest_bg_frames[8]){
                forest_bg.setScale(3.7);
                
            };
            if(forest ===forest_bg_frames[9]){
                forest_bg.setScale(3.7);
                forest_bg.y = -200
            };
            if(forest ===forest_bg_frames[10]){
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + this.Height
            };
            if(forest ===forest_bg_frames[11]){
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + this.Height
            };

            this.bg.push({ sprite: forest_bg, speed: (i + 1) * 0.03 })
            forest_bg.setDepth(-1);
        });

        this.levelSelectbtn();
    };

    levelSelectbtn(){

        const missionOneBtn = new ButtonCreate(this,0,0, "Mission One",25, 100,200, 0x88d17b,0x5e9654, ()=>this.changeScene("missionOne", this.livesRemaining, this.assetsOne),true);
        missionOneBtn.setInteractivity(true);
        missionOneBtn.setCenter();
        this.levelSelection.add(missionOneBtn);

        const missionTwoBtn = new ButtonCreate(this,0,70, "Mission Two",25, 100,200 ,0x88d17b,0x5e9654, ()=>this.changeScene("missionTwo", this.livesRemaining, this.assetTwo),true);
        missionTwoBtn.setInteractivity(true);
        missionTwoBtn.setCenter();
        this.levelSelection.add(missionTwoBtn);
    };

    changeScene(sceneName, livesRemaining, assetImg){
        this.scene.launch(sceneName, {livesRemaining:livesRemaining, assetImg: assetImg}); 
        this.scene.stop("levelSelect");
    };

    update(){
        this.bg.forEach(bg => { bg.sprite.tilePositionX += bg.speed; });
    };
};

export default LevelSelect;