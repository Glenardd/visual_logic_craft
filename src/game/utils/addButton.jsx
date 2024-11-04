class ButtonCreate extends Phaser.GameObjects.Container{
    constructor(scene, x, y, text, fontSize, height, width,backgroundColor,foregroundColor,func, interactivity){
        super(scene,x,y);

        this.func = func;
        this.foregroundColor = foregroundColor;
        this.backgroundColor = backgroundColor;
        this.scene =  scene;
        this.interactivity = interactivity
        
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

        this.setInteractivivity(this.interactivity);
        
        this.buttonPadding.setScrollFactor(0);
        btnText.setScrollFactor(0);

    };

    setInteractivivity(turnOn) {
        const [buttonPadding, btnText] = this.list; // Retrieve the this.buttonPadding rectangle

        buttonPadding.removeAllListeners();// remove existing event listeners to avoid duplication
        buttonPadding.setInteractive({ useHandCursor: turnOn });
        buttonPadding.setAlpha(turnOn ? 1 : 0);
        btnText.setAlpha(turnOn ? 1 : 0);

        // Handle pointer events on the rectangle
        this.buttonPadding.on("pointerdown", () => {this.func()});

        this.buttonPadding.on("pointerover", () => this.buttonPadding.setFillStyle(this.foregroundColor));
        this.buttonPadding.on("pointerout", () => this.buttonPadding.setFillStyle(this.backgroundColor));
    };

    setCenter(){
        const [buttonPadding, btnText] = this.list;
        buttonPadding.setOrigin(0.5,0.5);
        btnText.x = btnText.x - this.buttonPadding.width/2;
        btnText.y = btnText.y - this.buttonPadding.height/2;
    };
};

export default ButtonCreate;