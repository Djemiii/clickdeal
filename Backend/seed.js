const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { faker } = require('@faker-js/faker');
const fs = require('fs');
const path = require('path');

const generateCouponCode = require('./utils/generateCode');
const generateQRCode = require('./utils/generateQRCode');

// 🎨 FONCTION POUR CRÉER DES LOGOS SIMPLES
const createSimpleLogo = async (companyName, logoPath) => {
  try {
    // Crée un fichier SVG simple comme logo
    const initial = companyName.charAt(0).toUpperCase();
    const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const svgContent = `
<svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
  <circle cx="50" cy="50" r="45" fill="${randomColor}" stroke="#fff" stroke-width="3"/>
  <text x="50" y="65" font-family="Arial, sans-serif" font-size="36" font-weight="bold" 
        fill="white" text-anchor="middle">${initial}</text>
</svg>`;
    
    fs.writeFileSync(logoPath, svgContent.trim());
    console.log(`✅ Logo créé: ${path.basename(logoPath)}`);
    
    return logoPath;
  } catch (error) {
    console.error(`❌ Erreur création logo pour ${companyName}:`, error);
    return null;
  }
};

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

// 🔥 ENTREPRISES BÉNINOISES MODERNES POUR JEUNES
const entreprisesModernes = [
  {
    name: "GlowUp Beauty",
    email: "hello@glowupbeauty.bj",
    secteurActivite: "Cosmétiques & Beauté",
    description: "Cosmétiques naturels et skincare routine pour jeunes africains. Produits anti-acné et glow naturel",
    phone: "+229 97 88 99 11",
    website: "www.glowupbeauty.bj"
  },
  {
    name: "Fresh Kicks BJ",
    email: "contact@freshkicks.bj",
    secteurActivite: "Mode & Streetwear",
    description: "Sneakers, streetwear et mode urbaine. Le style jeune made in Bénin",
    phone: "+229 96 77 88 22",
    website: "www.freshkicks.bj"
  },
  {
    name: "TechHub Cotonou",
    email: "info@techhub.bj",
    secteurActivite: "Tech & Digital",
    description: "Formation en programmation, design UI/UX et marketing digital pour jeunes",
    phone: "+229 95 66 77 33",
    website: "www.techhub.bj"
  },
  {
    name: "Smoothie Bar 229",
    email: "contact@smoothiebar229.bj",
    secteurActivite: "Food & Boissons",
    description: "Smoothies healthy, bubble tea et snacks tendance. Le spot des jeunes de Cotonou",
    phone: "+229 94 55 66 44",
    website: "www.smoothiebar229.bj"
  },
  {
    name: "GameZone Bénin",
    email: "hello@gamezonebj.com",
    secteurActivite: "Gaming & Loisirs",
    description: "Centre gaming, tournois esports et réparation de consoles. Paradise des gamers",
    phone: "+229 93 44 55 66",
    website: "www.gamezonebj.com"
  }
];

// 🌟 NOMS BÉNINOIS MODERNES POUR JEUNES
const jeunesBeninois = [
  'Adjara Tech', 'Koffi Gamer', 'Ama Influencer', 'Yao Designer', 'Adjoa Blogger'
];

// 🎯 CATÉGORIES TENDANCES POUR JEUNES
const categoriesTendance = [
  'Gaming & Tech', 'Beauty & Skincare', 'Streetwear & Sneakers', 
  'Food & Drinks', 'Formation Digital'
];

// 🔥 PRODUITS/SERVICES MODERNES
const produitsModernes = [
  // Gaming & Tech
  "Manette PS5 personnalisée",
  "Setup gaming RGB complet",
  "Formation développement mobile",
  "Réparation iPhone/Samsung",
  
  // Beauty & Skincare
  "Routine skincare anti-acné",
  "Glow kit naturel karité+",
  "Maquillage waterproof",
  "Soins cheveux afro premium",
  
  // Mode & Style
  "Sneakers limited edition",
  "Hoodie streetwear custom",
  "Casquette brodée personnalisée",
  "Sac à dos urbain",
  
  // Food & Boissons
  "Smoothie bowl tropical",
  "Bubble tea saveur locale",
  "Energy drink naturel",
  "Snack box healthy"
];

// 📍 LIEUX POPULAIRES CHEZ LES JEUNES
const lieusTendance = [
  'Cotonou Centre', 'Fidjrossè', 'Akpakpa', 'Cadjehoun', 'Godomey'
];

// ⚡ CONDITIONS MODERNES ET ATTRACTIVES
const conditionsModernes = [
  "Valable avec ton code étudiant",
  "Offre spéciale jeunes -25 ans",
  "Code promo influenceur inclus",
  "Livraison gratuite Cotonou",
  "Paiement mobile money accepté",
  "Snap ton achat = 5% bonus",
  "Parrainage ami = réduction double",
  "First time buyer discount"
];

