var amqp = require('amqplib/callback_api');
var rapid = 'rapid';

var sub = {
    subscribe:function (host, subscriptions) { 
        if(subscriptions.length === 0) return;        
        amqp.connect(host, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error2, channel) {
                if(error2) {
                    throw error2;
                }
                
                channel.prefetch(1);
                channel.assertExchange(rapid, 'direct', {
                    durable: false
                }); 
                
                subscriptions.forEach(sub => {
                    console.log(" [*] Waiting for '%s' messages in river: %s. To exit press CTRL+C", sub.event, sub.river);
        
                    channel.assertQueue(sub.river, {
                        exclusive: false
                    }, (error3, q) => {
                        if(error3) throw error3;

                        channel.bindQueue(q.queue, rapid, sub.event);
                        
                        const publishWrapper = (event, message) => {
                            if(message instanceof Object) {
                                message = JSON.stringify(message);
                            }
                            channel.publish(rapid, event, Buffer.from(message));
                        }

                        channel.consume(q.queue, function(msg) {
                            if(msg.fields.routingKey != sub.event) {
                                channel.nack(msg, false, true);   
                                return;
                            }
                            if(msg.content) {
                                sub.work(JSON.parse(msg.content.toString()), publishWrapper);
                                channel.ack(msg);
                            }
                        }, {
                            noAck: false
                        });
                    });
                });
            });
        });
    },
    publish:function (host, event, msg) {
        amqp.connect(host, function(error0, connection) {
            if (error0) {
                throw error0;
            }
            connection.createChannel(function(error1, channel) {
                if (error1) {
                    throw error1;
                }

                channel.assertExchange(rapid, 'direct', {
                    durable: false
                })

                if(msg instanceof Object) {
                    msg = JSON.stringify(msg);
                }

                channel.publish(rapid, event, Buffer.from(msg));
                
                console.log(" [x] Sent event '%s' with message: '%s'", event, msg);
                setTimeout(function() {
                    channel.close();
                    connection.close();
                }, 1);
            });
        });
    }
};

module.exports = sub;