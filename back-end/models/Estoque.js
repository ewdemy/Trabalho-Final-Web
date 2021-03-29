const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Estoque = new Schema({
    produto: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        default: 0
    }
})

mongoose.model("estoque", Estoque)