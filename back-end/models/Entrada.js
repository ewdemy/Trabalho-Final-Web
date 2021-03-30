const mongoose = require("mongoose")
const Schema = mongoose.Schema

const Entrada = new Schema({
    produto: {
        type: Schema.Types.ObjectId,
        ref: "estoque",
        require: true
    },
    quantidade: {
        type: Number,
        require: true
    },
    data: {
        type: Date,
        default: Date.now()
    }
})

mongoose.model("entradas", Entrada)