class AddLine extends Phaser.GameObjects.Graphics {
    constructor(scene, width, height) {
        super(scene);
        this.width = width;
        this.height = height;
        this.setDepth(1);
        this.setScrollFactor(0)
        
        scene.add.existing(this);
    };  

    createVerticalLine(spacing, visibility){
        this.lineStyle(4, 0x00ff00, visibility);    

        let PosX = this.width * spacing;
        let PosY = this.height;

        this.beginPath();
        this.moveTo(PosX , PosY);
        this.lineTo(PosX , 0);
        this.strokePath();
        this.closePath();

        return { PosX };
    };

    createHorizontalLine(spacing, visibility){
        this.lineStyle(4, 0x00ff00, visibility);

        let PosX = this.width;
        let PosY = this.height * spacing;

        this.moveTo(0, PosY);
        this.lineTo(PosX, PosY);
        this.strokePath();
        this.closePath();

        return { PosY };
    };
};

export default AddLine;