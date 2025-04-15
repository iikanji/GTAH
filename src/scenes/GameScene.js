import { VoiceRecognitionService } from '../services/voiceRecognition';
import { preloadAssets, createAnimations, createBackground, updateBackground } from '../config/gameConfig';

export class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
        this.voiceRecognition = new VoiceRecognitionService();
        this.words = ['gunma', 'chan', 'takes', 'a', 'hike'];
        this.currentWord = '';
        this.score = 0;
        this.gameOver = false;
    }

    preload() {
        preloadAssets(this);
    }

    create() {
        // Create background
        createBackground(this);
        
        // Create animations
        createAnimations(this);
        
        // Create player
        this.player = this.add.sprite(100, 300, 'player-walk');
        this.player.setScale(2);
        this.player.play('player-walk');
        
        // Create enemy
        this.enemy = this.add.sprite(700, 300, 'enemy');
        this.enemy.setScale(2);
        this.enemy.play('enemy-walk');
        
        // Create UI
        this.wordText = this.add.text(400, 50, '', {
            fontSize: '32px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        }).setOrigin(0.5);
        
        this.scoreText = this.add.text(50, 50, 'Score: 0', {
            fontSize: '24px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4
        });
        
        // Create feedback images
        this.correctImage = this.add.image(400, 300, 'correct').setVisible(false);
        this.wrongImage = this.add.image(400, 300, 'wrong').setVisible(false);
        
        // Initialize voice recognition
        console.log('Initializing voice recognition...');
        this.voiceRecognition.initialize(
            (result) => {
                console.log('Voice recognition result:', result);
                this.handleVoiceResult(result);
            },
            (error) => {
                console.error('Voice recognition error:', error);
                this.handleVoiceError(error);
            }
        );
        
        // Start game
        this.startGame();
    }

    startGame() {
        console.log('Starting game...');
        this.selectRandomWord();
        this.updateUI();
        this.startListening();
    }

    startListening() {
        console.log('Starting voice recognition...');
        this.voiceRecognition.startListening();
    }

    handleVoiceResult(result) {
        console.log('Processing voice result:', result);
        if (this.gameOver) return;
        
        const recognizedWord = result.toLowerCase().trim();
        console.log('Recognized word:', recognizedWord, 'Current word:', this.currentWord);
        
        if (recognizedWord === this.currentWord) {
            console.log('Correct word!');
            this.score += 10;
            this.showFeedback(true);
            this.throwBeanBun();
            this.selectRandomWord();
            this.updateUI();
        } else {
            console.log('Wrong word!');
            this.showFeedback(false);
        }
        
        this.startListening();
    }

    handleVoiceError(error) {
        console.error('Voice recognition error:', error);
        if (!this.gameOver) {
            this.startListening();
        }
    }

    selectRandomWord() {
        this.currentWord = this.words[Phaser.Math.Between(0, this.words.length - 1)];
        this.wordText.setText(this.currentWord);
    }

    updateUI() {
        this.scoreText.setText(`Score: ${this.score}`);
    }

    showFeedback(isCorrect) {
        if (isCorrect) {
            this.correctImage.setVisible(true);
            this.correctSound.play();
        } else {
            this.wrongImage.setVisible(true);
        }
    }

    throwBeanBun() {
        // Create bean bun sprite
        const beanBun = this.add.sprite(this.player.x, this.player.y, 'bean-bun');
        
        // Animate bean bun throw
        this.tweens.add({
            targets: beanBun,
            x: this.enemy.x,
            y: this.enemy.y,
            duration: 1000,
            ease: 'Power2',
            onComplete: () => {
                beanBun.destroy();
            }
        });

        // Play throw animation
        this.player.anims.play('player-attack');
    }

    gameOver() {
        this.gameOver = true;
        this.voiceRecognition.stopListening();
        
        // Show game over screen
        const gameOverText = this.add.text(400, 300, 'Game Over!\nClick to restart', {
            fontSize: '48px',
            fill: '#fff',
            stroke: '#000',
            strokeThickness: 4,
            align: 'center'
        }).setOrigin(0.5);

        this.input.on('pointerdown', () => {
            this.scene.restart();
        });
    }
}