import {obtenerPokemon} from './pokeapi.js';
import {
    obtenerOpciones,
    mostrarOpciones,
    obtenerLista,
    mostrarLista,
    mostrarPokemon,
} from './ui.js';
import {
    offset,
    pokemonId,
    actualizarPokemonId,
} from './ux.js';


// ACTUALIZAR POKEMON MOSTRADO

export function actualizarPokemonMostrado($pokemon){
    obtenerPokemon($pokemon)
    .then(pokemon => mostrarPokemon(pokemon))
    .then(actualizarPokemonId($pokemon));
}

// INICIAR

function inicializar(){
    obtenerOpciones().then(pokemones => mostrarOpciones(pokemones));
    obtenerLista(offset).then(pokemones => mostrarLista(pokemones));
    actualizarPokemonMostrado(pokemonId);
}

inicializar();