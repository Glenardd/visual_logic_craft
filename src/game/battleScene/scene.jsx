import * as monaco from "monaco-editor";
import ButtonCreate from "../utils/addButton";
import AddLine from "../utils/addLayoutGuide.jsx";
import CreateCard from "../utils/addCards.jsx";
import { pauseBtn } from "../buttons/pauseButton/pauseBtn.jsx";

class FightScene extends Phaser.Scene {
    constructor() {
        super({ key: "fightScene" });
        this.editor = null;
        this.attempts = 0;
        this.selectedCase = "";
        
        this.enemyHealth = 0;
        this.enemyName = "";
        this.currentScene = "";
    };

    create(data) {

        console.log("Battle scene");

        this.enemyHealth = data.enemyHp;
        this.enemyName = data.enemyName;
        this.destroyedEnemies = data.destroyedEnemies;
        
        this.playerPrevPos = data.playerPrevPos;

        this.currentScene = data.currentScene;

        const width = this.scale.width;
        const height = this.scale.height;

        //create grid for layout guide
        const line = new AddLine(this, width, height);

        const visible = 0;
        
        //line guides
        const first_Vline = line.createVerticalLine(0.25, visible);
        const second_Vline = line.createVerticalLine(0.48,visible);
        const third_Vline = line.createVerticalLine(0.07,visible);
        const topUi_Vline = line.createVerticalLine(0.6,visible);

        const first_Hline = line.createHorizontalLine(0.55, visible);
        const second_Hline = line.createHorizontalLine(0.57, visible);
        const third_Hline = line.createHorizontalLine(0.9, visible);
        const fourth_Hline = line.createHorizontalLine(0.51, visible);
        const topUi_Hline = line.createHorizontalLine(0.05,visible)
        const enemyAndPlayer_Hline = line.createHorizontalLine(0.4,visible)
        
        //obj layers 
        this.playerAndEnemy = this.add.container(0,enemyAndPlayer_Hline.PosY);
        const groundPos = this.add.container(0, fourth_Hline.PosY);
        const backGround = this.add.container(0,first_Hline.PosY);
        const editorLayout = this.add.container(second_Vline.PosX,second_Hline.PosY);
        const runAndlog = this.add.container(second_Vline.PosX,third_Hline.PosY); 
        const cardView = this.add.container(first_Vline.PosX, second_Hline.PosY);
        const deselectBtn = this.add.container(first_Vline.PosX, third_Hline.PosY);
        const cards = this.add.container(third_Vline.PosX, second_Hline.PosY);
        const attemptsUi = this.add.container(third_Vline.PosX, fourth_Hline.PosY);
        const topUiLeft = this.add.container(topUi_Vline.PosX, topUi_Hline.PosY);
        const topUiRight = this.add.container(third_Vline.PosX, topUi_Hline.PosY);

        this.enemyHealthBar = this.add.text(0, 0, `${this.enemyHealth} & ${this.enemyName}`, { fontSize: "50px", fill: "#fff" });
        topUiLeft.add(this.enemyHealthBar);

        const playerHealthBar = this.add.text(0,0, `${data.playerName} & ${data.playerHp}`, { fontSize: "50px", fill: "#fff" });
        topUiRight.add(playerHealthBar)

        //container for code editor
        const containerDiv = `<div id="codeEditor" style="width: 57.4em; height: 380px; border: 1px solid grey;"></div>`;
        const containerDom = this.add.dom(0, 0).createFromHTML(containerDiv);
        containerDom.setOrigin(0);
        editorLayout.add(containerDom);

        //code editor
        const containerID = document.getElementById("codeEditor");
        this.editor = monaco.editor.create(containerID, {
            value: "#code here",
            language: "python",
            automaticLayout: true,
            theme: "vs-dark",
            contextmenu: false,
            fontSize: 30,
            minimap: {
                enabled: false
            },
        });

        //enemy and player
        this.playerBody = this.add.rectangle(width*0.35,0,90,90, 0xed5f5f);
        this.playerBody.setStrokeStyle(4, 0x0000);
        this.playerBody.setOrigin(0);

        this.enemyBody = this.add.rectangle(width*0.6,-20,90,120, 0x39cc8a);
        this.enemyBody.setStrokeStyle(4, 0x0000);
        this.enemyBody.setOrigin(0);
        
        this.playerAndEnemy.add([this.playerBody, this.enemyBody]);

        //animation of player and enemy
        this.playerAndEnemy.list.forEach(child=>{
            this.addFloatingAnimation(child);
        });

        //execute code
        const runCode = () => {

            if(this.selectedCase === ""){
                // console.log("empty");
                this.resultVal.setText("Pick a card");
                setTimeout(()=>{this.resultVal.setText("Your turn")},1000);
                
            }else{
                const codeVal = this.editor.getValue();
                const normalizedCode = this.codeNormalizer(codeVal);

                if(normalizedCode === ""){
                    this.resultVal.setText("No input");
                    setTimeout(()=>{this.resultVal.setText("Input your code")},1000);
                }else{
                    this.assertEqual(normalizedCode);
                };
            };
        };

        const deselect = () =>{
            this.deselectCardbtn.setInteractivity(false);
            console.log("deselect");

            //clear view th card challenge
            this.viewCardValue.setText("Pick a card");
            this.resultVal.setText("Please pick a card");
            setTimeout(()=>{this.resultVal.setText("Your turn")},1000);
            this.selectedCase = "";
        };

        const select = (cardAnswer, cardInstuction) =>{
            // this.deselectCardbtn.setInteractivity(true);
            console.log("selected a card");
            
            //view th card challenge
            this.viewCardValue.setText(cardAnswer);
            this.selectedCase = cardInstuction;
            this.resultVal.setText("Input your code");
        };

        const endTurn = () =>{
            this.endturnbtn.setInteractivity(false);
            this.runBtn.setInteractivity(true);
            //reset turns when turn ended
            this.attempts = 0
            this.countAttempts.setText(`Attempts: ${this.attempts}`);

            const [,enemy] = this.playerAndEnemy.list;

            this.tweens.add({
                targets: enemy,
                ease: "Power1",
                x: "-=250",
                onStart:()=>{
                    this.runBtn.setInteractivity(false);
                    this.endturnbtn.setInteractivity(false);
                    this.resultVal.setText("Enemy turn");
                },
                onComplete: () =>{
                    this.tweens.add({
                        targets: enemy,
                        ease: "Power1",
                        x: "+=250",
                        onComplete: ()=>{
                            this.runBtn.setInteractivity(true);
                            this.resultVal.setText("Your turn");
                        },
                    });
                },
            });
        };

        //grass line obj
        const groundObj = this.add.rectangle(0,0, width,100,0x537d3b);
        groundObj.setStrokeStyle(4, 0x0000)
        groundObj.setOrigin(0);
        groundPos.add(groundObj);

        //container bg
        const backgroundForEditor = this.add.rectangle(0,0,width+10,height, 0x698a84);
        backgroundForEditor.setStrokeStyle(3, 0x0000)
        backgroundForEditor.setOrigin(0);
        backGround.add(backgroundForEditor);

        //code result shows here 
        const resultLog = this.add.rectangle(0,0,700,100,0xffffff);
        this.resultVal = this.add.text(resultLog.x,resultLog.y, "Your turn", {fontSize: 40,color: "#00000"});
        resultLog.setStrokeStyle(3, 0x0000);
        resultLog.setOrigin(0);
        this.resultVal.setOrigin(0.5);
        this.resultVal.x = resultLog.x + resultLog.width/2;
        this.resultVal.y = resultLog.y + resultLog.height/2;
        
        //view card
        const viewCard = this.add.rectangle(0,0,400,380, 0x9c8454);
        this.viewCardValue = this.add.text(0,0,"Pick a card", {fontSize: "40px"});
        viewCard.setOrigin(0);
        viewCard.setStrokeStyle(3, 0x0000);
        this.viewCardValue.setOrigin(0.5);
        this.viewCardValue.x = viewCard.x + viewCard.width/2;
        this.viewCardValue.y = viewCard.y + viewCard.height/2;
        cardView.add([viewCard, this.viewCardValue]);

        //cards
        this.card1= new CreateCard(this, 0, 0, 250, 300, 0xdbb77d, "card1", 100, "loop","Print hello world","print(\"hello world\")", select);
        this.card2= new CreateCard(this, 0, 60, 250, 300, 0xdbb77d, "card2", "magic some mob","variable","Nothing","just make a loop",select);
        this.card3= new CreateCard(this, 0, 120, 250, 300, 0xdbb77d, "card2", "yes, do nothing", "function","Nothing", "just make a loop",select);
        this.card4= new CreateCard(this, 0, 175, 250, 300, 0xdbb77d, "card3", "nothing at the moment", "functsss","Nothing", "just make a loop", select);
        cards.add([this.card1,this.card2,this.card3,this.card4]);

        //buttons
        this.deselectCardbtn = new ButtonCreate(this,100,0, "Deselect", 25, 50,200, 0xe85f5f, 0x914c4c, deselect, false);
        deselectBtn.add(this.deselectCardbtn);

        this.endturnbtn = new ButtonCreate(this, 370,0, "End\nTurn", 30, 100, 180, 0xe85f5f, 0x914c4c, endTurn, false );

        this.runBtn = new ButtonCreate(this,370,0,"Run",70, 100,180, 0x68b054,0x4a703f, runCode, true);
        runAndlog.add([this.runBtn,resultLog, this.resultVal, this.endturnbtn]);

        this.countAttempts = this.add.text(0,5,`Attempts: 0`, {fontSize: "40px"});
        attemptsUi.add(this.countAttempts);

        pauseBtn(this, width, height);
    };

