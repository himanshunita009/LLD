interface BasePizza {
    cost(): number;
    features(): string;
}
abstract class BasePizzaModel implements BasePizza {
    abstract cost(): number;
    abstract features(): string;
    addTopins(basePizza: string): BasePizzaModel {
        switch(basePizza){
            case 'chees':
                return new CheeseTopins(this)
            
            case 'veggies':
                return new VeggiesTopins(this)
            default:
                console.error("Wrong Topins")
                return this
        }
    }
}
class MargeritaPizza extends BasePizzaModel {
    cost(): number {
        return 100
    }
    features(): string {
        return "MargeritaPizza"
    }
}
class GordenCornPizza extends BasePizzaModel {
    cost(): number {
        return 120
    }
    features(): string {
        return "GordenCornPizza"
    }
}

abstract class TopinsDecorator extends BasePizzaModel {
    basePizza : BasePizza;
    constructor(basePizza: BasePizza){
        super()
        this.basePizza = basePizza
    }
    abstract cost(): number ;
    abstract features(): string ;
    
}

class CheeseTopins extends TopinsDecorator {
    constructor(pizza: BasePizza){
        super(pizza)
    }
    cost(): number {
        return this.basePizza.cost() + 30
    }
    features(): string {
        return this.basePizza.features() + " Cheese"
    }
}

class VeggiesTopins extends TopinsDecorator {
    constructor(pizza: BasePizza){
        super(pizza)
    }
    cost(): number {
        return this.basePizza.cost() + 80
    }
    features(): string {
        return this.basePizza.features() + " Veggies"
    }
}
