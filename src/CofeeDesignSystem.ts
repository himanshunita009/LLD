enum CofeeSize {
    small=1,medium,large
}
interface BaseCofee {
    size: CofeeSize;
    cost(): number;
    description(): string;
    checkout(): number;
}
abstract class BaseCofeeModel implements BaseCofee{
    constructor(public size: CofeeSize){}
    abstract cost(): number;
    abstract description(): string;
    checkout(): number {
        return this.cost() * this.size
    }
}

class Espresso extends BaseCofeeModel {
    constructor(public size: CofeeSize){
        super(size)
    }
    cost(): number {
        return 100 * this.size
    }
    description(): string {
        return 'Espresso'
    }
}
class Cappuccino extends BaseCofeeModel {
    constructor(public size: CofeeSize){
        super(size)
    }     
    cost(): number {
        return 120 * this.size
    }
    description(): string {
        return 'Cappuccino'
    }
}

class Latte extends BaseCofeeModel {
    constructor(public size: CofeeSize){
        super(size)
    }
    cost(): number {
        return 150 * this.size
    }
    description(): string {
        return 'Latte'
    }
}

abstract class Toppings implements BaseCofee {
    constructor(protected baseCofee: BaseCofee,public size: CofeeSize){}
    cost(): number {
        return this.baseCofee.cost() + Toppings.toppingsCost
    }
    description(): string {
        return this.baseCofee.description() + `+ ${Toppings.toppingsName}`
    }
    static toppingsName : string
    static toppingsCost : number
    removeToppings(): BaseCofee {
        return this.baseCofee
    }
    checkout(){
        let obj : BaseCofee = this 
        while (true) {
            if (obj instanceof BaseCofeeModel){
                console.log(`Base Cofee Price : +${obj.cost()}`)
                break;
            }else {
                console.log(`${Toppings.toppingsName} Topping Base Price : ${Toppings.toppingsCost} * size(${this.size}) `)
                obj = this.baseCofee
            }
        }
        console.log(`Total Price ${this.cost()}`)
        return this.cost()
    }
} 
class MilkToppings extends Toppings {
    constructor(baseCofee: BaseCofee,size: CofeeSize){
        super(baseCofee,size)
        MilkToppings.toppingsName = "Milk"
        MilkToppings.toppingsCost = 20
    }
}
class SoyaMilkToppings extends Toppings{
    constructor(baseCofee: BaseCofee,size: CofeeSize){
        super(baseCofee,size)
        SoyaMilkToppings.toppingsName = "SoyaMilk"
        SoyaMilkToppings.toppingsCost = 30
    }
}
class WhippedCreamToppings extends Toppings{
    constructor(baseCofee: BaseCofee,size: CofeeSize){
        super(baseCofee,size)
        WhippedCreamToppings.toppingsName = "WhippedCream"
        WhippedCreamToppings.toppingsCost = 40
    }
}
class CaremalToppings extends Toppings{
    constructor(baseCofee: BaseCofee,size: CofeeSize){
        super(baseCofee,size)
        CaremalToppings.toppingsName = "Caremal"
        CaremalToppings.toppingsCost = 50
    }
}
class ChocolateToppings extends Toppings{
    constructor(baseCofee: BaseCofee,size: CofeeSize){
        super(baseCofee,size)
        ChocolateToppings.toppingsName = "Chocolate"
        ChocolateToppings.toppingsCost = 60
    }
}