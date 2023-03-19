const mongoose = require("mongoose");
const bycrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const adminSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    isAdmin: {
        type: Boolean,
        required: true,
        default: true
    },
    tokens: [{
        token: {
            type: String,
            required: true,
        }
    }]
});

adminSchema.pre('save', async function(next) {
    if (this.isModified('password')) {
        this.password = await bycrypt.hash(this.password, 12);
    }
    next();
})
adminSchema.methods
    .generateAuthToken = async function() {
        try {
            let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
            this.tokens = this.tokens.concat({ token: token })
            await this.save()
            return token;
        } catch (err) {
            console.log(err);
        }
    }

const Admin = mongoose.model("ADMINIDS", adminSchema)
module.exports = Admin;