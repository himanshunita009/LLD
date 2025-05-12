// Req
// 1. Diff Cost Per KM
// 2. Diff Avg Speed
// 3. Return total distance , estimated time , total cost , Mode or Travle 

enum TrafficLevel {
    low = 1.10,
    medium = 1.25,
    high = 1.5
}

interface TravelStrategy {
    rate : number;
    avgSpeed: number;
    tollChargesPerKM: number,
    travelMode(): string
}

interface ITimeCalculatorResponse {
    baseTime: number,
    totalTime: number
}
interface ICostCalculatorResponse {
    baseCost: number,
    totalCost: number
}
interface TravelTimeCalculator{
    calculateTrafficTime(baseTime: number,traffic: TrafficLevel): number;
    calculateBaseTime(distance : number,speed: number): number;
    calculateTime(distance : number,speed: number,trafficFactor: TrafficLevel): ITimeCalculatorResponse;
}
interface TravelCostCalculator {
    calculateBaseCost(distance: number,rate: number): number;
    calculateTollCharges(distance: number,tollChargesPerKM: number): number;
    calculateCost(distance: number,rate: number,tollChargesPerKM: number): ICostCalculatorResponse;
}
interface TravelDistanceCalculator {
    calculateDistance(start: number,end: number): number;
}
abstract class TravelTimeCalculatorService implements TravelTimeCalculator{
    calculateBaseTime(distance: number, speed: number): number {
        return distance/speed
    }
    calculateTrafficTime(baseTime: number, traffic: TrafficLevel): number {
        return Math.floor(baseTime*traffic)
    }
    calculateTime(distance: number, speed: number, trafficFactor: TrafficLevel): ITimeCalculatorResponse {
        const baseTime = this.calculateBaseTime(distance,speed)
        const trafficTime = this.calculateTrafficTime(baseTime,trafficFactor)
        return {
            baseTime,
            totalTime: baseTime+trafficTime
        }
    }
}
abstract class TravelCostCalculatorService implements TravelCostCalculator {
    calculateBaseCost(distance: number, rate: number): number {
        return distance*rate
    }
    calculateTollCharges(distance: number, tollCharges: number): number {
        return Math.floor(distance/100)*tollCharges
    }
    calculateCost(distance: number, rate: number, tollChargesPerKM: number): ICostCalculatorResponse {
        const baseCost = this.calculateBaseCost(distance,rate)
        const tollCharges = this.calculateTollCharges(distance,tollChargesPerKM)
        return {
            baseCost,
            totalCost: baseCost+tollCharges
        }
    }
}
abstract class TravelDistanceCalculatorService implements TravelDistanceCalculator {
    calculateDistance(start: number, end: number): number {
        return end-start
    }
}
abstract class TravelPlanner  implements TravelStrategy  {
    
    constructor(public rate: number,public avgSpeed: number,public tollChargesPerKM: number,
        public travelTimeService: TravelTimeCalculatorService,
        public travelCostService: TravelCostCalculatorService,
        public travelDistanceService: TravelDistanceCalculatorService,
    ){}
    abstract travelMode(): string;
}
class CarTravel extends TravelPlanner {
    travelMode(): string {
        return 'Car'
    }
}

class BusTravel extends TravelPlanner {
    travelMode(): string {
        return 'Bus'
    }
}

class BikeTravel extends TravelPlanner {
    travelMode(): string {
        return 'Bike'
    }
}

class TravelContext {
    constructor(private obj : TravelPlanner){    }
    switchStrategy(obj: TravelPlanner):void{
        this.obj = obj
    }

    startTravel(start: number,end: number) {
        const distance = this.obj.travelDistanceService.calculateDistance(start,end);   
        const cost = this.obj.travelCostService.calculateCost(distance,this.obj.rate,this.obj.tollChargesPerKM)
        const time = this.obj.travelTimeService.calculateTime(distance,this.obj.avgSpeed,TrafficLevel.high)
        return {
            Mode: this.obj.travelMode(),
            baseCost: cost.baseCost,
            totalCost: cost.totalCost,
            baseTime: time.baseTime,
            totalTime: time.totalTime,
            distanceTraveled: distance
        }
    }
}