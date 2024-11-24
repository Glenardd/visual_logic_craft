import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

export const pauseBtn = (scene, width, height, destroyedEnemies, lives, assetImg) =>{
    const returnEvent = () =>{
        scene.scene.launch("pauseMenu", {previousScene: scene.scene.key, destroyedEnemies: destroyedEnemies, lives: lives, assetImg: assetImg});
    };

    const visibility = 0;

    const addLine = new AddLine(scene, width, height);
    const lineX = addLine.createVerticalLine(0.85, visibility).PosX; // Full visibility for vertical line
    const lineY = addLine.createHorizontalLine(0.03, visibility).PosY; // Half visibility for horizontal line

    scene.add.container(lineX, lineY).add(new ButtonCreate(scene,0,0, "Menu", 25, 50, 150, 0xe85f5f,0x914c4c, returnEvent,true));
};