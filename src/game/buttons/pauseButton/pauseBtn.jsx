import ButtonCreate from "../../utils/addButton";

export const pauseBtn = (scene) =>{
    const returnEvent = () =>{
        scene.scene.launch("pauseMenu", {previousScene: scene.scene.key});
    };
    
    new ButtonCreate(scene,0,0, "Menu", 25, 50, 200, 0xe85f5f,0x914c4c, returnEvent, true);
};