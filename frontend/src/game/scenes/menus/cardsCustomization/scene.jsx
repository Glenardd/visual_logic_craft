import AddLine from "../../../utils/addLayoutGuide";
import ReturnButton from "../../../utils/returnBtn";
import cardData from "../../../objData/cardsData.json";

class CardCustomization extends Phaser.Scene{
    constructor(){
        super({key: "cardCustomization"});
    };

    create(){
        
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.visibility = 0;
        this.returnHome(width, height);
        this.title(width, height);
        this.panel(width, height);
    };

    title(width, height){
        
        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.5, this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03, this.visibility).PosY;

        const layout = this.add.container(lineX, lineY);

        const text = this.add.text(0,0, "Card Customization", {fontSize: 40}).setOrigin(0.5,0);
        layout.add(text);
    };

    returnHome(width, height){
        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.03,this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03,this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, "titleScreen");
    };

    panel(width, height){
        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.6,this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.5,this.visibility).PosY;
        
        const layout = this.add.container(lineX, lineY);

        //container of cards
        const panelOne= this.add.rectangle(0,0, 800, height/2 + 300, 0x698a84);
        panelOne.setStrokeStyle(4, 0x0000);
        panelOne.setOrigin(1,0.5);
        layout.add(panelOne);

        //where cards will be placed
        const panelTwo= this.add.rectangle(50,0, 400, height/2 + 300, 0x698a84);
        panelTwo.setStrokeStyle(4, 0x0000);
        panelTwo.setOrigin(0,0.5);
        layout.add(panelTwo);
        
    };

    

};

export default CardCustomization;