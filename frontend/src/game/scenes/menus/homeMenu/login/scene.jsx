// import { database } from "../../../../../firebase/firbase";
// import { get, onValue, ref } from "firebase/database";

import { auth, provider } from "../../../../../firebase/firbase";
import { signInWithPopup } from "firebase/auth";

class Login extends Phaser.Scene{
    constructor(){
        super({key: "login"});
    };

    create(){
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.googleBtn();
    };

    // const titleGame = this.add.text(0,0, "VISUAL LOGIC CRAFT", { fontSize: 100 }).setOrigin(0.5);

    headerGame(){

    };

    googleBtn(){
        const rectangle = this.rexUI.add.roundRectangle(0,0,0,9,20,0x88d17b).setStrokeStyle(4, 0x00000);
        const btn = this.rexUI.add.label({
            x: this.width/2,
            y: this.height/2,
            width: 300,
            height: 100,
            background: rectangle,
            text: this.add.text(0, 0, "Google Login/Signup", {
                fontSize: 40,
                color: "#000000", 
            }),
            align: 'center',
            space: {
                left: 20,
                right: 20,
                top: 5,
                bottom: 5,
            },
        }).setInteractive({useHandCursor: true})
        .on("pointerover", () => {rectangle.setFillStyle(0x5e9654)})
        .on("pointerout", ()=> {rectangle.setFillStyle(0x88d17b)})
        .on("pointerdown", ()=> {
            signInWithPopup(auth, provider).then(data =>{
                console.log(data);
            });
        });

        btn.layout();

        return btn;
    };
    
     // async dataDB() {
    //     const usersRef = ref(database, "users/jan");
    //     const snapshot = await get(usersRef);

    //     console.log(snapshot.val())
        
    // };

};

export default Login;