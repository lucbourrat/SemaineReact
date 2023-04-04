const form = document.querySelector('form');
const input = document.querySelector('input');
const resultat = document.querySelector('#resultat');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const pseudo = input.value;
    console.log(pseudo)
    // rechercheUtilisateur(pseudo);
    rechercheUtilisateurWithfetch(pseudo);
});

async function rechercheUtilisateur(pseudo) {
    console.log("rechercheUtilisateur with async/await");
    resultat.innerHTML = 'Recherche en cours...';
    const response = await fetch(`https://api.github.com/users/${pseudo}`);
    const data = await response.json();
    if (response.status === 404) {
        resultat.innerHTML = 'Utilisateur non trouvé';
    } else {
        resultat.innerHTML = `
      <h2>${data.name}</h2>
      <img src="${data.avatar_url}" alt="${data.name}">
      <ul>
        <li>Nombre de followers : ${data.followers}</li>
        <li>Nombre de repos : ${data.public_repos}</li>
        <li>Dernière mise à jour : ${data.updated_at}</li>
      </ul>
    `;
    }
}

function rechercheUtilisateurWithfetch(pseudo) {
    console.log("rechercheUtilisateur with fetch");
    resultat.innerHTML = 'Recherche en cours...';
    fetch(`https://api.github.com/users/${pseudo}`)
        .then(response => {
            if (response.status === 404) {
                throw new Error('Utilisateur non trouvé');
            }
            return response.json();
        })
        .then(data => {
            console.log(data);
            resultat.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${data.avatar_url}" alt="${data.name}">
        <ul>
          <li>Nombre de followers : ${data.followers}</li>
          <li>Nombre de repos : ${data.public_repos}</li>
          <li>Dernière mise à jour : ${data.updated_at}</li>
        </ul>
      `;
        })
        .catch(error => {
            resultat.innerHTML = error.message;
        });
}
