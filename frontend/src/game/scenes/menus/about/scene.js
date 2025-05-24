import GridContainer from "../../../utils/grid_container/gridContainer";
import Button from "../../../utils/addButton";

export default class About extends Phaser.Scene {
    constructor() {
        super({key: "About"});
    };

    create(data) {
        console.log("About data: ",data);
        
        const { width, height } = this.scale;
        
        this.previousScene = data?.previousScene;
        this.menuScene = data?.menuScene;

        this.previousScene = data?.previousScene;
        this.menuScene = data?.menuScene;
        this.width_ = width;
        this.height_ = height;

        this.add.text(width / 2, height / 2, 'Hello', {
            fontSize: '32px',
            color: '#ffffff',
        }).setOrigin(0.5);

        this.panel();
        this.returnHome();
    };

    panel(){

        //instructions
        const content = `
                This game is a two-dimensional, card-based educational tool that incorporates 
            decision tree classification-driven supervised machine learning. 
            
            It is designed to help students learn and understand fundamental programming 
            logic in an engaging and interactive way. 
            
            The game's mechanics simplify complex programming ideas, focusing solely on basic 
            concepts to ensure accessibility for beginners. 
            
            Python is the primary programming language used, making it both practical 
            and relatable for learners.
        `;
        
        this.rexUI.add.sizer({
            orientation:1,
            x: this.width_/2,
            y: this.height_/2,
            width: this.width_/2, 
            height: this.height_/2 + 250,
            space:{
                left: this.width_,
                right: this.width_,
            }
        }).addBackground(
            this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x75512d).setStrokeStyle(4, 0x0000)
        ).add(
            this.rexUI.add.label({
                text: this.add.rexBBCodeText(0, 0, "[b]ABOUT[/b]", {
                    fontSize: '50px',
                    fontFamily: 'Dosis',
                    wrap: { mode: 'word' }
                }),
                space: { top: 50}
            })
        ).add(
            this.rexUI.add.textBox({
                text: this.add.rexBBCodeText(0, 0, content, {
                    fontSize: '40px',
                    fontFamily: 'Dosis',
                    wrap: { mode: 'word', width: this.width_ }
                }),
                space: { top: 30, bottom: 30},
            })
        ).layout();
    };

    text(text){
        const textGroup = text.forEach(part => {
            const style = { fontSize: '32px', fill: '#ffffff' }; // Default style
    
            if (part.toLowerCase() === phraseToHighlight.toLowerCase()) {
                style.fill = '#00ff00';
            }
    
            return this.add.text(0, 0, part, style);
        });
        return textGroup;
    };

    returnHome(){
        const data_ = {
            previousScene: this.previousScene,
            menuScene: this.menuScene,
        };

        const button = new Button(this, [{text: "Return"}], {
            x: this.width_,
            y: this.height_,
            btn_color: 0xB2393B,
            orientation: "y",
            btn_width: 200,
            btn_height: 50,
            fontSize: 30,
            isGrid: true,
            text_spacing: 15,
            button_spacing: 20,
            data: data_,
        });
        
        button.button_only_layout();

        const container = new GridContainer(this, { 
            x: this.width_, 
            y: this.height_,
        });

        container.insert(button,3, 9);
    };
};