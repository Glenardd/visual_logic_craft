import AddLine from "../../../utils/addLayoutGuide";
import ReturnButton from "../../../utils/returnBtn";
import cardData from "../../../objData/cardsData.json";

class CardCustomization extends Phaser.Scene {

    constructor() {
        super({ key: "cardCustomization" });
    };

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.visibility = 0;
        this.returnHome(width, height);
        // this.title(width, height);
        // this.panelOne(width, height);
        // this.panelTwo(width, height);

        this.panels(width, height);
    };

    panels(width, height) {

        const panels = this.rexUI.add.splitPanels({
            x: width / 2,
            y: height / 2,
            width: width / 2 + 500,
            height: height / 2 + 300,

            space: {
                item: 10
            },

            leftPanel: this.add.rectangle(0, 0, 1, 1, 0x698a84).setStrokeStyle(4, 0x0000),
            rightPanel: this.add.rectangle(0, 0, 1, 1, 0x698a84).setStrokeStyle(4, 0x0000),
            splitter: this.add.rectangle(0, 0, 15, 1),

            minLeftPanelWidth: 200,
            minRightPanelWidth: 200,

            splitRatio: 0.75,
        }).layout();

        //left panel
        // const leftPanel = this.rexUI.add.sizer({
        //     orientation: 1,
        //     x: width * 0.40,
        //     y: height/2,
        //     width: width/2 -100,
        //     height: height/2 + 100,            
        // });

        // const backgroundPanelOne = leftPanel.addBackground(
        //     this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x698a84).setStrokeStyle(4, 0x0000)
        // );

        // const contentsPanelOne = backgroundPanelOne.add(
        //     this.rexUI.add.label({
        //       text: this.add.text(0,0, 'Cards', {
        //         fontSize: '24px'
        //       }),
        //       space: { top: 10, bottom: 10 }
        //     })
        // );

        // contentsPanelOne.layout();

        //   // Create right panel
        // const rightPanel = this.rexUI.add.sizer({
        //     orientation: 1,
        //     x: width * 0.75,
        //     y: height/2,
        //     width: width/2 -700,
        //     height: height/2 + 100,
        // })

        // const backgroundPanelTwo = rightPanel.addBackground(
        //     this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x698a84).setStrokeStyle(4, 0x0000)
        // );

        // const contentsPanelTwo = backgroundPanelTwo.add(
        //     this.rexUI.add.label({
        //       text: this.add.text(0, 0, 'Right Panel', {
        //         fontSize: '24px'
        //       }),
        //       space: { top: 10, bottom: 10 }
        //     })
        // );

        // contentsPanelTwo.layout();      
    };

    returnHome(width, height) {
        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.03, this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03, this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, "titleScreen");
    };
};

export default CardCustomization;