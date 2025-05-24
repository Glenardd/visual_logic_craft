import { gridValues } from "./grid_values";
class GridContainer extends Phaser.GameObjects.Container {
    constructor(scene, option = {}) {
        super(scene)

        const {
            x,  
            y,
            row = gridValues.row,
            col = gridValues.col,
            col_spacing = gridValues.col_spacing,
            row_spacing = gridValues.row_spacing,
        } = option;

        this.scene = scene;
        this.x = x;
        this.y = y;
        this.row = row;
        this.col = col;
        this.col_spacing = col_spacing;
        this.row_spacing = row_spacing;

        this.gridSizer = this.#Grid();
        this.scene.add.existing(this);
    };

    #Grid() {
        const grid = this.scene.rexUI.add.gridSizer({
            x: this.x / 2, y: this.y / 2,
            width: this.x, height: this.y,
            column: this.col, row: this.row,
            columnProportions: 1, rowProportions: 1,
            space: {
                column: this.col_spacing, row: this.row_spacing
            },
        });

        return grid;
    };

    //insert a game object into the grid sizer
    insert(gameObject, colIndex, rowIndex) {
        this.gridSizer.add(gameObject, colIndex, rowIndex, 'center', 0, true);
        this.gridSizer.layout();
    };
};

export default GridContainer;