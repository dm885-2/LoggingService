var rapidriver = require("@ovcina/rapidriver");

const host = 'amqp://localhost';

/***
 *  INFO service
 */

/** 
 * subscribe to events on rivers, and do some work if it gets an event.
 */

rapidriver.subscribe(host, [
    {river: "test", event: "display", work: (msg) => {
        console.log(" [*] Received: '%s'", msg); 
    }}
    /** to subscribe to multiple events: **/
    // , {river: "test", event: "other event", work: (msg) => {
    //     console.log(" [*] Received: '%s'", msg); 
    // }}
]);

/**
 * Send a display event into the rapid right when the service is started.
 */
//rapidriver.publish(host, "display", "message");