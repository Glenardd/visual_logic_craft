class ButtonCreate extends Phaser.GameObjects.Container{
    constructor(scene, x, y, text, fontSize, height, width,backgroundColor,foregroundColor,func, interactivity){
        super(scene,x,y);

        this.func = func;
        this.foregroundColor = foregroundColor;
        this.backgroundColor = backgroundColor;
        this.scene =  scene;
        this.interactivity = true
        
        //btn padding
        const buttonPadding = scene.add.rectangle(x, y, width, height, backgroundColor);
        buttonPadding.setStrokeStyle(3, "#fffff");
        buttonPadding.setOrigin(0);

        //btn text
        const btnText = scene.add.text(0,0, text, {fontSize: fontSize, align: "center"});
        btnText.setOrigin(0.5, 0.5); // Set origin to the center
        btnText.x = buttonPadding.x + buttonPadding.width / 2;
        btnText.y = buttonPadding.y + buttonPadding.height / 2;

        this.add([buttonPadding, btnText]);

        //add container to scene
        scene.add.existing(this);

        this.setInteractivivity(interactivity);

    };

    setInteractivivity(turnOn) {
        const [buttonPadding, btnText] = this.list; // Retrieve the buttonPadding rectangle

        buttonPadding.removeAllListeners();// remove existing event listeners to avoid duplication
        buttonPadding.setInteractive({ useHandCursor: turnOn });
        buttonPadding.setAlpha(turnOn ? 1 : 0);
        btnText.setAlpha(turnOn ? 1 : 0);

        // Handle pointer events on the rectangle
        buttonPadding.on("pointerdown", () => {this.func()});

        buttonPadding.on("pointerover", () => buttonPadding.setFillStyle(this.foregroundColor));
        buttonPadding.on("pointerout", () => buttonPadding.setFillStyle(this.backgroundColor));
    };

};

export default ButtonCreate;