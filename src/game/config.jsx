import { useEffect } from "react";
import Phaser from "phaser";

//scenes
import MissionOne from "./missions/missionOne/scene";
import FightScene from "./battleScene/scene";
import MissionTwo from "./missions/missionTwo/scene";
import LevelSelect from "./menus/levelSelect/scene";

function App() {

  useEffect(()=>{
    const config = {
      type: Phaser.AUTO,
      width: 2000,
      height: 1200,
      backgroundColor: "#3486eb",
      physics: {
        default: 'arcade',
        arcade: {
          debug: false,
        },
      },
      dom: {
        createContainer: true
      },
      scale: {
        mode: Phaser.Scale.FIT,
        autoCenter: Phaser.Scale.CENTER_BOTH
      },
      parent: ".game",
      scene: [LevelSelect,MissionTwo, MissionOne, FightScene],
    };

    const game = new Phaser.Game(config);

    return () =>{
      if(game) {game.destroy(true);} 
    };
  });

  return (
    <div id="game"></div>
  );
};

export default App;
