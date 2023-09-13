const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
    name: {
        type: String,
        require: true,
    },
    auther: {
        type: String,
        require: true,
    },
    genre: {
        type: String,
        require: true,
    },
    price: {
        type: String,
        require: true,
    },
    publisher: {
        type: String,
        require: true,
    },
},
    {
        timestamps: true,
    }
);

module.exports = mongoose.model("Book", bookSchema);