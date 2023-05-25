/* eslint-disable no-undef */

// Fonction pour créer le graphique en barre
export function createBarChart(labels, data) {
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
        const sexe = document.getElementById('sexe').value;
        const age = document.getElementById('age').value;
        const classe = document.getElementById('classe').value;

        console.log('Valeurs du formulaire :', sexe, age, classe);

        // J'envoie la requête POST directement au routeur côté serveur
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
            const data = await response.json();
            console.log('Données récupérées :', data);

            // J'utilise les données récupérées pour créer le graphique en barre
            if (data.length > 0) {
                const labels = ['Survivants', 'Non-survivants'];
                const survivorsCount = data.filter(passenger => passenger.Survived === 1).length;
                const nonSurvivorsCount = data.filter(passenger => passenger.Survived === 0).length;
                const chartData = [survivorsCount, nonSurvivorsCount];

                createBarChart(labels, chartData);
            } else {
                // Aucun passager correspondant aux critères de recherche
                // Afficher un message approprié ou effectuer une autre action
            }
        } else {
            throw new Error('Erreur lors de la récupération des passagers.');
        }
    } catch (error) {
        console.error(error);
    }
});
