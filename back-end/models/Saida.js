const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Saida = new Schema({
    produtoId: {
        type: String,
        required: true
    },
    quantidade: {
        type: Number,
        required: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("saidas", Saida)