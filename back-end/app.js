const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const estoque = require("./routes/estoque")
const entrada = require("./routes/entrada")
const saida = require("./routes/saida")


//config express
const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(morgan("dev"))
app.use(cors())
const PORT = 3333

//config mongoose
mongoose.Promise = global.Promise
mongoose.connect("mongodb://localhost/dbestoque", {useNewUrlParser: true, useUnifiedTopology: true }).then(() => {
    console.log("Conectado ao mongoDB com sucesso!")
}).catch((err) => {
    console.log("Erro: " + err)
})


//Routes
app.use("/estoque", estoque)
app.use("/entradas", entrada)
app.use("/saidas", saida)

app.listen(PORT, () => {
    console.log("Server running on: http://localhost:" + PORT)
})