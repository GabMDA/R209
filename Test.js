
// ici on vérifie le code à chaque modification

document.addEventListener("DOMContentLoaded", () => {
    // definiton des contantes en lien avec les id's de l'HTML

    const inputBox = document.getElementById("inputBox1");
    const villeDropdown = document.querySelector("#ville");
    //Ici on met à l'ecoute le 1er input pour qu'il détecte un changement.

    const btn = document.getElementById('myButton');
    const resultDiv = document.getElementById('result');

    inputBox.addEventListener("input", async () => {
        if (/\b\d{5}\b/g.test(inputBox.value)) {
            villeDropdown.style.display = "block";
            await afficherVille();
        } else {
            villeDropdown.style.display = "none";
        }
    });

    async function afficherVille() {
        const response = await fetch(`https://geo.api.gouv.fr/communes?codePostal=${inputBox.value}`);
        const data = await response.json();
        console.log(data);

        villeDropdown.innerHTML = ""; // Clear previous options

        data.forEach(element => {
            const option = document.createElement("option");
            option.textContent = element.nom;
            option.value = element.code;
            villeDropdown.appendChild(option);
        });
    }

    btn.addEventListener('click', async () => {
        try {
            const selectedCode = villeDropdown.value;
            const response = await fetch(`https://api.meteo-concept.com/api/forecast/daily/?code=${selectedCode}&token=4ac3b7ed2ba7f1ac07ff2cba14c7e514d7820b102d33590aeb3976ddc9148485`); /* url de l'api avec le token */
            const data = await response.json();
            console.log(data); // Vérifiez les données dans la console pour un premier test
            // Formater les données de manière plus lisible avant de les afficher
            resultDiv.innerHTML = "<pre>" + JSON.stringify(data, null, 2) + "</pre>";
        } catch (error) {
            console.error('Erreur lors de la récupération des données météorologiques :', error);
            resultDiv.textContent = 'Erreur lors de la récupération des données météorologiques';
        }
    });
});
