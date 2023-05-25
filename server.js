import authors from "./routers/router.js"
import users from "./routers/users.js"
import appRouter from "./routers/router.js"
import dotenv from "dotenv"
import express from "express"
import cookieParser from "cookie-parser"
import mongoose from "mongoose"
dotenv.config()

const { APP_HOST, APP_PORT, MONGO_URI, NODE_ENV } = process.env
//const cookieParser = require("cookie-parser")

const app = express()
app.use(cookieParser())

// Déclarer le moteur de rendu à Express
app.set("view engine", "pug")

// Minifier automatiquement les templates PUG en production, mais pas en dev
app.locals.pretty = NODE_ENV !== "production" ? true : false

// Déclaration des routeurs et middlewares
app.use(express.urlencoded({ extended: false })) // Fourni l'objet "req.body" lors de la validation de formulaire
app.use("/author", authors)
app.use("/users", users)

// Utiliser le routeur
app.use(appRouter)

try {
  await mongoose.connect(MONGO_URI)
  console.log("Connexion MongoDB établie!")

  app.listen(APP_PORT, () =>
    console.log(`L'application écoute sur http://${APP_HOST}:${APP_PORT}`)
  )
} catch (err) {
  console.log("Impossible de démarrer l'application Node", err.message)
}

const usersSchema = new mongoose.Schema({
  pseudo: String,
  motDePasse: String,
  nom: String,
  prenom: String,
  email: String,
  phoneNumber: String,
  age: String,
  birthDate: String,
  nationnalite: String,
})

//const User = mongoose.model("User", usersSchema)
mongoose.model("User", usersSchema)

// const silence = new Kitten({ name: "Silence" })
// const fluffy = new Kitten({ name: "fluffy" })
// await fluffy.save()
// const kittens = await Kitten.find({ name: /^fluff/ })
// console.log(kittens)
// console.log(silence.name) // 'Silence'
