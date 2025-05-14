import { EDirection } from "./Constants"
import { IDispatcher } from "./Dispatcher"

export class InternalButton {
    constructor(private dispatcher : IDispatcher){}
    pressButton(button: number){
        this.dispatcher.dispatch()
    }
} 

export class ExternalButton {
    constructor(private dispatcher : IDispatcher){}
    pressButton(floorId: any,direction: EDirection){
        this.dispatcher.dispatch()
    }
}