import { Router } from "express"
import Passenger from "../models/Passenger.js";


const appRouter = new Router()

// Route vers la page de connexion
appRouter.get("/login", (req, res) => {
    res.render("login");
});

// Route vers la page de recherche
appRouter.get('/search', (req, res) => {
    res.render('search');
});

appRouter.post("/results", async (req, res) => {
    const { sexe, age, classe } = req.body;

    try {
        // Récupérer les données de la base de données en fonction des critères de recherche
        const passengers = await Passenger.find({
            Sex: sexe,
            Age: age,
            Pclass: classe,
        });

        // Calculer le nombre de survivants et de non-survivants
        const survivorsCount = passengers.filter(passenger => passenger.Survived === 1).length;
        const nonSurvivorsCount = passengers.filter(passenger => passenger.Survived === 0).length;

        // Créer les données pour le graphique
        const chartData = [survivorsCount, nonSurvivorsCount];

        // Render la page des résultats en passant les données au template Pug
        res.render("results", { chartData });
    } catch (error) {
        console.error("Erreur lors de la recherche des passagers :", error);
        // Gérez les erreurs appropriées
    }
});





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


export default appRouter;