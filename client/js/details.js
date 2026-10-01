/* =====================================
   ITEM DETAILS
===================================== */


const detailsContainer =
    document.getElementById("detailsContainer");


const params =
    new URLSearchParams(
        window.location.search
    );


const id =
    params.get("id");


const items =
    getItems();


const item =
    items.find(
        item => String(item.id) === String(id)
    );


if (!item) {

    detailsContainer.innerHTML = `

        <div class="empty-state"
             style="display:block">

            <div>😕</div>

            <h3>Item not found</h3>

            <p>
                This item may have been removed.
            </p>

            <br>

            <a href="browse.html"
               class="btn btn-primary">

                Back to Browse

            </a>

        </div>

    `;

} else {


    detailsContainer.innerHTML = `

        <div class="details-card">


            <div class="details-image">

                ${item.icon || "📦"}

            </div>


            <div class="details-content">


                <span class="details-status ${item.status}">

                    ${item.status.toUpperCase()}

                </span>


                <div class="item-category">

                    ${item.category}

                </div>


                <h1>
                    ${item.name}
                </h1>


                <p class="details-description">

                    ${item.description}

                </p>


                <div class="details-info">


                    <div class="detail-box">

                        <span>
                            📍 Location
                        </span>

                        <strong>
                            ${item.location}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>
                            🕒 Reported
                        </span>

                        <strong>
                            ${item.date}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>
                            👤 Reported by
                        </span>

                        <strong>
                            ${item.reporter}
                        </strong>

                    </div>


                    <div class="detail-box">

                        <span>
                            📧 Contact
                        </span>

                        <strong>
                            ${item.email}
                        </strong>

                    </div>


                </div>


                <button
                    class="btn btn-primary btn-large"
                    id="contactButton">

                    ✉ Contact Reporter

                </button>


            </div>

        </div>

    `;


    const contactButton =
        document.getElementById(
            "contactButton"
        );


    contactButton.addEventListener(
        "click",
        () => {

            window.location.href =
                `mailto:${item.email}?subject=Findora - ${item.name}`;

        }
    );

}