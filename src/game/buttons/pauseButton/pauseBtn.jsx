import ButtonCreate from "../../utils/addButton";
import AddLine from "../../utils/addLayoutGuide";

export const pauseBtn = (scene, width, height, destroyedEnemies) =>{
    const returnEvent = () =>{
        scene.scene.launch("pauseMenu", {previousScene: scene.scene.key, playerNewPos: scene.player, destroyedEnemies: destroyedEnemies});
        scene.scene.stop(`${scene.scene.key}`);
    };

    const visibility = 0;

    const addLine = new AddLine(scene, width, height);
    const lineX = addLine.createVerticalLine(0.88, visibility).PosX; // Full visibility for vertical line
    const lineY = addLine.createHorizontalLine(0.05, visibility).PosY; // Half visibility for horizontal line

    scene.add.container(lineX, lineY).add(new ButtonCreate(scene,0,0, "Menu", 25, 50, 150, 0xe85f5f,0x914c4c, returnEvent, true));
};