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

function createHenCard(hen) {
    const henCard = document.createElement("div");

    henCard.classList.add("hen-card");
    henCard.innerHTML = `
    <button type="button" class="byebye-hen-btn">X</button>
      <img src="${hen.image}" alt="${hen.name}">
      <div class="hen-info">
        <h3>${hen.name}</h3>
        <p>${hen.name} är en ${hen.gender} av rasen ${hen.breed} och föddes ${hen.birthdate}. Denna höna har ${hen.ringcolor ? `en ${hen.ringcolor}` : "ingen"} ring.</p>
        <button type="button" class="book-egg-btn">Boka ett ägg</button>
        <button type="button" class="remove-egg-booking-btn">Ta bort bokning</button>
      </div>`;

    const bookBtn = henCard.querySelector(".book-egg-btn");
    const removeBtn = henCard.querySelector(".remove-egg-booking-btn");
    const byebyeBtn = henCard.querySelector(".byebye-hen-btn");
    bookBtn.addEventListener("click", () => {
        bookEgg(hen, henCard);
    });

    removeBtn.addEventListener("click", () => {
        removeEggBooking(hen);
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

function removeEggBooking(hen) {
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
    displayHens();
    displayEggBookings();
}

function displayHens(hensToShow = hens) {
    const hensContainer = document.querySelector("#hens-container");

    if (hensToShow.length === 0) {
        hensContainer.innerHTML = "<p>Inga höns att visa</p>";
        countHenCards();
        return;
    }

    hensContainer.innerHTML = "";
    hensToShow.forEach(hen => {
        hensContainer.appendChild(createHenCard(hen));
    });
    countHenCards();
}

function countHenCards() {
    const countHensText = document.querySelector(".count-hens");
    const countHens = document.querySelectorAll(".hen-card");
    console.log(countHens);
    countHensText.textContent = `${countHens.length} `;
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

// START
displayHens();

// MOBILMENY
const hamburger = document.querySelector(".hamburger");

hamburger.addEventListener("click", () => {
    let menu = document.querySelector(".nav");
    menu.classList.toggle("active");
});

// FILTERA HÖNS
const filterHensBtns = document.querySelectorAll(".filter-hens-btn");

filterHensBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        filterHens(btn.classList[1]);
    });
});

function filterHens(gender) {
    if (gender === "all") {
        displayHens(hens);
    } else {
        const filteredHens = hens.filter(hen => hen.gender === gender);
        displayHens(filteredHens);
    }
}

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


