import * as monaco from "monaco-editor";
import AddLine from "../../utils/addLayoutGuide";
import CreateCard from "../../utils/addCards";
import HealthBar from "../../utils/healthBar";
import ButtonCreate from "../../utils/addButton_temp";

import { mission_bg } from "../../utils/mission_bg";

import Button from "../../utils/addButton";
import GridContainer from "../../utils/grid_container/gridContainer";

class FightScene extends Phaser.Scene {
    constructor() {
        super({ key: "fightScene" });
        this.editor = "";
        this.attempts = 0;
        this.selectedCase = [];
        this.selectedCaseOutput = [];

        this.enemyHealth = 0;
        this.enemyName = "";
        this.currentScene = "";
    };

    pauseBtn() {
        const labelsMenu = [
            { text: "Menu" },
        ];

        const data_ = {
            previousScene: this.scene.key,
            missionScene: this.missionScene,
        };

        const button = new Button(this, labelsMenu, {
            x: this.width_,
            y: this.height_,
            orientation: "y",
            btn_width: 200,
            btn_height: 50,
            fontSize: 30,
            isGrid: true,
            text_spacing: 15,
            button_spacing: 0,
            data: data_,
            btn_color: 0xB2393B,
        });

        button.button_only_layout();
        const container = new GridContainer(this, {
            x: this.width_,
            y: this.height_,
        });

        container.insert(button, 41, 2);
    };


