// import AddLine from "../../../utils/addLayoutGuide";
// import ReturnButton from "../../../utils/returnBtn";
// import cardData from "../../../objData/cardsData.json";
import Button from "../../../utils/addButton.jsx";
import GridContainer from "../../../utils/grid_container/gridContainer.js";

import { database } from "../../../../firebase/firebase";
import { ref, get } from "firebase/database";
import { authListener } from "../../../../firebase/accountPersist";

class CardCustomization extends Phaser.Scene {

    constructor() {
        super({ key: "Card Customization" });

        this.cardsEquipped = ["","","",""];
        this.cardsUneqiupped = [];
        this.hasCheckedAuth = false;

        // cardData.map(cards => this.cardsUneqiupped.push(cards.card_name));

        if (!this.hasCheckedAuth) {
            authListener((user) => {
                this.hasCheckedAuth = true;  // Mark the check as completed
                
                if (user) {
                    const userId = user.uid;
                    const cardsRef = ref(database,"users/"+ userId);
                    get(cardsRef).then((snapshot)=> {
                        if(snapshot.exists()){
                            const cards = snapshot.val()["cards"];
                            cards.map((card)=>this.cardsUneqiupped.push(card)); 
                        };
                    });

                } else {
                    //empty the cards if logged out
                    this.cardsUneqiupped = [];
                };
            });
        };
    };

    create(data) {
        this.roundnes = 10;
        this.cardColorEmpty = 0x475956;
        this.cardWidth = 200;
        this.cardHeight = 250;

        console.log("Title Screen data: ", data);

        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;
        
        this.previousScene = data?.previousScene;

        this.visibility = 0;

        this.returnBtn();
        this.cardEquipped();
        this.splitPanels();
    };

