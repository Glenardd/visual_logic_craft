import AddLine from "../../../utils/addLayoutGuide";
import ReturnButton from "../../../utils/returnBtn";
import cardData from "../../../objData/cardsData.json";

class CardCustomization extends Phaser.Scene {

    constructor() {
        super({ key: "cardCustomization" });

        this.cardsEquipped = [];
        this.cardsUneqiupped = [];

        cardData.map(cards => this.cardsUneqiupped.push(cards.card_name));
    };

    create() {

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        this.visibility = 0;
        this.returnHome(width, height);
        // this.title(width, height);
        // this.panelOne(width, height);
        // this.panelTwo(width, height);

        console.log(this.cardEquipped.length);

        this.panels(width, height);
        this.cardEquipped();
    };

    panels(width, height) {

        const RandomInt = Phaser.Math.Between;

        const cardName = this.cardsUneqiupped
        const totalItems = 12;
        const maxColumns = 4;
        const maxRows = 3;
        const maxItems = maxColumns * maxRows;
        const rows = Math.ceil(totalItems / maxColumns); // Calculate required rows

        //saves the cards available
        this.plugins.get("DataPlugin")?.set("cardList", this.cardsEquipped);
        
        //cards interactivity and label
        const cardsLeft = (cell, colIndex, rowIndex) => {
            const index = rowIndex * maxColumns + colIndex;

            //if it reaches the required rows, stop
            if (index >= maxItems || index >= cardName.length) {
                return this.rexUI.add.sizer({ 
                    orientation: 1, 
                    width: 200, 
                    height: 250 
                }).addBackground(
                    this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, 0x475956)
                );
            };

            // do not render if card is already equipped
            if(this.cardsEquipped.includes(cardName[index])){
                // Return an empty placeholder to maintain grid structure 
                return this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, 0x475956);
            };

            //card rectangle
            const card = this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, RandomInt(0, 0x1000000)).setStrokeStyle(4, 0x0000)

            //container
            const containerCard = this.rexUI.add.sizer({
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
                    //when card is pressed its going selected in the equiped cards
                    card.setAlpha(0);
                    this.cardsEquipped.push(cardName[index]);
                    containerCard.clear(true); 
                    containerCard.addBackground( this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, 0x475956)).layout();
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

            return containerCard;
        };

        // left panel where cards contained 
        const gridLeft = this.rexUI.add.gridSizer({
            column: maxColumns, 
            row: rows,
            columnProportions: 1, 
            rowProportions: 1,
            space: {
                top: 100, 
                bottom: 105, 
                left: 100, 
                right: 100,
                
                column: 50, 
                row: 50,
            },

            createCellContainerCallback: cardsLeft,
        });

        const cardRightName = this.cardsEquipped;
        const maxRightCols = 1;
        const maxRightRows = 4;
        const rowsRight = Math.ceil(maxRightRows / maxRightCols);
        const totalRightItems = maxRightCols * maxRightRows;

        const cardRight = (cell, colIndex, rowIndex) =>{
            const index = rowIndex * 1 + colIndex;
            
            if(index >= totalRightItems || index >= cardRightName.length){
                return this.rexUI.add.roundRectangle(0, 0, 150, 200, 0, 0x475956).setDepth(1);
            };

            return this.rexUI.add.sizer({
                orientation: 1,
                width: 150,
                height: 200,
                space:{
                    top: 100
                },
            }).add(
                this.rexUI.add.label({
                    text: this.add.text(0, 0, this.cardsEquipped[index], {
                        fontSize: '15px',
                        wordWrap: {width: 100, useAdvanceWrap: true},
                    }).setDepth(2),
                }),
                { align: 'center' }
            ).addBackground(
                this.rexUI.add.roundRectangle(0, 0, 10, 10, 0, 0x349e8c).setStrokeStyle(4, 0x0000).setDepth(1)
            );
        };

        // left panel where cards contained 
        const gridRight = this.rexUI.add.gridSizer({
            column: 1, 
            row: rowsRight,
            columnProportions: 1, 
            rowProportions: 1,
            space: {
                top: 50, 
                bottom: 50, 
                left: 100, 
                right: 100,
                
                column: 20, 
                row: 20,
            },

            createCellContainerCallback: cardRight,
        });

        //left panel
        const leftPanel = this.rexUI.add.sizer({
            orientation:1,
        }).add(
            gridLeft
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
        ).add(
            gridRight
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

              
    };

    cardEquipped(){

        const activeCards = this.plugins.get("DataPlugin")?.get("cardList");

        this.input.on("pointerdown", ()=>{
            console.log(activeCards);
        });
    };

    returnHome(width, height) {
        const line = new AddLine(this, width, height);
        const lineX = line.createVerticalLine(0.03, this.visibility).PosX;
        const lineY = line.createHorizontalLine(0.03, this.visibility).PosY;

        new ReturnButton(this, lineX, lineY, "titleScreen");
    };
};

export default CardCustomization;