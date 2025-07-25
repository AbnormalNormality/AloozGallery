import { updateStoredData, getData } from "./data.js";
let galleryDiv;
function main() {
    galleryDiv = document.body.querySelector("#gallery");
    displayGallery();
}
function displayGallery() {
    const pokemon = getData("pokemon");
    const sortedPokemon = Object.values(pokemon).sort((a, b) => a.n - b.n);
    const slides = [];
    for (const p of sortedPokemon) {
        const slide = document.createElement("div");
        slide.classList.add("slide");
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = p.name;
        const typeWrapper = document.createElement("div");
        typeWrapper.classList.add("type-wrapper");
        const typeWrapperInner = document.createElement("div");
        typeWrapperInner.classList.add("type-wrapper-inner");
        let i = 0;
        for (const t of p.types) {
            i++;
            const data = getData("types")[t];
            const type = document.createElement("div");
            type.textContent = data.short;
            typeWrapperInner.style.setProperty(`--type${i}-background`, data.background);
            typeWrapperInner.style.setProperty(`--type${i}-foreground`, data.foreground);
            typeWrapperInner.append(type);
        }
        const picture = document.createElement("img");
        picture.classList.add("picture");
        picture.loading = "lazy";
        picture.src = p.picture;
        typeWrapper.append(typeWrapperInner);
        slide.append(name, typeWrapper, picture);
        slides.push(slide);
    }
    galleryDiv.append(...slides);
}
await updateStoredData();
if (document.readyState === "complete")
    main();
else
    document.addEventListener("DOMContentLoaded", () => main());
