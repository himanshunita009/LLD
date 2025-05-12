"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Player = void 0;
var Player = /** @class */ (function () {
    function Player(name, pieceType) {
        this.name = name;
        this.pieceType = pieceType;
    }
    Player.prototype.getName = function () {
        return this.name;
    };
    Player.prototype.move = function (row, col, board) {
        if (!board.isValidPos(row, col)) {
            console.log("This is not valid Position . Please Try Again !");
            return true;
        }
        else {
            board.addPiece(row, col, this.pieceType);
            return false;
        }
    };
    return Player;
}());
exports.Player = Player;
