import { useEffect } from "react";
import Phaser from "phaser";

//scenes
import MissionOne from "./scenes/missions/missionOne/scene";
import FightScene from "./scenes/battleScene/scene";
import MissionTwo from "./scenes/missions/missionTwo/scene";
import LevelSelect from "./scenes/menus/homeMenu/levelSelect/scene";
import PauseMenu from "./scenes/menus/pauseMenu/scene";
import GameOver from "./scenes/menus/gameOver/scene";
import MissionAccomplish from "./scenes/menus/missionAccomplish/scene";
import TitleScreen from "./scenes/menus/homeMenu/titleScreen/scene";
import ForestBackGround from "./scenes/menus/homeMenu/forestBg/scene";
import HomeManager from "./scenes/menus/homeMenu/homeManager/scene";
import CardCustomization from "./scenes/menus/cardsCustomization/scene";

function App() {

  useEffect(()=>{
    const config = {
      type: Phaser.AUTO,
      width: 2000,
      height: 1200,
      backgroundColor: "#3486eb",
      disableContextMenu: true,
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
      scene: [
        HomeManager,
        ForestBackGround,
        TitleScreen,
        LevelSelect,
        CardCustomization,
        MissionTwo, 
        MissionOne,
        GameOver, 
        FightScene, 
        PauseMenu, 
        MissionAccomplish,
      ], //LevelSelect,MissionTwo, MissionOne, FightScene, PauseMenu, GameOver
    };

    const game = new Phaser.Game(config);

    return () =>{
      if(game) {game.destroy(true);} 
    };
  }, []);

  return (
    <div id="game"></div>
  );
};

export default App;
