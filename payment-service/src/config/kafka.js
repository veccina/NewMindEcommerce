const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'payment-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const producer = kafka.producer();


// Connect producer at startup
(async () => {
    await producer.connect();
    console.log('Payment service producer connected to Kafka');
})();

module.exports = { producer };
