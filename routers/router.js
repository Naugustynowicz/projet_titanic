import { Router } from "express"
import Users from "../models/Users.js"
import Passenger from "../models/Passenger.js"

const appRouter = new Router()

// Route vers la page de connexion
appRouter.get("/login", (req, res) => {
  res.render("login")
})

appRouter.post("/login", async (req, res) => {
  const pseudo = req.body.username
  const motDePasse = req.body.password
  if (pseudo && pseudo.trim() != "") {
    try {
      console.log("ma recherche :", pseudo)

      await Users.find({
        pseudo: pseudo,
        //motDePasse: motDePasse,
      }).then((user) => {
        if (user[0].motDePasse === motDePasse) {
          res.cookie("user", pseudo).render("login", { pseudo })
        } else {
          const erreur = {
            statut: "200",
            message: "Le mot de passe ne correspond pas.",
          }
          res.render("erreurs", { erreur })
        }
      })
    } catch (error) {
      const erreur = {
        statut: "200",
        message: "Cet utilisateur n'existe pas.",
      }
      res.render("erreurs", { erreur })
    }
  } else {
    const erreur = {
      statut: "200",
      message: "Merci de spécifier un nom d'utilisateur",
    }
    res.render("erreurs", { erreur })
  }
  //res.render("login")
})

// Route vers la page de recherche
appRouter.get("/search", (req, res) => {
  res.render("search")
})

appRouter.post("/results", async (req, res) => {
  const { sexe, age, classe } = req.body

  try {
    console.log("ma recherche :", sexe, age, classe)
    // J'effectue une recherche dans ma BDD titanic en utilisant le modèle Passenger
    const passengers = await Passenger.find({
      Sex: sexe,
      Age: age,
      Pclass: classe,
    })

    // Je redirige vers la page des résultats
    res.render("results", { passengers })
  } catch (error) {
    console.error("Erreur lors de la recherche des passagers :", error)
    // Gérez les erreurs appropriées
  }
})

export default appRouter
