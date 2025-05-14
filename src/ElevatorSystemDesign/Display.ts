import { EDirection } from "./Constants";

export class Display {
    private currentFloor : number;
    private direction : EDirection
    constructor(){
        this.currentFloor = 0
        this.direction = EDirection.UP
    }
    setCurrentFloor(floor: number){
        this.currentFloor = floor
    }
    setDirection(direction: EDirection){
        this.direction = direction 
    }
    print(){
        console.log(`Floor: ${this.currentFloor} Direction: ${this.direction}`)
    }
}