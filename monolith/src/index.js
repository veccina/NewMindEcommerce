require('dotenv').config();

const app = require('./app');
const connectDB = require('./config/mongo');
const { connectRedis } = require('./config/redis');
const seedData = require('./seeds/seedData');

// Start the server
(async () => {
    try {
        await connectDB();
        await connectRedis();

        // Seed data (admin user, normal user, initial products)
        await seedData();

        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Monolith running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Error starting monolith:', error);
        process.exit(1);
    }
})();