    //split panels
    splitPanels() {
        const width = this.width_;
        const height = this.height_;

        const leftPanel = this.leftPanel();
        const rightPanel = this.rightPanel();

        return this.rexUI.add.splitPanels({
            x: width / 2,
            y: height / 2,
            width: width / 2 + 100,
            height: height / 2 + 100,

            space: {
                item: 10
            },

            leftPanel: leftPanel,
            rightPanel: rightPanel,
            splitter: this.add.rectangle(0, 0, 10, 1),

            // minLeftPanelWidth: 0,
            // minRightPanelWidth: 0,

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
                    fontSize: "30px",
                    fontFamily: 'Dosis',
                }),
                space: { top: 20, bottom: -45 }
            }),
        ).addBackground(
            // background of this panel
            this.rexUI.add.roundRectangle(0, 0, 0, 0, this.roundnes, 0x698a84)
                .setStrokeStyle(4, 0x000000)
                .setDepth(-1)
        ).add(
            this.gridLeft(),
            { proportion: 1, expand: false }
        )  
    };

    //right panel contents
    rightPanel() {
        return this.rexUI.add.sizer({
            orientation: 1,
        }).addBackground(
            //background of this panel
            this.rexUI.add.roundRectangle(0, 0, 0, 0, this.roundnes, 0x698a84).setStrokeStyle(4, 0x0000)
        ).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, 'Cards Equiped', {
                    fontSize: "30px",
                    fontFamily: 'Dosis',
                }),
                space: { top: 15, bottom: -25}
            })
        ).add(
            this.gridRight(),
            { proportion: 1, expand: false }
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
                top: 40,
                bottom: 40,
                left: 50,
                right: 50,

                column: 40,
            },

            createCellContainerCallback: (cell, colIndex, rowIndex) => this.cardsLeft(cell, colIndex, rowIndex),
        });
    };

    // left panel where cards contained
    gridRight() {
        const rows = 4;
        // const rows = Math.ceil(maxRightRows / maxRightCols);

        return this.rexUI.add.gridSizer({
            column: 1,
            row: rows,
            columnProportions: 1,
            rowProportions: 1,
            space: {
                top: 40,
                bottom: 40,
                left: 50,
                right: 50,

                column: 20,
                row: 20,
            },

            createCellContainerCallback: (cell, colIndex, rowIndex) => this.cardsRight(cell, colIndex, rowIndex),
        });
    };

    //card left
    cardsLeft(cell, colIndex, rowIndex) {
        const cardName = this.cardsUneqiupped
        const maxColumns = 4;
        const maxRows = 3;
        const maxItems = maxColumns * maxRows;

        const index = rowIndex * maxColumns + colIndex;

        //leaves blanks if empty card is away from the container
        if (index >= maxItems || index >= cardName.length) {
            return this.rexUI.add.sizer({
                orientation: 1,
                width: this.cardWidth,
                height: this.cardHeight
            }).addBackground(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, this.roundnes, this.cardColorEmpty)
            );
        };

        // do not render if card is already equipped
        if (this.cardsEquipped.includes(cardName[index])) {
            // Return an empty placeholder to maintain grid structure 
            return this.rexUI.add.sizer({
                orientation: 1,
                width: this.cardWidth,
                height: this.cardHeight,
                space: { top: this.cardHeight / 2 }
            }).add(
                this.rexUI.add.label({
                    text: this.add.text(0, 0, cardName[index], {
                        fontSize: "24px",
                        fontFamily: 'Dosis',
                    })
                }).setOrigin(0.5).setDepth(2)
            ).addBackground(
                this.rexUI.add.roundRectangle(0, 0, 0,0, this.roundnes, this.cardColorEmpty)
            );
        };

        //card rectangle
        const card = this.rexUI.add.roundRectangle(0, 0, 200, 250, this.roundnes, 0x9c7962).setStrokeStyle(4, 0x0000);

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

                    // get the first index of the blank string
                    const blankIndex = this.cardsEquipped.indexOf("");

                    if(blankIndex !== -1){
                        //change the blanks with card names
                        this.cardsEquipped[blankIndex] = cardName[index];
                        // this.cardsUneqiuppedpped[index] =  "";
                        //remove card when clicked
                        containerCard.clear(true)
                        containerCard.add(
                            this.rexUI.add.label({
                                text: this.add.text(0, 0, cardName[index], {
                                    fontSize: "24px",
                                    fontFamily: 'Dosis',
                                    wordWrap: { width: 200, useAdvanceWrap: true }
                                }),
                            }).setDepth(2)
                        ).addBackground(
                            this.rexUI.add.roundRectangle(0, 0, 200, 250, 0, this.cardColorEmpty).setDepth(1)
                        ).layout();

                        this.scene.restart();
                    };

                    this.plugins.get("DataPlugin")?.set("cardList", this.cardsEquipped);
                }),
        ).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, cardName[index], {
                    fontSize: '24px',
                    fontFamily: 'Dosis',
                    wordWrap: { width: 200, useAdvanceWrap: true },
                }),
            }),
            { align: 'center' }
        );

        return containerCard;
    };

    //card right
    cardsRight(cell, colIndex, rowIndex) {
        const index = rowIndex * 1 + colIndex;
        const cardRightName = this.cardsEquipped;
        const maxRightCols = 1;
        const maxRightRows = 4;
        const totalRightItems = maxRightCols * maxRightRows;
    
        // Leave blanks
        if (index >= totalRightItems || index >= cardRightName.length || this.cardsEquipped[index] === "") {
            return this.rexUI.add.sizer({
                orientation: 1,
                width: this.cardWidth,
                height: this.cardHeight
            }).addBackground(
                this.rexUI.add.roundRectangle(0, 0, 0, 0, this.roundnes, this.cardColorEmpty)
            );
        };
        
        const card = this.rexUI.add.roundRectangle(0, 0, 10, 10, this.roundnes, 0x349e8c).setStrokeStyle(4, 0x0000).setDepth(1);

        const containerCard = this.rexUI.add.sizer({
            orientation: 1,
            width: this.cardWidth,
            height: this.cardHeight,
            space: {
                top: 100
            },
        }).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, this.cardsEquipped[index], {
                    fontSize: '24px',
                    fontFamily: 'Dosis',
                }).setOrigin(0.5).setDepth(2)
            }),
        ).addBackground(
            card.setInteractive({ useHandCursor: true })
                .on("pointerover", () => {
                    card.setFillStyle(0x2f786b);
                })
                .on("pointerout", () => {
                    card.setFillStyle(0x349e8c);
                })
                .on("pointerdown", () => {

                    //empty the cards when click
                    this.cardsEquipped[index] = "";
                    containerCard.clear(true);

                    //leave blanks after clicking cards
                    containerCard.addBackground(
                        this.rexUI.add.roundRectangle(0, 0, 200, 250, this.roundnes, this.cardColorEmpty).setDepth(1)
                    ).layout();

                    this.scene.restart();
                })
        );

        return containerCard;
    };

    cardEquipped() {
        this.input.on("pointerdown", () => {
            console.log(this.cardsEquipped);
            console.log(this.cardsUneqiupped);
        });
    };

    //this will return the button from the previous scene
    returnBtn() {
        const data_ = {
            previousScene: this.previousScene,
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
        
        //activate the one button only layout
        button.button_only_layout();

        //get the grid container
        const container = new GridContainer(this, { 
            x: this.width_, 
            y: this.height_,
        });

        //insert the button object
        container.insert(button, 3, 3);
    };
};

export default CardCustomization;