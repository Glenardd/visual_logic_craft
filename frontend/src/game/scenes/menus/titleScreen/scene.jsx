import ButtonCreate from "../../../utils/addButton";
import AddLine from "../../../utils/addLayoutGuide";

//title screen and level select bg
import forestJson from "../../../../assets/background_levelSelect/pixel_art_forest.json";
import forestBg from "../../../../assets/background_levelSelect/pixel_art_forest.png"

class TitleScreen extends Phaser.Scene{
    constructor(){
        super({key: "titleScreen"});

        this.bg = [];
    };

    preload(){
        this.load.atlas("forest_bg", forestBg, forestJson);
    };

    create(){
        console.log(this.scene.key);

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const visibility = 0;

        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.5, visibility).PosX;
        const lineY = line.createHorizontalLine(0.5, visibility).PosY;
        
        this.container = this.add.container(lineX, lineY);

        //for title screen and level select bg
        this.forest_bg_frames = this.textures.get('forest_bg').getFrameNames().sort().reverse();
        this.forest_bg_frames.map((forest,i) =>{
            const x = this.textures.get('forest_bg').get(forest).x + width/2;
            const y = this.textures.get('forest_bg').get(forest).y + height/2 - 450;
            const textureWidth = this.textures.get('forest_bg').get(forest).width + width;
            const textureHeight = this.textures.get('forest_bg').get(forest).height;

            const forest_bg = this.add.tileSprite(x,y,textureWidth ,textureHeight, "forest_bg", forest);

            if(forest ===this.forest_bg_frames[2]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[3]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[4]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[5]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[6]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[7]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[8]){
                forest_bg.setScale(3.7);
            };
            if(forest ===this.forest_bg_frames[9]){
                forest_bg.setScale(3.7);
                forest_bg.y = -200
            };
            if(forest ===this.forest_bg_frames[10]){
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + height;
            };
            if(forest ===this.forest_bg_frames[11]){
                forest_bg.setScale(3.7);
                forest_bg.y = y / textureHeight + height;
            };

            this.bg.push({ sprite: forest_bg, speed: (i + 1) * 0.03 });
            forest_bg.setDepth(-1);
        });

        this.levelSelect();
        this.customizeCards();
        this.logout();
    };

    levelSelect(){
        const levelSelectBtn = new ButtonCreate(this, 0,-25, "Level Select", 25, 100, 200,0x88d17b,0x5e9654,()=> this.changeScene("levelSelect"));
        levelSelectBtn.setInteractivity(true);
        levelSelectBtn.setCenter();
        
        this.container.add(levelSelectBtn);
    };

    customizeCards(){

        const customizeCards = () =>{
            console.log("custom cards scene");
        };

        const customizeCardsBtn = new ButtonCreate(this, 0,40, "Customize Cards", 20, 100, 200,0x88d17b,0x5e9654,()=> customizeCards());
        customizeCardsBtn.setInteractivity(true);
        customizeCardsBtn.setCenter();
        
        this.container.add(customizeCardsBtn);
    };

    logout(){

        const logout = () =>{
            console.log("logout");
        };

        const lougoutBtn = new ButtonCreate(this, 0,105, "logout", 20, 100, 200,0x88d17b,0x5e9654,()=> logout());
        lougoutBtn.setInteractivity(true);
        lougoutBtn.setCenter();
        
        this.container.add(lougoutBtn);
    };

    changeScene(sceneName){
        this.scene.start(sceneName, {forest_bg_frames: this.forest_bg_frames}); 
        this.scene.stop();
    };

    update(){
        this.bg.forEach(bg => { bg.sprite.tilePositionX += bg.speed; });
    };

}

export default TitleScreen;