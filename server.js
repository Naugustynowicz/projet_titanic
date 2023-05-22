import authors from "./routers/authors.js"
import dotenv from "dotenv"
import express from "express"
import mongoose from "mongoose"
dotenv.config()

const { APP_HOST, APP_PORT, MONGO_URI, NODE_ENV } = process.env

const app = express()

// Déclarer le moteur de rendu à Express
app.set("view engine", "pug")

// Minifier automatiquement les templates PUG en production, mais pas en dev
app.locals.pretty = NODE_ENV !== "production" ? true : false

// Déclaration des routeurs et middlewares
app.use(express.urlencoded({ extended: false })) // Fourni l'objet "req.body" lors de la validation de formulaire
app.use("/author", authors)

try {
  await mongoose.connect(MONGO_URI)
  console.log("Connexion MonboDB établie!")

  app.listen(APP_PORT, () =>
    console.log(`L'application écoute sur http://${APP_HOST}:${APP_PORT}`)
  )
} catch (err) {
  console.log("Impossible de démarrer l'application Node", err.message)
}
