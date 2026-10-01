/* =====================================
   FINDORA GLOBAL JAVASCRIPT
===================================== */


/* MOBILE MENU */

const menuToggle = document.getElementById("menuToggle");

if (menuToggle) {

    menuToggle.addEventListener("click", () => {

        const navContainer =
            document.querySelector(".nav-container");

        navContainer.classList.toggle("mobile-open");

        const nav =
            document.querySelector(".nav-links");

        const actions =
            document.querySelector(".nav-actions");

        if (navContainer.classList.contains("mobile-open")) {

            nav.style.display = "flex";
            actions.style.display = "flex";

            nav.style.position = "absolute";
            nav.style.top = "76px";
            nav.style.left = "0";
            nav.style.right = "0";
            nav.style.padding = "20px";
            nav.style.background = "white";
            nav.style.flexDirection = "column";

            actions.style.position = "absolute";
            actions.style.top = "300px";
            actions.style.left = "0";
            actions.style.right = "0";
            actions.style.padding = "20px";
            actions.style.background = "white";

        } else {

            nav.style.display = "";
            actions.style.display = "";

        }

    });

}


/* TOAST */

function showToast(message) {

    const toast =
        document.getElementById("toast");

    if (!toast) return;

    toast.textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 3000);

}


/* GET ITEMS */

function getItems() {

    const saved =
        localStorage.getItem("findoraItems");

    if (saved) {

        return JSON.parse(saved);

    }


    const defaultItems = [

        {
            id: 1,
            name: "iPhone 14",
            category: "electronics",
            status: "found",
            location: "Central Library",
            date: "Today",
            description:
                "Black iPhone 14 found near the reading area.",
            reporter: "Findora Student",
            email: "student@example.com",
            icon: "📱"
        },


        {
            id: 2,
            name: "Wireless Headphones",
            category: "electronics",
            status: "lost",
            location: "Campus Cafeteria",
            date: "Today",
            description:
                "White wireless headphones with a small case.",
            reporter: "Ananya",
            email: "ananya@example.com",
            icon: "🎧"
        },


        {
            id: 3,
            name: "Black Backpack",
            category: "bags",
            status: "found",
            location: "Block C",
            date: "Yesterday",
            description:
                "Black backpack found near the entrance.",
            reporter: "Rahul",
            email: "rahul@example.com",
            icon: "🎒"
        },


        {
            id: 4,
            name: "Student ID Card",
            category: "documents",
            status: "lost",
            location: "Main Building",
            date: "2 days ago",
            description:
                "Student identification card.",
            reporter: "Priya",
            email: "priya@example.com",
            icon: "🪪"
        },


        {
            id: 5,
            name: "Blue Water Bottle",
            category: "other",
            status: "found",
            location: "Sports Ground",
            date: "2 days ago",
            description:
                "Blue reusable water bottle.",
            reporter: "Kiran",
            email: "kiran@example.com",
            icon: "🧴"
        },


        {
            id: 6,
            name: "Silver Watch",
            category: "accessories",
            status: "lost",
            location: "Hostel Block",
            date: "3 days ago",
            description:
                "Silver wrist watch with a black strap.",
            reporter: "Sneha",
            email: "sneha@example.com",
            icon: "⌚"
        }

    ];


    localStorage.setItem(
        "findoraItems",
        JSON.stringify(defaultItems)
    );

    return defaultItems;
}


/* SAVE ITEMS */

function saveItems(items) {

    localStorage.setItem(
        "findoraItems",
        JSON.stringify(items)
    );

}