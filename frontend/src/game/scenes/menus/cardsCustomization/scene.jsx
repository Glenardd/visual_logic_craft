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

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        const width = this.width;
        const height = this.height;

        this.visibility = 0;
        this.returnHome(width, height);
        this.plugins?.get("DataPlugin")?.set("cardList", this.cardsEquipped);

        //prints the sise of the equipped cards
        console.log(this.cardEquipped.length);
        this.cardEquipped();
        this.splitPanels(width, height)
    };

    //split panels
    splitPanels() {
        const width = this.width;
        const height = this.height;

        const leftPanel = this.leftPanel();
        const rightPanel = this.rightPanel();

        return this.rexUI.add.splitPanels({
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

    //left panel contents
    leftPanel() {
        return this.rexUI.add.sizer({
            orientation: 1,
        }).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, 'All Cards', {
                    fontSize: "24px",
                }),
                space: { top: 10, bottom: 10 }
            }),
        ).add(
            this.gridLeft()
        ).addBackground(
            this.rexUI.add.roundRectangle(0, 0, 400, 400, 0, 0x698a84)
                .setStrokeStyle(4, 0x000000)
                .setDepth(-1)
        );
    };

    //right panel contents
    rightPanel() {
        return this.rexUI.add.sizer({
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
            this.gridRight()
        );
    };

    // left panel where cards contained
    gridLeft() {
        const totalItems = 12;
        const maxColumns = 4;
        const rows = Math.ceil(totalItems / maxColumns);

        return this.rexUI.add.gridSizer({
            column: maxColumns,
            row: rows,
            columnProportions: 1,
            rowProportions: 1,
            space: {
                top: 50,
                bottom: 100,
                left: 100,
                right: 100,

                column: 50,
                row: 50,
            },

            createCellContainerCallback: (cell, colIndex, rowIndex) => this.cardsLeft(cell, colIndex, rowIndex),
        });
    };

    // left panel where cards contained
    gridRight() {
        const maxRightCols = 1;
        const maxRightRows = 4;
        const rowsRight = Math.ceil(maxRightRows / maxRightCols);

        return this.rexUI.add.gridSizer({
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

            createCellContainerCallback: (cell, colIndex, rowIndex) => this.cardsRight(cell, colIndex, rowIndex),
        });
    };

    //cards left
    cardsLeft(cell, colIndex, rowIndex) {
        const cardName = this.cardsUneqiupped
        const maxColumns = 4;
        const maxRows = 3;
        const maxItems = maxColumns * maxRows;

        const index = rowIndex * maxColumns + colIndex;

        //leaves blanks 
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
        if (this.cardsEquipped.includes(cardName[index])) {
            // Return an empty placeholder to maintain grid structure 
            return this.rexUI.add.sizer({
                orientation: 1,
                width: 200,
                height: 250,
                space: { top: 250 / 2 }
            }).add(
                this.rexUI.add.label({
                    text: this.add.text(0, 0, cardName[index], {
                        fontSize: "24px",
                        wordWrap: { width: 200, useAdvanceWrap: true }
                    }),
                    space: { top: 10, bottom: 10 }
                }).setDepth(2)
            ).addBackground(
                this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, 0x475956)
            );
            
        };

        //card rectangle
        const card = this.rexUI.add.roundRectangle(0, 0, 200, 250, 10, 0x9c7962).setStrokeStyle(4, 0x0000);

        //container
        const containerCard = this.rexUI.add.sizer({
            orientation: 1,
            width: 200,
            height: 250,
            space: { top: 250 / 2 }
        }).addBackground(
            card.setInteractive({ useHandCursor: true })
                .on("pointerover", () => {
                    card.setFillStyle(0x544237);
                }).on("pointerout", () => {
                    card.setFillStyle(0x9c7962);
                }).on("pointerdown", () => {
                    //when card is pressed its going selected in the equiped cards
                    // card.setAlpha(0.5);
                    this.cardsEquipped.push(cardName[index]);
                    containerCard.clear(true);
                    
                    //add blanks after clicking the cards
                    containerCard.add(
                        this.rexUI.add.label({
                            text: this.add.text(0, 0, cardName[index], {
                                fontSize: "24px",
                                wordWrap: { width: 200, useAdvanceWrap: true }
                            }),
                            space: { top: 10, bottom: 10 }
                        }).setDepth(2)
                    ).addBackground(
                        this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, 0x475956).setDepth(1)
                    ).layout();
                    
                    this.refreshRightPanel();
                }),
        ).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, cardName[index], {
                    fontSize: '24px',
                    wordWrap: { width: 200, useAdvanceWrap: true },
                }),
            }),
            { align: 'center' }
        );

        return containerCard;
    };

    //cards right
    cardsRight(cell, colIndex, rowIndex) {
        const index = rowIndex * 1 + colIndex;
        const cardRightName = this.cardsEquipped;
        const maxRightCols = 1;
        const maxRightRows = 4;
        const totalRightItems = maxRightCols * maxRightRows;
    
        // Leave blanks
        if (index >= totalRightItems || index >= cardRightName.length) {
            return this.rexUI.add.roundRectangle(0, 0, 150, 200, 0, 0x475956).setDepth(1);
        }
    
        const card = this.rexUI.add.roundRectangle(0, 0, 10, 10, 10, 0x349e8c).setStrokeStyle(4, 0x0000).setDepth(1);
    
        // Create the label with a unique name to avoid duplication
        const labelName = cardRightName[index];
        let label = this.children.getByName(labelName);
        
        if (!label) {
            label = this.rexUI.add.label({
                name: labelName,
                text: this.add.text(0, 0, this.cardsEquipped[index], {
                    fontSize: '15px',
                    wordWrap: { width: 100, useAdvanceWrap: true },
                }).setDepth(2),
            });
        } else {
            label.getElement('text').setText(this.cardsEquipped[index]);
        };
    
        return this.rexUI.add.sizer({
            orientation: 1,
            width: 150,
            height: 200,
            space: {
                top: 100
            },
        }).add(
            label,
            { align: 'center' }
        ).addBackground(
            card.setInteractive({ useHandCursor: true })
                .on("pointerdown", () => {
                    // Access the label element when the card is clicked
                    console.log(this.cardsEquipped[index]);
                    // Update label to avoid duplication
                    label.getElement('text').setText(this.cardsEquipped[index]);
                })
        );
    };

    //for updating the cards in the right
    refreshRightPanel() {
        this.splitPanels().getElement("leftPanel").clear(true);
    };

    cardEquipped() {
        const activeCards = this.plugins.get("DataPlugin")?.get("cardList");

        this.input.on("pointerdown", () => {
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