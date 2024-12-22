const { Kafka } = require('kafkajs');

const kafka = new Kafka({
    clientId: 'billing-service',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
});

const consumer = kafka.consumer({ groupId: 'billing-service-group' });

module.exports = { consumer };
