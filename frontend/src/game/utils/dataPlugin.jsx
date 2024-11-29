class DataPlugin extends Phaser.Plugins.BasePlugin{
    constructor(pluginManager){
        super(pluginManager);
        this.data = {};
    };

    set(key, value){
        this.data[key] = value;
    };

    get(key){
        return this.data[key];
    };
};

export default DataPlugin;