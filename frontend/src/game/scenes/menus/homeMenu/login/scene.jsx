import { authListener } from "../../../../../firebase/accountPersist";
import { login } from "../../../../../firebase/accountPersist";
import modelAwake from "../../../../utils/modelAwake";
//import the image signUp from google
import googleSignUp from "../../../../../assets/google_signIn_asset/signInGoogle.png";

class Login extends Phaser.Scene {
    constructor() {
        super({ key: "Login" });

    };

    preload() {
        this.load.image("signUp", googleSignUp);
    };

    create() {
        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        authListener(async (user) => {

            if (user) {
                //awake model from login
                await modelAwake();

                // If logged in, continue with the game, or start the game screen
                this.scene.start("Title Screen");
            } else {
                // If not logged in, redirect to the login scene
                this.googleBtn();
            }
        });
    };

    googleBtn() {
        const googleImg = this.add.image(0, 0, "signUp").setDisplaySize(250, 60);
        const signInbtn = this.rexUI.add.sizer({
            orientation: "y",
            x: this.width / 2,
            y: this.height / 2,
            space: {
                item: 30,
            },
        }).add(
            this.add.text(0, 0, "VISUAL LOGIC CRAFT", { fontSize: 100 }),
            0,
            "center",
        ).add(
            googleImg,
        )

        googleImg.setInteractive({ useHandCursor: true })
            .on("pointerover", () => { googleImg.setTint(0x999999) })
            .on("pointerout", () => { googleImg.clearTint() })
            .on("pointerdown", () => {
                //persists login
                login();
            });

        signInbtn.layout();

        return signInbtn;
    };
};

export default Login;