    create(data) {

        this.scene.sleep("forestBackground");

        console.log("Fight scene data: ", data);

        //camera area
        this.width_ = this.cameras.main.width;
        this.height_ = this.cameras.main.height;
        this.missionScene = data?.previousScene;

        this.pauseBtn();

        console.log("Fight scene data: ", data);

        this.cardsAvailable = this.plugins.get("DataPlugin")?.get("cardList") || [];

        console.log("cards available", this.cardsAvailable);

        // Player current lives count
        this.livesRemaining = data.livesRemaining;

        // Enemy information
        this.enemyHealth = data.enemyHp || 100;
        this.enemyName = data.enemyName || "Enemy";
        this.destroyedEnemies = data.destroyedEnemies;

        // Player information
        this.playerHealth = data.playerHp || 100;
        this.playerName = data.playerName || "Player";
        this.playerPrevPos = data.playerPrevPos;

        this.previousScene = data?.previousScene;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        const groundColor = data.groundColor;

        // Background data
        this.asset = { backGround: mission_bg[0].bg3_mission1 };

        // Create grid for layout guide
        const line = new AddLine(this, width, height);

        const visible = 0;

        // Line guides
        const first_Vline = line.createVerticalLine(0.25, visible);
        const second_Vline = line.createVerticalLine(0.48, visible);
        const third_Vline = line.createVerticalLine(0.07, visible);

        const first_Hline = line.createHorizontalLine(0.55, visible);
        const second_Hline = line.createHorizontalLine(0.57, visible);
        const third_Hline = line.createHorizontalLine(0.9, visible);
        const fourth_Hline = line.createHorizontalLine(0.51, visible);
        const enemyAndPlayer_Hline = line.createHorizontalLine(0.4, visible);
        const enemyHealthbar_Hline = line.createHorizontalLine(0.12, visible);
        const enemyHealthbar_Vline = line.createVerticalLine(0.58, visible);
        const playerHealthbar_Hline = line.createHorizontalLine(0.12, visible);
        const playerHealthbar_Vline = line.createVerticalLine(0.07, visible);

        // Obj layers 
        this.playerAndEnemy = this.add.container(0, enemyAndPlayer_Hline.PosY);
        const groundPos = this.add.container(0, fourth_Hline.PosY);
        const backGround = this.add.container(0, first_Hline.PosY);
        const editorLayout = this.add.container(second_Vline.PosX, second_Hline.PosY);
        const runAndlog = this.add.container(second_Vline.PosX, third_Hline.PosY);
        const cardView = this.add.container(first_Vline.PosX, second_Hline.PosY);
        const deselectBtn = this.add.container(first_Vline.PosX, third_Hline.PosY);
        const cards = this.add.container(third_Vline.PosX, second_Hline.PosY);
        const attemptsUi = this.add.container(third_Vline.PosX, fourth_Hline.PosY);

        // Load the background images
        const bg = this.add.image(0, 0, this.asset?.backGround);
        bg.setScrollFactor(0);
        bg.setOrigin(0);
        bg.setDisplaySize(width, height / 2 + 80);
        bg.setDepth(-1);

        // Enemy health bar
        this.enemyHpBar = new HealthBar(this, enemyHealthbar_Vline.PosX, enemyHealthbar_Hline.PosY, this.enemyHealth, "enemy", "Enemy");

        // Player health bar
        this.playerHpBar = new HealthBar(this, playerHealthbar_Vline.PosX, playerHealthbar_Hline.PosY, this.playerHealth, "player", "Player");

        // Container for code editor
        const containerDiv = `<div id="codeEditor" style="width: 57.4em; height: 380px; border: 1px solid grey;"></div>`;
        const containerDom = this.add.dom(0, 0).createFromHTML(containerDiv);
        containerDom.setOrigin(0);
        editorLayout.add(containerDom);

        this.events.on("pause", () => {
            containerDom.setVisible(false);
        });

        this.events.on("resume", () => {
            containerDom.setVisible(true);
        });

        // Code editor
        const containerID = document.getElementById("codeEditor");
        this.editor = monaco.editor.create(containerID, {
            value: "#code here",
            language: "python",
            automaticLayout: true,
            theme: "vs-dark",
            contextmenu: false,
            fontSize: 30,
            fontFamily: "Dosis",
            minimap: {
                enabled: false
            },
        });

        // Enemy and player
        this.playerBody = this.add.sprite(width * 0.16, 0, 'Bob');
        this.playerBody.setScale(6);
        this.playerBody.setOrigin(0, 0.5);

        this.enemyBody = this.add.sprite(width * 0.7, -20, 'Slime_blue');
        this.enemyBody.setScale(6);
        this.enemyBody.setOrigin(0,0.5);

        this.playerAndEnemy.add([this.playerBody, this.enemyBody]);

        // Animation of player and enemy
        this.playerAndEnemy.list.forEach(child => {
            this.addFloatingAnimation(child);
        });

        // Execute code
        const runCode = () => {
            const checkCard = this.selectedCase.every((card) => card === "");

            if (checkCard) {
                this.resultVal.setText("Pick a card");
                setTimeout(() => { this.resultVal.setText("Your turn") }, 1000);
            } else {
                const codeVal = this.editor.getValue();
                const normalizedCode = this.codeNormalizer(codeVal);

                if (normalizedCode === "") {
                    this.resultVal.setText("No input");
                    setTimeout(() => { this.resultVal.setText("Input your code") }, 1000);
                } else {
                    this.assertEqual(normalizedCode, codeVal);
                }
            }
        };

        let currentStep = 0;
        let currentAnswer = 0;
        let codeStr = "";

        const deselect = () => {
            console.log("deselect");

            this.hintsBtn.setInteractivity(false);
            this.deselectCardbtn.setInteractivity(false);

            // Clear view the card challenge
            this.selectACardMessage.setText("Pick a card");
            this.viewCardInstructions.setText("");
            this.viewCardName.setText("");
            this.viewCardConcept.setText("");
            this.viewCardOutput.setText("");
            this.viewCardValue.setText("");

            this.resultVal.setText("Please pick a card");
            setTimeout(() => { this.resultVal.setText("Your turn") }, 1000);
            this.selectedCase = [];
            this.selectedCaseOutput = [];

            // All cards can be pressed or interacted with this function
            cards.list?.map(card => {
                card?.setInteractivity(true);
            });

            currentAnswer = 0;
            currentStep = 0;
            codeStr = "";
        };

        const select = (cardQuestion, cardAnswer, cardName, cardConcept, cardValue) => {
            // View the card challenge
            this.selectACardMessage.setText("");
            this.viewCardInstructions.setText(cardQuestion);
            this.viewCardName.setText(cardName);
            this.viewCardConcept.setText(`\"${cardConcept}\"`);
            this.viewCardValue.setText(`Damage: ${cardValue}`);

            cardAnswer.map(expected => {
                this.selectedCase.push(expected.code);
                this.selectedCaseOutput.push(expected.output);
                this.viewCardOutput.setText(`Output: ${expected.output}`);
            });

            // Card damage
            this.cardValue = cardValue;
            this.resultVal.setText("Input your code");

            cards.list?.map(card => {
                card?.setInteractivity(false);
            });
        };

        // Enemy turn
        const endTurn = () => {
            // The fetch the api here for machine learning
            // Send to machine learning model
            const conceptStr = this.viewCardConcept.text.replace(/['"]+/g, '');
            const concept = conceptStr === "Variables" ? 3 :
                conceptStr === "Conditionals" ? 1 :
                    conceptStr === "Arrays" ? 0 :
                        conceptStr === "Functions" ? 2 : "";

            // Will return enemy damage
            const fetchData = async () => {
                try {
                    const response = await fetch(`${import.meta.env.VITE_FLASK_API_URL}/predict`, {
                        method: 'POST',
                        headers: {
                            "Content-Type": "application/json"
                        },
                        body: JSON.stringify({ "Concept": concept, "Health": this.enemyHpBar.currentHealth }),
                    });
                    const data = await response.json();  // Wait for the JSON to be parsed
                    return data;  // Return the data
                } catch (error) {
                    throw new Error("Nothing is fetch: ", error);
                }
            };

            // Reset every run of the player
            deselect();

            this.endturnbtn.setInteractivity(false);

            this.runBtn.setInteractivity(true);
            // Reset turns when turn ended
            this.attempts = 0;
            this.countAttempts.setText(`Attempts: ${this.attempts}`);

            const [, enemy] = this.playerAndEnemy.list;

            this.tweens.add({
                targets: enemy,
                ease: "Power1",
                x: "-=250",
                onStart: () => {
                    this.runBtn.setInteractivity(false);
                    this.endturnbtn.setInteractivity(false);
                    this.resultVal.setText("Enemy turn");
                },
                onComplete: () => {
                    this.tweens.add({
                        targets: enemy,
                        ease: "Power1",
                        x: "+=250",
                        onComplete: () => {
                            this.runBtn.setInteractivity(true);
                            this.resultVal.setText("Your turn");
                        },
                    });
                },
            });

            // Player damage by the enemy
            fetchData().then(data => {
                console.log(data.damage[0]);
                this.playerHpBar.Subtract(Math.floor(data.damage[0]));
            });
        };

        const hints = () => {
            const answer = this.selectedCase;

            console.log(currentAnswer);
            if (currentAnswer < answer.length) {
                const lines = answer[currentAnswer];

                // Split each string by new line
                let steps = lines.split('\n').map(line => line.trim());

                if (currentStep < steps.length) {
                    codeStr += steps[currentStep] + "\n";
                    this.scene.launch("hints", { code: codeStr });
                    currentStep++;

                    // Damage per hints
                    this.playerHpBar.Subtract(3);

                    if (currentStep === steps.length) {
                        codeStr = "";
                        currentStep = 0;
                        currentAnswer++;
                    }
                }

                if (currentAnswer === answer.length) {
                    currentAnswer = 0;
                }
            }
            this.scene.pause();
            this.hintsBtn.disableInteractive({ useHandCursor: false });
        };

        // Grass line obj
        const groundObj = this.add.rectangle(0, 0, width, 100, groundColor);
        groundObj.setStrokeStyle(4, 0x0000);
        groundObj.setOrigin(0);
        groundPos.add(groundObj);

        // Container bg
        const backgroundForEditor = this.add.rectangle(0, 0, width + 10, height, 0x698a84);
        backgroundForEditor.setStrokeStyle(3, 0x0000);
        backgroundForEditor.setOrigin(0);
        backGround.add(backgroundForEditor);

        // Code result shows here 
        const resultLog = this.add.rectangle(0, 0, 700, 100, 0xffffff);
        this.resultVal = this.add.text(resultLog.x, resultLog.y, "Your turn", { fontSize: 40, color: "#00000" });
        resultLog.setStrokeStyle(3, 0x0000);
        resultLog.setOrigin(0);
        this.resultVal.setOrigin(0.5);
        this.resultVal.x = resultLog.x + resultLog.width / 2;
        this.resultVal.y = resultLog.y + resultLog.height / 2;

        // View card panel
        const viewCard = this.add.rectangle(0, 0, 400, 380, 0x9c8454);
        this.selectACardMessage = this.add.text(0, 0, "Pick a card", {
            fontSize: "50px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        this.viewCardInstructions = this.add.text(0, 0, "", {
            fontSize: "20px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        this.viewCardName = this.add.text(0, 0, "", {
            fontSize: "30px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        this.viewCardConcept = this.add.text(0, 0, "", {
            fontSize: "30px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        this.viewCardValue = this.add.text(0, 0, "", {
            fontSize: "30px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        this.viewCardOutput = this.add.text(0, 0, "", {
            fontSize: "20px",
            wordWrap: { width: viewCard.width, useAdvancedWrap: true }
        });

        viewCard.setOrigin(0);
        viewCard.setStrokeStyle(3, 0x0000);
        this.selectACardMessage.setOrigin(0.5);
        this.viewCardInstructions.setOrigin(0.5);
        this.viewCardName.setOrigin(0.5);
        this.viewCardConcept.setOrigin(0.5);
        this.viewCardValue.setOrigin(0.5);
        this.viewCardOutput.setOrigin(0.5);

        this.selectACardMessage.x = viewCard.x + viewCard.width / 2;
        this.selectACardMessage.y = viewCard.y + viewCard.height / 2;

        this.viewCardInstructions.x = viewCard.x + viewCard.width / 2;
        this.viewCardInstructions.y = (viewCard.y + 15) + viewCard.height / 2;

        this.viewCardName.x = viewCard.x + viewCard.width / 2;
        this.viewCardName.y = (viewCard.y - 165) + viewCard.height / 2;

        this.viewCardConcept.x = viewCard.x + viewCard.width / 2;
        this.viewCardConcept.y = (viewCard.y - 120) + viewCard.height / 2;

        this.viewCardValue.x = viewCard.x + viewCard.width / 2;
        this.viewCardValue.y = (viewCard.y - 80) + viewCard.height / 2;

        this.viewCardOutput.x = viewCard.x + viewCard.width / 2;
        this.viewCardOutput.y = (viewCard.y + 150) + viewCard.height / 2;

        cardView.add([viewCard, this.viewCardInstructions, this.viewCardName, this.viewCardConcept, this.viewCardValue, this.viewCardOutput, this.selectACardMessage]);

        // Store cards here
        this.cardsAvailable?.map((card, i) => {
            let y = i * 40;

            if (card === "") {
                return null;
            }

            const cardStore = new CreateCard(
                this,
                0,
                y,
                250,
                300,
                0xdbb77d,
                0xA88A5A,
                card,
                true,
                select
            );

            cards.add(cardStore);
        });

        // Create deselect button
        this.deselectCardbtn = new ButtonCreate(this, 200, 0, "Deselect", 25, 100, 160, 0x68b054, 0x4a703f, () => deselect(), false);
        deselectBtn.add(this.deselectCardbtn);

        this.hintsBtn = new ButtonCreate(this, 0, 0, "Hint", 25, 50, 160, 0xe85f5f, 0x914c4c, () => hints(), false);
        deselectBtn.add(this.hintsBtn);

        this.endturnbtn = new ButtonCreate(this, 370, 0, "End\nTurn", 30, 100, 180, 0xe85f5f, 0x914c4c, () => endTurn(), false);

        this.runBtn = new ButtonCreate(this, 370, 0, "Run", 70, 100, 180, 0x68b054, 0x4a703f, () => runCode(), true);
        runAndlog.add([resultLog, this.resultVal, this.endturnbtn, this.runBtn]);

        this.countAttempts = this.add.text(0, 5, `Attempts: 0`, { fontSize: "40px" });
        attemptsUi.add(this.countAttempts);
    }

    addFloatingAnimation(object) {
        this.tweens.add({
            targets: object,
            ease: "Power1",
            repeat: -1,
            yoyo: true,
            y: "-=20",
        });
    }

    // Will make the code into a single line
    codeNormalizer(code) {
        try {
            const normalizedCode = code
                .replace(/#.*$/gm, '')                                   // Remove single-line comments
                .replace(/("""[\s\S]*?"""|'''[\s\S]*?''')/g, '')         // Remove multi-line comments
                .trim()
                .replace(/\s+/g, ' ')                                   // Replace multiple spaces with a single space
                .replace(/\s*:\s*/g, ': ')                              // Standardize colon spacing
                .replace(/\s*=\s*/g, ' = ')                             // Standardize equals spacing
                .replace(/\(\s*/g, '(')                                 // Remove space before opening parenthesis
                .replace(/\s*\)/g, ')')                                 // Remove space after closing parenthesis
                .replace(/\[\s*/g, '[')                                 // Remove space after opening square bracket
                .replace(/\s*\]/g, ']')                                 // Remove space before closing square bracket
                .replace(/"/g, "'")                                     // Normalize double quotes to single quotes
                .replace(/\s*,\s*/g, ',');                              // Preserve compact commas like x,y=5,10

            return normalizedCode;
        } catch {
            // Catch errors silently
            return "";
        }
    }

    // Case tester
    // Player attack
    assertEqual(code, codeExecute) {
        // List of the code normalized
        const caseAnswers = this.selectedCase.map(answers => {
            return this.codeNormalizer(answers);
        });

        // Expected code
        const expectedOutput = this.selectedCaseOutput.map(expected => {
            return expected;
        });

        // This will execute the python code
        const fetchData = async () => {
            try {
                const response = await fetch(import.meta.env.VITE_FLASK_API_URL, {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({ "code": codeExecute })
                });
                const data = await response.json();  // Wait for the JSON to be parsed
                return data;  // Return the data
            } catch (error) {
                throw new Error("Nothing is fetch: ", error);
            }
        };

        // Checks player code
        const checkAnswer = caseAnswers.some(answer => answer.toLowerCase() === code.toLowerCase());
        console.log(checkAnswer);

        // Checks player output if right
        fetchData().then(data => {
            // Executed result of the python code
            const pythonOutput = data.result;
            const checkOutput = expectedOutput.some(output => output.toLowerCase() === pythonOutput?.toLowerCase());

            // Attack enemy if correct
            if (checkOutput && checkAnswer) {
                this.resultVal.setText("Passed");

                const [player] = this.playerAndEnemy.list;

                // Animation attack of player
                this.tweens.add({
                    targets: player,
                    ease: "Power1",
                    x: "+=250",
                    onStart: () => {
                        this.runBtn.setInteractivity(false);
                        this.endturnbtn.setInteractivity(false);
                    },
                    onComplete: () => {
                        this.tweens.add({
                            targets: player,
                            ease: "Power1",
                            x: "-=250",
                            onComplete: () => {
                                this.endturnbtn.setInteractivity(true);
                            },
                        });
                    },
                });

                this.endturnbtn.setInteractivity(false);
                this.runBtn.setInteractivity(false);

                console.log(this.cardValue);

                // Damage
                this.enemyHpBar.Subtract(this.cardValue);

                if (this.enemyHpBar.currentHealth <= 0) {
                    console.log("enemy dead");
                    this.enemyBody.destroy(true);

                    // This saves the enemies player defeated
                    this.scene.launch(`${this.previousScene}`, {
                        enemyNewHp: this.enemyHealth,
                        enemyName: this.enemyName,
                        destroyedEnemies: [...this.destroyedEnemies, this.enemyName],
                        livesRemaining: this.livesRemaining,
                    });
                    this.scene.stop("fightScene");
                }
            } else {
                this.attempts += 1;
                this.countAttempts.setText(`Attempts: ${this.attempts}`);
                this.resultVal.setText("Wrong");
                setTimeout(() => { this.resultVal.setText("Your turn") }, 1000);
            }

            if (this.attempts >= 3) {
                this.endturnbtn.setInteractivity(true);
                this.runBtn.setInteractivity(false);
                this.attempts = 0;
            }

            if (!checkOutput) {
                this.countAttempts.setText(`Attempts: ${this.attempts}`);
                this.resultVal.setText("Wrong");
                setTimeout(() => { this.resultVal.setText("Your turn") }, 1000);
            }
        });
    }

    // If the player loses they will lose some lives remaining
    checkPlayerHealth() {
        // Check the health of the player
        if (this.livesRemaining === 0) {
            console.log("Player is dead");

            // Subtract one from the lives remaining
            this.scene.launch(`${this.previousScene}`, {
                livesRemaining: this.livesRemaining - 1,
            });
            this.scene.stop("fightScene");
        }
    }

    update() {
        // Check the health of the player
        this.checkPlayerHealth();
    }

    // returnBtn() {
    //     const data_ = {
    //         previousScene: this.previousScene,
    //     };

    //     const button = new Button(this, [{ text: "Return" }], {
    //         x: this.width_,
    //         y: this.height_,
    //         btn_color: 0xB2393B,
    //         orientation: "y",
    //         btn_width: 200,
    //         btn_height: 50,
    //         fontSize: 30,
    //         isGrid: true,
    //         text_spacing: 15,
    //         button_spacing: 20,
    //         data: data_,
    //     });

    //     // Activate the one button only layout
    //     button.button_only_layout();

    //     // Get the grid container
    //     const container = new GridContainer(this, {
    //         x: this.width_,
    //         y: this.height_,
    //     });

    //     // Insert the button object
    //     container.insert(button, 3, 3);
    // }
}

export default FightScene;