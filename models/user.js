const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    index: { unique: true },
    required: 'Please enter an email'
  },
  password: {
    type: String,
    trim: true,
    required: 'Please enter a password'
  },
  name: {
    type: String,
    trim: true,
    required: 'Please enter a name'
  }
});

// N.B: This must be a normal function because i must use the binded this
UserSchema.methods.comparePassword = function comparePassword(password, cb) {
  bcrypt.compare(password, this.password, cb);
};

UserSchema.pre('save', function saveHook(next) {
  const user = this;

  if (!user.isModified('password')) {
    return next();
  }

  return bcrypt.genSalt((saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    return bcrypt.hash(user.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }

      user.password = hash;

      return next();
    });
  });
});

module.exports = mongoose.model('User', UserSchema);