    addFloatingAnimation(object){
        this.tweens.add({
            targets: object,
            ease: "Power1",
            repeat: -1,
            yoyo: true,
            y: "-=20",
        });
    };

    //will make the code into a single line
    codeNormalizer(code) {
        try{
            const normalizedCode = code
                .replace(/#.*$/gm,'')                                   // Remove single-line comments
                .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g,'')         // Remove multi-line comments
                .trim()
                .replace(/\s+/g, ' ')                                   // Replace multiple spaces with a single space
                .replace(/\s*:\s*/g, ': ')                              // Standardize colon spacing
                .replace(/\s*=\s*/g, ' = ')                             // Standardize equals spacing
                .replace(/\s*\(\s*/g, '(')                              // Remove space before opening parenthesis
                .replace(/\s*\)\s*/g, ')')                              // Remove space after closing parenthesis
                .replace(/\[\s*/g, '[')                                 // Remove space after opening square bracket
                .replace(/\s*\]/g, ']')                                 // Remove space before closing square bracket
                .replace(/"/g, "'");                                    // Normalize double quotes to single quotes

            return normalizedCode;
        }catch{
            //catch none
        };
    };

    //case tester
    assertEqual(code) {
        
        const caseOneNormalized = this.codeNormalizer(this.selectedCase);

        //attack enemy if correct
        if (caseOneNormalized.toLowerCase() === code.toLowerCase()) {
            this.resultVal.setText("Passed");

            const [player] = this.playerAndEnemy.list;

            //animation attack of player
            this.tweens.add({
                targets: player,
                ease: "Power1",
                x: "+=250",
                onStart:()=>{
                    this.runBtn.setInteractivity(false);
                    this.endturnbtn.setInteractivity(false);
                },
                onComplete: () =>{
                    this.tweens.add({
                        targets: player,
                        ease: "Power1",
                        x: "-=250",
                        onComplete: ()=>{
                            this.endturnbtn.setInteractivity(true);
                        },
                    });
                },
            });

            this.endturnbtn.setInteractivity(true);
            this.runBtn.setInteractivity(false);

            //damage
            this.enemyHealth -= this.card1.cardDamage;
            this.enemyHealthBar.setText(`${this.enemyHealth} & ${this.enemyName}`);

            if(this.enemyHealth <= 0){
                console.log("enemy dead");
                this.enemyBody.destroy(true);

                //saves the original position of the player
                this.scene.launch(`${this.currentScene}`, {
                    enemyNewHp: this.enemyHealth,
                    playerNewPos: this.playerPrevPos, 
                    enemyName: this.enemyName, 
                    destroyedEnemies: [...this.destroyedEnemies, this.enemyName]
                });
                this.scene.stop("fightScene");
            };

        }else{
            this.attempts += 1;
            this.countAttempts.setText(`Turns: ${this.attempts}`);
            this.resultVal.setText("Wrong");
            setTimeout(()=>{this.resultVal.setText("Your turn")},1000);
        };

        if(this.attempts >= 3){
            this.endturnbtn.setInteractivity(true);
            this.runBtn.setInteractivity(false);
            this.attempts = 0;
        };
    };

};

export default FightScene;
