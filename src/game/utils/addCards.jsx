import cardData from "../objData/cardsData.json"

class CreateCard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, backgroundColor, cardName, func) {
        super(scene, x, y);
        
        let index = 0;

        const cardPadding = scene.add.rectangle(0, 0, width, height, backgroundColor);
        cardPadding.setStrokeStyle(4, 0x00000);
        cardPadding.setOrigin(0);

        const cardText = scene.add.text(width / 2, height / 2, cardName, {
            fontSize: '50px',
            color: '#000',
            align: "center",
            wordWrap: { width: width, useAdvancedWrap: true }
        });
        cardText.setOrigin(0.5, 0.5);

        cardPadding.setInteractive({ useHandCursor: true})

        this.add([cardPadding, cardText]);
        this.setSize(width, height);
        this.setPosition(x, y);
        scene.add.existing(this);
        
        cardPadding.on("pointerdown", () => {
            index++;

            for (let card of cardData) {
                if (card.card_name === cardName) {
                    if(card.concept){
                        this.cardQuestion = card.challenge_rotation[index].question;
                        this.cardAnswer = card.challenge_rotation[index].answer;
                        this.cardValue = card.value;
                    };
                };
    
                if(index === card.challenge_rotation.length){
                    index = 0;
                };
            };
            
            func(this.cardQuestion, this.cardAnswer);
            
            cardPadding.setStrokeStyle(4, 0xff0000);
            scene.tweens.add({
                targets: this,
                angle: 15,
                x: 150,
                duration: 500,
                ease: 'Power2',
                onStart: () =>{
                },
                onComplete: () => {
                    cardPadding.setStrokeStyle(4, 0x000);
                    scene.tweens.add({
                        targets: this,
                        angle: 0,
                        x: 0,
                        duration: 500,
                        ease: 'Power2',
                        onComplete: () =>{
                            scene.deselectCardbtn.setInteractivity(true);
                        },
                    });
                },
            });
        });
        
        scene.add.existing(this);
    }
}

export default CreateCard;
