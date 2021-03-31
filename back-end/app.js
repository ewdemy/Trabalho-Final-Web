const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const morgan = require("morgan")
const estoque = require("./routes/estoque")
const entrada = require("./routes/entrada")
const saida = require("./routes/saida")


//config express
const app = express()
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(morgan("dev"))

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*")
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE')
    res.header("Access-Control-Allow-Headers", "*")
    res.header("Access-Control-Max-Age", "86400")

    app.use(cors())
    next()
})

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