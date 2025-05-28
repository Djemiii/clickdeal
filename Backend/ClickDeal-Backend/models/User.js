const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  phone: String,
  website: String,
  secteurActivite: String,
  description: String,
  logo: String, // path or URL
  isVisible: {
    type: Boolean,
    default: true
  },
  role: {
    type: String,
    enum: ['entreprise', 'consommateur,admin'],
    default: 'consommateur'
  },lastSpinAt: {
  type: Date,
  default: null,
}

}, {
  timestamps: true
});

// Hash du mot de passe
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Méthode pour comparer les mots de passe
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
