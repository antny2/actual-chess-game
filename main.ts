namespace SpriteKind {
    export const Piece = SpriteKind.create()
    export const Target = SpriteKind.create()
    export const Ttarget = SpriteKind.create()
}
function get_piece_were_overlapping_with () {
    for (let value of sprites.allOfKind(SpriteKind.Piece)) {
        if (value.overlapsWith(targetSprite)) {
            hand.say("we found something useful")
            return value
        }
    }
    hand.say("there's nothing here D:<")
    return sprites.readDataSprite(hand, "undefined")
}
function get_The_Piece_here (col: number, row: number) {
    temp_target = sprites.create(img`
        3 
        `, SpriteKind.Ttarget)
    for (let value of sprites.allOfKind(SpriteKind.Piece)) {
        if (value.overlapsWith(temp_target)) {
            return value
        }
    }
    return sprites.readDataSprite(temp_target, "undefined")
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (get_piece_were_overlapping_with()) {
        handHolding = true
        hand.setImage(img`
            . . . . . . . . . . 
            . . f f f f f f . . 
            . f 1 1 f 1 f 1 f . 
            . f 1 b 1 b 1 b f . 
            f 1 1 1 1 1 1 1 1 f 
            f f f 1 1 1 1 1 1 f 
            f 1 1 1 1 1 1 1 1 f 
            f b b 1 1 1 1 1 1 f 
            . f b b b 1 1 1 f . 
            . . f f f f f f . . 
            `)
        holdingPiece = get_piece_were_overlapping_with()
        highlight_viable_moves(holdingPiece)
    }
})
controller.A.onEvent(ControllerButtonEvent.Released, function () {
    handHolding = false
    hand.setImage(img`
        . . f f . . . . . . 
        . f 1 b f f f f . . 
        . f 1 1 f 1 f 1 f . 
        . f b 1 1 b 1 b f . 
        . . f b 1 1 1 1 1 f 
        . f f f 1 1 1 1 1 f 
        f 1 b f 1 1 1 1 1 f 
        f 1 1 b 1 1 1 1 1 f 
        . f 1 1 1 1 1 1 f . 
        . . f f f f f f . . 
        `)
})
function this_is_a_valid_square (col: number, row: number) {
    return row + 2 < 8 && row + 2 >= 0 && (col + 2 < 8 && col + 2 >= 0)
}
function highlight_viable_moves (piece: Sprite) {
    if ("bishop" == sprites.readDataString(piece, "type")) {
        tempBool1 = true
        tempBool2 = true
        tempBool3 = true
        tempBool4 = true
        for (let distance = 0; distance <= 7; distance++) {
            if (this_is_a_valid_square(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) + distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) + distance)) {
                setHighlightedTile(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) + distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) + distance)
            }
            if (this_is_a_valid_square(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) + distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) - distance)) {
                setHighlightedTile(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) + distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) - distance)
            }
            if (this_is_a_valid_square(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) - distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) - distance)) {
                setHighlightedTile(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) - distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) - distance)
            }
            if (this_is_a_valid_square(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) - distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) + distance)) {
                setHighlightedTile(tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.column) - distance, tiles.locationXY(tiles.locationOfSprite(piece), tiles.XY.row) + distance)
            }
        }
    }
}
function setHighlightedTile (col: number, row: number) {
    if ((col + row) % 2 == 0) {
        tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile15`)
    } else {
        tiles.setTileAt(tiles.getTileLocation(col, row), assets.tile`myTile16`)
    }
}
function set_up_board () {
    for (let value of tiles.getTilesByType(assets.tile`myTile3`)) {
        piece = sprites.create(img`
            . . . . . . . . 
            . . . . . . . . 
            . . . 9 8 . . . 
            . . 9 8 8 8 . . 
            . . . 9 8 . . . 
            . . . 9 8 . . . 
            . . 9 8 8 8 . . 
            . 9 8 8 8 8 8 . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "pawn")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile4`)) {
        piece = sprites.create(img`
            8 . . 8 8 . . 8 
            9 8 8 9 8 8 8 8 
            9 9 8 8 9 8 8 8 
            . . 8 8 8 8 . . 
            . . 8 9 8 8 . . 
            . . 8 8 9 8 . . 
            . . 8 9 8 8 . . 
            . 8 8 8 9 8 8 . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "rook")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile5`)) {
        piece = sprites.create(img`
            . . . . . . . . 
            . . . 8 . . . . 
            . . 8 8 8 . . . 
            . . 9 8 9 . . . 
            . 8 8 8 8 8 . . 
            . . 9 8 9 . . . 
            . 8 8 9 8 8 . . 
            8 8 8 8 8 8 8 . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "bishop")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile6`)) {
        piece = sprites.create(img`
            . . . 8 8 9 9 . 
            . . 8 9 8 8 8 . 
            . 8 8 8 8 8 8 . 
            . . . 8 8 8 8 8 
            . . . . 8 8 8 8 
            . . . 8 8 8 8 8 
            . . 8 8 8 8 8 . 
            . 8 8 8 8 8 8 . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "knight")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile7`)) {
        piece = sprites.create(img`
            . . 8 9 9 8 . . 
            . . . 8 8 . . . 
            . . . 9 8 . . . 
            . . . 8 8 . . . 
            . . . 8 9 . . . 
            . . 9 8 8 8 . . 
            . 8 8 8 8 9 8 . 
            8 8 8 8 8 8 8 8 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "queen")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile8`)) {
        piece = sprites.create(img`
            . . . 9 8 . . . 
            . 9 9 9 8 8 8 . 
            . 8 8 8 8 8 8 . 
            . . . 8 8 . . . 
            . . 9 8 8 8 . . 
            . . . 8 8 . . . 
            . . 9 9 8 8 . . 
            . 9 9 8 8 8 8 . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "king")
        sprites.setDataString(piece, "color", "blue")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile9`)) {
        piece = sprites.create(img`
            . . . 3 . . . . 
            . . 3 3 3 . . . 
            . . . 3 . . . . 
            . . 3 3 3 . . . 
            . . a a a . . . 
            . . 3 3 3 . . . 
            . . 3 3 3 . . . 
            . a a a a a . . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "king")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile10`)) {
        piece = sprites.create(img`
            . . . 3 3 . . . 
            . . 3 3 3 3 . . 
            . . . a a . . . 
            . . 3 3 3 3 . . 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . 3 3 3 3 . . 
            . a a a a a a . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "queen")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile11`)) {
        piece = sprites.create(img`
            . . . a 3 a . . 
            . . a 3 3 1 3 . 
            . . a 3 3 3 3 3 
            . . a 3 3 . 3 3 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . 3 3 3 3 . . 
            . a a a a a a . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "knight")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile12`)) {
        piece = sprites.create(img`
            . . . 3 3 . . . 
            . . a a a a . . 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . 3 3 3 3 . . 
            . a 3 3 3 3 3 . 
            . a a a a a a . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "bishop")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile13`)) {
        piece = sprites.create(img`
            . 3 . 3 3 . 3 . 
            . 3 3 3 3 3 3 . 
            . . a a a a . . 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . 3 3 3 3 . . 
            . a a a a a a . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "rook")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile14`)) {
        piece = sprites.create(img`
            . . . 3 3 . . . 
            . . . 3 3 . . . 
            . . . a a . . . 
            . . 3 3 3 3 . . 
            . . 3 3 3 3 . . 
            . a 3 3 3 3 3 . 
            . a 3 3 3 3 3 . 
            . a a a a a a . 
            `, SpriteKind.Piece)
        sprites.setDataString(piece, "type", "pawn")
        sprites.setDataString(piece, "color", "pink")
        tiles.placeOnTile(piece, value)
    }
    isDarkSquare = false
    for (let row = 0; row <= 7; row++) {
        isDarkSquare = !(isDarkSquare)
        for (let distance = 0; distance <= 7; distance++) {
            if (isDarkSquare) {
                tiles.setTileAt(tiles.getTileLocation(distance, row), assets.tile`myTile1`)
            } else {
                tiles.setTileAt(tiles.getTileLocation(distance, row), assets.tile`myTile2`)
            }
            isDarkSquare = !(isDarkSquare)
        }
    }
}
let isDarkSquare = false
let piece: Sprite = null
let tempBool4 = false
let tempBool3 = false
let tempBool2 = false
let tempBool1 = false
let temp_target: Sprite = null
let targetSprite: Sprite = null
let holdingPiece: Sprite = null
let handHolding = false
let hand: Sprite = null
scene.setBackgroundColor(13)
tiles.setSmallTilemap(tilemap`level2`)
hand = sprites.create(img`
    . . f f . . . . . . 
    . f 1 b f f f f . . 
    . f 1 1 f 1 f 1 f . 
    . f b 1 1 b 1 b f . 
    . . f b 1 1 1 1 1 f 
    . f f f 1 1 1 1 1 f 
    f 1 b f 1 1 1 1 1 f 
    f 1 1 b 1 1 1 1 1 f 
    . f 1 1 1 1 1 1 f . 
    . . f f f f f f . . 
    `, SpriteKind.Player)
controller.moveSprite(hand, 50, 50)
hand.z = 100
handHolding = false
set_up_board()
holdingPiece = sprites.readDataSprite(hand, "undefined")
targetSprite = sprites.create(img`
    3 
    `, SpriteKind.Target)
game.onUpdate(function () {
    targetSprite.setPosition(hand.left + 2, hand.top + 5)
})
game.onUpdate(function () {
    if (holdingPiece) {
        holdingPiece.setPosition(hand.left + 2, hand.bottom - 3)
    }
})
