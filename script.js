// DATA
const hens = [
    {
        id: 1,
        name: "Ispluttis",
        image: "images/ispluttis.png",
        birthmonth: 7,
        birthyear: 2023,
        gender: "hona",
        breed: "Skånsk blommehöna",
        hasring: true,
        ringcolor: "grön",
    },
    {
        id: 2,
        name: "HannaLottaElise",
        image: "images/hannalottaelise.png",
        birthmonth: 7,
        birthyear: 2023,
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "gul",
    },
    {
        id: 3,
        name: "Red",
        image: "images/red.png",
        birthmonth: 7,
        birthyear: 2023,
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "röd",
    },
    {
        id: 4,
        name: "Zimzalabim",
        image: "images/zimzalabim.png",
        birthmonth: 7,
        birthyear: 2023,
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: null,
    },
    {
        id: 5,
        name: "Sky",
        image: "images/sky.png",
        birthmonth: 7,
        birthyear: 2023,
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "blå",
    }
]

// FUNKTIONER
function createHenCard(hen) {
    const henCard = document.createElement("div");
    henCard.classList.add("hen-card");
    henCard.innerHTML = `
    <img src="${hen.image}" alt="${hen.name}">
    <div class="hen-info">
        <h3>${hen.name}</h3>
        <p>Födelseår: ${hen.birthyear}</p>
        <p>Födselmånad: ${hen.birthmonth}</p>
        <p>Kön: ${hen.gender}</p>
        <p>Ras: ${hen.breed}</p>
        <p>Ring: ${hen.ringcolor ? hen.ringcolor : "Ingen" }</p>
    </div>`;
    return henCard;
}

function displayHens() {
    const hensContainer = document.querySelector("#hens-container");
    hens.forEach(hen => {
        hensContainer.appendChild(createHenCard(hen));
    });
}

// HÖNSKORT
displayHens();

// MOBILMENY
const mobileMenuIcon = document.querySelector(".mobile-menu-icon");

mobileMenuIcon.addEventListener("click", () => {
    let menuList = document.querySelector(".menu-list");
    menuList.classList.toggle("active");
});

// FORMULÄR LÄGG TILL HÖNA
