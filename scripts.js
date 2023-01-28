const image_poke = document.querySelector('.pokemon_img')
const number_poke = document.querySelector('.pokemon_number')
const name_poke = document.querySelector('.pokemon_name')

const form_input = document.querySelector('.form')
const input_search = document.querySelector('.input_search')
const button_previus = document.querySelector('.btn-prev')
const button_next = document.querySelector('.btn-next')
let current_poke = 1

const fetch_pokemon = async (pokemon) => {
    const api_response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)

    if (api_response.status === 200) {

        const data = await api_response.json()
        return data

    }


}

const render_pokemon = async (pokemon) => {
    name_poke.innerHTML = 'Loading...'
    const data = await fetch_pokemon(pokemon)

    if (data) {
        image_poke.style.display = 'block'
        image_poke.src = data['sprites']['versions']['generation-v']['black-white']['animated']['front_default']
        number_poke.innerHTML = data.id
        name_poke.innerHTML = data.name

    } else {
        image_poke.style.display = 'none'
        name_poke.innerHTML = 'Not Found'
        number_poke.innerHTML = ''
    }

    current_poke = data.id
}


const search_poke = (event) => {

    event.preventDefault(event)

    render_pokemon(input_search.value.toLowerCase())
    input_search.value = ''

}

const previus_pokemon = () => {
    if (current_poke > 1) {
        current_poke--
    }
    render_pokemon(current_poke)
}

const next_pokemon = () => {
    if (current_poke < 649) {
        current_poke++
    }


    render_pokemon(current_poke)
}


button_previus.addEventListener('click', previus_pokemon)
button_next.addEventListener('click', next_pokemon)
form_input.addEventListener('submit', search_poke)

render_pokemon(current_poke)
