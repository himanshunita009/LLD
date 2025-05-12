function main(){
    const parkingLot = new ParkingLot(2);
    const b1 =  VehicleFactory.createVehicle(VehicleType.BIKE,"B1234")
    const b2 =  VehicleFactory.createVehicle(VehicleType.BIKE,"B1235")
    const b3 =  VehicleFactory.createVehicle(VehicleType.BIKE,"B1236")
    const T1 =  VehicleFactory.createVehicle(VehicleType.TRUCK,"T1234")
    const T2 =  VehicleFactory.createVehicle(VehicleType.TRUCK,"T1235")
    const T3 =  VehicleFactory.createVehicle(VehicleType.TRUCK,"T1236")
    T1.entryForParking(parkingLot)
    T2.entryForParking(parkingLot)
}