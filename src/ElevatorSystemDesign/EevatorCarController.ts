import { EDirection } from "./Constants";
import { ElevatorCar } from "./ElevatorCar";

export class ElevatorCarController {
    private elevatorCar: ElevatorCar 
    // DATA Sturcture 
    private listOfRequest : any[]
    constructor(elevator: ElevatorCar){
        this.elevatorCar= elevator
        this.listOfRequest = []
    }
    acceptRequest(floor: number,direction: EDirection){
        this.listOfRequest.push({floor,direction})
    }
    private carController(){
        const req = this.listOfRequest.pop()
        this.elevatorCar.move(req.floor,req.direction)
    }

}