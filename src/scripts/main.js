import { updateStoredData, getData } from "./data.js";
let galleryDiv;
function main() {
    galleryDiv = document.body.querySelector("#gallery");
    displayGallery();
}
function displayGallery() {
    const order = getData("order");
    const slides = [];
    for (const p of order) {
        const data = getData("pokemon")[p];
        const slide = document.createElement("div");
        slide.classList.add("slide");
        const nameWrapper = document.createElement("div");
        nameWrapper.classList.add("name-wrapper");
        const name = document.createElement("div");
        name.classList.add("name");
        name.textContent = data.name;
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = data.title;
        const typeWrapper = document.createElement("div");
        typeWrapper.classList.add("type-wrapper");
        const typeWrapperInner = document.createElement("div");
        typeWrapperInner.classList.add("type-wrapper-inner");
        let i = 0;
        for (const t of data.types) {
            i++;
            const data = getData("types")[t];
            const type = document.createElement("div");
            type.textContent = data.short;
            typeWrapperInner.style.setProperty(`--type${i}-background`, data.background);
            typeWrapperInner.style.setProperty(`--type${i}-foreground`, data.foreground);
            typeWrapperInner.append(type);
        }
        const pictureWrapper = document.createElement("div");
        pictureWrapper.classList.add("picture-wrapper");
        const picture = document.createElement("img");
        picture.classList.add("picture");
        picture.loading = "lazy";
        picture.src = data.picture;
        const entries = document.createElement("div");
        entries.classList.add("entries");
        i = 0;
        for (const t of data.types) {
            i++;
            const data = getData("types")[t];
            entries.style.setProperty(`--type${i}-background`, data.background);
            entries.style.setProperty(`--type${i}-foreground`, data.foreground);
        }
        for (const e of data.entries) {
            const entry = document.createElement("div");
            entry.textContent = e;
            entries.append(entry);
        }
        const abilities = document.createElement("div");
        abilities.classList.add("abilities");
        for (const a of data.abilities) {
            const data = getData("abilities")[a];
            const ability = document.createElement("div");
            ability.textContent = data.name;
            abilities.append(ability);
        }
        nameWrapper.append(name, title);
        typeWrapper.append(typeWrapperInner);
        pictureWrapper.append(picture);
        slide.append(nameWrapper, typeWrapper, pictureWrapper, abilities, entries);
        slides.push(slide);
    }
    galleryDiv.append(...slides);
    galleryDiv.scrollTop = galleryDiv.scrollHeight;
}
await updateStoredData();
if (document.readyState === "complete")
    main();
else
    document.addEventListener("DOMContentLoaded", () => main());
