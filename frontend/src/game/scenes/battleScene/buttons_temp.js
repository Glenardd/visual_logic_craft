class ButtonCreate extends Phaser.GameObjects.Container {
    constructor(scene, x, y, text, fontSize = 25, width = 100, height = 50, fillColor = 0x68b054, hoverColor = 0x4a703f, callback = null, isInteractive = true) {
        super(scene, x, y);
        
        this.scene = scene;
        this.callback = callback;
        
        // Create the button background
        this.background = scene.add.rectangle(0, 0, width, height, fillColor);
        this.background.setStrokeStyle(3, 0x000000);
        this.background.setOrigin(0);
        
        // Create the button text
        this.buttonText = scene.add.text(0, 0, text, {
            fontSize: `${fontSize}px`,
            color: '#ffffff',
            align: 'center',
            wordWrap: { width: width - 10 }
        });
        
        // Center the text on the button
        this.buttonText.setOrigin(0.5);
        this.buttonText.x = this.background.x + (width / 2);
        this.buttonText.y = this.background.y + (height / 2);
        
        // Add objects to the container
        this.add([this.background, this.buttonText]);
        
        // Set interactivity
        this.fillColor = fillColor;
        this.hoverColor = hoverColor;
        
        if (isInteractive) {
            this.setInteractivity(true);
        }
        
        // Add the container to the scene
        scene.add.existing(this);
    }
    
    setInteractivity(isInteractive) {
        if (isInteractive) {
            this.background.setInteractive({ useHandCursor: true });
            
            // Add event listeners
            this.background.on('pointerover', () => {
                this.background.fillColor = this.hoverColor;
            });
            
            this.background.on('pointerout', () => {
                this.background.fillColor = this.fillColor;
            });
            
            this.background.on('pointerdown', () => {
                if (this.callback) {
                    this.callback();
                }
            });
        } else {
            this.background.disableInteractive({ useHandCursor: false });
        }
    }
    
    // Change button text
    setText(text) {
        this.buttonText.setText(text);
    }
    
    // Set button colors
    setColors(fillColor, hoverColor) {
        this.fillColor = fillColor;
        this.hoverColor = hoverColor;
        this.background.fillColor = fillColor;
    }
    
    // Enable/disable the button
    setEnabled(enabled) {
        if (enabled) {
            this.setInteractivity(true);
            this.background.fillColor = this.fillColor;
            this.buttonText.setAlpha(1);
        } else {
            this.setInteractivity(false);
            this.background.fillColor = 0x999999; // Gray out when disabled
            this.buttonText.setAlpha(0.5);
        }
    }
    
    // Convenience method to disable interactive
    disableInteractive(options) {
        this.background.disableInteractive(options);
    }
}

export default ButtonCreate;