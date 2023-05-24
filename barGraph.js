/* eslint-disable no-undef */

// Fonction pour effectuer la requête à la base de données
async function searchPassengers() {
    const sexe = document.getElementById('sexe').value;
    const age = document.getElementById('age').value;
    const classe = document.getElementById('classe').value;

    const response = await fetch('/results', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            sexe: sexe,
            age: age,
            classe: classe
        })
    });

    if (response.ok) {
        return await response.json();
    } else {
        throw new Error('Erreur lors de la récupération des passagers.');
    }
}

// Fonction pour créer le graphique en barre
function createBarChart(labels, data) {
    const ctx = document.getElementById('barChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [
                {
                    data: data,
                    backgroundColor: ['green', 'red'],
                }
            ]
        },
        options: {

        }
    });
}

// Écouteur d'événement pour le formulaire de recherche
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener('submit', async function (event) {
    event.preventDefault();

    try {
        const passengers = await searchPassengers();

        // Utilisez les données récupérées pour créer le graphique en barre
        if (passengers.length > 0) {
            const labels = ['Survivants', 'Non-survivants'];
            const survivorsCount = passengers.filter(passenger => passenger.Survived === 1).length;
            const nonSurvivorsCount = passengers.filter(passenger => passenger.Survived === 0).length;
            const data = [survivorsCount, nonSurvivorsCount];

            createBarChart(labels, data);
        } else {
            // Aucun passager correspondant aux critères de recherche
            // Afficher un message approprié ou effectuer une autre action
        }
    } catch (error) {
        console.error(error);
    }
});
