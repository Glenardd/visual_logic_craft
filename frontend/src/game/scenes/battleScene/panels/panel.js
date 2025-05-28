class Panel extends Phaser.GameObjects.Container {
    constructor(scene) {
        super(scene);

        this.scene = scene;
        this.width = this.scene.cameras.main.width;
        this.height = this.scene.cameras.main.height;

        console.log("Panel width: ", this.width, " height: ", this.height);

        //initialize panel
        this.init_containers();
        this.scene.add.existing(this);
    }

    //initialize the containers
    init_containers() {
        const panels = this.scene.rexUI.add.sizer({
            x: 0, y: this.height,
            orientation: 'y',
            align: 'center',
            space: { item: 3 }
        });

        panels.setOrigin(0, 1);

        //first container is on the top
        panels.add(this.first_row(), { expand: true, align: 'center' , padding: { left: 10, right: 10, top: 3, bottom: 3 } });

        //second container is on the bottom
        panels.add(this.second_row(), { expand: true, align: 'center' });

        panels.layout();
        return panels;
    };

    first_row() {
        return this.scene.add.rectangle(0, 0, this.width-20, 70, 0x1e81b0).setStrokeStyle(2, 0x0000).setOrigin(0, 1);
    };

    second_row() {
        const panel_width = 500; // Adjust width to fit the screen
        const panel_height = 400;

        const panels = this.scene.rexUI.add.sizer({
            x: 0, y: this.height,
            orientation: 'x',
            align: 'center',
        });

        panels.setOrigin(0, 1);

        panels.add(
            this.scene.add.rectangle(0, 0, panel_width+200-50, panel_height, 0x1e81b0).setStrokeStyle(2, 0x0000),
            { expand: true , align: 'center' , padding: { left: 10, right: 10, top: 10, bottom: 10 } }
        );

        panels.add(
            this.scene.add.rectangle(0, 0, panel_width+200-10, panel_height, 0x1e81b0).setStrokeStyle(2, 0x0000),
            { expand: true , align: 'center' , padding: { left: 10, right: 10, top: 10, bottom: 10 } }
        );

        panels.add(
            this.scene.add.rectangle(0, 0, panel_width+100, panel_height, 0x1e81b0).setStrokeStyle(2, 0x0000),
            { expand: true , align: 'center' , padding: { left: 10, right: 10, top: 10, bottom: 10 } }
        );

        panels.layout();
        return panels;
    };


};

export default Panel;
