import { authListener, logout } from "../../../../../firebase/accountPersist";
import { database } from "../../../../../firebase/firebase";
import ButtonCreate from "../../../../utils/addButton";
import AddLine from "../../../../utils/addLayoutGuide";
import { ref, get } from "firebase/database";

class TitleScreen extends Phaser.Scene{
    constructor(){
        super({key: "titleScreen"});
        this.playerDisplayName = "";
        this.hasCheckedAuth = false;
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

        this.gameTitle();
        this.levelSelect();
        this.customizeCards();
        this.howToPlay();
        this.logout();

        if (!this.hasCheckedAuth) {
            authListener((user) => {
                this.hasCheckedAuth = true;  // Mark the check as completed
                
                if (user) {

                    const userId = user.uid

                    const usersDb = ref(database,"users/"+userId);

                    get(usersDb).then((snapshot)=>{
                        
                        if(snapshot.exists()){
                            const userName = snapshot.val()["display_name"];
                            this.displayName.setText(`User: ${userName}`);
                        };
                    });

                    // If logged in, continue with the game, or start the game screen
                    this.scene.start("titleScreen");
                } else {
                    // If not logged in, redirect to the login scene
                    this.scene.start("login");
                }
            });
        }
        
        //dynamically position btn
        const listOfUi = this.container.list;
        listOfUi.map((ui, i) =>{
            ui.y  = i * (40 + 90)-240;
        }); 
    };

    gameTitle(){
        
        this.displayName = this.add.text(0,0, "", { fontSize: 30 }).setOrigin(0.5);
        this.container.add(this.displayName);

        const titleGame = this.add.text(0,0, "VISUAL LOGIC CRAFT", { fontSize: 100 }).setOrigin(0.5);
        this.container.add(titleGame);
    };

    levelSelect(){
        const levelSelectBtn = new ButtonCreate(this, 0,0, "Level Select", 25, 100, 200,0x88d17b,0x5e9654,()=> this.changeScene("levelSelect"), true);
        levelSelectBtn.setCenter();
        
        this.container.add(levelSelectBtn);
    };

    customizeCards(){

        const customizeCards = () =>{
            this.scene.launch("cardCustomization");
            this.scene.stop("titleScreen");
        };

        const customizeCardsBtn = new ButtonCreate(this, 0,0, "Customize Cards", 20, 100, 200,0x88d17b,0x5e9654,()=> customizeCards(), true);
        customizeCardsBtn.setCenter();
        
        this.container.add(customizeCardsBtn);
    };

    howToPlay(){
        const howToPlay = () =>{
            this.scene.launch("howToPlay",{previousScene: this.scene.key});
            this.scene.stop("titleScreen");
        };

        const customizeCardsBtn = new ButtonCreate(this, 0,0, "How to play", 20, 100, 200,0x88d17b,0x5e9654,()=> howToPlay(), true);
        customizeCardsBtn.setCenter();
        
        this.container.add(customizeCardsBtn);
    };  


    logout(){

        const logoutGame = () =>{
            logout();
        };

        const logoutBtn = new ButtonCreate(this, 0,0, "logout", 20, 100, 200,0x88d17b,0x5e9654,()=> logoutGame(), true);
        logoutBtn.setCenter();
        
        this.container.add(logoutBtn);
    };

    changeScene(sceneName){
        this.scene.launch(sceneName); 
        this.scene.stop("titleScreen");
    };
};

export default TitleScreen;