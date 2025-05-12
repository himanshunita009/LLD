const UserPreferences =  [
    "WHATSAPP",
    "IN_APP",
    "SMS",
    "EMAIL"
]
const TIME_TO_WAIT_FOR_NEXT_NOTIFICATION_TRIGGER = 2000
interface IUserTriggerData {
    clearTimeoutId: number,
    source: string,
    destination: string,
    firstTriggeredSourceName: string,
    frequency: number
}
class ConsumerService {
    private mp : Map<string,IUserTriggerData> = new Map();   
    constructor(private readonly kafkaUri : string, private readonly groupName: string){}
    fetchUserPreferences(userEmail: string | undefined){
        if(userEmail)
            return UserPreferences
        else 
            return[]
    }
    isUserLoggedin(userEmail: string | undefined){
        return true
    }
    getTemplate(event: string,notificationBatch: IUserTriggerData | undefined){
        return `${notificationBatch?.firstTriggeredSourceName} and ${notificationBatch?.frequency} others ${event} your photo.`
    }
    processInAppNotification(event: string,notificationBatch: IUserTriggerData | undefined){
        console.log("Process In AppNotification")
        console.log(this.getTemplate(event,notificationBatch))
    }
    processWhatsappNotification(event: string,notificationBatch: IUserTriggerData | undefined){
        console.log("Process In Whatsapp")
        console.log(this.getTemplate(event,notificationBatch))
    }
    processSMSNotification(event: string,notificationBatch: IUserTriggerData | undefined){
        console.log("Process In SMS")
        console.log(this.getTemplate(event,notificationBatch))
    }
    processEmailNotification(event: string,notificationBatch: IUserTriggerData | undefined){
        console.log("Process In Email")
        console.log(this.getTemplate(event,notificationBatch))
    }
    processNotification(event: string,notificationBatch: IUserTriggerData | undefined){
        if(this.isUserLoggedin(notificationBatch?.destination)){
            this.processInAppNotification(event,notificationBatch)
        }else {
            const userPreferences = this.fetchUserPreferences(notificationBatch?.destination)
            userPreferences.forEach((preference) => {
                switch(preference){
                    case UserPreferences[0]:
                        this.processWhatsappNotification(event,notificationBatch)
                        break;
                    case UserPreferences[1]:
                        this.processInAppNotification(event,notificationBatch)
                        break
                    case UserPreferences[2]:
                        this.processSMSNotification(event,notificationBatch)
                        break
                    case UserPreferences[3]:
                        this.processEmailNotification(event,notificationBatch)
                        break
                }
            })
        }

    }
    digationLogic(request: NotificationRequest){
        const key = request.event+request.source+request.destination;
        const clearTimeoutId = setTimeout(() => {
            console.log("Start to process notification event")
            this.processNotification(request.event,this.mp.get(key))
            this.mp.delete(key)
        },TIME_TO_WAIT_FOR_NEXT_NOTIFICATION_TRIGGER)
        let userTriggerdData : IUserTriggerData = {
            clearTimeoutId,
            destination: request.destination,
            source: request.source,
            firstTriggeredSourceName: request.source,
            frequency: 0
        }
        if(this.mp.get(key) !== undefined){
            clearTimeout(this.mp.get(key)?.clearTimeoutId)
            userTriggerdData.clearTimeoutId = clearTimeoutId;
            userTriggerdData.frequency += 1
        }
        this.mp.set(key,userTriggerdData)
        
    }
    // This fucntion will listen to Kafka 
    consumer(request: NotificationRequest){
        this.digationLogic(request)
    }
}