interface IObserver {
    update(): void;
}
class Observer implements IObserver {
    private readonly observableObj : IObservable
    private readonly userName : string
    update(): void {
        console.log(`Hi ${this.userName} new stocks came, click here to see  ${this.observableObj.getObserverLink()}`)   
    }
}
interface IObservaleData {
    stock : number,
    link: string
}
interface IObservable extends IObservaleData{
    add(obj: Observer): void;
    remove(obj: Observer): void;
    notify(): void;
    getObserverLink(): string;
    updateStock(data: number): void;
}

class Observable implements IObservable {
    listOfObserver: IObserver[];
    link: string;
    stock: number;
    constructor(link: string,stock: number){
        this.link = link,
        this.stock = stock
    }
    add(obj: IObserver): void {
        this.listOfObserver.push(obj)
    }
    remove(obj: IObserver): void {
        this.listOfObserver = this.listOfObserver.filter(observer => observer != obj)
    }
    notify(): void {
        this.listOfObserver.forEach(observer => {
            observer.update()
        });       
    }
    getObserverLink(): string {
        return this.link
    }   
    updateStock(stocks: number): void {
        const prevStockCount = this.stock
        this.stock = stocks
        if (prevStockCount == 0)
            this.notify()    
    }
}