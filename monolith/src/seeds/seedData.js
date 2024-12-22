// monolith/src/seeds/seedData.js
const User = require('../models/User');
const Product = require('../models/Product');

// Predefined products
const productsData = [
    {
        name: 'erkekmavigomlek',
        description: 'Mavi Erkek Gömlek, rahat ve şık.',
        price: 120,
        imageUrl: '/images/erkekmavigomlek.jpg',
        category: 'Men'
    },
    {
        name: 'erkekpantolonkahve',
        description: 'Kahverengi Erkek Pantolon, her durumda giyilebilir.',
        price: 150,
        imageUrl: '/images/erkekpantolonkahve.jpg',
        category: 'Men'
    },
    {
        name: 'erkekpantolonkrem',
        description: 'Krem rengi Erkek Pantolon, klasik tarz.',
        price: 140,
        imageUrl: '/images/erkekpantolonkrem.jpg',
        category: 'Men'
    },
    {
        name: 'erkeksiyahgomlek',
        description: 'Siyah Erkek Gömlek, her kombine uygun.',
        price: 130,
        imageUrl: '/images/erkeksiyahgomlek.jpg',
        category: 'Men'
    },
    {
        name: 'erkekyesilgomlek',
        description: 'Yeşil Erkek Gömlek, spor ve rahat.',
        price: 125,
        imageUrl: '/images/erkekyesilgomlek.jpg',
        category: 'Men'
    },
    {
        name: 'iphone',
        description: 'Apple iPhone, son model akıllı telefon.',
        price: 12000,
        imageUrl: '/images/iphone.jpg',
        category: 'Electronics'
    },
    {
        name: 'kadingomlekyesil',
        description: 'Yeşil Kadın Gömlek, günlük şıklık.',
        price: 110,
        imageUrl: '/images/kadingomlekyesil.jpg',
        category: 'Women'
    },
    {
        name: 'kadinmavigomlek',
        description: 'Mavi Kadın Gömlek, rahat ve zarif.',
        price: 120,
        imageUrl: '/images/kadinmavigomlek.jpg',
        category: 'Women'
    },
    {
        name: 'kadinpantolongri',
        description: 'Gri Kadın Pantolon, ofis stiline uygun.',
        price: 130,
        imageUrl: '/images/kadinpantolongri.jpg',
        category: 'Women'
    },
    {
        name: 'kadinpantolonkrem',
        description: 'Krem Kadın Pantolon, klasik ve şık.',
        price: 135,
        imageUrl: '/images/kadinpantolonkrem.jpg',
        category: 'Women'
    },
    {
        name: 'kadinpantolonmavi',
        description: 'Mavi Kadın Pantolon, spor ve rahat.',
        price: 140,
        imageUrl: '/images/kadinpantolonmavi.jpg',
        category: 'Women'
    },
    {
        name: 'laptop',
        description: 'Güçlü ve hafif laptop, iş ve eğlence için ideal.',
        price: 15000,
        imageUrl: '/images/laptop.jpg',
        category: 'Electronics'
    },
    {
        name: 'ps5',
        description: 'PlayStation 5, son nesil oyun konsolu.',
        price: 13000,
        imageUrl: '/images/ps5.jpg',
        category: 'Electronics'
    },
    {
        name: 'samsung',
        description: 'Samsung akıllı telefon, yüksek performans.',
        price: 10000,
        imageUrl: '/images/samsung.jpg',
        category: 'Electronics'
    },
    {
        name: 'xbox',
        description: 'Xbox Series X, güçlü oyun deneyimi.',
        price: 12000,
        imageUrl: '/images/xbox.jpg',
        category: 'Electronics'
    },
];

module.exports = async function seedData() {
    try {
        // Check if there's already an admin user
        const adminExists = await User.findOne({ email: 'admin@example.com' });
        if (!adminExists) {
            // Create default admin with fullName and address
            await User.create({
                username: 'admin',
                fullName: 'Admin Administrator',
                email: 'admin@example.com',
                password: 'admin123',
                isAdmin: true,
                address: {
                    line1: '123 Admin Street',
                    line2: '',
                    city: 'Admin City',
                    state: 'AA',
                    zip: '00000'
                }
            });
            console.log('Default admin created');
        }

        // Check if there's already a normal user
        const userExists = await User.findOne({ email: 'user@example.com' });
        if (!userExists) {
            // Create default user with fullName and address
            await User.create({
                username: 'user',
                fullName: 'John Doe',
                email: 'user@example.com',
                password: 'user123',
                isAdmin: false,
                address: {
                    line1: '456 User Ave',
                    line2: 'Apt 101',
                    city: 'User City',
                    state: 'UU',
                    zip: '11111'
                }
            });
            console.log('Default user created');
        }

        // Seed products if none exist
        const productCount = await Product.countDocuments();
        if (productCount === 0) {
            await Product.insertMany(productsData);
            console.log('Initial products seeded');
        }
    } catch (error) {
        console.error('Error seeding data:', error);
    }
};
