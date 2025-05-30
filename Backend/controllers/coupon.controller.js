const couponService = require('../services/coupon.service');

exports.createCoupon = async (req, res, next) => {
  try {
    const data = await couponService.createCoupon(req.body, req.user);
    res.status(201).json(data);
  } catch (err) {
    next(err);
  }
};

exports.getAllCoupons = async (req, res, next) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 15;

    const filters = {
      keyword: req.query.keyword,
      category: req.query.category,
      location: req.query.location,
      companyName: req.query.companyName
    };

    const result = await couponService.getPaginatedCoupons({ page, limit, filters });

    res.status(200).json(result);
  } catch (err) {
    next(err);
  }
};
exports.getMyCoupons = async (req, res, next) => {
  try {
    const coupons = await couponService.getMyCoupons(req.user._id);
      console.log("User connecté :", req.user);

    res.status(200).json(coupons);
  } catch (err) {
    next(err);
  }
};


exports.getCouponById = async (req, res, next) => {
  try {
    const data = await couponService.getCouponById(req.params.id);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.updateCoupon = async (req, res, next) => {
  try {
    const data = await couponService.updateCoupon(req.params.id, req.body, req.user);
    res.status(200).json(data);
  } catch (err) {
    next(err);
  }
};

exports.deleteCoupon = async (req, res, next) => {
  try {
    await couponService.deleteCoupon(req.params.id, req.user);
    res.status(204).send();
  } catch (err) {
    next(err);
  }
};
exports.getCompanyCouponStats = async (req, res, next) => {
  try {
    const data = await couponService.getCompanyCouponStats(req.user._id);
    res.status(200).json({ total: data.length, data });
  } catch (err) {
    next(err);
  }
};
exports.incrementView = async (req, res, next) => {
  try {
    const count = await couponService.incrementView(req.params.id);
    res.status(200).json({ views: count });
  } catch (err) {
    next(err);
  }
};
exports.incrementDownload = async (req, res, next) => {
  try {
    const count = await couponService.incrementDownload(req.params.id);
    res.status(200).json({ downloads: count });
  } catch (err) {
    next(err);
  }
};
