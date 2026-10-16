// DATA
let hens = [
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
        name: "Skies",
        image: "images/sky.png",
        birthdate: "2023-07-01",
        gender: "hane",
        breed: "Skånsk blommehöna",
        ringcolor: "blå",
    }
]

let eggBookings = [];

// FUNKTIONER
function renderHens(hens) {
    const hensContainer = document.querySelector("#hens-container");

    if (hens.length === 0) {
        hensContainer.innerHTML = "<p>Inga höns att visa</p>";
        countHens();
        return;
    }

    hensContainer.innerHTML = "";
    hens.forEach(hen => {
        hensContainer.appendChild(createCard(hen));
    });
    countHens();
}

function createCard(hen) {
    const henCard = document.createElement("div");

    henCard.classList.add("hen-card");
    henCard.innerHTML = `
    <button type="button" class="byebye-hen-btn touch-icon-btn"><img class="touch-icon" src="images/byebye.png" alt="Ta bort ${hen.name}"></button>
      
      <div class="hen-info">
        <img class="hen-img" src="${hen.image}" alt="Bild av ${hen.name}">
        <h4>${hen.name}</h4>
        <p>${hen.name} är en ${hen.gender} av rasen ${hen.breed} och föddes ${hen.birthdate}. Denna höna har ${hen.ringcolor ? `en ${hen.ringcolor}` : "ingen"} ring.</p>
        <div class="egg-buttons">
            <button type="button" class="book-egg-btn">Boka ett ägg</button>
            <button type="button" class="unbook-egg-btn">Ta bort bokning</button>
        </div>
      </div>`;

    const bookBtn = henCard.querySelector(".book-egg-btn");
    const unbookBtn = henCard.querySelector(".unbook-egg-btn");
    const byebyeBtn = henCard.querySelector(".byebye-hen-btn");

    bookBtn.addEventListener("click", () => {
        bookEgg(hen, henCard);
    });

    unbookBtn.addEventListener("click", () => {
        unbookEgg(hen);
    });

    byebyeBtn.addEventListener("click", () => {
        byebyeHen(hen);
    });

    return henCard;
}

function bookEgg(hen, henCard) {
    const existingBookingForThisHen = eggBookings.find(booking => booking.henId === hen.id);
    if (existingBookingForThisHen) {
        existingBookingForThisHen.eggs += 1;
    } else {
        eggBookings.push({ henId: hen.id, name: hen.name, eggs: 1 });
    }
    displayEggBookings();

    henCard.classList.add("booked-yay");
    setTimeout(() => {
        henCard.classList.remove("booked-yay");
    }, 400);
}

function unbookEgg(hen) {
    const existingBookingForThisHen = eggBookings.find(
        booking => booking.henId === hen.id
    );
    if (existingBookingForThisHen) {
        existingBookingForThisHen.eggs -= 1;
        if (existingBookingForThisHen.eggs === 0) {
            eggBookings = eggBookings.filter(
                booking => booking.henId !== hen.id
            );
        }
    }
    displayEggBookings();
}

function byebyeHen(hen) {
    hens = hens.filter(deadHen => deadHen.id !== hen.id);
    eggBookings = eggBookings.filter(booking => booking.henId !== hen.id);
    filterHens(activeGenderFilter);
    displayEggBookings();
}

function displayEggBookings() {
    const eggBookingcontainer = document.querySelector("#egg-booking-container");

    if (eggBookings.length === 0) {
        eggBookingcontainer.innerHTML = "";
        return;
    }

    eggBookingcontainer.innerHTML = `
      <ul id="egg-booking-list"></ul>
      <p id="egg-booking-total"></p>
    `;

    const bookingList = document.getElementById("egg-booking-list");
    const bookingTotal = document.getElementById("egg-booking-total");

    eggBookings.forEach(booking => {
        const li = document.createElement("li");
        li.textContent = `${booking.name}: ${booking.eggs} ägg`;
        bookingList.appendChild(li);
    });

    let total = 0;
    eggBookings.forEach(booking => {
        total += booking.eggs;
    });
    bookingTotal.textContent = `Totalt: ${total} ägg`;
}

function countHens() {
    const countHensText = document.querySelector(".count-hens");
    countHensText.textContent = `${hens.length} `;
}

// MOBILMENY
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    // console.log("hamburger clicked");
    let menu = document.querySelector(".nav");
    console.dir(menu);
    let hamburgerImg = document.querySelector(".hamburger-img");
    menu.classList.toggle("active");
    if (menu.classList.contains("active")) {
        hamburgerImg.src = "images/menu-close.png";
    } else {
        hamburgerImg.src = "images/menu-open.png";
    }
});

// FILTERA HÖNS
const filterBtns = document.querySelectorAll(".filter-hens-btn");
let activeGenderFilter = "all";

filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        if (activeGenderFilter === btn.dataset.filter) return;
        
        const previousFilterBtn = document.querySelector(`.filter-hens-btn.active`);
        previousFilterBtn.classList.remove("active");

        btn.classList.add("active");

        activeGenderFilter = btn.dataset.filter;
        filterHens(activeGenderFilter);
    });
});

function filterHens(gender) {
    if (gender === "all") {
        renderHens(hens);
    } else {
        const filteredHens = hens.filter(hen => hen.gender === gender);
        renderHens(filteredHens);
    }
}

// FORMULÄR
const addHenForm = document.querySelector("#add-hen-form");

addHenForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(addHenForm);
    // console.log(formData);
    const object = Object.fromEntries(formData);
    // console.log(object);

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

    // console.log(hen);

    hens.push(hen);
    filterHens(activeGenderFilter);
    addHenForm.reset();
});


// START
filterHens(activeGenderFilter);