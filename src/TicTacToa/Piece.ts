export enum IPieceType {
    CROSS,
    CIRCLE,
}
export abstract class PlayingPeice {
    type: IPieceType
    constructor(pieceType: IPieceType){
        this.type = pieceType
    }
    public print(){
        switch(this.type){
            case IPieceType.CIRCLE:
                return "O"
            case IPieceType.CROSS:
                return "X"
        }
    }
}
export class XPiece extends PlayingPeice {
    constructor(){
        super(IPieceType.CROSS)
    }
    
}
export class OPiece extends PlayingPeice {
    constructor(){
        super(IPieceType.CIRCLE)
    }
}

export class PlayingPieceFactory {
    static createPiece(type: IPieceType): PlayingPeice{
        switch(type){
            case IPieceType.CIRCLE:
                return new OPiece()
            case IPieceType.CROSS:
                return new XPiece()
        }
    }
}