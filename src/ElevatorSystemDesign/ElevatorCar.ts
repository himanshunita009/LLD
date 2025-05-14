import { EDirection, EStatus } from "./Constants";
import { Display } from "./Display";

export class ElevatorCar {
    private display : Display;
    private status : EStatus;
    constructor(private readonly elevatorId: number){
        this.display = new Display()
        this.status = EStatus.IDLE
    }

    move(destinationFloor: number,direction: EDirection){
        
    }
}