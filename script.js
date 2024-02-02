const searchInput = document.getElementById('search-input');
const resultArtist = document.getElementById('result-artist');
const resultPlaylist = document.getElementById('result-playlists');
const hamburgerButton = document.getElementById('hamburger-button');
let sidebarStatus = false;

//Funcao para consumir os dados da api//

function requestApi(searchTerm) {
    //declarando constante utilizando query params//
    const url = `http://localhost:3000/artists?name_like=${searchTerm}`;
    fetch(url)
        .then((response) => response.json())
        .then((result) => displayResults(result))
}

//funcao que ira manipular o dom//
function displayResults(result) {
    resultPlaylist.classList.add('hidden');
    const artistName = document.getElementById('artist-name');
    const artistImage = document.getElementById('artist-img');

    result.forEach(element => {
        artistName.innerText = element.name;
        artistImage.src = element.urlImg;
    });

    resultArtist.classList.remove('hidden');
}


//Funcao de busca que escuta o evento do input e mostra/esconde resultado na tela//
document.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === '') {
        resultPlaylist.classList.remove('hidden');
        resultArtist.classList.add('hidden');
        return;
    }
    requestApi(searchTerm);

})

//Funcao para menu hamburguer

hamburgerButton.addEventListener("click", function () {
    if (!sidebarStatus) {
        document.getElementById("sidebar").style.display = "block";
        sidebarStatus = true;
    } else {
        document.getElementById("sidebar").style.display = "none";
        sidebarStatus = false;
    }
});