import ButtonCreate from "../../../../utils/addButton";
import AddLine from "../../../../utils/addLayoutGuide";

class TitleScreen extends Phaser.Scene{
    constructor(){
        super({key: "titleScreen"});
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

        this.levelSelect();
        this.customizeCards();
        this.gameTitle();
        this.logout();
    };

    gameTitle(){
        const titleGame = this.add.text(0,-200, "VISUAL LOGIC CRAFT", { fontSize: 100 }).setOrigin(0.5);
        this.container.add(titleGame);
    };

    levelSelect(){
        const levelSelectBtn = new ButtonCreate(this, 0,-25, "Level Select", 25, 100, 200,0x88d17b,0x5e9654,()=> this.changeScene("levelSelect"), true);
        levelSelectBtn.setCenter();
        
        this.container.add(levelSelectBtn);
    };

    customizeCards(){

        const customizeCards = () =>{
            this.scene.launch("cardCustomization");
            this.scene.stop("titleScreen");
        };

        const customizeCardsBtn = new ButtonCreate(this, 0,40, "Customize Cards", 20, 100, 200,0x88d17b,0x5e9654,()=> customizeCards(), true);
        customizeCardsBtn.setCenter();
        
        this.container.add(customizeCardsBtn);
    };

    logout(){

        const logout = () =>{
            console.log("logout");
        };

        const logoutBtn = new ButtonCreate(this, 0,105, "logout", 20, 100, 200,0x88d17b,0x5e9654,()=> logout(), true);
        logoutBtn.setCenter();
        
        this.container.add(logoutBtn);
    };

    changeScene(sceneName){
        this.scene.launch(sceneName); 
        this.scene.stop("titleScreen");
    };
};

export default TitleScreen;