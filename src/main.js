"use strict"

// game config
let config = {
    parent: 'phaser-game',
    type: Phaser.CANVAS,
    render: {
        pixelArt: true  // prevent pixel art from getting blurred when scaled
    },
    physics: {
        default: 'arcade',
        arcade: {
            debug: false,
            gravity: {
                x: 0,
                y: 1000
            }
        }
    },
    width: 1440,
    height: 900,
    scene: [Load, Platformer]
}

const SCALE = 2.0;
var cursors;
var my = {
    sprite: {},
    text: {},
    vfx: {}
};

const game = new Phaser.Game(config);