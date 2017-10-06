
var game = new Phaser.Game(800, 600, Phaser.CANVAS, 'game', { preload: preload, create: create, update: upload });

function preload() {
    game.load.spritesheet('pokemon', 'img/bulbasour.png', 29, 29, 16);
}

var player;
var cursors;
var facing = {
    1: 3,
    2: 6,
    3: 9,
    4: 0
}

function create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);
    game.physics.arcade.defaultRestitution = 0.8;

    game.stage.backgroundColor = '#e4e4e4'

    player = game.add.sprite(100, 100, 'pokemon');
    player.scale.setTo(1.5);
    player.walk = {}
    player.walk['down'] = player.animations.add('down', [1, 2, 0], 8, true);
    player.walk['left'] = player.animations.add('left', [4, 5, 3], 8, true);
    player.walk['right'] = player.animations.add('right', [7, 8, 6], 8, true);
    player.walk['up'] = player.animations.add('up', [10, 11, 9], 8, true);

    game.physics.arcade.enable(player);
    player.body.fixedRotation = true;
    player.body.collideWorldBounds= true;

    cursors = game.input.keyboard.createCursorKeys();
}

function upload() {

    player.body.velocity.set(0)

    if(cursors.left.isDown){
        player.animations.play('left');
        player.body.velocity.x = -200;
    }else if(cursors.right.isDown){
        player.animations.play('right');
        player.body.velocity.x = 200;
    }else if(cursors.up.isDown){
        player.animations.play('up');
        player.body.velocity.y = -200;
    }else if(cursors.down.isDown){
        player.animations.play('down');
        player.body.velocity.y = 200;
    }else{
        player.animations.stop();
        player.frame = facing[player.body.facing];
    }
}
