import { Router } from "express"
import Passenger from "../models/Passenger.js"

const appRouter = new Router()

// Route vers la page de connexion
appRouter.get("/login", (req, res) => {
  res.render("login")
})

// Route vers la page de recherche
appRouter.get("/search", (req, res) => {
  res.render("search")
})

appRouter.post("/results", async (req, res) => {
  const { sexe, age, classe } = req.body

  try {
    // Récupérer les données de la base de données en fonction des critères de recherche
    const passengers = await Passenger.find({
      $or: [{ Sex: sexe }, { Age: age }, { Pclass: classe }],
    }).then((passengers) => {
      console.log(passengers)
      // Vérifier si des passagers ont été trouvés
      if (passengers.length > 0) {
        //Création tableau survivant et non-survivant
        const survivors = passengers.filter(
          (passenger) => passenger.Survived === true
        )
        const nonSurvivors = passengers.filter(
          (passenger) => passenger.Survived === false
        )

        // Calculer le nombre de survivants et de non-survivants
        const survivorsCount = passengers.filter(
          (passenger) => passenger.Survived === true
        ).length
        const nonSurvivorsCount = passengers.filter(
          (passenger) => passenger.Survived === false
        ).length

        //Calcul moyenne
        var avgSurvivors = 0
        for (var i = 0; i < survivorsCount; i++) {
          avgSurvivors += survivors[i].Age
        }
        avgSurvivors /= survivorsCount

        var avgNonSurvivors = 0
        for (var i = 0; i < nonSurvivorsCount; i++) {
          avgNonSurvivors += nonSurvivors[i].Age
        }
        avgNonSurvivors /= nonSurvivorsCount

        //Calcul ecartType = sqrt(avg((x - avg(x)) ^ 2))
        var StrdDevSurvivors = 0
        for (var i = 0; i < survivorsCount; i++) {
          StrdDevSurvivors += (survivors[i].Age - avgSurvivors) ** 2
        }
        StrdDevSurvivors = Math.sqrt(StrdDevSurvivors / survivorsCount)

        var StrdDevNonSurvivors = 0
        for (var i = 0; i < nonSurvivorsCount; i++) {
          StrdDevNonSurvivors += nonSurvivors[i].Age
        }
        StrdDevNonSurvivors = Math.sqrt(StrdDevNonSurvivors / nonSurvivorsCount)

        // Créer les données pour le graphique
        const chartData = [survivorsCount, nonSurvivorsCount]
        const chartDataAvg = [avgSurvivors, avgNonSurvivors]
        const chartDataStrdDev = [StrdDevSurvivors, StrdDevNonSurvivors]
        console.log("survivors : " + survivorsCount + " / " + nonSurvivorsCount)

        // Render la page des résultats en passant les données au template Pug
        res.render("results", {
          passengers,
          chartData,
          chartDataAvg,
          chartDataStrdDev,
        })
      } else {
        // Aucun passager ne correspond à la recherche
        res.render("results", { passengers: [], chartData: [] })
      }
    })
  } catch (error) {
    console.error("Erreur lors de la recherche des passagers :", error)
    // Gérez les erreurs appropriées
  }
})

// appRouter.post("/results", async (req, res) => {
//     const { sexe, age, classe } = req.body;

//     try {
//         console.log("ma recherche :", sexe, age, classe);
//         // J'effectue une recherche dans ma BDD titanic en utilisant le modèle Passenger
//         const passengers = await Passenger.find({
//             Sex: sexe,
//             Age: age,
//             Pclass: classe,
//         });

//         // Je redirige vers la page des résultats
//         res.render("results", { passengers });
//     } catch (error) {
//         console.error("Erreur lors de la recherche des passagers :", error);
//         // Gérez les erreurs appropriées
//     }
// });

export default appRouter