const seed = async () => {
  try {
    await User.deleteMany();
    await Coupon.deleteMany();

    console.log("🧹 Base de données nettoyée");

    // 📁 CRÉATION DES DOSSIERS NÉCESSAIRES
    const uploadsDir = path.join(__dirname, 'uploads');
    const logosDir = path.join(__dirname, 'uploads/logos');
    const qrDir = path.join(__dirname, 'uploads/qrcodes');
    
    if (!fs.existsSync(uploadsDir)) {
      fs.mkdirSync(uploadsDir, { recursive: true });
    }
    if (!fs.existsSync(logosDir)) {
      fs.mkdirSync(logosDir, { recursive: true });
    }
    if (!fs.existsSync(qrDir)) {
      fs.mkdirSync(qrDir, { recursive: true });
    }

    // 🏢 CRÉATION DES 5 ENTREPRISES MODERNES AVEC LOGOS
    const companies = [];
    for (const companyData of entreprisesModernes) {
      // Générer le chemin et nom du logo
      const logoFileName = `${companyData.name.toLowerCase().replace(/\s+/g, '-')}-logo.svg`;
      const logoPath = path.join(logosDir, logoFileName);
      
      // Créer le logo physique
      await createSimpleLogo(companyData.name, logoPath);
      
      const company = await User.create({
        name: companyData.name,
        email: companyData.email,
        password: '123456789',
        role: 'entreprise',
        secteurActivite: companyData.secteurActivite,
        description: companyData.description,
        phone: companyData.phone,
        website: companyData.website,
        logo: `uploads/logos/${logoFileName}`, // Référence correcte
        isVisible: true
      });
      companies.push(company);
      console.log(`✅ Entreprise créée: ${company.name}`);
    }

    // 👥 CRÉATION DES 5 CONSOMMATEURS JEUNES
    for (let i = 0; i < 5; i++) {
      await User.create({
        name: jeunesBeninois[i],
        email: `young${i + 1}@gmail.com`,
        password: '123456',
        role: 'consommateur',
      });
    }
    console.log("✅ 5 jeunes consommateurs créés");

    // 📁 DOSSIER QR CODES
    // (Déjà créé plus haut)

    // 🎫 CRÉATION DE 10 COUPONS TENDANCE (2 par entreprise)
    let couponCount = 0;
    for (const company of companies) {
      for (let i = 0; i < 2; i++) {
        const code = generateCouponCode();
        const qrPath = await generateQRCode(code);
        
        const produit = faker.helpers.arrayElement(produitsModernes);
        
        await Coupon.create({
          title: `🔥 ${produit} - Offre Jeunes`,
          description: `Hey les jeunes ! Profitez de cette offre exclusive sur ${produit.toLowerCase()}. Limited time only! 💯`,
          code,
          discount: faker.number.int({ min: 20, max: 60 }), // Réductions attractives pour jeunes
          category: faker.helpers.arrayElement(categoriesTendance),
          location: faker.helpers.arrayElement(lieusTendance),
          startDate: new Date(),
          endDate: faker.date.future({ months: 2 }), // Durée plus courte pour créer l'urgence
          conditions: faker.helpers.arrayElement(conditionsModernes),
          isApproved: false, // Tous en attente d'approbation
          isExclusif: faker.datatype.boolean({ probability: 0.6 }), // 60% exclusif pour les jeunes
          views: faker.number.int({ min: 10, max: 200 }), // Plus de vues (jeunes + actifs)
          downloads: faker.number.int({ min: 5, max: 50 }),
          conversions: faker.number.int({ min: 2, max: 20 }),
          qrCode: qrPath,
          company: company._id
        });
        
        couponCount++;
      }
      console.log(`✅ 2 coupons créés pour ${company.name}`);
    }

    console.log(`\n🎉 Seeding terminé avec succès !`);
    console.log(`📊 Résumé Modern Bénin:`);
    console.log(`   - 5 entreprises béninoises modernes créées 🏢`);
    console.log(`   - 5 logos SVG générés automatiquement 🎨`);
    console.log(`   - 5 jeunes consommateurs créés 👥`);
    console.log(`   - 10 coupons tendance créés (tous non approuvés) 🎫`);
    console.log(`   - Focus: Gaming, Beauty, Tech, Food, Streetwear 🔥`);
    console.log(`   - Zones: ${lieusTendance.join(', ')} 📍`);
    
    console.log(`\n📁 Fichiers créés:`);
    console.log(`   - uploads/logos/ : ${entreprisesModernes.length} logos SVG`);
    console.log(`   - uploads/qrcodes/ : ${couponCount} QR codes`);
    
    console.log(`\n🚀 Ready pour les tests admin !`);
    
    process.exit();
  } catch (err) {
    console.error('❌ Erreur pendant le seed :', err);
    process.exit(1);
  }
};

connect().then(seed);