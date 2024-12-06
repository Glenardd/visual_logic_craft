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

        if(this.scene.isPaused("missionOne") || this.scene.isPaused("missionTwo")){
            this.scene.launch("forestBackground");
        };

        this.panel();
        this.returnHome();
    };

    panel(){

        //instructions
        const content = `
            1. Select cards first in customize cards, 
               it can be one card two cards and so on. But we recommend you to choose 4.
            
            2. Each card has their own corresponding damage count. 
            
            3. Each card has eight questions and three test cases, 
               to check if your code is right. if card is deselect it will go to the next question
            
            4. Each card has its own difficulty, easiest, easy, medium, and hard.
            
            5. Each card is categorized by its own concepts, 
               variables, conditionals, arrays, and functions.
            
            6. You can control the player using W for jumping, 
               A is for going left, D is for going right.
            
            7. Basically the game is similar to Pokémon, but a platformer theme.
            
            8. In the fight scene, you can use as much as many 
               hints as you want but beware that this will deduct your health, player!
        `;

        return this.rexUI.add.textBox({
            x: this.Width/2, 
            y: this.Height/2,
            width: this.Width/2, 
            height: this.Height/2 + 250,
    
            background: this.rexUI.add.roundRectangle(0, 0, 2, 2, 0, 0x75512d).setStrokeStyle(4, 0x0000),
            text: this.add.text(0, 0, content, { 
                fontSize: '30px', 
                color: '#ffffff',
                wordWrap: { useAdvancedWrap: true }
            }),
            space:{
                left: this.Width,
                right: this.Width,
            }
        }).layout();
    };

    returnHome(){
        const line = new AddLine(this, this.Width, this.Height);
        const lineX = line.createVerticalLine(0.03,this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03,this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, this.previousScene);
    };
};

export default HowToPlay;