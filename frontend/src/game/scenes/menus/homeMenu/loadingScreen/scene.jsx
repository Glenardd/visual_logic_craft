class Loading extends Phaser.Scene{
    constructor(){
        super({key: "loadingScreen"});
    };

    create(data){
        console.log(data);

        this.livesRemaining = data?.livesRemaining;
        this.assetImg = data?.assetImg;
        this.missionName =  data?.missionName;

        this.width = this.cameras.main.width;
        this.height = this.cameras.main.height;

        this.loadingText();

        //if api is woke up change scene
        this.wakeUp().then(result =>{
            if(result){
                this.wakeUpPredict().then(resultTwo =>{
                    if(resultTwo){
                        this.changeScene();
                    };
                });
            };
        });
    };

    loadingText(){
        return this.rexUI.add.sizer({
            x: this.width/2,
            y: this.height/2,
        }).add(
            this.rexUI.add.label({
                text: this.add.text(0, 0, 'LOADING...', {
                    fontSize: "50px",
                }),
                space: { top: 10, bottom: 10 }
            }),
            "0",
            "center"
        ).layout();
    };

    //wakes up the main route
    async wakeUp (){
        try {
            const response = await fetch("https://visual-logic-craft-1.onrender.com/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}), // Empty payload
            });
        
            if (response.ok) {
              console.log("API woke up successfully.");
              return "API is ready";
            } else {
              console.error("API failed to wake up.");
              return "API wake-up failed";
            }
        } catch (error) {
            console.error("Error waking up the API:", error.message);
            return "Error during API wake-up";
        }

    };

    //wakes up the main prediction model route
    async wakeUpPredict (){
        try {
            const response = await fetch("https://visual-logic-craft-1.onrender.com/predict", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({}), // Empty payload
            });
        
            if (response.ok) {
              console.log("API woke up successfully.");
              return "API is ready";
            } else {
              console.error("API failed to wake up.");
              return "API wake-up failed";
            }
        } catch (error) {
            console.error("Error waking up the API:", error.message);
            return "Error during API wake-up";
        };
    };

    changeScene(){
        this.scene.start(this.missionName, {livesRemaining:this.livesRemaining, assetImg: this.assetImg}); 
        this.scene.stop();
        this.scene.stop("forestBackground");
    };
};

export default Loading;