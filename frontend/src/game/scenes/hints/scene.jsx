class Hints extends Phaser.Scene{
    constructor(){
        super({key: "hints"});
    };

    create(data){

        const answerHint = data?.code;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height

        const background = this.rexUI.add.roundRectangle(0, 0,2, 2, 0, 0x75512d).setStrokeStyle(4, 0x0000).setDepth(1); 
        const rectangle = this.rexUI.add.roundRectangle(0, 0, 0, 0, 0, 0x754830).setStrokeStyle(3, 0x0000).setDepth(1);
        const text = this.add.text(0, 0, "Return", {fontSize: 18}).setDepth(1);
        const hintText = this.add.rexBBCodeText(0, 0, "", {fontSize: '30px',wrap: { mode: 'word', width: width }}).setDepth(1);;
        
        // hintText.setText(answerHint);

        const button = () =>{
            const button = this.rexUI.add.label({
                width: 50,
                height: 50,
                background: rectangle,
                space: {
                    left: 10,
                    right: 10,
                },
                align: 'center',
                text: text,
            }).setInteractive({ useHandCursor: true })
            .on("pointerdown", ()=>{ 
                this.scene.resume("fightScene");
                this.scene.stop();
            }).on("pointerover", ()=>{
              console.log("over");  
            });
            
            return button;
        };

        const hints = () => {
            const panel = this.rexUI.add.sizer({
                orientation: "y",
                x:width/2,
                y:height/2,
                width: width/2-500,
                height: height/2-100,
                space:{
                    top: 10,
                    left: 10,
                }
            }).addBackground(
                background
            ).add(
               button(),
               0,
               "left"
            ).add(
                this.rexUI.add.textBox({
                    text: hintText.setText(answerHint),
                    space: { 
                        top: 20,
                        left: 20,
                        right: 20,
                    }
                }),
                0,
                "center"
            ).layout();

            return panel;
        };

        //background
        this.add.rectangle(width/2, height/2, width,height, 0x000000).setAlpha(0.8);

        hints();
    };
};

export default Hints;