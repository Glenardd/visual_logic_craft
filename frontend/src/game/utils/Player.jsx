class Player extends Phaser.GameObjects.Rectangle{
    constructor(scene ,x, y, width, height, color, playerName){
        super(scene,x,y,width, height, color);
        
        //player health
        this.health = 100;
        this.x = x;
        this.y = y;
        this.scene = scene;
        this.playerName = playerName;

        this.setStrokeStyle(4, 0x0000);
        this.scene.add.existing(this);

    };

    //add some physics
    addPhysics(){
        this.scene.physics.add.existing(this);
        this.body.setGravityY(350);

    };

    //set up camera
    setCamera(camera, width, height){
        camera.main.setBounds(0, 200, width * 3.3, height);
        camera.main.startFollow(this);
        
        //the camera wont start from 0 of x axis going to the position of player when position changes
        this.scene.time.delayedCall(50, () => {
            camera.main.setLerp(0.1, 0.1);
        });
    };

    //the position of the camera
    setCameraOffset(camera, width){
        camera.main.followOffset.x =-width/ 2;
    };

    setPlayerMovement(){
        // Handle keydown events
        this.scene.input.keyboard.on('keydown', (event) => {
            // Move Right
            if (event.key === "d" || event.key === "D" ) {
                this.body.setVelocityX(360);
                
            }
            // Move Left
            else if (event.key === "a" || event.key === "A") {
                this.body.setVelocityX(-360);
                
            };

            // Jump
            if ((event.key === "w" || event.key === "W") && this.body.touching.down) {
                this.body.setVelocityY(-380);
            };
        });

        // Handle keyup events to stop the player
        this.scene.input.keyboard.on("keyup", (event) => {
            if (["a", "d", "A", "D"].includes(event.key)) {
                this.body.setVelocityX(0);
            };
        });
    };
};

export default Player;