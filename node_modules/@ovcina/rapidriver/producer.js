var amqp = require('amqplib/callback_api');

// Used for testing a service
amqp.connect('amqp://localhost', function(error0, connection) {
    if (error0) {
        throw error0;
    }
    connection.createChannel(function(error1, channel) {
        if (error1) {
            throw error1;
        }

        var args = process.argv.slice(2);
        var msg = args.slice(1).join(' ') || 'Hello World!';
        var exchange = "rapid";
        var key = (args.length > 0) ? args[0] : 'info';

        // Direct Channel allows for labeled messages
        channel.assertExchange(exchange, 'direct', {
            durable: false
        })

        //Sends the message to the queue
        channel.publish(exchange, key, Buffer.from(msg), {
            durable: true,
            persistent: true
        });

        console.log(" [x] Sent '%s'", key, msg);
        
        });
        setTimeout(function() {
            connection.close();
            process.exit(0);
        }, 500);
});
