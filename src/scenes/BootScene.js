export class BootScene extends Phaser.Scene {
    constructor() {
        super({ key: 'BootScene' });
    }

    preload() {
        // Add loading text
        const loadingText = this.add.text(
            this.cameras.main.centerX,
            this.cameras.main.centerY,
            'Loading...',
            {
                font: '20px Arial',
                fill: '#ffffff'
            }
        );
        loadingText.setOrigin(0.5);
    }

    create() {
        this.scene.start('MenuScene');
    }
}