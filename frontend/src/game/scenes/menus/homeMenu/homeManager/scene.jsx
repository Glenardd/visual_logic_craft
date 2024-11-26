class HomeManager extends Phaser.Scene{
    constructor(){
        super({key: "homeManager"});
    };

    create(){
        this.scene.launch("titleScreen");
        this.scene.start("forestBackground");
    };
};

export default HomeManager;