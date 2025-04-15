export class MenuScene extends Phaser.Scene {
    constructor() {
        super({ key: 'MenuScene' });
    }

    create() {
        const title = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY - 100,
            'Gunma Chan Takes A Hike',
            {
                font: '32px Arial',
                fill: '#ffffff'
            }
        );
        title.setOrigin(0.5);

        const startButton = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Start Game',
            {
                font: '24px Arial',
                fill: '#ffffff'
            }
        );
        startButton.setOrigin(0.5);
        startButton.setInteractive();
        
        startButton.on('pointerover', () => {
            startButton.setStyle({ fill: '#ff0' });
        });
        
        startButton.on('pointerout', () => {
            startButton.setStyle({ fill: '#ffffff' });
        });
        
        startButton.on('pointerdown', () => {
            this.scene.start('GameScene');
        });
    }
}