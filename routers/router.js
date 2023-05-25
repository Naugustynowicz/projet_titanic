import { Router } from "express"
import Passenger from "../models/Passenger.js";
import { createBarChart } from '../barGraph.js';


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
        console.log("ma recherche :", sexe, age, classe);
        // J'effectue une recherche dans ma BDD titanic en utilisant le modèle Passenger
        const passengersPromise = Passenger.find({
            Sex: sexe,
            Age: age,
            Pclass: classe,
        }).exec(); // .exec() permet de retourner une promesse

        // Attendre la résolution de la promesse
        const passengers = await passengersPromise;

        // J'utilise les données récupérées pour créer le graphique en barre
        if (passengers.length > 0) {
            const labels = ['Survivants', 'Non-survivants'];
            const survivorsCount = passengers.filter(passenger => passenger.Survived === 1).length;
            const nonSurvivorsCount = passengers.filter(passenger => passenger.Survived === 0).length;
            const chartData = [survivorsCount, nonSurvivorsCount];

            // Appel de la fonction createBarChart avec les labels et les données du graphique
            createBarChart(labels, chartData);
        }

        // Je redirige vers la page des résultats
        res.render("results", { passengers });
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