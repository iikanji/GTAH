import Phaser from 'phaser';
import { gameConfig } from './config/gameConfig';
import { BootScene } from './scenes/BootScene';
import { MenuScene } from './scenes/MenuScene';
import { GameScene } from './scenes/GameScene';

// Register scenes
gameConfig.scene = [BootScene, MenuScene, GameScene];

// Create the game instance
window.addEventListener('load', () => {
    const game = new Phaser.Game(gameConfig);

    // Handle resize events
    window.addEventListener('resize', () => {
        game.scale.refresh();
    });
});