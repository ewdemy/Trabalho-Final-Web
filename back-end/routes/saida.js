const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Estoque")
require("../models/Saida")
const Estoque = mongoose.model("estoque")
const Saida = mongoose.model("saidas")

router.get("/", (req, res) => {
    Saida.find().then((saidas) => {
        res.json(saidas)
    }).catch((err) => {
        res.json(err)
    })
})

router.post("/", (req, res) => {
    const novaSaida = {
        produtoId: req.body.produtoId,
        quantidade: req.body.quantidade
    }
  
    Estoque.findOne({ _id: req.body.produtoId }).then((estoque) => {
        if(!estoque){
            res.status(404).json()
        }

        if(novaSaida.quantidade > estoque.quantidade){
            res.status(409).json({message: "Não é possível adicionar saída - estoque insuficiente"})
        }else{

            estoque.quantidade -= novaSaida.quantidade
            estoque.save().then((est) => {
                console.log(est)
            }).catch((err) => {
                console.log(err)
            })

            new Saida(novaSaida).save().then((saida) => {
                console.log("Saída salva com sucesso!")
                res.json(saida,201)
            }).catch((err) => {
                res.status(500).json(err)
            })
        }
    }).catch((err) => {
        console.log(err)
    })

 
})


router.delete("/:id", (req, res) => {
    Saida.findOne({ _id: req.params.id }).then((saida) => {

        if(saida){
            Estoque.findOne({ _id: saida.produtoId}).then((estoque) => {
                if(estoque){

                    estoque.quantidade += saida.quantidade
                    estoque.save().then((est) => {
                        console.log(est)
                    }).catch((err) => {
                        console.log(err)
                    })

                    Saida.deleteOne({ _id: req.params.id }).then(() => {
                        res.status(204).json()
                    }).catch((err) => {
                        console.log(err)
                        res.status(500).json()
                    })

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