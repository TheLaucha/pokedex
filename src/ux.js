import {obtenerPokemon} from './pokeapi.js';
import {
    actualizarPokemonMostrado,
} from './index.js';
import {
    mostrarActualizacionDeLista,
    obtenerPokemonIngresado,
} from './ui.js';

// BOTON BUSCAR

const $botonBuscar = document.querySelector("#search");

$botonBuscar.onclick = ()=>{
    const $pokemon = obtenerPokemonIngresado();
    actualizarPokemonMostrado($pokemon);
}

// LISTA

const $botonAtras = document.querySelector("#atras");
const $botonSiguiente = document.querySelector("#siguiente");
export let offset = 0;

$botonAtras.onclick = () =>{
    actualizarLista("atras");
}

$botonSiguiente.onclick = () =>{
    actualizarLista("siguiente")
}

export function actualizarLista($boton){
    if($boton === "atras"){
        if(offset === 0){
            offset = 0;
        } else{
            offset -= 20;
        }
    }
    if($boton === "siguiente"){
        if(offset >= 1030){
            offset = 1030;
        } else{
            offset += 20;
        }
    }
    mostrarActualizacionDeLista(offset);
}

// BOTON BACK Y NEXT

const $botonBack = document.querySelector("#back");
const $botonNext = document.querySelector("#next");
export let pokemonId = 1;
const ultimoPokemonId = 1050;
const primerPokemonId = 1;

$botonBack.onclick = () =>{
    cambiarPokemonId("back");
}

$botonNext.onclick = () =>{
    cambiarPokemonId("next");
}

export function cambiarPokemonId($boton){
    if ($boton === "back"){
        if (pokemonId === primerPokemonId){
            pokemonId = 1;
        } else {
            pokemonId -=1;
        }
    } 
    if($boton === "next"){
        if (pokemonId === ultimoPokemonId){
            pokemonId = ultimoPokemonId;
        } else{
            pokemonId += 1;
        }
    }
    actualizarPokemonMostrado(pokemonId);
}

// ACTUALIZAR POKEMON ID

export function actualizarPokemonId($item){
    obtenerPokemon(`/${$item}`)
    .then(pokemon =>{
        pokemonId = pokemon.id;
    })
}

