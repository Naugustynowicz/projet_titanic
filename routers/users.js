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
    const erreur = {
      statut: "400",
      message: "Le nom et le mot de passe ne peuvent être vide",
    }
    res.render("erreurs", { erreur })
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
    const erreur = {
      statut: "201",
      message: "L'utilisateur a été créé correctement.",
    }
    res.render("erreurs", { erreur })
  } catch (err) {
    console.log(err)
    const erreur = {
      statut: "500",
      message: "Impossible d'insérer le document.",
    }
    res.render("erreurs", { erreur })
  }
})

export default appRouter
