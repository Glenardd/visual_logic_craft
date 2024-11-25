class ButtonCreate extends Phaser.GameObjects.Container{
    constructor(scene, x, y, text, fontSize, height, width,backgroundColor,foregroundColor,func, interactivity){
        super(scene,x,y);

        this.func = func;
        this.foregroundColor = foregroundColor;
        this.backgroundColor = backgroundColor;
        this.scene =  scene;
        this.interactivity = interactivity;
        
        //btn padding
        this.buttonPadding = scene.add.rectangle(x, y, width, height, backgroundColor);
        this.buttonPadding.setStrokeStyle(3, "#fffff");
        this.buttonPadding.setOrigin(0);

        //btn text
        const btnText = scene.add.text(0,0, text, {fontSize: fontSize, align: "center", color: "#000"});
        btnText.setOrigin(0.5, 0.5); // Set origin to the center
        btnText.x = this.buttonPadding.x + this.buttonPadding.width / 2;
        btnText.y = this.buttonPadding.y + this.buttonPadding.height / 2;

        this.add([this.buttonPadding, btnText]);

        //add container to scene
        scene.add.existing(this);

        this.setInteractivity(this.interactivity);
        
        this.buttonPadding.setScrollFactor(0);
        btnText.setScrollFactor(0);

    };

    setInteractivity(turnOn) {
        // Ensure no duplicate listeners
        this.buttonPadding.removeAllListeners();

        if (turnOn) {
            this.buttonPadding.setInteractive({ useHandCursor: true });
            this.buttonPadding
                .on("pointerdown", () => this.func())
                .on("pointerover", () => this.buttonPadding.setFillStyle(this.foregroundColor))
                .on("pointerout", () => this.buttonPadding.setFillStyle(this.backgroundColor));
        } else {
            this.buttonPadding.disableInteractive();
        }

        return this;
    };

    setCenter(){
        const [buttonPadding, btnText] = this.list;
        buttonPadding.setOrigin(0.5,0.5);
        btnText.x = btnText.x - this.buttonPadding.width/2;
        btnText.y = btnText.y - this.buttonPadding.height/2;
        return this;
    };

    destroyButton() {
        // Cleanup: remove listeners and destroy elements
        this.buttonPadding.removeAllListeners();
        this.removeAll(true);
        this.destroy(true);
    }
};

export default ButtonCreate;