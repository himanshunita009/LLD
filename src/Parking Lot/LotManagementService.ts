class LotAllocationService {
    getFreeLotNumber(parkingFloor: ParkingFloor, type: VehicleType) : number {
        
        switch(type){
            case VehicleType.BIKE:
                if (parkingFloor.capacity.bikeCapacity >= 0){
                    parkingFloor.capacity.bikeCapacity--;
                    return parkingFloor.capacity.bikeCapacity
                }
                else 
                    return -1
            case VehicleType.CAR: 
            if (parkingFloor.capacity.carCapacity >= 0){
                parkingFloor.capacity.carCapacity--;
                return parkingFloor.capacity.carCapacity
            }
                else 
                    return -1
            case VehicleType.TRUCK: 
                if (parkingFloor.capacity.truckCapacity >= 0){
                    parkingFloor.capacity.truckCapacity--;
                    return parkingFloor.capacity.truckCapacity
                }
                else 
                    return -1
        }   
    }
    allotParkingLotNumber(parkingLot: ParkingLot,type: VehicleType): Ticket | undefined {
        let lotNumber = "";
        let floorNumber = -1
        for (const parkingFloor of parkingLot.listOfFloors){
            if(parkingFloor.hasFreeLot(type)){
                const temp = this.getFreeLotNumber(parkingFloor,type)
                if(temp !== -1) {
                    switch(type){
                        case VehicleType.BIKE:
                            floorNumber = parkingFloor.floorNumber
                            lotNumber = `B${temp}`
                            break
                        case VehicleType.TRUCK:
                            floorNumber = parkingFloor.floorNumber
                            lotNumber = `T${temp}`
                            break
                        case VehicleType.CAR:
                            floorNumber = parkingFloor.floorNumber
                            lotNumber = `C${temp}`
                            break
                    }
                    break
                }
            }
        }
        if(lotNumber === "")
            return undefined
        return new Ticket(Date.now(),floorNumber,lotNumber,type)        
    }
    deallocateLotNumber(parkingLot: ParkingLot,ticket: Ticket): number{
        switch(ticket.vehicleType){
            case VehicleType.BIKE:
                parkingLot.listOfFloors[ticket.floorNumber-1].capacity.bikeCapacity++;
                break
            case VehicleType.TRUCK:
                parkingLot.listOfFloors[ticket.floorNumber-1].capacity.truckCapacity++;
                break
            case VehicleType.CAR:
                parkingLot.listOfFloors[ticket.floorNumber-1].capacity.carCapacity++;
                break
        }
        return ParkingChargeService.calculateCharge(ticket.vehicleType,ticket)
    }
}

const ratePerHour = {
    bike : 10,
    car: 20,
    truck : 50
}
class ParkingChargeService {
    static calculateCharge(type: VehicleType,ticket: Ticket): number{
        const currentTimestamp = Date.now()
        const timeSpentInHours = Math.ceil((currentTimestamp - ticket.entryTimeStamp)/(1000*60*60))
        switch(type){
            case VehicleType.BIKE:
                return timeSpentInHours * ratePerHour.bike
            case VehicleType.TRUCK:
                return timeSpentInHours * ratePerHour.truck
            case VehicleType.CAR:
                return timeSpentInHours * ratePerHour.car
        }
    }
}