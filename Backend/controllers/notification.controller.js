const notificationService = require('../services/notification.service');
const Notification = require('../models/Notification');


exports.getMyNotifications = async (req, res, next) => {
  try {
    const notifications = await Notification.find({ user: req.user._id })
      .sort({ createdAt: -1 });

    res.status(200).json({ count: notifications.length, notifications });
    console.log("Notification model:", Notification);

  } catch (err) {
    next(err);
  }
};
