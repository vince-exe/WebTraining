const buttonSearch = document.querySelector("#button-search");
const searchBar = document.querySelector("#search-pokemon-field");

const urlAPI = "https://pokeapi.co/api/v2/pokemon/";
var datas = null;
var ciao;

function buildPokemon(datas) {
    document.querySelector("#poke-img").src = datas.sprites.other.dream_world.front_default;
    document.querySelector("#poke-name").textContent = getStringUpper(datas.name);
    document.querySelector("#poke-hp").textContent = `HP ${datas.stats[0].base_stat}`;
    document.querySelector("#poke-xp").textContent = `XP ${datas.base_experience}`;
    document.querySelector("#poke-weight").textContent = `${datas.weight}Kg`;
    document.querySelector("#poke-height").textContent = `${datas.height}m`;
    document.querySelector("#poke-type").textContent = datas.types[0].type.name;

    document.querySelector(".show_pokemon").style.display = "block";
    document.querySelector(".show-error-container").style.display = "none";
}

function checkBar() {
    return searchBar.value != "";
}

function getStringUpper(string) {
    let tmp = String(string);
    let tmp2 = tmp[0].toUpperCase();

    return tmp2.concat(tmp.substring(1, tmp.length));
}

function getStringLower(string) {
    let tmp = String(string);

    return tmp.toLowerCase();
}

window.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        if (checkBar()) {
            let name = getStringLower(searchBar.value);

            getPokemon(name).then(() => buildPokemon(datas), () => showError());
        }
    }
})

buttonSearch.addEventListener("click", () => {
    if (checkBar()) {
        let name = getStringLower(searchBar.value);

        getPokemon(name).then(() => buildPokemon(datas), () => showError());
    }
})

const getPokemon = (name) => {
    return new Promise((resolve, reject) => {
        fetch(urlAPI + name).then(response => {

            if (response.status == 404) {
                reject();
                return;
            }

            response.json().then((_datas) => {
                datas = _datas;
                resolve();
                return;
            },
                () => {
                    reject();
                    return;
                })
        });
    })
}

const showError = () => {
    document.querySelector(".show-error-container").style.display = "block";
    document.querySelector(".show_pokemon").style.display = "none";
}

getPokemon("charmander").then(() => buildPokemon(datas), () => showError());
