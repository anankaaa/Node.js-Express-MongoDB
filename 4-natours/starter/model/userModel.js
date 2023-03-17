const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pls tell us your name'],
  },

  email: {
    type: String,
    required: [true, 'Pls provide your email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Pls provide a valid email'],
  },
  photo: {
    type: String,
  },
  password: {
    type: String,
    required: [true, 'Pls provide a password'],
    minlength: 8,
  },
  passwordConfirm: {
    type: String,
    required: [true, 'Pls confirm your password'],
    validate: {
      //this only works on CREATE and SAVE!!!
      validator: function (el) {
        return el === this.password;
      },
      message: 'Passwords are not the same',
    },
  },
});

userSchema.pre('save', async function (next) {
  //only run if password was actually modified
  if (!this.isModified('password')) return next();

  //hashing -> encrypting password, hash the password with cost of 12
  this.password = await bcrypt.hash(this.password, 12);

  //delete passwordConfirm field
  this.passwordConfirm = undefined;

  next();
});

const User = mongoose.model('User', userSchema);

module.exports = User;

//Header + payload ->         ->        JWT -> Client -> JWT + Original signature -> Header + payload ->
//                        Signature->                                                                       Test Signature (compare with original signature)
// Secret ->                                                                    Secret ->

//test signature === signature -> Data has not been modified -> Authenticated
//test signature !== signature -> Data has been modified -> Not Authenticated
