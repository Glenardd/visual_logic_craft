import { useEffect } from "react";
import Phaser from "phaser";
import RexUIPlugin from 'phaser3-rex-plugins/templates/ui/ui-plugin.js';
import BBCodeTextPlugin from 'phaser3-rex-plugins/plugins/bbcodetext-plugin.js';
import DataPlugin from "./utils/dataPlugin.jsx";

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
import HowToPlay from "./scenes/menus/homeMenu/howToPlay/scene";
import Hints from "./scenes/hints/scene";
import Login from "./scenes/menus/homeMenu/login/scene";
import Logout from "./scenes/menus/homeMenu/logout/scene";
import About from "./scenes/menus/about/scene.js";

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
          debug: true,
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
        Login,
        Logout,
        TitleScreen,
        LevelSelect,
        CardCustomization,
        MissionTwo, 
        MissionOne,
        GameOver,
        FightScene, 
        Hints,
        PauseMenu,
        HowToPlay,
        About, 
        MissionAccomplish,
      ],
      render:{
        antialias: true,
      },
      plugins:{
        scene:[{
            key: "rexUI",
            plugin: RexUIPlugin,
            mapping: "rexUI",
          }],
          global: [{ 
            key: 'DataPlugin', 
            plugin: DataPlugin, 
            start: true 
          },
          {
            key: 'rexBBCodeTextPlugin',
            plugin: BBCodeTextPlugin,
            start: true
          },
        ],
      },
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
