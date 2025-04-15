export const gameConfig = {
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 0 },
            debug: false
        }
    }
};

// These functions will be called from the scene
export function preloadAssets(scene) {
    // Load background assets
    scene.load.image('sky01', 'assets/sprites/sky01.png');
    scene.load.image('sky02', 'assets/sprites/sky02.png');
    scene.load.image('sky03', 'assets/sprites/sky03.png');
    scene.load.image('mountain', 'assets/sprites/mountain.png');
    scene.load.image('grass01', 'assets/sprites/grass01.png');
    scene.load.image('grass02', 'assets/sprites/grass02.png');
    scene.load.image('grass03', 'assets/sprites/grass03.png');
    scene.load.image('grass04', 'assets/sprites/grass04.png');
    scene.load.image('grass05', 'assets/sprites/grass05.png');
    scene.load.image('grass06', 'assets/sprites/grass06.png');
    
    // Load player assets
    scene.load.spritesheet('player-walk', 'assets/sprites/walk1.png', { 
        frameWidth: 64, 
        frameHeight: 64 
    });
    scene.load.spritesheet('player-attack', 'assets/sprites/playerattack.png', { 
        frameWidth: 64, 
        frameHeight: 64 
    });
    
    // Load enemy assets
    scene.load.spritesheet('enemy', 'assets/sprites/enemy_strip8.png', { 
        frameWidth: 64, 
        frameHeight: 64 
    });
    scene.load.image('enemy-smile', 'assets/sprites/enemysmile.png');
    
    // Load UI assets
    scene.load.image('bean-bun', 'assets/sprites/bread.png');
    scene.load.image('correct', 'assets/sprites/correct.png');
    scene.load.image('wrong', 'assets/sprites/wrong.png');
    
    // Load audio
    scene.load.audio('correct-sound', 'assets/audio/correct_awesome.wav');
}

export function createAnimations(scene) {
    // Create animations
    scene.anims.create({
        key: 'player-walk',
        frames: scene.anims.generateFrameNumbers('player-walk', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });

    scene.anims.create({
        key: 'player-attack',
        frames: scene.anims.generateFrameNumbers('player-attack', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: 0
    });

    scene.anims.create({
        key: 'enemy-walk',
        frames: scene.anims.generateFrameNumbers('enemy', { start: 0, end: 7 }),
        frameRate: 10,
        repeat: -1
    });
}

export function createBackground(scene) {
    // Create background layers with proper depth
    scene.sky1 = scene.add.tileSprite(400, 300, 800, 600, 'sky01').setDepth(0);
    scene.sky2 = scene.add.tileSprite(400, 300, 800, 600, 'sky02').setDepth(1);
    scene.sky3 = scene.add.tileSprite(400, 300, 800, 600, 'sky03').setDepth(2);
    scene.mountains = scene.add.tileSprite(400, 300, 800, 600, 'mountain').setDepth(3);
    
    // Create grass layers with proper depth
    scene.grass1 = scene.add.tileSprite(400, 500, 800, 200, 'grass01').setDepth(4);
    scene.grass2 = scene.add.tileSprite(400, 500, 800, 200, 'grass02').setDepth(5);
    scene.grass3 = scene.add.tileSprite(400, 500, 800, 200, 'grass03').setDepth(6);
    scene.grass4 = scene.add.tileSprite(400, 500, 800, 200, 'grass04').setDepth(7);
    scene.grass5 = scene.add.tileSprite(400, 500, 800, 200, 'grass05').setDepth(8);
    scene.grass6 = scene.add.tileSprite(400, 500, 800, 200, 'grass06').setDepth(9);

    // Set the display size of each layer to match the game size
    [scene.sky1, scene.sky2, scene.sky3, scene.mountains].forEach(layer => {
        layer.setDisplaySize(800, 600);
    });

    [scene.grass1, scene.grass2, scene.grass3, scene.grass4, scene.grass5, scene.grass6].forEach(layer => {
        layer.setDisplaySize(800, 200);
    });
}

export function updateBackground(scene) {
    // Update parallax scrolling
    scene.sky1.tilePositionX += 0.5;
    scene.sky2.tilePositionX += 1;
    scene.sky3.tilePositionX += 1.5;
    scene.mountains.tilePositionX += 2;
    
    scene.grass1.tilePositionX += 3;
    scene.grass2.tilePositionX += 3.5;
    scene.grass3.tilePositionX += 4;
    scene.grass4.tilePositionX += 4.5;
    scene.grass5.tilePositionX += 5;
    scene.grass6.tilePositionX += 5.5;
}