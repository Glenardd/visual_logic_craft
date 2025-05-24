import { authListener } from "../../../../../firebase/accountPersist";
import { database } from "../../../../../firebase/firebase";
import { ref, get } from "firebase/database";
import { labelsMenu } from "./buttonLabels";

// import GridContainer from "../../../../utils/grid_container/gridContainer";
import Button from "../../../../utils/addButton";

class TitleScreen extends Phaser.Scene {
    constructor() {
        super({ key: "Title Screen" });
        this.playerDisplayName = "";
        this.displayName = null;
        this.width_ = 0;
        this.height_ = 0;
    };

    create(data) {
        console.log("Title Screen data: ", data);

        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        console.log(this.width_, this.height_);

        this.menuButtons();

        // Create a Phaser text object for displayName
        this.displayName = this.add.text(this.width_/2, this.height_/2 +300, "Loading user...", {
            fontSize: "30px",
            fontFamily:"Dosis",
            fill: "#ffffff",
        }).setOrigin(0.5);
            authListener(async (user) => {
                if (await user) {

                    const userId = await user.uid;

                    console.log("User ID: ", userId);

                    const usersDb = ref(database, "users/" + userId);

                    await get(usersDb).then((snapshot) => {
                        if (snapshot.exists()) {
                            const userName = snapshot.val()?.display_name || "User";
                            if (this.displayName && userName) {
                                console.log(userName);
                                // If logged in, show the title screen and menu buttons
                                this.menuButtons();
                                this.displayName.setText(`User: ${userName}`);
                            } else {
                                console.error("Failed to update displayName: displayName or userName is undefined.");
                            }
                        };
                    });
                } else {
                    // If not logged in, redirect to the login scene
                    this.scene.start("Login");
                };
            });
    };

    menuButtons() {

        const data_ = {
            previousScene: this.scene.key,
            livesRemaining: this.livesRemaining,
            destroyedEnemies: this.destroyedEnemies,
            assetImg: this.data_?.assetImg,
        };

        //instance of the button
        const button = new Button(this, labelsMenu, {
            x: this.width_,
            y: this.height_,
            orientation: "y",
            btn_width: 300,
            btn_height: 50,
            fontSize: 30,
            isGrid: false,
            btn_color: 0x349354,
            text_spacing: 15,
            button_spacing: 20,
            data: data_,
        });

        button.button_header_layout("Visual Logic Craft", { fontSize: 60, space: 40 });

        //if the grid option is turned on
        // the button will be added to the grid container
        //if not, it will be added to the scene directly
        // new GridContainer(this, { x: this.width_, y: this.height_ }).insert(button, 15, 10);
    };
};

export default TitleScreen;