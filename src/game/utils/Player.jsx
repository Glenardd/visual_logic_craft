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
        camera.main.setBounds(0, 0, width * 3.3, height)
        camera.main.startFollow(this);
        camera.main.setZoom(0.8,0.8);
    };
};

export default Player;