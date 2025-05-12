enum VehicleType {
    CAR,
    BIKE,
    TRUCK
}

abstract class VehicleServcie {
    private lotAllocationService: LotAllocationService = new LotAllocationService()
    private payService : PaymentService = new PaymentService()
    constructor(vehicleNumber: string){
        this.vehicleNumber = vehicleNumber
    }
    entryForParking(parkingLot : ParkingLot) {
        const tempTicket = this.lotAllocationService.allotParkingLotNumber(parkingLot,this.getVehicleType())
        if(tempTicket)
            this.ticket = tempTicket
        else 
            console.log("No Parking Available...")
    }
    exitFromParking(parkingLot : ParkingLot){
        const price = this.lotAllocationService.deallocateLotNumber(parkingLot,this.ticket)
        this.payService.payment(price,PaymentType.UPI)
    }
    abstract getVehicleType(): VehicleType;
    private ticket: Ticket;
    private readonly vehicleNumber: string;
}
class Car extends VehicleServcie {
    getVehicleType(): VehicleType {
        return VehicleType.CAR
    }
    
}
class Bike extends VehicleServcie {
    getVehicleType(): VehicleType {
        return VehicleType.BIKE
    }
    
}
class Truck extends VehicleServcie {
    getVehicleType(): VehicleType {
        return VehicleType.TRUCK
    }
    
}

class VehicleFactory {
    static createVehicle(type: VehicleType,vehicleNumber: string): VehicleServcie {
        switch(type){
            case VehicleType.BIKE:
                return new Bike(vehicleNumber)
            case VehicleType.CAR:
                return new Car(vehicleNumber)
            case VehicleType.TRUCK:
                return new Truck(vehicleNumber)
        }
    }
}