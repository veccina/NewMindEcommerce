const Redis = require('ioredis');

let redisClient;

const connectRedis = async () => {
    redisClient = new Redis({
        host: process.env.REDIS_HOST,
        port: process.env.REDIS_PORT,
    });

    redisClient.on('connect', () => {
        console.log('Redis connected (monolith)');
    });

    redisClient.on('error', (err) => {
        console.log('Redis error', err);
    });
};

const getRedisClient = () => redisClient;

module.exports = { connectRedis, getRedisClient };

