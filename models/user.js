const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/users/avatars')

const signupSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },
    
    avatar:{
        type: String,
    }

    // confirm_password: {
    //     type: String,
    //     required: true
    // }
},{
    timestamps: true
})

let storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log(AVATAR_PATH, '****');
      cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, file.fieldname + '-' + uniqueSuffix);
    }
  })

  //static methods
  signupSchema.statics.uploadAvatar = multer({storage: storage}).single('avatar');
  signupSchema.statics.avatarPath = AVATAR_PATH;

const signUp = mongoose.model('signUp', signupSchema);
module.exports = signUp;