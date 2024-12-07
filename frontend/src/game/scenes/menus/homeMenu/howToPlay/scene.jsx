import AddLine from "../../../../utils/addLayoutGuide";
import ReturnButton from "../../../../utils/returnBtn";

class HowToPlay extends Phaser.Scene{
    constructor(){
        super({key: "howToPlay"});
    };

    create(data){

        this.previousScene = data?.previousScene;
        this.assetImg = data?.assetImg;

        this.Width = this.cameras.main.width;
        this.Height = this.cameras.main.height;

        this.visibility = 0;
        console.log("how to play scene");

        if(this.scene.isPaused("missionOne") || this.scene.isPaused("missionTwo") || this.scene.isPaused("fightScene")){
            this.scene.launch("forestBackground");
        };

        this.panel();
        this.returnHome();
    };

    panel(){

        //instructions
        const content = `
            1. Select cards first in [color=#75ff8c][b]Customize Cards[/b][/color], 
               it can be one card, two cards, and so on. 
               But we recommend you to choose 4.
            
            2. Each card has their own corresponding damage count. 
            
            3. if you click the [color=#75ff8c][b]Deselect button[/b][/color] you can select another card.

            4. Each card has its own difficulty, easiest, easy, medium, and hard.
            
            5. Each card is categorized by its own concepts; 
               variables, conditionals, arr ays, and functions.
            
            6. You can control the player using [color=#75ff8c][b]W[/b][/color] for jumping, 
               [color=#75ff8c][b]A[/b][/color] is for going left, [color=#75ff8c][b]D[/b][/color] is for going right.
            
            7. Basically the game is similar to Pokémon, but a platformer theme.
            
            8. In the fight scene, you can use as much as many 
               [color=#75ff8c][b]hints[/b][/color] as you want but beware that 
               this will deduct your health, player!
        `;
        
        this.rexUI.add.sizer({
            orientation:1,
            x: this.Width/2,
            y: this.Height/2,
            width: this.Width/2, 
            height: this.Height/2 + 250,
            space:{
                left: this.Width,
                right: this.Width,
            }
        }).addBackground(
            this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x75512d).setStrokeStyle(4, 0x0000)
        ).add(
            this.rexUI.add.label({
                text: this.add.rexBBCodeText(0, 0, "[b]HOW TO PLAY[/b]", {
                    fontSize: '50px',
                    wrap: { mode: 'word' }
                }),
                space: { top: 50}
            })
        ).add(
            this.rexUI.add.textBox({
                text: this.add.rexBBCodeText(0, 0, content, {
                    fontSize: '30px',
                    wrap: { mode: 'word', width: this.Width }
                }),
                space: { top: 30}
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
        const line = new AddLine(this, this.Width, this.Height);
        const lineX = line.createVerticalLine(0.03,this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03,this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, this.previousScene);
    };
};

export default HowToPlay;