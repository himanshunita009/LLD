interface NotificationRequest {
    event: string,
    source: string,
    destination: string,
    message: string
}
const dummyKafkaList: NotificationRequest[] = []
const producer = (request: NotificationRequest) => {
    dummyKafkaList.push(request)
    console.log("Pushing Information into KAFKA")
}

const main = (request: NotificationRequest) => {
    producer(request)
    return "Message sent"
}