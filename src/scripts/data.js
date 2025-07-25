async function loadJson(path) {
    const response = await fetch(path);
    return (await response.json());
}
export async function updateStoredData() {
    const pokemon = await loadJson("src/data/pokemon.json");
    localStorage.setItem("pokemon", JSON.stringify(pokemon));
    const types = await loadJson("src/data/types.json");
    localStorage.setItem("types", JSON.stringify(types));
    const abilities = await loadJson("src/data/abilities.json");
    localStorage.setItem("abilities", JSON.stringify(abilities));
}
export function getData(key) {
    return JSON.parse(localStorage.getItem(key));
}
