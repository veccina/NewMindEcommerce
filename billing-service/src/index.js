require('dotenv').config();
const app = require('./app');
const mongoose = require('mongoose');

const PORT = process.env.PORT || 5000;
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce-billing';

(async () => {
    try {
        // Connect to Billing DB
        await mongoose.connect(MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected (billing service)');

        // Start Express
        app.listen(PORT, () => {
            console.log(`Billing Service running on port ${PORT}`);
        });
    } catch (error) {
        console.error('Billing service error:', error);
        process.exit(1);
    }
})();
