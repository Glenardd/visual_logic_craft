import { logout } from "../../../../../firebase/accountPersist";

class Logout extends Phaser.Scene{
    constructor(){
        super({key: "Logout"});
    };

    create(){
        console.log(this.scene.key);
        this.#logout();
    };

    #logout(){
        logout();
        this.scene.start("Login");
        
        //stops after going to login 
        this.scene.stop();
    };
};

export default Logout;