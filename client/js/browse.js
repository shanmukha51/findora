// ==========================================
// FINDORA - BROWSE ITEMS
// FIREBASE FIRESTORE
// ==========================================

import {
    collection,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

import { db } from "./firebase.js";


// ==========================================
// HTML ELEMENTS
// ==========================================

const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");
const categoryFilter = document.getElementById("categoryFilter");
const itemsContainer = document.getElementById("itemsContainer");
const emptyState = document.getElementById("emptyState");
const resultCount = document.getElementById("resultCount");
const clearFilters = document.getElementById("clearFilters");


// ==========================================
// ITEMS
// ==========================================

let items = [];


// ==========================================
// GET ITEMS FROM FIREBASE
// ==========================================

async function loadItems() {

    console.log("Starting Firebase...");

    try {

        const snapshot = await getDocs(
            collection(db, "items")
        );

        console.log("Number of Firebase documents:", snapshot.size);

        items = [];

        snapshot.forEach((doc) => {

            const data = doc.data();

            console.log("Firebase document:", doc.id, data);

            items.push({

                id: doc.id,

                name: data.name || "Unnamed Item",

                category: data.category || "other",

                status: data.status || "lost",

                location: data.location || "Unknown",

                description:
                    data.description ||
                    "No description available",

                date: data.date || "",

                imageURL:
                    data.imageURL || "",

                reporter:
                    data.reporter || ""

            });

        });


        console.log("FINAL ITEMS:", items);


        displayItems(items);

    }

    catch (error) {

        console.error(
            "FIREBASE ERROR:",
            error
        );

        itemsContainer.innerHTML = `
            <div style="
                padding:30px;
                text-align:center;
                color:red;
            ">
                <h3>❌ Firebase Error</h3>
                <p>${error.message}</p>
            </div>
        `;

    }

}


// ==========================================
// DISPLAY ITEMS
// ==========================================

function displayItems(list) {

    itemsContainer.innerHTML = "";

    resultCount.textContent =
        `Showing ${list.length} item${list.length === 1 ? "" : "s"}`;


    if (list.length === 0) {

        emptyState.style.display = "block";

        return;

    }


    emptyState.style.display = "none";


    list.forEach((item) => {

        const card = document.createElement("article");

        card.className = "item-card";


        card.innerHTML = `

            <div class="item-image">

                ${
                    item.imageURL

                    ?

                    `
                    <img
                        src="${item.imageURL}"
                        alt="${escapeHTML(item.name)}"
                    >
                    `

                    :

                    `
                    <div class="item-placeholder">
                        📦
                    </div>
                    `
                }

            </div>


            <div class="item-content">

                <span class="item-status ${item.status}">

                    ${
                        item.status === "lost"
                        ? "🔴 Lost"
                        : "🟢 Found"
                    }

                </span>


                <h3>
                    ${escapeHTML(item.name)}
                </h3>


                <p>
                    ${escapeHTML(item.description)}
                </p>


                <div class="item-details">

                    <span>
                        📍 ${escapeHTML(item.location)}
                    </span>

                    <span>
                        🏷️ ${escapeHTML(item.category)}
                    </span>

                </div>

            </div>

        `;


        itemsContainer.appendChild(card);

    });

}


// ==========================================
// FILTER
// ==========================================

function filterItems() {

    const search =
        searchInput.value
            .toLowerCase()
            .trim();

    const status =
        statusFilter.value;

    const category =
        categoryFilter.value;


    const filteredItems = items.filter((item) => {

        const text =
            `${item.name}
            ${item.description}
            ${item.location}
            ${item.category}`
            .toLowerCase();


        const searchMatch =
            text.includes(search);


        const statusMatch =
            status === "all" ||
            item.status === status;


        const categoryMatch =
            category === "all" ||
            item.category === category;


        return (
            searchMatch &&
            statusMatch &&
            categoryMatch
        );

    });


    displayItems(filteredItems);

}


// ==========================================
// EVENTS
// ==========================================

searchInput.addEventListener(
    "input",
    filterItems
);


statusFilter.addEventListener(
    "change",
    filterItems
);


categoryFilter.addEventListener(
    "change",
    filterItems
);


clearFilters.addEventListener(
    "click",
    () => {

        searchInput.value = "";

        statusFilter.value = "all";

        categoryFilter.value = "all";

        displayItems(items);

    }
);


// ==========================================
// SECURITY
// ==========================================

function escapeHTML(value) {

    return String(value)

        .replace(/&/g, "&amp;")

        .replace(/</g, "&lt;")

        .replace(/>/g, "&gt;")

        .replace(/"/g, "&quot;")

        .replace(/'/g, "&#039;");

}


// ==========================================
// START
// ==========================================

loadItems();