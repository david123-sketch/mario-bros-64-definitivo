enum ActionKind {
    RunningLeft,
    RunningRight,
    Idle,
    IdleLeft,
    IdleRight,
    JumpingLeft,
    JumpingRight,
    CrouchLeft,
    CrouchRight,
    Flying,
    Walking,
    Jumping
}
namespace SpriteKind {
    export const Bumper = SpriteKind.create()
    export const Goal = SpriteKind.create()
    export const Coin = SpriteKind.create()
    export const Flier = SpriteKind.create()
}
function DarInstrucciones () {
    game.setDialogFrame(img`
        ..bbbbbbbbbbbbbbbbbbbb..
        .b11bb11bb11bb11bb11bbb.
        bbb11bb11bb11bb11bb11b1b
        bb1bbbbbbbbbbbbbbbbbb11b
        b11bb11111111111111bb1bb
        b1bb1111111111111111bbbb
        bbbb1111111111111111bb1b
        bb1b1111111111111111b11b
        b11b1111111111111111b1bb
        b1bb1111111111111111bbbb
        bbbb1111111111111111bb1b
        bb1b1111111111111111b11b
        b11b1111111111111111b1bb
        b1bb1111111111111111bbbb
        bbbb1111111111111111bb1b
        bb1b1111111111111111b11b
        b11b1111111111111111b1bb
        b1bb1111111111111111bbbb
        bbbb1111111111111111bb1b
        bb1bb11111111111111bb11b
        b11bbbbbbbbbbbbbbbbbb1bb
        b1b11bb11bb11bb11bb11bbb
        .bbb11bb11bb11bb11bb11b.
        ..bbbbbbbbbbbbbbbbbbbb..
        `)
    game.setDialogCursor(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . c c c c c c c c c c c c . . . 
        c 1 1 1 1 1 1 1 1 1 1 1 1 c . . 
        c d d d d d d d d d d d d c . . 
        c d c c c c c c c c c c d c . . 
        c d b d b b b b b b b b d c . . 
        c d b b b b b b b b b b d c . . 
        c d b b b b b b b b b b d c . . 
        c d b b b b b b b b b b d c . . 
        c 1 b b b b b b b b b b 1 c . . 
        c 1 1 d 1 1 d 1 1 d 1 1 1 c . . 
        c 1 d d d d d d d d d d 1 c . . 
        c 1 d 1 1 d 1 1 d 1 1 d 1 c . . 
        c b b b b b b b b b b b b c . . 
        c c c c c c c c c c c c c c . . 
        `)
    Instrucciones("Muevete con las flechas izquierda y derecha")
    Instrucciones("Salta con la flecha arriba")
    Instrucciones("Doble salto pulsando dos veces la flecha hacia arriba")
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bumper, function (sprite, otherSprite) {
    if (sprite.vy > 0 && !(sprite.isHittingTile(CollisionDirection.Bottom)) || sprite.y < otherSprite.top) {
        otherSprite.destroy(effects.ashes, 250)
        otherSprite.vy = -50
        sprite.vy = -2 * pxm
        info.changeScoreBy(1)
        music.powerUp.play()
    } else {
        info.changeLifeBy(-1)
        sprite.say("Ouuuu!", invencibilidad)
        music.powerDown.play()
    }
    pause(invencibilidad)
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    Salto()
})
function AnimaciónPerfilDerecho () {
    perfilDer = true
    perfilIzq = false
    perfilDer = controller.right.isPressed()
    marioBros64 = sprites.create(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
}
function LimpiarNivel () {
    for (let primerValor of sprites.allOfKind(SpriteKind.Bumper)) {
        primerValor.destroy()
    }
    for (let segundovalor of sprites.allOfKind(SpriteKind.Coin)) {
        segundovalor.destroy()
    }
    for (let tercerValor of sprites.allOfKind(SpriteKind.Goal)) {
        tercerValor.destroy()
    }
    for (let cuartoValor of sprites.allOfKind(SpriteKind.Flier)) {
        cuartoValor.destroy()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coin, function (sprite, otherSprite) {
    otherSprite.destroy(effects.trail, 250)
    otherSprite.y += -3
    info.changeScoreBy(3)
    music.baDing.play()
})
function VoladoresAnimación () {
    voladoresVuelo = animation.createAnimation(ActionKind.Flying, 100)
    voladoresVuelo.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    voladoresVuelo.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . . . f 4 4 4 5 4 5 4 4 4 f . . 
        . . f 4 4 4 4 4 4 4 4 4 4 4 f . 
        . . f 4 4 4 4 5 4 5 4 4 4 4 f . 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 4 4 4 4 4 4 4 4 f 
        . f 4 f 4 4 5 5 5 5 5 4 4 f 4 f 
        . f f . f 4 5 4 4 4 5 4 f . f f 
        . f . . . f f f f f f f . . . f 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    voladoresVuelo.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    voladoresPerfiles = animation.createAnimation(ActionKind.Idle, 100)
    voladoresPerfiles.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f f f . . . . 
        . . . . f 4 4 4 4 4 4 4 f . . . 
        . . . f 4 5 5 4 4 4 5 5 4 f . . 
        . f . f 4 4 4 5 4 5 4 4 4 f . f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
        . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
        . . . f 4 4 5 5 5 5 5 4 4 f . . 
        . . . . f 4 5 4 4 4 5 4 f . . . 
        . . . . . f f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    Salto()
})
function IniciarNivel (level: number) {
    effects.clouds.startScreenEffect()
    ubicacionInicial = tiles.getTilesByType(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)[0]
    tiles.placeOnTile(marioBros64, ubicacionInicial)
    tiles.setTileAt(ubicacionInicial, assets.tile`transparency16`)
    Enemigos()
    Monedas()
}
function Salto () {
    if (marioBros64.isHittingTile(CollisionDirection.Bottom)) {
        marioBros64.vy = -4 * pxm
    } else if (dobleSalto) {
        dobleSaltoRapido = -3 * pxm
        if (marioBros64.vy >= -40) {
            dobleSaltoRapido = -4.5 * pxm
            marioBros64.startEffect(effects.trail, 500)
            scene.cameraShake(2, 250)
        }
        marioBros64.vy = dobleSaltoRapido
        dobleSalto = false
    }
}
function SiguienteNivel () {
    return nivelActual != numerodeNiveles
}
function CrearJugador (player2: Sprite) {
    player2.ay = gravedad
    scene.cameraFollowSprite(player2)
    controller.moveSprite(player2, 100, 0)
    player2.z = 5
    info.setLife(3)
    info.setScore(0)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`tile1`, function (sprite, location) {
    info.changeLifeBy(1)
    nivelActual += 1
    if (SiguienteNivel()) {
        game.splash("Siguiente Nivel Desbloqueado")
        Niveles(nivelActual)
    } else {
        game.over(true, effects.confetti)
    }
})
function AnimaciónMonedas () {
    animacionMoneda = animation.createAnimation(ActionKind.Idle, 200)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . f 5 5 5 4 4 5 5 5 f . . . 
        . . . . f 5 5 5 5 5 5 f . . . . 
        . . . . f f 5 5 5 5 f f . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 4 5 5 f . . . 
        . . f 5 f 5 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 5 f . . . . 
        . . . . f 5 f 5 5 5 f . . . . . 
        . . . . f f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 4 5 5 f . . . . 
        . . . f 5 f 5 5 5 5 f f . . . . 
        . . . f f 5 f 5 5 5 f . . . . . 
        . . . . f f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 5 f . . . . . 
        . . . . . f 5 f 5 f f . . . . . 
        . . . . . f f f f f . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f 5 5 f 5 f . . . . . 
        . . . . . f f 5 f 5 f . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . f f f f . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 f 5 f . . . 
        . . . . f f 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . . f f 5 f 5 f f . . . . 
        . . . . . . f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    animacionMoneda.addAnimationFrame(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . f 5 5 5 f 5 f f . . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . f 5 5 4 4 5 5 5 f 5 f . . 
        . . . . f 5 5 4 5 5 5 f 5 f . . 
        . . . . f 5 5 5 5 5 f 5 f . . . 
        . . . . . f 5 5 5 f 5 f . . . . 
        . . . . . . f f f f f f . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Flier, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprite.say("Auu!!", invencibilidad * 2)
    music.powerDown.play()
    pause(invencibilidad * 2)
})
function Monedas () {
    for (let septimoValor of tiles.getTilesByType(assets.tile`tile5`)) {
        moneda = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . f 5 5 5 4 4 5 5 5 f . . . 
            . . . . f 5 5 5 5 5 5 f . . . . 
            . . . . f f 5 5 5 5 f f . . . . 
            . . . . . . f f f f . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Coin)
        tiles.placeOnTile(moneda, septimoValor)
        animation.attachAnimation(moneda, animacionMoneda)
        animation.setAction(moneda, ActionKind.Idle)
        tiles.setTileAt(septimoValor, assets.tile`tile0`)
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (!(marioBros64.isHittingTile(CollisionDirection.Bottom))) {
        marioBros64.vy += 80
    }
})
function Instrucciones (text: string) {
    game.showLongText(text, DialogLayout.Bottom)
    music.baDing.play()
    info.changeScoreBy(1)
}
function AnimaciónSalto () {
    // Because there isn't currently an easy way to say "play this animation a single time
    // and stop at the end", this just adds a bunch of the same frame at the end to accomplish
    // the same behavior
    saltoIzq = animation.createAnimation(ActionKind.JumpingLeft, 100)
    animation.attachAnimation(marioBros64, saltoIzq)
    saltoIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    saltoIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        saltoIzq.addAnimationFrame(img`
            . . . . . . . f f . . . . . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . f 2 5 5 2 f . . . . . 
            . . . . f 2 2 1 1 2 2 f . . . . 
            . . . f 2 2 1 2 2 1 2 2 f . . . 
            . . f f 1 1 2 5 5 2 1 1 f f . . 
            . . 8 2 d d d d d d d d 2 8 . . 
            . . f d d f f d d f f d d f . . 
            . . f d d 8 1 d d 8 1 d d f . . 
            . . f d d d d d d d d d d f . . 
            . . f d d e e e e e e d d f . . 
            . . . f e e e e e e e e f . . . 
            . . . . f d d d d d d f . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
    SaltoDerecha = animation.createAnimation(ActionKind.JumpingRight, 100)
    animation.attachAnimation(marioBros64, SaltoDerecha)
    SaltoDerecha.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    SaltoDerecha.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    for (let index = 0; index < 30; index++) {
        SaltoDerecha.addAnimationFrame(img`
            . . . . . . . f f . . . . . . . 
            . . . . . . f 2 2 f . . . . . . 
            . . . . . f 2 5 5 2 f . . . . . 
            . . . . f 2 2 1 1 2 2 f . . . . 
            . . . f 2 2 1 2 2 1 2 2 f . . . 
            . . f f 1 1 2 5 5 2 1 1 f f . . 
            . . 8 2 d d d d d d d d 2 8 . . 
            . . f d d f f d d f f d d f . . 
            . . f d d 1 8 d d 1 8 d d f . . 
            . . f d d d d d d d d d d f . . 
            . . f d d e e e e e e d d f . . 
            . . . f e e e e e e e e f . . . 
            . . . . f d d d d d d f . . . . 
            . . . . . f f f f f f . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `)
    }
}
function Animaciones () {
    AnimaciónCorrer()
    AnimaciónPerfilIzquierdo()
    AnimaciónPerfilDerecho()
    AnimaciónGolpe()
    AnimaciónSalto()
}
function IniciadordeAnimaciones () {
    Animaciones()
    AnimaciónMonedas()
    VoladoresAnimación()
}
function AnimaciónPerfilIzquierdo () {
    perfilIzq = true
    perfilDer = false
    perfilIzq = controller.left.isPressed()
    marioBros64 = sprites.create(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
}
function AnimaciónCorrer () {
    correrIzq = animation.createAnimation(ActionKind.RunningLeft, 100)
    animation.attachAnimation(marioBros64, correrIzq)
    correrIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrIzq.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrDer = animation.createAnimation(ActionKind.RunningRight, 100)
    animation.attachAnimation(marioBros64, correrDer)
    correrDer.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrDer.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrDer.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    correrDer.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
function Niveles (level: number) {
    LimpiarNivel()
    if (level == 0) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 1) {
        tiles.setTilemap(tilemap`level_0`)
    } else if (level == 2) {
        tiles.setTilemap(tilemap`level_1`)
    } else if (level == 3) {
        tiles.setTilemap(tilemap`level_2`)
    } else if (level == 4) {
        tiles.setTilemap(tilemap`level_3`)
    } else if (level == 5) {
        tiles.setTilemap(tilemap`level_4`)
    } else if (level == 6) {
        tiles.setTilemap(tilemap`level_5`)
    } else if (level == 7) {
        tiles.setTilemap(tilemap`level_6`)
    }
    IniciarNivel(level)
}
function Enemigos () {
    for (let Quinto_valor of tiles.getTilesByType(assets.tile`tile4`)) {
        enemigo = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Bumper)
        tiles.placeOnTile(enemigo, Quinto_valor)
        tiles.setTileAt(Quinto_valor, assets.tile`tile0`)
        enemigo.ay = gravedad
        if (Math.percentChance(50)) {
            enemigo.vx = Math.randomRange(30, 60)
        } else {
            enemigo.vx = Math.randomRange(-60, -30)
        }
    }
    for (let sextoValor of tiles.getTilesByType(assets.tile`tile7`)) {
        voladores = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . f f f f f f f . . . . 
            . . . . f 4 4 4 4 4 4 4 f . . . 
            . . . f 4 5 5 4 4 4 5 5 4 f . . 
            . f . f 4 4 4 5 4 5 4 4 4 f . f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f 4 4 4 4 4 5 4 5 4 4 4 4 4 f 
            . f f 4 4 4 4 4 4 4 4 4 4 4 f f 
            . . . f 4 4 5 5 5 5 5 4 4 f . . 
            . . . . f 4 5 4 4 4 5 4 f . . . 
            . . . . . f f f f f f f . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Flier)
        tiles.placeOnTile(voladores, sextoValor)
        tiles.setTileAt(sextoValor, assets.tile`tile0`)
        animation.attachAnimation(voladores, voladoresVuelo)
        animation.attachAnimation(voladores, voladoresPerfiles)
    }
}
function AnimaciónGolpe () {
    golpeIzquierda = animation.createAnimation(ActionKind.CrouchLeft, 100)
    animation.attachAnimation(marioBros64, golpeIzquierda)
    golpeIzquierda.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 8 1 d d 8 1 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    golpeDerecha = animation.createAnimation(ActionKind.CrouchRight, 100)
    animation.attachAnimation(marioBros64, golpeDerecha)
    golpeDerecha.addAnimationFrame(img`
        . . . . . . . f f . . . . . . . 
        . . . . . . f 2 2 f . . . . . . 
        . . . . . f 2 5 5 2 f . . . . . 
        . . . . f 2 2 1 1 2 2 f . . . . 
        . . . f 2 2 1 2 2 1 2 2 f . . . 
        . . f f 1 1 2 5 5 2 1 1 f f . . 
        . . 8 2 d d d d d d d d 2 8 . . 
        . . f d d f f d d f f d d f . . 
        . . f d d 1 8 d d 1 8 d d f . . 
        . . f d d d d d d d d d d f . . 
        . . f d d e e e e e e d d f . . 
        . . . f e e e e e e e e f . . . 
        . . . . f d d d d d d f . . . . 
        . . . . . f f f f f f . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
}
let golpeDerecha: animation.Animation = null
let golpeIzquierda: animation.Animation = null
let voladores: Sprite = null
let enemigo: Sprite = null
let correrDer: animation.Animation = null
let correrIzq: animation.Animation = null
let SaltoDerecha: animation.Animation = null
let saltoIzq: animation.Animation = null
let moneda: Sprite = null
let animacionMoneda: animation.Animation = null
let dobleSaltoRapido = 0
let dobleSalto = false
let ubicacionInicial: tiles.Location = null
let voladoresPerfiles: animation.Animation = null
let voladoresVuelo: animation.Animation = null
let perfilIzq = false
let perfilDer = false
let nivelActual = 0
let numerodeNiveles = 0
let gravedad = 0
let pxm = 0
let invencibilidad = 0
let marioBros64: Sprite = null
marioBros64 = sprites.create(img`
    . . . . . . . f f . . . . . . . 
    . . . . . . f 2 2 f . . . . . . 
    . . . . . f 2 5 5 2 f . . . . . 
    . . . . f 2 2 1 1 2 2 f . . . . 
    . . . f 2 2 1 2 2 1 2 2 f . . . 
    . . f f 1 1 2 5 5 2 1 1 f f . . 
    . . 8 2 d d d d d d d d 2 8 . . 
    . . f d d f f d d f f d d f . . 
    . . f d d 8 1 d d 8 1 d d f . . 
    . . f d d d d d d d d d d f . . 
    . . f d d e e e e e e d d f . . 
    . . . f e e e e e e e e f . . . 
    . . . . f d d d d d d f . . . . 
    . . . . . f f f f f f . . . . . 
    . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
invencibilidad = 600
pxm = 30
gravedad = 10 * pxm
scene.setBackgroundImage(img`
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111ddd9999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999991111111dddd99999999999999999999999999999999999999999999999999999999999
    9999999999999999999999dd999999999999999999999999999999999999999999999999999999999999999999111111111ddd9999999999999999999999999999999999999999999999999999999999
    999999999999999999911ddddd999999999999999999999999999999999999999999999999999999999999999111111111111dd999999999999999999999999999999999999999999999999999999999
    9999999999999999991111111dd9999999999999999999999999999999999999999999999999999999ddddddd111111111111dd999999999999999999999999999999999999999999999999999999999
    99999999999999999911111111d99999999999999999999999999999999999999999999999999999dddddddddd11111111111dd199999999999999999999999999999999999999999999999999999999
    99999999999999999111111111dd191ddd9999999999999999999999999999999999999999999999dd111111d1111111111111d111999999999999999999999999999999999999999999999999999999
    99999999999999999111111111dd11ddddddddd9999999999999999999999999999999999999999dd111111111111111111111111119ddd9999999999999999999999999999999999999999999999999
    99999999999999999111111111dd11111111ddddd99999999999999999999999999999999999991dd11111111111111111111111111dddddd99999999999999999999999999999999999999999999999
    999999991dddddddd1111111111d11111111ddddd1999999999999999999999999999999999999dd11111111111111111111111111dd111ddd9999999999999999999999999999999999999999999999
    9999999ddddddddddd1111111111111111111111111999999999999999999999999999999999991d11111111111111111111111111dd1111dd9999999999999999999999999999999999999999999999
    9999991dd11111111dd111111111111111111111111199999999999999999999999999999999dddd11111111dd11111111111111111111111dd999999999999999999999999999999999999999999999
    999999dd1111111111111111111111111111111111119999999999999999999999999999999ddd1dd111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
    99999dd1111111111111111111111111111111111111999999999999999999999999999999ddd1111111111dd111111111111111111111111dd999999999999999999999999999999999999999999999
    99999dd1111111111111111111111dd1111111111111999999999999999999999999999999dd1111111111111111111111111111111111111dd999999999999999999999999999999999999999999999
    99999111111111111111111111111dd1111111111111999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
    999991111111111111111111111111dd1111111111b1999999999999999999999999999999d1111111111111111111111111111111111111dd9999999999999999999999999999999999999999999999
    999999111111111111111111111111dd11bbb111bbb999999999999999999999999999999911111111111111111111111111dd111111111dd99999999999999999999999911dddd99999999999999999
    999999111111111111111111111111ddbbbbbbbbbb9999999999999999999999999999999911111111111111111111111111dd111111111d1999999999999999999999911111ddddd999999999999999
    99999991bb1111111111bbb111111bbb99999119999999999999999999999999999999999991111111111111111111111111dd11111111111999999999999999999999111111111ddd99111119999999
    99999999bbbbbbbbbbbbbbbbbbbbbbb999999999999999999999999999999999999999999999bbbbbbbbbbb1111111111111dd111111111199999999999999999ddddd1111111111ddd1111dd1199999
    9999999991bbbbbbbbbb9991bbbbb19999999999999999999999999999999999999999999999bbbbbbbbbbbbb11111111111ddbbbbbbbbb99999999999999999ddddddddd11111111dd1111dddd19999
    999999999999999999999999911199999999999999999999999999999999999999999999999999999999999bbbb1111111bbdbbbbbbb99999999999999999991d111111dd11111111dd1111111dd9999
    99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999bbbbbbbbbbbb9999999999999999999d999991111111111111111111111111111dd9999
    9999999999999999999999999999999999999999999999999999999999ddddd99999999999999999999999999999bbbbb9999999999999999999dddddddddd1111111111111111111111111111dd1999
    999999999999999999999999999999999999999999999999dddddddddddddddddd9999999999999999999999999999999999999999999999999ddd11111ddddd11111111111111111111111111dd9999
    999999999999999999999999999999999999999999999911ddd111dddd111111dddd9999999999999999999999999999999999999999999999911111111111dd11111111111111111111111111dd9999
    999999999999999999999999999999999999ddddddddd1111111111dd111111111ddd999999999999999999999999999999999999999999999911111111111111111111111111111111111111dd19999
    99999999999999999999999999999999991dddddd1ddddd111111111111111111111dd119999999999999999999999999999999999999999999111111111111111111111111dd11111111111dd199999
    999999999999999999999999999999991111111111111dddd11111111111111111111d111111dd9999999999999999999999999999999999999111111111111111111111111dd11111111111d1199999
    99999999999999999999999999999991dd1111111111111dd11111111111111111111d111111dddd999999999999999999999999999999999999111111111111111111111ddddd111111111b19999999
    999999999999999999999999991ddddddddd1111111111111111111111111111111111111111111dd999999999999999999999999999999999999bbbbbbbbbbbbb111bbbbbbbbbbbbbbbbbbb99999999
    99999999999999999999999991111111111111111111111111111111111111dd1111111111111111dd99999999999999999999999999999999999bbb9999999bbbbbbbbbbbb99999999bbb9999999999
    99999999999999999999999991111111111111111111111111111111111111dd11111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999111111111111111111111111111111111111111dd1111111111111111d999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999911111111111111111111111111111111111111dd11111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999911111111111bbbbb1111dd1111bbbbbbbbbb11d111111111111111111999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999991bbb111bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb119999999999999999999999999999999999999999999999999999999999999999999999999999999
    999999999999999999999999999bbbbbbbbb9999999bb9999999999999999999bbbbbbbbbbbbbbbb99999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    9999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    999c999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999
    99cc999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999993999999999999999993399999999999
    9999999999999999999999939999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999993339333399999999999999993393999ccc9c9
    99999c99999999999999933393999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999933333393399999999999993333339999c99cc
    9999cc93399999999993333333999999999999999999999999999999993399999999999999999999999999999999999999999999999999999999999999993335333999999999999933333b3399ccc99c
    99c9933333cc9999999333333399999999999999999999999999999993333399999999999999999999999999999999999999999999999999999999999993335553339999999999993333553339cc9999
    9cc93333333399999993335333339999999999999999cc99999ccc99933333399cc999999999999999999999999999999999cc999999999cc99999999993335533339999999999999335553339ccc999
    cc9c93353333cc999993355533399999cc9999999999cc99999999933355333999999999cc9cc999999cc99999999c999999cc9999c9999ccc99999999999333333999999c9999993333533c99ccccc9
    c99cc3555339cc99c93333533333c999cc99cc9999999999999999933353333999999999c999c99999999999c9999c999999999999c9999c9999999cccc93333333cc999ccc99999333333ccccccccc9
    9cc9333333399cc99933333333399999999cc999999c999999cc999333333399999999c9999999999cc99999cc99999c999c9cc9999cc99999ccc99cccc97333739cc9999cc999999333333cccccc999
    9ccc33333339cc99999933333399999cc99999999c999999999999933333339c9cc999c99c9999999cc9999999c999cc99999999999cc9999999c999cc9977777799c9999cc999cc999979399cc9cc99
    ccccc977339ccc99997797777c99999cc99999999c9999999a9999993933339999c999999c99c999999999cc9cc999c999cc99999969999999999999999977777999cc9999c999cc999777799cc9cc99
    cc997777799c979997779777799999999aa79c9977999777aa9977c797737777799999c9999cc9999997799c9aa997c999779c79996979cc977cc7aa9c9997779997cc9999c99999779777799cc9cc99
    c779777779777777979777777797c7796a7797c977797777aaaaa77797777777779977c9977999779c977779a6a97777997797799969797c977c779a6c7797797777c77c77999c7a7aa777cc99cccc99
    9777977779777a7777c777797797c779aaa77777777777777777777777777777777c77c777777777777777777aa777777777777777aa777777777aa7aa777777777777777777997a7a7779979c7797c9
    9779977777777aa77777777777777777777777777777777777777777777777777777777777777777777777777777777777777aa77777777777777aa77777777777777777777777777a777777cc7797c9
    777777777777777777777777777777a777777777777777777777777777a777777777777777777777aa7777777777777777777aa777777777777777777777777777777777777777777777777777777777
    777777777777777777777777777777a77777777777777777777777777aa777777777777777777777777777777777aa77777777777777777777777777777777777777a777777777777777777777777777
    7777777777777777777777777777777777777777aa7777777777777777a7777777777777777777777777777777777a77777777777777777777777777777777777777a777777777777777777777777777
    77777777777777777aa777777777777777777777aa77777777aa777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    77777777777777777777777777777777777777777777777777a777777777777777aa777777777777777777777777777777777777777777777777777777777777777777777777777777777aa777777777
    777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777aa777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777aa777777777777777777777777777777777aa77777777777777777777777777777777777
    77777777777777777777777777777777777777777777aa777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777
    777777aa77777777777777777aa777777777a7777777aa777777777777a77777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777
    777777aa7777777777777777777777777777a777777777777777777777aa777777777777777777777777777777777777777777aa777777777777777777777777777777777aa777777777777777777777
    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    777777777777777777777777777777777777777777777777777777777777777777777777777777777777aa77777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777aa7777777
    77777777777777777777777777777777777777777777777777777777777777777aa7777777777777777777777777777777777777777777777aa777777777777777777777777777777777777777777777
    77777777777777777777777777777777777777777aa777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    777777777777777777aa777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
    `)
IniciadordeAnimaciones()
CrearJugador(marioBros64)
numerodeNiveles = 8
nivelActual = 0
Niveles(nivelActual)
DarInstrucciones()
game.onUpdate(function () {
    if (marioBros64.vx < 0) {
        perfilIzq = true
    } else if (marioBros64.vx > 0) {
        perfilIzq = false
    }
    if (marioBros64.isHittingTile(CollisionDirection.Top)) {
        marioBros64.vy = 0
    }
    if (controller.down.isPressed()) {
        if (perfilIzq) {
            animation.setAction(marioBros64, ActionKind.CrouchLeft)
        } else {
            animation.setAction(marioBros64, ActionKind.CrouchRight)
        }
    } else if (marioBros64.vy < 20 && !(marioBros64.isHittingTile(CollisionDirection.Bottom))) {
        if (perfilIzq) {
            animation.setAction(marioBros64, ActionKind.JumpingLeft)
        } else {
            animation.setAction(marioBros64, ActionKind.JumpingRight)
        }
    } else if (marioBros64.vx < 0) {
        animation.setAction(marioBros64, ActionKind.RunningLeft)
    } else if (marioBros64.vx > 0) {
        animation.setAction(marioBros64, ActionKind.RunningRight)
    } else {
        if (perfilIzq) {
            animation.setAction(marioBros64, ActionKind.IdleLeft)
        } else {
            animation.setAction(marioBros64, ActionKind.IdleRight)
        }
    }
})
game.onUpdate(function () {
    for (let octavoValor of sprites.allOfKind(SpriteKind.Flier)) {
        if (Math.abs(octavoValor.x - marioBros64.x) < 60) {
            if (octavoValor.x - marioBros64.x < -5) {
                octavoValor.vx = 30
            } else if (octavoValor.x - marioBros64.x > 5) {
                octavoValor.vx = -30
            }
            if (octavoValor.y - marioBros64.y < -5) {
                octavoValor.vy = 30
            } else if (octavoValor.y - marioBros64.y > 5) {
                octavoValor.vy = -30
            }
            animation.setAction(octavoValor, ActionKind.Flying)
        } else {
            octavoValor.vy = -25
            octavoValor.vx = 0
            animation.setAction(octavoValor, ActionKind.Idle)
        }
    }
})
game.onUpdate(function () {
    if (marioBros64.isHittingTile(CollisionDirection.Bottom)) {
        dobleSalto = true
    }
})
game.onUpdate(function () {
    for (let novenoValor of sprites.allOfKind(SpriteKind.Bumper)) {
        if (novenoValor.isHittingTile(CollisionDirection.Left)) {
            novenoValor.vx = Math.randomRange(30, 60)
        } else if (novenoValor.isHittingTile(CollisionDirection.Right)) {
            novenoValor.vx = Math.randomRange(-60, -30)
        }
    }
})
forever(function () {
    if (marioBros64.vx < 0) {
        perfilIzq = true
    }
    if (marioBros64.vx > 0) {
        perfilIzq = false
    }
})
