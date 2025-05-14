import { ElevatorCarController } from "./EevatorCarController";

export interface IDispatcher {
    dispatch(): void;
    listOfControllers: ElevatorCarController[]
}

abstract class InternalButtonDispatcher implements IDispatcher {
    listOfControllers: ElevatorCarController[];
    constructor(list: ElevatorCarController[]){
        this.listOfControllers = list
    }
    abstract dispatch(): void;
}

export class OddevenDispatcher extends InternalButtonDispatcher {
    dispatch(): void {
        
    }
}
export class MinSeekTimeDispatcher extends InternalButtonDispatcher {
    dispatch(): void {
        
    }
}
export class FixedFloorDispatcher extends InternalButtonDispatcher {
    dispatch(): void {
        
    }
}



export class ExternalButtonDispatcher implements IDispatcher {
    listOfControllers: ElevatorCarController[];
    constructor(list: ElevatorCarController[]){
        this.listOfControllers = list
    }
    dispatch(){

    }      
}