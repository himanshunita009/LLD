"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayingPieceFactory = exports.OPiece = exports.XPiece = exports.PlayingPeice = exports.IPieceType = void 0;
var IPieceType;
(function (IPieceType) {
    IPieceType[IPieceType["CROSS"] = 0] = "CROSS";
    IPieceType[IPieceType["CIRCLE"] = 1] = "CIRCLE";
})(IPieceType || (exports.IPieceType = IPieceType = {}));
var PlayingPeice = /** @class */ (function () {
    function PlayingPeice(pieceType) {
        this.type = pieceType;
    }
    PlayingPeice.prototype.print = function () {
        switch (this.type) {
            case IPieceType.CIRCLE:
                return "J";
            case IPieceType.CROSS:
                return "H";
        }
    };
    return PlayingPeice;
}());
exports.PlayingPeice = PlayingPeice;
var XPiece = /** @class */ (function (_super) {
    __extends(XPiece, _super);
    function XPiece() {
        return _super.call(this, IPieceType.CROSS) || this;
    }
    return XPiece;
}(PlayingPeice));
exports.XPiece = XPiece;
var OPiece = /** @class */ (function (_super) {
    __extends(OPiece, _super);
    function OPiece() {
        return _super.call(this, IPieceType.CIRCLE) || this;
    }
    return OPiece;
}(PlayingPeice));
exports.OPiece = OPiece;
var PlayingPieceFactory = /** @class */ (function () {
    function PlayingPieceFactory() {
    }
    PlayingPieceFactory.createPiece = function (type) {
        switch (type) {
            case IPieceType.CIRCLE:
                return new OPiece();
            case IPieceType.CROSS:
                return new XPiece();
        }
    };
    return PlayingPieceFactory;
}());
exports.PlayingPieceFactory = PlayingPieceFactory;
