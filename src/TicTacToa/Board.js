"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Board = void 0;
var Piece_1 = require("./Piece");
var Board = /** @class */ (function () {
    function Board(size) {
        this.size = size;
        this.matrix = this.createBoard(size, size);
        this.filledColumn = 0;
    }
    Board.prototype.getMatix = function () {
        return this.matrix;
    };
    Board.prototype.createBoard = function (rows, cols) {
        return Array.from({ length: rows }, function () { return Array(cols).fill(null); });
    };
    Board.prototype.isValidPos = function (row, col) {
        return row < this.size && row >= 0 &&
            col < this.size && col >= 0 &&
            this.matrix[row][col] === null;
    };
    Board.prototype.addPiece = function (row, col, peiceType) {
        this.matrix[row][col] = Piece_1.PlayingPieceFactory.createPiece(peiceType);
        this.filledColumn++;
    };
    Board.prototype.displayBoard = function () {
        this.matrix.forEach(function (row) {
            console.log(row.map(function (cell) { return cell ? cell.print() : " "; }).join(" | "));
        });
    };
    Board.prototype.isBoardFull = function () {
        return this.filledColumn === this.size * this.size;
    };
    return Board;
}());
exports.Board = Board;
