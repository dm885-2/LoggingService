# ovcina-rapidriver 2.0.7

*RabbitMQ is required to be running: https://www.rabbitmq.com/download.html*

## Installation
Create a folder for the microservice. Open a terminal window and navigate to the empty folder.

Install rapidriver Node module:
```bash
npm install @ovcina/rapidriver
```

## Creating the service
An example can be found in service-example.js

First import the node module: 
```javascript
var rapidriver = require("@ovcina/rapidriver");
```

Define a constant called 'host':
```javascript
const host = 'amqp://localhost';
```

Subscribe to an event on a river: 
```javascript
rapidriver.subscribe(host, [
    {river: "test", event: "display", work: (msg) => {
        console.log(" [*] Received: '%s'", msg); 
    }}
]);
```

Send an event back to the rapid, and remember to add the "publish" parameter in the callback function:
```javascript
rapidriver.subscribe(host, [
    {river: "test", event: "display", work: (msg, publish) => {
        publish("error", "Error Message"); 
    }}
]);
```

## Testing the service

Run RabbitMQ message broker:
```bash
rabbitmq-server
```

Run the service:
```bash
node service.js
```

The file "producer.js" is for sending a message to the rapid which the service can subscribe to.
It's only used for testing the service:
```bash
node path/to/producer.js <event_name> <message>
```

Open a new terminal window.
To test the running service-example.js, run the producer and make a display event:
```bash
node node_modules/@ovcina/rapidriver/producer.js "display" "hello world"
```

It is also possible to publish a message programmatically, without having to subscribe to a river first:
```javascript
rapidriver.publish(host, event, msg);
```

## Further Testing

Try making a new service (in a different folder), and make it subscribe to the "error" river.
```javascript
rapidriver.subscribe(host, [
    {river: "monitoring", event: "error", work: (msg) => {
        console.log(" [*] Received: '%s'", msg); 
    }}
]);
```

In the first service add the "publish(event, msg)" line which sends an error event back into the river.
Now when both services are run, make the producer send a display event, the first service will send an error event which the other service will subscribe to and print out.

