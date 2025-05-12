"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicTacToe = void 0;
var readline = require("readline");
var Board_1 = require("./Board");
var Player_1 = require("./Player");
var TicTacToe = /** @class */ (function () {
    function TicTacToe(size, args) {
        var _this = this;
        this.board = new Board_1.Board(size);
        this.players = [];
        Object.entries(args).forEach(function (_a) {
            var pname = _a[0], ptype = _a[1];
            _this.players.push(new Player_1.Player(pname, ptype));
        });
        this.io = readline.createInterface({
            input: process.stdin,
            output: process.stdout
        });
    }
    TicTacToe.prototype.takeInput = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                return [2 /*return*/, new Promise(function (resolve) {
                        _this.io.question("Enter row and column (e.g., 1 2): ", function (answer) {
                            var _a = answer.trim().split(" "), rowStr = _a[0], colStr = _a[1];
                            var row = parseInt(rowStr, 10);
                            var col = parseInt(colStr, 10);
                            resolve([row, col]);
                        });
                    })];
            });
        });
    };
    TicTacToe.prototype.checkWinner = function (row, col, type) {
        var mat = this.board.getMatix(); // expose getMatrix in Board
        var n = mat.length;
        var winRow = mat[row].every(function (cell) { return (cell === null || cell === void 0 ? void 0 : cell.type) === type; });
        var winCol = mat.every(function (r) { var _a; return ((_a = r[col]) === null || _a === void 0 ? void 0 : _a.type) === type; });
        var winDiag1 = row === col && mat.every(function (r, i) { var _a; return ((_a = r[i]) === null || _a === void 0 ? void 0 : _a.type) === type; });
        var winDiag2 = row + col === n - 1 && mat.every(function (r, i) { var _a; return ((_a = r[n - 1 - i]) === null || _a === void 0 ? void 0 : _a.type) === type; });
        return winRow || winCol || winDiag1 || winDiag2;
    };
    TicTacToe.prototype.startGame = function () {
        return __awaiter(this, void 0, void 0, function () {
            var player, _a, row, col;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!!this.board.isBoardFull()) return [3 /*break*/, 2];
                        player = this.players.shift();
                        if (!player)
                            return [3 /*break*/, 2];
                        console.log("".concat(player.getName(), "'s turn: "));
                        return [4 /*yield*/, this.takeInput()];
                    case 1:
                        _a = _b.sent(), row = _a[0], col = _a[1];
                        if (player.move(row, col, this.board))
                            this.players.push(player);
                        this.board.displayBoard();
                        if (this.checkWinner(row, col, player.pieceType)) {
                            console.log("Game Over ! Player : ".concat(player === null || player === void 0 ? void 0 : player.getName(), " is winner"));
                            this.io.close();
                            return [2 /*return*/];
                        }
                        this.players.push(player);
                        return [3 /*break*/, 0];
                    case 2:
                        console.log("Game Over ! No Winners");
                        this.io.close();
                        return [2 /*return*/];
                }
            });
        });
    };
    return TicTacToe;
}());
exports.TicTacToe = TicTacToe;
