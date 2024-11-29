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

        const cardName = cardData.map(cards => cards.card_name);
        const totalItems = cardName.length;
        const maxColumns = 4;
        const maxRows = 3;
        const maxItems = maxColumns * maxRows;
        const rows = Math.ceil(totalItems / maxColumns); // Calculate required rows

        //cards interactivity
        const cards = (cell, colIndex, rowIndex) => {
            const index = rowIndex * maxColumns + colIndex;

            if (index >= maxItems || index >= cardName.length) {
                return null;
            }

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
                }).on("pointerdown", () =>{
                    console.log(cardName[index]);
                })
            ).add(
                this.rexUI.add.label({
                    text: this.add.text(0, 0, cardName[index], {
                        fontSize: '24px',
                        wordWrap: {width: 200, useAdvanceWrap: true},
                    }),
                }),
                { align: 'center' }
            );

        };
        
        // left panel where cards contained 
        const grid = this.rexUI.add.gridSizer({
            column: maxColumns, 
            row: rows,
            columnProportions: 1, 
            rowProportions: 1,
            space: {
                top: 100, 
                bottom: 125, 
                left: 100, 
                right: 100,
                
                column: 50, 
                row: 50
            },

            createCellContainerCallback: cards,
        });

        //left panel
        const leftPanel = this.rexUI.add.sizer({
            orientation:1,
        }).add(
            grid
        ).addBackground(
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
                    fontSize: "24px",
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