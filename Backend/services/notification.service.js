const Notification = require('../models/Notification');

exports.sendNotification = async (userId, type, message) => {
  return await Notification.create({
    user: userId,
    type,
    message
  });
};
