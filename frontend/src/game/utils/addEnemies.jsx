import Enemy from "./Enemy";
class EnemyCreate{
    constructor(scene ,ground, numberOfEnemies, player,tags, destroyedEnemies, livesRemaining, groundColor){

        this.player = player;
        this.scene = scene;
        this.tags = tags;
        this.groundObj = ground;
        this.numberOfEnemies = numberOfEnemies;
        this.destroyedEnemies = destroyedEnemies; 

        this.groundX = this.groundObj.x;
        this.groundY = this.groundObj.y;
        this.groundWidth = this.groundObj.width;
        this.groundHeight = this.groundObj.height;
        this.spacing = this.groundWidth / (this.numberOfEnemies + 1);

        this.allEnemies =[];
        for (let i = 0; i < this.numberOfEnemies; i++) {

            const enemyName = `${tags}[${i}]`;

            //if enemy destroyed skip the creating the enemy
            if (this.destroyedEnemies.includes(enemyName)) continue;

            this.enemyX = this.groundX - this.groundWidth / 2 + (i + 2) * this.spacing;
            this.enemyY = this.groundY - this.groundHeight/2;

            this.enemy = new Enemy(this.scene, this.enemyX, this.enemyY,ground,enemyName);
            this.enemy.setOrigin(0.5,1);
            this.enemy.health = 100;
            this.allEnemies.push(this.enemy);
        };  

        //this will initiate fight scene
        const hit = (player, enemy) => {
            this.scene.scene.start("fightScene", {
                enemyName: enemy.name, 
                enemyHp: enemy.health,
                playerName: player.playerName,
                destroyedEnemies: this.destroyedEnemies,
                livesRemaining: livesRemaining,
                previousScene: this.scene.scene.key,
                groundColor: groundColor,
            });
            this.scene.scene.stop("missionOne");
            this.scene.scene.stop("missionTwo");
        };
        
        this.allEnemies.forEach(enemy => this.scene.physics.add.overlap(this.player, enemy, hit, null, this));
    };

    destroyEnemy(id){
        //destroy enemy tags is equivalent
        this.allEnemies.forEach(enemy =>{
            if(enemy.name === id){
             enemy.nameText.setText("");
             enemy.destroy(true);
            };
        });
    };
};

export default EnemyCreate;