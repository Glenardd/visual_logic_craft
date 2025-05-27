import Button from "../../../../utils/addButton";
import GridContainer from "../../../../utils/grid_container/gridContainer";
class HowToPlay extends Phaser.Scene{
    constructor(){
        super({key: "How to Play"});
    };

    create(data){

        console.log("how to play: ",data);

        this.previousScene = data?.previousScene;
        this.menuScene = data?.menuScene;

        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;

        // if(this.scene.isPaused("missionOne") || this.scene.isPaused("missionTwo") || this.scene.isPaused("fightScene")){
        //     this.scene.launch("forestBackground");
        // };

        this.panel();
        this.returnHome();
    };

    panel(){

        //instructions
        const content = `
            1. Select cards first in [color=#75ff8c][b]Customize Cards[/b][/color], it can be one card, two cards, and so on. 
               But we recommend you to choose 4.
            
            2. Each card has their own corresponding damage count. 
            
            3. if you click the [color=#75ff8c][b]Deselect button[/b][/color] you can select another card.

            4. Each card has its own difficulty, easiest, easy, medium, and hard.
            
            5. Each card is categorized by its own concepts; 
               variables, conditionals, arr ays, and functions.
            
            6. You can control the player using [color=#75ff8c][b]W[/b][/color] for jumping, 
               [color=#75ff8c][b]A[/b][/color] is for going left, [color=#75ff8c][b]D[/b][/color] is for going right.
            
            7. Basically the game is similar to Pokémon, but a platformer theme.
            
            8. In the fight scene, you can use as much as many [color=#75ff8c][b]hints[/b][/color] as you want but beware that 
               this will deduct your health, player!
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
                text: this.add.rexBBCodeText(0, 0, "[b]HOW TO PLAY[/b]", {
                    fontSize: '50px',
                    fontFamily: 'Dosis',
                    wrap: { mode: 'word' }
                }),
                space: { top: 50}
            })
        ).add(
            this.rexUI.add.textBox({
                text: this.add.rexBBCodeText(0, 0, content, {
                    fontSize: '34px',
                    fontFamily: 'Dosis',
                    wrap: { mode: 'word', width: this.width_ }
                }),
                space: { top: 20, bottom: 30},
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

    //button to return from title screen
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

        container.insert(button, 3, 6, false);
    };
};

export default HowToPlay;