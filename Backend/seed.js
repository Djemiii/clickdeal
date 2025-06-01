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
    // Nettoyage
    await User.deleteMany();
    await Coupon.deleteMany();

    // Création d'un utilisateur entreprise
    const company = await User.create({
      name: 'Entreprise Cool',
      email: 'company@example.com',
      password: '123456789',
      role: 'entreprise',
      secteurActivite: 'Technologie',
      description: 'Une entreprise innovante',
      phone: faker.phone.number(),
      website: faker.internet.url(),
    });

    // Création de 4 utilisateurs consommateurs
    for (let i = 0; i < 4; i++) {
      await User.create({
        name: faker.person.fullName(),
        email: faker.internet.email(),
        password: '123456',
        role: 'consommateur'
      });
    }

    // Vérifie que le dossier qrcodes existe
    const qrDir = path.join(__dirname, 'uploads/qrcodes');
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // Création de 10 coupons avec codes et QR codes
    for (let i = 0; i < 10; i++) {
      const code = generateCouponCode();
      const qrPath = await generateQRCode(code); // retourne le chemin complet

      await Coupon.create({
        title: faker.commerce.productName(),
        description: faker.commerce.productDescription(),
        code,
        discount: faker.number.int({ min: 5, max: 50 }),
        category: faker.commerce.department(),
        location: faker.location.city(),
        startDate: faker.date.recent(),
        endDate: faker.date.soon({ days: 30 }),
        conditions: 'Valable uniquement en magasin',
        isApproved: true,
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
