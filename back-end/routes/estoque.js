const express = require("express")
const router = express.Router()
const mongoose = require("mongoose")
require("../models/Estoque")
const Estoque = mongoose.model("estoque")


router.get("/", (req, res) => {
    Estoque.find().then((estoque) => {
        res.json(estoque)
    }).catch((err) => {
        res.json(err)
    })
})

router.post("/", (req, res) => {
    const novoEstoque = {
        produto: req.body.produto,
        quantidade: 0
    }

    new Estoque(novoEstoque).save().then((estoque) => {
        console.log("Estoque salvo com sucesso!")
        res.json(estoque,201)
    }).catch((err) => {
        res.status(500).json()
    })
})

router.put("/:id", (req, res) => {
    Estoque.findOne({ _id: req.params.id }).then((estoque) => {
        estoque.produto = req.body.produto

        estoque.save().then((est) => {
            res.json(est)
        }).catch((err) => {
            res.status(500).json()
        })
    }).catch((err) => {
        res.status(404).json()
    })
})

router.delete("/:id", (req, res) => {
    Estoque.findOne({ _id: req.params.id }).then((estoque) => {

        if(estoque){
            Estoque.deleteOne({ _id: req.params.id }).then(() => {
                res.status(204).json()
            }).catch((err) => {
                console.log(err)
                res.status(500).json()
            })
        } else{
            res.status(404).json()
        }

        }).catch((err) => {
            console.log(err)
            res.status(404).json()
        })
})

router.get("/:id", (req, res) => {
    Estoque.findOne({ _id: req.params.id }).then((estoque) => {
        if(estoque){
            res.json(estoque)
        } else{
            res.status(404).json()
        }
    }).catch((err) => {
        console.log(err)
        res.status(404).json()
    })
})

router.get("/buscar/:produto", (req, res) => {
    
    let prod = req.params.produto
    Estoque.find({ produto: { $regex: new RegExp(prod), $options: 'i' }}).then((estoque) => {
        if(estoque){
            res.json(estoque)
        } else{
            res.status(404).json()
            }
        }).catch((err) => {
            console.log(err)
            res.status(404).json()
        })
})

module.exports = router