import { updateStoredData, getData } from "./data.js";
let galleryDiv;
function main() {
    galleryDiv = document.body.querySelector("#gallery");
    displayGallery();
}
function displayGallery() {
    const order = getData("order");
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
        let i = 0;
        for (const t of data.types) {
            i++;
            const data = getData("types")[t];
            slide.style.setProperty(`--type${i}-background`, data.background);
            slide.style.setProperty(`--type${i}-foreground`, data.foreground);
            slide.style.setProperty(`--type${i}-shadow`, data.foreground + "4d");
        }
        const pictureWrapper = document.createElement("div");
        pictureWrapper.classList.add("picture-wrapper");
        const picture = document.createElement("img");
        picture.classList.add("picture");
        picture.loading = "lazy";
        picture.src = data.picture;
        const entries = document.createElement("div");
        entries.classList.add("entries");
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
        pictureWrapper.append(picture);
        slide.append(nameWrapper, pictureWrapper, abilities, entries);
        galleryDiv.append(slide);
        let globalWidth = null;
        const abilitiesChildren = Array.from(abilities.children);
        for (const el of abilitiesChildren) {
            if (globalWidth === null || globalWidth > el.clientWidth)
                globalWidth = el.clientWidth;
        }
        for (const el of abilitiesChildren) {
            el.style.width = globalWidth + "px";
        }
    }
    galleryDiv.scrollTop = galleryDiv.scrollHeight;
}
async function startMessage() {
    const commitUrl = `https://api.github.com/repos/abnormalnormality/aloozgallery/commits/main`;
    try {
        const response = await fetch(commitUrl);
        const data = await response.json();
        const message = data.commit.message;
        const date = new Date(data.commit.author.date);
        console.log(`${date.toLocaleString()}:`, message);
    }
    catch (error) {
        console.error("Could not fetch latest commit message:", error);
    }
}
await updateStoredData();
if (document.readyState === "complete")
    main();
else
    document.addEventListener("DOMContentLoaded", () => main());
startMessage();
