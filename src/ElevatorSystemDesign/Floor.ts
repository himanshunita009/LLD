import { ExternalButton } from "./Button";
import { EDirection } from "./Constants";

export class Floor {
    constructor(private floorId: number,private externalButton: ExternalButton){

    }
    up(){
        this.externalButton.pressButton(this.floorId,EDirection.UP)    
    }
    down(){
        this.externalButton.pressButton(this.floorId,EDirection.DOWN)    
    }
}