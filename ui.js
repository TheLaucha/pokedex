import {obtenerPokemones} from './cambios.js';
import {
    actualizarPokemonId,
} from './ux.js';
import {
    actualizarPokemonMostrado,
} from './index.js';

// CARGAR OPTIONS

export function obtenerOpciones(){
    const $TODOS_LOS_POKEMONES = "?offset=0&limit=1050";
    return obtenerPokemones($TODOS_LOS_POKEMONES)
    .then(pokemones => pokemones.results);
}

export async function mostrarOpciones(pokemones){
    const $pokemonDatalist = document.querySelector("#pokemons-datalist");
    Object.keys(pokemones).forEach(id =>{
        const $optionPokemon = document.createElement("option");
        $optionPokemon.value = pokemones[id].name;
        $optionPokemon.textContent = pokemones[id].name;
        $pokemonDatalist.appendChild($optionPokemon);
    })
}

export function obtenerPokemonIngresado(){
    const $pokemon = document.querySelector("#buscador").value;
    return $pokemon;
}

// CARGAR LISTA

export function obtenerLista(offset = 0){
    const $URL_LISTA = `?offset=${offset}&limit=20`;
    return obtenerPokemones($URL_LISTA)
    .then(pokemones => pokemones.results)
}

export function mostrarLista(pokemones){
    removerPokemones();
    const $listaDePaginas = document.querySelector("#list-page");
    Object.keys(pokemones).forEach(id =>{
        const $itemPokemon = document.createElement("li");
        const $itemPokemonA = document.createElement("a");
        $itemPokemonA.href = "#";
        $itemPokemonA.classList.add("item");
        $itemPokemon.textContent = pokemones[id].name;
        $itemPokemon.dataset.base = pokemones[id].name;

        $listaDePaginas.appendChild($itemPokemonA);
        $itemPokemonA.appendChild($itemPokemon);

        $itemPokemon.addEventListener("click", () =>{
            actualizarPokemonId($itemPokemon.dataset.base);
            actualizarPokemonMostrado($itemPokemon.dataset.base);
        })
    })
}

export function removerPokemones(){
    document.querySelector("#list-page").innerHTML = ""
    const $listaDePokemones = document.querySelectorAll(".item");
    $listaDePokemones.forEach(item=>{
        item.remove()
    })
}

export function mostrarActualizacionDeLista(offset){
    mostrarCartelActualizacion();
    obtenerLista(offset)
    .then(pokemones => mostrarLista(pokemones))
}

export function mostrarCartelActualizacion(){
    document.querySelector("#list-page").innerHTML = "Cargando..."
}

// MOSTRAR POKEMON

export function mostrarPokemon(pokemon){

    const tipoDePokemon = document.querySelectorAll("span");
    tipoDePokemon.forEach(span =>{
        span.remove();
    })

    const $nombre = document.querySelector("#nombre");
    const $altura = document.querySelector("#altura");
    const $imagen = document.querySelector("#imagen");
    const $peso = document.querySelector("#peso");
    const $hp = document.querySelector("#hp");
    const $ataque = document.querySelector("#ataque");
    const $defensa = document.querySelector("#defensa");
    const $ataqueEspecial = document.querySelector("#ataque-especial");
    const $defensaEspecial = document.querySelector("#defensa-especial");
    const $velocidad = document.querySelector("#velocidad");
    const $tipo = document.querySelector("#tipo");

    $nombre.innerHTML = `<strong>Nombre:</strong> ${pokemon.name}`;
    $altura.innerHTML = `<strong>Altura:</strong> ${pokemon.height}`;
    $imagen.src = pokemon.sprites.front_default;
    $peso.innerHTML = `<strong>Peso:</strong> ${pokemon.weight}`;
    $hp.innerHTML = `<strong>HP:</strong> ${pokemon.stats[0].base_stat}`;
    $ataque.innerHTML = `<strong>Ataque:</strong> ${pokemon.stats[1].base_stat}`;
    $defensa.innerHTML = `<strong>Defensa:</strong> ${pokemon.stats[2].base_stat}`;
    $ataqueEspecial.innerHTML = `<strong>Ataque especial:</strong> ${pokemon.stats[3].base_stat}`;
    $defensaEspecial.innerHTML = `<strong>Defensa especial:</strong> ${pokemon.stats[4].base_stat}`;
    $velocidad.innerHTML = `<strong>Velocidad: </strong>${pokemon.stats[5].base_stat}`;

    Object.keys(pokemon.types).forEach(i =>{
        const $spanTipo = document.createElement("span");
        $spanTipo.classList.add("tipo");
        $tipo.appendChild($spanTipo);
        $spanTipo.textContent = `${pokemon.types[i].type.name}`
    })
}

