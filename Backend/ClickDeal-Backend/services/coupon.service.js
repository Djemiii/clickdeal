const Coupon = require('../models/Coupon');
const generateCouponCode = require('../utils/generateCode');
const generateQRCode = require('../utils/generateQRCode');
const AppError = require('../utils/AppError');

exports.createCoupon = async (data, user) => {
  const code = data.code || generateCouponCode();
  const qrCode = await generateQRCode(code);

  const coupon = await Coupon.create({
    ...data,
    code,
    qrCode,
    company: user._id
  });

  return coupon;
};
exports.getMyCoupons = async (userId) => {
  return await Coupon.find({ company: userId }).sort({ createdAt: -1 });
};

exports.getPaginatedCoupons = async ({ page = 1, limit = 15, filters = {} }) => {
  const skip = (page - 1) * limit;

  const query = { isApproved: true };

  // Mot-clé dans title ou description
  if (filters.keyword) {
    query.$or = [
      { title: { $regex: filters.keyword, $options: 'i' } },
      { description: { $regex: filters.keyword, $options: 'i' } }
    ];
  }

  // Catégorie
  if (filters.category) {
    query.category = filters.category;
  }

  // Localisation
  if (filters.location) {
    query.location = filters.location;
  }

  // Entreprise par nom
  if (filters.companyName) {
    const company = await require('../models/User').findOne({
      name: { $regex: filters.companyName, $options: 'i' },
      role: 'entreprise'
    });
    if (company) {
      query.company = company._id;
    } else {
      query.company = null; // Aucun résultat
    }
  }

  const [data, total] = await Promise.all([
    Coupon.find(query).skip(skip).limit(limit).populate('company', 'name category'),
    Coupon.countDocuments(query)
  ]);

  return {
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit),
    data
  };
};

exports.getCouponById = async (id) => {
  const coupon = await Coupon.findById(id).populate('company', 'name');
  if (!coupon) throw new AppError('Coupon introuvable', 404);
  return coupon;
};

exports.updateCoupon = async (id, data, user) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new AppError('Coupon introuvable', 404);
  if (!coupon.company.equals(user._id)) throw new AppError('Non autorisé', 403);

  Object.assign(coupon, data);
  await coupon.save();
  return coupon;
};

exports.deleteCoupon = async (id, user) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new AppError('Coupon introuvable', 404);
  if (!coupon.company.equals(user._id)) throw new AppError('Non autorisé', 403);

  await coupon.deleteOne();
};

exports.incrementView = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new AppError('Coupon introuvable', 404);

  coupon.views += 1;
  await coupon.save();

  return coupon.views;
};
exports.incrementDownload = async (id) => {
  const coupon = await Coupon.findById(id);
  if (!coupon) throw new AppError('Coupon introuvable', 404);

  coupon.downloads += 1;
  await coupon.save();

  return coupon.downloads;
};

exports.getCompanyCouponStats = async (userId) => {
  return await Coupon.find({ company: userId })
    .select('title views downloads conversions');
};