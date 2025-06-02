const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const generateCouponCode = require('./utils/generateCode');
const generateQRCode = require('./utils/generateQRCode');

dotenv.config();

const User = require('./models/User');
const Coupon = require('./models/Coupon');

const connect = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ Connecté à MongoDB");
  } catch (err) {
    console.error("❌ Erreur de connexion :", err.message);
    process.exit(1);
  }
};

const seed = async () => {
  try {
    await User.deleteMany();
    await Coupon.deleteMany();

    // Crée une entreprise
    const company = await User.create({
      name: 'Entreprise Cool',
      email: 'company@example.com',
      password: '123456789',
      role: 'entreprise',
      secteurActivite: 'Technologie',
      description: 'Une entreprise innovante et durable',
      phone: faker.phone.number(),
      website: faker.internet.url(),
      logo: 'uploads/logos/demo-logo.png', // chemin de test
      isVisible: true
    });

    // Crée 4 consommateurs
    for (let i = 0; i < 4; i++) {
      await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456',
        role: 'consommateur',
      });
    }

    const qrDir = path.join(__dirname, 'uploads/qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Catégories fictives
    const categories = ['Beauté', 'Électronique', 'Mode', 'Alimentation', 'Voyage', 'Maison'];
    const villes = ['Paris', 'Lyon', 'Marseille', 'Toulouse', 'Nice', 'Bordeaux'];

    // Création de 20 coupons
    for (let i = 0; i < 20; i++) {
      const code = generateCouponCode();
      const qrPath = await generateQRCode(code);

      await Coupon.create({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code,
        discount: faker.number.int({ min: 10, max: 70 }),
        category: faker.helpers.arrayElement(categories),
        location: faker.helpers.arrayElement(villes),
        startDate: faker.date.past({ years: 1 }),
        endDate: faker.date.future({ months: 2 }),
        conditions: faker.lorem.sentence(),
        isApproved: faker.datatype.boolean(),
        isExclusif: faker.datatype.boolean(),
        views: faker.number.int({ min: 0, max: 300 }),
        downloads: faker.number.int({ min: 0, max: 200 }),
        conversions: faker.number.int({ min: 0, max: 100 }),
        qrCode: qrPath,
        company: company._id
      });
    }

    console.log('✅ Base de données seedée avec succès !');
    process.exit();
  } catch (err) {
    console.error('❌ Erreur pendant le seed :', err);
    process.exit(1);
  }
};

connect().then(seed);
