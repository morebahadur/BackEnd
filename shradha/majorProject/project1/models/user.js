const mongoose = require('mongoose');
const sechema = mongoose.Schema;
const passwordLocalMongoose = require('passport-local-mongoose');
const userSchema = new sechema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        enum: ['student', 'teacher', 'admin'],
        default: 'student'
    }
});

userSchema.plugin(passwordLocalMongoose, {
    usernameField: 'email',
    hashField: 'password',
    saltField: 'salt'
});
const User = mongoose.model('User', userSchema);
module.exports = User;