class CreateCard extends Phaser.GameObjects.Container {
    constructor(scene, x, y, width, height, backgroundColor, cardName, cardDamage, challengeType,instruction, cardAnswer, func) {
        super(scene, x, y);

        this.cardName = cardName;
        this.cardDamage = cardDamage;
        this.cardInstruction = instruction
        this.challengeType = challengeType;
        this.cardAnswer = cardAnswer;
        this.backgroundColor = backgroundColor;

        const cardPadding = scene.add.rectangle(0, 0, width, height, backgroundColor);
        cardPadding.setStrokeStyle(4, 0x00000);
        cardPadding.setOrigin(0);

        const cardText = scene.add.text(width / 2, height / 2, this.cardName, {
            fontSize: '50px',
            color: '#000',
            align: "center",
        });
        cardText.setOrigin(0.5, 0.5);

        cardPadding.setInteractive({ useHandCursor: true})

        this.add([cardPadding, cardText]);
        this.setSize(width, height);
        this.setPosition(x, y);
        scene.add.existing(this);

        cardPadding.on("pointerdown", () => {
            func(this.cardInstruction, this.cardAnswer);
            
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
                    });
                },
            });
        });
        
        scene.add.existing(this);
    }
}

export default CreateCard;
