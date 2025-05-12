enum PaymentType {
    CARD,UPI,CASH
}
class PaymentService {
    payment(amount: number,payType: PaymentType){
        switch(payType){
            case PaymentType.CARD:
                console.log("Processing card payment")
                break
            
            case PaymentType.CASH:
                console.log("Processing CASH payment")
                break
            
            case PaymentType.UPI:
                console.log("Processing UPI payment")
                break
        }
        console.log("Please pay : "+amount)
    }
}