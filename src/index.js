let offset = 0;
let pokemonId = 1;
const $botonAtras = document.querySelector("#atras");
const $botonSiguiente = document.querySelector("#siguiente");
const $botonSearch = document.querySelector("#search")
const $arrowBack = document.querySelector("#back");
const $arrowNext = document.querySelector("#next");

// CARGA OPTIONS

fetch("https://pokeapi.co/api/v2/pokemon?offset=0&limit=1050")
    .then(respuesta => respuesta.json())
    .then(respuestaJSON =>{

        const pokemonesOptions = document.querySelector("#pokemons-list");

        Object.keys(respuestaJSON.results).forEach(id =>{
            const $option = document.createElement("option");
            $option.value = respuestaJSON.results[id].name;
            $option.textContent = respuestaJSON.results[id.name];
            pokemonesOptions.appendChild($option);
        })

        /* console.log(respuestaJSON.results[0].name) */
    })
    .catch(error => console.error("FALLO",error));

// CARGA LISTA DE POKEMONES

function listaPokemones(){
    const listaPokemones = document.querySelectorAll("li");
    listaPokemones.forEach(li =>{
        li.remove();
    })
    fetch(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=20`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
        const listaDePokemones = document.querySelector("#list-page");

        Object.keys(respuestaJSON.results).forEach(id =>{
            const $li = document.createElement("li");
            const $a = document.createElement("a");
            $a.href = "#";
            $li.textContent = respuestaJSON.results[id].name;
            $li.onclick = function(){
                console.log(respuestaJSON.results[id].url);
                actualizarPokemonId(respuestaJSON.results[id].url);
                muestraPokemon(respuestaJSON.results[id].url);
            }
            listaDePokemones.appendChild($a);
            $a.appendChild($li);
        })
    })
    .catch(error => console.error("FALLO",error));
}

// CONFIGURA BOTON ATRAS Y SIGUIENTE OFFSET;

$botonAtras.onclick = function(){
    atras();
    listaPokemones();
}

function atras(){
    if (offset === 0){
        return offset = 0;
    } else{
        return offset -= 20;
    }
}

$botonSiguiente.onclick = function(){
    siguiente();
    listaPokemones();
}

function siguiente(){
    if (offset >= 1030){
        return offset = 1030;
    } else{
        return offset +=20;
    }
}

// CONFIGURA BOTON BACK Y NEXT DE LA POKEDEX

$arrowBack.onclick = function(){
    back();
    muestraPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
}

function back(){
    if (pokemonId === 1){
        console.log(pokemonId);
        return pokemonId = 1;
    } else {
        return pokemonId -= 1;
    }
}

$arrowNext.onclick = function(){
    next()
    muestraPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);
}

function next(){
    if (pokemonId === 1050){
        return pokemonId = 1050;
    } else{
        return pokemonId += 1;
    }
}

// CONFIGURAR BOTON SEARCH

$botonSearch.onclick = function(){
    const $pokemon = document.querySelector("#list").value;
    muestraPokemon(`https://pokeapi.co/api/v2/pokemon/${$pokemon}/`);
}

// MUESTRA POKEMON

function muestraPokemon(urlPokemon){
    const tipoDePokemon = document.querySelectorAll("span");
    tipoDePokemon.forEach(span =>{
        span.remove();
    })
    fetch(`${urlPokemon}`)
        .then(respuesta => respuesta.json())
        .then(respuestaJSON =>{

            const $datos = document.querySelector("#datos"); 
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
            

            
            $nombre.innerHTML = `<strong>Nombre:</strong> ${respuestaJSON.name}`;
            $altura.innerHTML = `<strong>Altura:</strong> ${respuestaJSON.height}`;
            $imagen.src = respuestaJSON.sprites.front_default;
            $peso.innerHTML = `<strong>Peso:</strong> ${respuestaJSON.weight}`;
            $hp.innerHTML = `<strong>HP:</strong> ${respuestaJSON.stats[0].base_stat}`;
            $ataque.innerHTML = `<strong>Ataque:</strong> ${respuestaJSON.stats[1].base_stat}`;
            $defensa.innerHTML = `<strong>Defensa:</strong> ${respuestaJSON.stats[2].base_stat}`;
            $ataqueEspecial.innerHTML = `<strong>Ataque especial:</strong> ${respuestaJSON.stats[3].base_stat}`;
            $defensaEspecial.innerHTML = `<strong>Defensa especial:</strong> ${respuestaJSON.stats[4].base_stat}`;
            $velocidad.innerHTML = `<strong>Velocidad: </strong>${respuestaJSON.stats[5].base_stat}`;
            Object.keys(respuestaJSON.types).forEach(i =>{
                const $span = document.createElement("span");
                const $br = document.createElement("br");
                console.log(respuestaJSON.types)
                $tipo.appendChild($span);
                $span.textContent = `${respuestaJSON.types[i].type.name}`
            })
        })
    .catch(error => console.error("FALLO",error));
}

// ACTUALIZA POKEMON ID

function actualizarPokemonId(urlPokemon){
    fetch(`${urlPokemon}`)
    .then(respuesta => respuesta.json())
    .then(respuestaJSON => {
        pokemonId = respuestaJSON.id;
        console.log(pokemonId);
    })
    .catch(error => console.error("FALLO",error));
}

listaPokemones();
muestraPokemon(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`);