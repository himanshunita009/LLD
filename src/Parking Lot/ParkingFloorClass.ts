interface ParkingFloorCapacity {
    bikeCapacity : number,
    truckCapacity: number,
    carCapacity : number
}
const floorCapacity : ParkingFloorCapacity = {
    bikeCapacity: 3,
    carCapacity: 2,
    truckCapacity: 1
}
class ParkingLot {
    listOfFloors: ParkingFloor[];

    constructor(private numberOfFloors: number){
        this.listOfFloors = []
        for (let i = 0 ;i < this.numberOfFloors;++i){
            this.listOfFloors.push(new ParkingFloor(i+1,floorCapacity))
        }
    }
}
class ParkingFloor  {
    public readonly occupiedLots : Map<VehicleType,Set<number>> = new Map()
    public readonly freeLots : Map<VehicleType,Set<number>> = new Map()
    constructor(
        public floorNumber: number,
        public capacity: ParkingFloorCapacity,
    ){
        const setOfEmptyLots = new Set<number>()
        for(let i = 0 ; i<capacity.bikeCapacity;++i)
            setOfEmptyLots.add(i+1)
        this.freeLots.set(VehicleType.BIKE,setOfEmptyLots)
        setOfEmptyLots.clear()
        for(let i = 0 ; i<capacity.truckCapacity;++i)
            setOfEmptyLots.add(i+1)
        this.freeLots.set(VehicleType.TRUCK,setOfEmptyLots)
        setOfEmptyLots.clear()
        for(let i = 0 ; i<capacity.carCapacity;++i)
            setOfEmptyLots.add(i+1)
        this.freeLots.set(VehicleType.CAR,setOfEmptyLots)
    }
    hasFreeLot(type: VehicleType) : number {
        return this.freeLots.get(type)?.size || 0  
    }
}

