class PauseMenu extends Phaser.Scene{
    constructor(){
        super({key: "pauseMenu"});
    };
    
    create(data){
        console.log("pause menu");
        
        console.log(data.previousScene)

        this.scene.stop(data.previousScene);
        this.cameras.main.setBackgroundColor("#74874e");
        
    };

    // update(){
    //     this.scene.input.keyboard.on('keydown', (event) => {

    //     });
    // };
};

export default PauseMenu;