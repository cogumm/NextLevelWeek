/**
 * Populando os UF.
 */
function populaeUFs() {
    const ufSelect = document.querySelector("select[name=uf]");

    fetch(
        "https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome"
    )
        .then((res) => res.json())
        .then((states) => {
            for (const state of states) {
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
            }
        });
}

populaeUFs();

/**
 * Função para "pegar" as cidades.
 */
function getCities(e) {
    const citieSelect = document.querySelector("[name=city]");
    const stateInput = document.querySelector("[name=state]");

    const ufValue = e.target.value;

    /**
     * Preenchendo de maneira dinâmica qual é a index da UF.
     */
    const idexOfSelectatedState = e.target.selectedIndex;
    stateInput.value = e.target.options[idexOfSelectatedState].text;

    const urlCitie = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

    /* Limpando as cidades */
    citieSelect.innerHTML = "<option value=''>Selecione a cidade</option>";
    citieSelect.disabled = true;

    fetch(urlCitie)
        .then((res) => res.json())
        .then((cities) => {
            for (const city of cities) {
                citieSelect.innerHTML += `<option value="${city.id}">${city.nome}</option>`;
            }

            citieSelect.disabled = false;
        });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);
