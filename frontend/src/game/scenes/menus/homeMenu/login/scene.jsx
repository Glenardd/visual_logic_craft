// import { database } from "../../../../../firebase/firbase";
// import { get, onValue, ref } from "firebase/database";
import { authListener } from "../../../../../firebase/accountPersist";
import { login } from "../../../../../firebase/accountPersist";

//import the image signUp from google
import googleSignUp from "../../../../../assets/google_signIn_asset/signInGoogle.png";

class Login extends Phaser.Scene{
    constructor(){
        super({key: "login"});
        this.hasCheckedAuth = false;
    };

    preload(){
        this.load.image("signUp", googleSignUp);
    };

    create(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        if (!this.hasCheckedAuth) {
            authListener((user) => {
                this.hasCheckedAuth = true;  // Mark the check as completed
                
                if (user) {
                    // If logged in, continue with the game, or start the game screen
                    this.scene.start("titleScreen");
                } else {
                    // If not logged in, redirect to the login scene
                    this.scene.start("login");
                }
            });
        };

        this.googleBtn();
    }; 

    googleBtn(){
        const googleImg = this.add.image(0,0, "signUp").setDisplaySize(310,80);
        const signInbtn = this.rexUI.add.sizer({
            orientation: "y",
            x: this.width/2,
            y: this.height/2,
            space: {
                item: 30,
            }
        }).add(
            this.add.text(0,0, "VISUAL LOGIC CRAFT", { fontSize: 100 }),
            0,
            "center",
        ).add(
            googleImg,
        ).setInteractive({useHandCursor: true})
        .on("pointerover", () => {googleImg.setTint(0x999999)})
        .on("pointerout", ()=> {googleImg.clearTint()})
        .on("pointerdown", ()=> {
            //persists login
            login();
        });
        
        signInbtn.layout();

        return signInbtn;
    };
    
     // async dataDB() {
    //     const usersRef = ref(database, "users/jan");
    //     const snapshot = await get(usersRef);

    //     console.log(snapshot.val())
        
    // };

};

export default Login;