import AddLine from "../../utils/addLayoutGuide";
import ButtonCreate from "../../utils/addButton";

//backgrounds
//Mission one
import background_1 from "../../../assets/background_mission_one/cloud_bg.png";
import foreground_1 from "../../../assets/background_mission_one/cloud_fg.png";
import foreground_two_1 from "../../../assets/background_mission_one/cloud_fg_two.png"

//mission two
import background_2 from "../../../assets/background_mission_two/Hills_Layer_01.png";
import foreground_2 from "../../../assets/background_mission_two/Hills_Layer_02.png";
import foreground_two_2 from "../../../assets/background_mission_two/Hills_Layer_03.png";

//level select bg
import forest_1 from "../../../assets/background_levelSelect/Layer_0011_0.png";
import forest_2 from "../../../assets/background_levelSelect/Layer_0010_1.png";
import forest_3 from "../../../assets/background_levelSelect/Layer_0009_2.png";
import forest_4 from "../../../assets/background_levelSelect/Layer_0008_3.png";
import forest_5 from "../../../assets/background_levelSelect/Layer_0007_Lights.png";
import forest_6 from "../../../assets/background_levelSelect/Layer_0006_4.png";
import forest_7 from "../../../assets/background_levelSelect/Layer_0005_5.png";
import forest_8 from "../../../assets/background_levelSelect/Layer_0004_Lights.png";
import forest_9 from "../../../assets/background_levelSelect/Layer_0003_6.png";
import forest_10 from "../../../assets/background_levelSelect/Layer_0002_7.png";
import forest_11 from "../../../assets/background_levelSelect/Layer_0001_8.png";
import forest_12 from "../../../assets/background_levelSelect/Layer_0000_9.png";

class LevelSelect extends Phaser.Scene{
    constructor(){
        super({key: "levelSelect"});
        this.changeScene = this.changeScene.bind(this);

        this.assetLevelSelectKeys = [];
    };

    preload(){
        this.load.image("background_1", background_1);
        this.load.image("foreground_1", foreground_1);
        this.load.image("foreground_two_1", foreground_two_1);

        this.load.image("background_2", background_2);
        this.load.image("foreground_2", foreground_2);
        this.load.image("foreground_two_2", foreground_two_2);

        const assets = [
            forest_1,
            forest_2,
            forest_3,
            forest_4,
            forest_5,
            forest_6,
            forest_7,
            forest_8,
            forest_9,
            forest_10,
            forest_11,
            forest_12,
        ];

        assets.map((bg, i) =>{
            this.load.image(`forest-${i}`, bg);

            //push the level select keys
            this.assetLevelSelectKeys.push(`forest-${i}`);
        }); 
    };

    create(data){

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
        const bg = this.assetLevelSelectKeys;
        const forest1 = this.add.image(0,0, bg[0]);
        forest1.setScrollFactor(0);
        forest1.setOrigin(0);
        forest1.setDisplaySize(this.Width, this.Height);
        forest1.setDepth(-1);
        
        bg.map((background, index) =>{
            if(index !== 0){
                const forest = this.add.tileSprite(0,-500, this.Width,this.Height,background);
                forest.setOrigin(0);
                forest.setScale(2.2);
                forest.setDepth(-1);
            };
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
        this.scene.start(sceneName, {livesRemaining:livesRemaining, assetImg: assetImg}); 
        this.scene.stop("levelSelect");
    };
};

export default LevelSelect;