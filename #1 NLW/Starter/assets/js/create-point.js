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
                citieSelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
            }

            citieSelect.disabled = false;
        });
}

document.querySelector("select[name=uf]").addEventListener("change", getCities);

/**
 * Itens de coleta
 */
const collectedItems = document.querySelector("[name=items]");

let selectedItems = [];

function handleSelectedItem(e) {
    const itemLi = e.target;

    /**
     * Adicionando ou removendo a classe.
     */
    itemLi.classList.toggle("selected");

    const itemId = itemLi.dataset.id;

    /**
     * Adicionando ou removendo a seleção dos itens da li.
     */
    const alreadySelected = selectedItems.findIndex((item) => {
        const itemFound = item === itemId;
        return itemFound;
    });

    // Se selecionado
    if (alreadySelected >= 0) {
        // Tirar da seleção
        const filteredItems = selectedItems.filter((item) => {
            const itemIsDifferent = item != itemId;
            return itemIsDifferent;
        });

        selectedItems = filteredItems;
    } else {
        // Se não selecionado, adicionando
        selectedItems.push(itemId);
    }

    // console.log(selectedItems);
    collectedItems.value = selectedItems;
}

const itemsToCollect = document.querySelectorAll(".items-grid li");

for (const item of itemsToCollect) {
    item.addEventListener("click", handleSelectedItem);
}
