const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Estoque")
require("../models/Entrada")
const Estoque = mongoose.model("estoque")
const Entrada = mongoose.model("entradas")

router.get("/", (req, res) => {
    
    Entrada.find().populate("produto").then((entradas) => {
        res.json(entradas)
    }).catch((err) => {
        res.json(err)
    })
})

router.post("/", (req, res) => {
    const novaEntrada = {
        produto: req.body.produto,
        quantidade: req.body.quantidade
    }
  
    Estoque.findOne({ _id: req.body.produto }).then((estoque) => {
        if(!estoque){
            res.status(404).json()
        }

        estoque.quantidade += novaEntrada.quantidade
        estoque.save().then((est) => {
            console.log(est)
        }).catch((err) => {
            console.log(err)
        })

        new Entrada(novaEntrada).save().then((entrada) => {
            console.log("Entrada salva com sucesso!")
            res.json(entrada,201)
        }).catch((err) => {
            res.status(500).json(err)
        })

    }).catch((err) => {
        console.log(err)
    })

 
})


router.delete("/:id", (req, res) => {
    Entrada.findOne({ _id: req.params.id }).then((entrada) => {

        if(entrada){
            Estoque.findOne({ _id: entrada.produto}).then((estoque) => {
                if(estoque){
                    if(entrada.quantidade > estoque.quantidade){
                        res.status(409).json({message: "Não é possível excluir - estoque insuficiente"})
                    } else{
                        estoque.quantidade -= entrada.quantidade
                        estoque.save().then((est) => {
                            console.log(est)
                        }).catch((err) => {
                            console.log(err)
                        })

                        Entrada.deleteOne({ _id: req.params.id }).then(() => {
                            res.status(204).json()
                        }).catch((err) => {
                            console.log(err)
                            res.status(500).json()
                        })
                    }    

                } else{
                    res.status(404).json()
                }
            }).catch((err) => {console.log(err)})

        } else{
            res.status(404).json()
        }

        }).catch((err) => {
            console.log(err)
            res.status(404).json()
        })
})



module.exports = router