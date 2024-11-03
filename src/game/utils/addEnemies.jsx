import Enemy from "./Enemy";
class EnemyCreate{
    constructor(scene ,ground, numberOfEnemies, player,tags, destroyedEnemies){

        this.player = player;
        this.scene = scene;
        this.tags = tags;
        this.groundObj = ground;
        this.numberOfEnemies = numberOfEnemies;
        this.destroyedEnemies = destroyedEnemies; 

        this.groundX = this.groundObj.x;
        this.groundY = this.groundObj.y;
        this.groundWidth = this.groundObj.width;
        this.spacing = this.groundWidth / (this.numberOfEnemies + 1);

        this.allEnemies =[];
        for (let i = 0; i < this.numberOfEnemies; i++) {

            const enemyName = `${tags}[${i}]`;

            //if enemy destroyed skip the creating the enemy
            if (this.destroyedEnemies.includes(enemyName)) continue;

            this.enemyX = this.groundX - this.groundWidth / 2 + (i + 2) * this.spacing;
            this.enemyY = this.groundY - 500;

            this.enemy = new Enemy(this.scene, this.enemyX, this.enemyY, 100,120, 0x39cc8a, ground,enemyName);
            this.enemy.health = 100;
            this.allEnemies.push(this.enemy);
        };  

        const hit = (player, enemy) => {
            this.scene.scene.launch("fightScene", {
                enemyName: enemy.name, 
                enemyHp: enemy.health,
                playerName: player.playerName,
                playerHp: player.health,
                
                destroyedEnemies: this.destroyedEnemies,
                playerPrevPos:{
                    x: player.x,
                    y: player.y
                },

                currentScene: this.scene.scene.key,
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