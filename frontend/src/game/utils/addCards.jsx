import cardData from "../objData/cardsData.json"

class CreateCard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, backgroundColor, cardName, interactivity, func) {
        super(scene, x, y);

        this.index = 0;
        this.interactivity = interactivity;
        this.func = func;
        this.scene = scene;
        this.cardName = cardName

        this.cardPadding = this.scene.add.rectangle(0, 0, width, height, backgroundColor);
        this.cardPadding.setStrokeStyle(4, 0x00000);
        this.cardPadding.setOrigin(0);

        const cardText = this.scene.add.text(width / 2, height / 2, this.cardName, {
            fontSize: '50px',
            color: '#000',
            align: "center",
            wordWrap: { width: width, useAdvancedWrap: true }
        });
        
        cardText.setOrigin(0.5, 0.5);

        this.add([this.cardPadding, cardText]);
        this.setSize(width, height);
        this.setPosition(x, y);
        this.scene.add.existing(this);

        this.setInteractivity(this.interactivity);
    };

    setInteractivity(turnOn) {
        if (turnOn) {
            this.cardPadding.setInteractive({ useHandCursor: turnOn });

            this.cardPadding.removeAllListeners();

            this.cardPadding.on("pointerdown", () => {
                this.index++;

                for (let card of cardData) {
                    if (card.card_name === this.cardName) {
                        if (card.concept) {
                            this.cardConcept = card.concept;
                            this.cardQuestion = card.challenge_rotation[this.index].question;
                            this.cardAnswer = card.challenge_rotation[this.index].answers;
                            this.cardOutput = card.challenge_rotation[this.index].output;
                            this.cardValue = card.value;
                        };
                    };

                    if (this.index === card.challenge_rotation.length) {
                        this.index = 0;
                    };
                };

                this.func(this.cardQuestion, this.cardAnswer, this.cardName, this.cardConcept, this.cardOutput);

                this.cardPadding.setStrokeStyle(4, 0xff0000);
                this.scene.tweens.add({
                    targets: this,
                    angle: 15,
                    x: 150,
                    duration: 500,
                    ease: 'Power2',
                    onComplete: () => {
                        this.cardPadding.setStrokeStyle(4, 0x000);
                        this.scene.tweens.add({
                            targets: this,
                            angle: 0,
                            x: 0,
                            duration: 500,
                            ease: 'Power2',
                            onComplete: () => {
                                this.scene.deselectCardbtn.setInteractivity(turnOn);
                            },
                        });
                    },
                });
            });

        } else {
            this.cardPadding.disableInteractive({ useHandCursor: !turnOn });
        };
    };
}

export default CreateCard;
