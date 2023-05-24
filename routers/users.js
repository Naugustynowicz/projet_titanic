import mongoose from "mongoose"
import Users from "../models/Users.js"
import { Router } from "express"

const appRouter = new Router()

appRouter.get("/", (req, res) => {
  res.render("home")
})

appRouter.get("/inscription", (req, res) => {
  res.render("inscription")
})

appRouter.post("/inscription", async (req, res) => {
  console.log("test")
  console.log(req.body.pseudo)

  const pseudo = req.body.pseudo
  const motDePasse = req.body.motDePasse
  const nom = req.body.nom
  const prenom = req.body.prenom
  const email = req.body.email
  //const phoneNumber = req.body
  const age = req.body.age
  const birthDate = req.body.birthdate
  const nationnalite = req.body.nationnalite

  if (!pseudo || !motDePasse) {
    return res
      .status(400)
      .send("Le nom et le mot de passe ne peuvent être vide")
  }

  try {
    await Users.create({
      pseudo: pseudo,
      motDePasse: motDePasse,
      nom: nom,
      prenom: prenom,
      email: email,
      phoneNumber: null,
      age: age,
      birthDate: birthDate,
      nationnalite: nationnalite,
    })
    res.status(201).send("Document inséré")
  } catch (err) {
    console.log(err)
    res.status(500).send("Impossible d'insérer le document")
  }

  // const silence = new kittens({ name: "Silence" })
  // const fluffy = new kittens({ name: "fluffy" })
  // await fluffy.save()
  // const kittens = await kittens.find({ name: /^fluff/ })
  // console.log(kittens)
  // console.log(silence.name) // 'Silence'

  //res.render("inscription")
})

export default appRouter
