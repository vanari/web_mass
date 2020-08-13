const mongoose = require("mongoose");
const { Z_DEFAULT_COMPRESSION } = require("zlib");
const Schema = mongoose.Schema;

const memeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    meme: {
        type: String,
        required: true
    },
    desc: {
        type: String
    }
}, { timestamps: true });

const Meme = mongoose.model("Meme", memeSchema);
module.exports = Meme;