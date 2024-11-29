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

        const RandomInt = Phaser.Math.Between;

        const list = [1, 2, 3, 4, 5, 6, 7, 10, 11];
        const totalItems = list.length;
        const maxColumns = 4; // Maximum columns in the grid
        const rows = Math.ceil(totalItems / maxColumns); // Calculate required rows

        //cards interactivity
        const cards = (cell, colIndex, rowIndex) => {
            const index = rowIndex * maxColumns + colIndex;

            if (index < totalItems) {
                //card rectangle
                const card = this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, RandomInt(0, 0x1000000)).setStrokeStyle(4, 0x0000)

                //container
                return this.rexUI.add.sizer({
                    orientation: 1,
                    width: 200,
                    height: 250,
                    space: { top: 250 / 2 }
                }).addBackground(
                    card.setInteractive({ useHandCursor: true })
                    .on("pointerover", () => {
                        card.setFillStyle(0xffffff);
                    }).on("pointerout", () => {
                        card.setFillStyle(RandomInt(0, 0x1000000));
                    })
                ).add(
                    this.rexUI.add.label({
                        text: this.add.text(0, 0, list[index], {
                            fontSize: '24px',
                        }),
                    }),
                    { align: 'center' }
                );
            };

            return null; // Leave empty cells blank

        };
        
        // left panel where cards contained
        const leftPanel = this.rexUI.add.gridSizer({
            width: 400, height: 400,
            column: maxColumns, row: rows,
            columnProportions: 1, rowProportions: 1,
            space: {
                top: 30, bottom: 30, left: 30, right: 30,
                // column: 5, row: 5
            },

            createCellContainerCallback: cards,
        }).addBackground(
            this.rexUI.add.roundRectangle(0, 0, 400, 400, 0, 0x698a84)
                .setStrokeStyle(4, 0x000000)
                .setDepth(-1)
        );

        //right panel contents
        const rightPanel = this.rexUI.add.sizer({
            orientation: 1,
        }).addBackground(
            this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x698a84).setStrokeStyle(4, 0x0000)
        ).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, 'Cards Equiped', {
                    fontSize: '24px'
                }),
                space: { top: 10, bottom: 10 }
            })
        );

        //split panels
        this.rexUI.add.splitPanels({
            x: width / 2,
            y: height / 2,
            width: width / 2 + 500,
            height: height / 2 + 300,

            space: {
                item: 10
            },

            leftPanel: leftPanel,
            rightPanel: rightPanel,
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