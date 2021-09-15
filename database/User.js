
const { Schema, model } = require('mongoose');
const userRoleEnum = require('../config/user.roleEnum');
const pasService = require('../services/password.service');

const userSchema = new Schema({
    age: {
        type: Number,
        required: true,
        trim: true
    },
    avatar: {
        type: String
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    role: {
        default: userRoleEnum.USER,
        enum: Object.values(userRoleEnum),
        type: String
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.virtual('fullName').get(function () {
    return `${this.name} ${this.email}`;
});

userSchema.methods = {
    validatePassword(password) {
        return pasService.compare(password, this.password);
    }
};

userSchema.statics = {
    async createWithHashPassword(userObject) {
        const hashPassword = await pasService.hash(userObject.password);

        return this.create({
            ...userObject,
            password: hashPassword
        });
    }
};

module.exports = model('user', userSchema);
