// DATA
const hens = [
    {
        id: 1,
        name: "Ispluttis",
        image: "images/ispluttis.png",
        birthdate: "2023-07-01",
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "grön",
    },
    {
        id: 2,
        name: "HannaLottaElise",
        image: "images/hannalottaelise.png",
        birthdate: "2023-07-01",
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "gul",
    },
    {
        id: 3,
        name: "Red",
        image: "images/red.png",
        birthdate: "2023-07-01",
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: "röd",
    },
    {
        id: 4,
        name: "Zimzalabim",
        image: "images/zimzalabim.png",
        birthdate: "2023-07-01",
        gender: "hona",
        breed: "Skånsk blommehöna",
        ringcolor: null,
    },
    {
        id: 5,
        name: "Sky",
        image: "images/sky.png",
        birthdate: "2023-07-01",
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
    <p>${hen.name} är en ${hen.gender} av rasen ${hen.breed} och föddes ${hen.birthdate}. Denna höna har ${hen.ringcolor ? `en ${hen.ringcolor}` : "ingen"} ring.</p>
</div>`;
    return henCard;
}

function displayHens() {
    const hensContainer = document.querySelector("#hens-container");
    hensContainer.innerHTML = "";

    hens.forEach(hen => {
        hensContainer.appendChild(createHenCard(hen));
    });
}


// HÖNSKORT
displayHens();


// MOBILMENY
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    let menu = document.querySelector(".nav");
    menu.classList.toggle("active");
});

// FORMULÄR
const addHenForm = document.querySelector("#add-hen-form");

addHenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addHenForm);
    const object = Object.fromEntries(formData);
    
    let imageUrl = "images/missing-image.png";
    if (object.image.size > 0) {
        imageUrl = URL.createObjectURL(object.image);
    } 

    const hen = {
        id: hens.length + 1,
        name: object.name,
        image: imageUrl,
        birthdate: object.birthdate,
        gender: object.gender,
        breed: object.breed,
        ringcolor: object.ringcolor || null,
    };

    console.log(hen);

    hens.push(hen);
    displayHens();
    addHenForm.reset();
});


