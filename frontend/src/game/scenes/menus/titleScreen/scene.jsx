import ButtonCreate from "../../../utils/addButton";
import AddLine from "../../../utils/addLayoutGuide";

class TitleScreen extends Phaser.Scene{
    constructor(){
        super({key: "titleScreen"});
    };

    // preload(){

    // };

    create(){
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const visibility = 0;

        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.5, visibility).PosX;
        const lineY = line.createHorizontalLine(0.5, visibility).PosY;
        
        this.container = this.add.container(lineX, lineY);

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
        this.scene.start(sceneName); 
        this.scene.stop();
    };

}

export default TitleScreen;