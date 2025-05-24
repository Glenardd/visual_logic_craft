class Button extends Phaser.GameObjects.Container {
    constructor(scene, text, option = {}) {
        super(scene);

        const {
            x,
            y,
            orientation,
            btn_width,
            btn_height,
            fontSize,
            isGrid = true,
            btn_color = 0x4CA5E4,
            text_spacing,
            button_spacing,
            data,
        } = option;

        this.scene = scene;
        this.text = text;
        this.fontSize = fontSize;
        this.btn_width = btn_width;
        this.btn_height = btn_height;
        this.color = btn_color;
        this.x_pos = x;
        this.y_pos = y;
        this.isGrid = isGrid;
        this.orientation = orientation;
        this.text_spacing = text_spacing;
        this.button_spacing = button_spacing;
        this.data_ = data;

        this.width_ = this.scene.cameras.main.width;
        this.height_ = this.scene.cameras.main.height;
        this.scene.add.existing(this);
    };

    #addLabel(title, label_fontSize) {
        //create a header instance 
        const header_title = (title_) => {
            return this.scene.rexUI.add.label({
                width: 100,
                height: 40,
                text: this.scene.add.text(0, 0, title_, {
                    fontSize: label_fontSize,
                    fontFamily: 'Dosis',
                    align: "center",
                }),
                space: {
                    left: this.text_spacing,
                    right: this.text_spacing,
                    bottom: this.text_spacing,
                },
            });
        };

        return header_title(title);
    };

    //made private, only it can be access here
    //so no errors can be made if used outside
    button_only_layout() {
        //this will create an instance of the button
        const createButton_ = (text) => {
            return this.scene.rexUI.add.label({
                width: this.btn_width,
                height: this.btn_height,
                background: this.scene.rexUI.add.roundRectangle(0, 0, 0, 0, 10, this.color).setStrokeStyle(5, 0x000000),
                text: this.scene.add.text(0, 0, text, {
                    fontSize: this.fontSize,
                    fontFamily: 'Dosis',
                    align: "center",
                }),
                space: {
                    top: this.text_spacing,
                    bottom: this.text_spacing,
                    left: this.text_spacing,
                    right: this.text_spacing,
                },
                align: "center",
            });
        };

        //this will create an instance of the button
        //with the color passed in the constructor
        const btn = () => {
            if (this.isGrid === false) {
                const button = this.scene.rexUI.add.buttons({
                    x: this.x_pos / 2,
                    y: this.y_pos / 2,
                    orientation: this.orientation,
                    buttons: this.text.map((label_) => createButton_(label_.text, this.color)),
                    space: { item: this.button_spacing },
                }).setScrollFactor(0).layout();
                return button;
            } else {
                const button = this.scene.rexUI.add.buttons({
                    orientation: this.orientation,
                    buttons: this.text.map((label_) => createButton_(label_.text, this.color)),
                    space: { item: this.button_spacing },
                }).setScrollFactor(0).layout();
                return button;
            };
        };

        //hover color
        const hoverColor = (amount = 0.2) => {
            let r = ((this.color >> 16) & 0xff);
            let g = ((this.color >> 8) & 0xff);
            let b = (this.color & 0xff);

            r = Math.min(255, r + 255 * amount);
            g = Math.min(255, g + 255 * amount);
            b = Math.min(255, b + 255 * amount);

            return (Math.floor(r) << 16) | (Math.floor(g) << 8) | Math.floor(b);
        };

        //checks if the label is an array and so on
        if (Array.isArray(this.text) && this.text.length > 1) {
            //each children added with interactivity

            const button = btn();

            button.on("button.click", (button) => {

                button.getElement('background').setFillStyle(this.color);

                if (button.text === "Resume") {
                    this.scene.scene.resume("forestBackground");
                    this.scene.scene.resume(this.data_?.previousScene, this.data_);
                    this.scene.scene.setVisible(true, this.data_?.previousScene);
                    this.scene.scene.stop();

                }else if(button.text === "How to Play"){
                    this.scene.scene.resume("forestBackground");
                    this.scene.scene.launch(button.text, this.data_);
                    this.scene.scene.pause();
                    this.scene.scene.setVisible(false, this.data_?.previousScene);
                    this.scene.scene.setVisible(false, this.data_?.menuScene);

                }else if(button.text === "About"){
                    this.scene.scene.resume("forestBackground");
                    this.scene.scene.launch(button.text, this.data_);
                    this.scene.scene.pause();
                    this.scene.scene.setVisible(false, this.data_?.previousScene);
                    this.scene.scene.setVisible(false, this.data_?.menuScene);

                }else if(button.text === "Card Customization"){
                    this.scene.scene.launch(button.text, this.data_);
                    this.scene.scene.pause()
                    this.scene.scene.setVisible(false, this.data_?.previousScene);

                }else if(button.text === "Level Select"){
                    this.scene.scene.launch(button.text, this.data_);
                    this.scene.scene.pause()
                    this.scene.scene.setVisible(false, this.data_?.previousScene);

                }else if(button.text === "Mission One"){
                    this.scene.scene.start("Mission One");

                }else if(button.text === "Mission Two"){
                    this.scene.scene.start("Mission Two");
                
                }else if(button.text === "Restart"){
                    this.scene.scene.restart(this.data_?.previousScene);
                    this.scene.scene.start(this.data_?.previousScene);
                }else if(button.text === "Exit"){
                    //stop all
                    this.scene.scene.stop(this.data_?.previousScene);
                    this.scene.scene.stop(this.data_?.menuScene);
                    this.scene.scene.stop(this.scene.key);
                    //go back to the start
                    this.scene.scene.start("Home Manager", this.data_);

                }else if(button.text === "Logout"){
                    this.scene.scene.start("Logout");
                };
            });

            button.on("button.over", (button) => {
                button.getElement('background').setFillStyle(hoverColor());
            });

            button.on("button.out", (button) => {
                button.getElement('background').setFillStyle(this.color);
            });

            this.add(button);

            return button;

            //checks if array is only one length
        } else if (Array.isArray(this.text) && this.text.length === 1) {

            const button = btn();

            //each children added with interactivity
            button.on("button.click", (button) => {

                //this reset button.over color to its normal oen
                button.getElement('background').setFillStyle(this.color);

                if (button.text === "Menu") {
                    this.scene.scene.pause("forestBackground");
                    this.scene.scene.setVisible(false, this.data_?.previousScene);
                    this.scene.scene.pause();
                    this.scene.scene.launch(button.text, this.data_);
                    this.scene.scene.pause();

                }else if(button.text === "Return"){
                    if (this.data_?.menuScene) {
                        this.scene.scene.resume(this.data_?.menuScene, this.data_);
                    } else if (this.data_?.previousScene) {
                        this.scene.scene.resume(this.data_?.previousScene, this.data_);
                    };

                    this.scene.scene.stop(this.scene.scene.key);
                    this.scene.scene.setVisible(true, this.data_?.previousScene);
                    this.scene.scene.setVisible(true, this.data_?.menuScene);
                }else{
                    this.scene.scene.start(button.text, this.data_);
                    //then stop the current scene
                    this.scene.scene.stop(this.scene.scene.key);
                    console.log(this.scene.scene.key);
                };
            });

            button.on("button.over", (button) => {
                button.getElement('background').setFillStyle(hoverColor());
            });

            button.on("button.out", (button) => {
                button.getElement('background').setFillStyle(this.color);
            });

            this.add(button);

            return button;
        };
    };

    button_header_layout(label_, option = {}) {
        const {
            fontSize
        } = option;

        if (this.isGrid === false) {
            var sizer = this.scene.rexUI.add.sizer({
                orientation: this.orientation,
                x: this.x_pos / 2,
                y: this.y_pos / 2,
            }).add(this.#addLabel(label_, fontSize)).add(this.button_only_layout()).layout();

            return sizer;
        } else {
            var sizer = this.scene.rexUI.add.sizer({
                orientation: this.orientation,
            }).add(this.#addLabel(label_, fontSize)).add(this.button_only_layout()).layout();

            return sizer;
        };
    };

};

export default Button;