document.addEventListener("DOMContentLoaded", function () {


    /* =========================
       SIZE BUTTONS
    ========================= */

    const sizeButtons =
        document.querySelectorAll(".size-btn");

    const selectedSize =
        document.getElementById("selectedSize");


    sizeButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            sizeButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            selectedSize.textContent =
                this.dataset.size;

        });

    });


    /* =========================
       COLOUR BUTTONS
    ========================= */

    const colorButtons =
        document.querySelectorAll(".color-btn");

    const selectedColor =
        document.getElementById("selectedColor");

    const bottleBody =
        document.querySelector(".bottle-body");

    const previewBody =
        document.querySelector(".preview-body");


    colorButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            colorButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            this.classList.add("active");

            const color =
                this.dataset.color;

            selectedColor.textContent =
                color.toUpperCase();


            if (color === "blue") {

                bottleBody.style.background =
                    "linear-gradient(90deg, rgba(0,70,110,0.75), rgba(40,140,190,0.45), rgba(0,65,105,0.75))";

                previewBody.style.background =
                    "linear-gradient(90deg, rgba(0,70,110,0.75), rgba(40,140,190,0.45), rgba(0,65,105,0.75))";

            }


            if (color === "clear") {

                bottleBody.style.background =
                    "linear-gradient(90deg, rgba(220,240,250,0.22), rgba(255,255,255,0.12), rgba(180,220,240,0.22))";

                previewBody.style.background =
                    "linear-gradient(90deg, rgba(220,240,250,0.22), rgba(255,255,255,0.12), rgba(180,220,240,0.22))";

            }


            if (color === "dark") {

                bottleBody.style.background =
                    "linear-gradient(90deg, rgba(5,15,25,0.95), rgba(30,55,70,0.75), rgba(5,15,25,0.95))";

                previewBody.style.background =
                    "linear-gradient(90deg, rgba(5,15,25,0.95), rgba(30,55,70,0.75), rgba(5,15,25,0.95))";

            }

        });

    });


    /* =========================
       LABEL UPLOAD
    ========================= */

    const labelInput =
        document.getElementById("labelInput");

    const uploadedImage =
        document.getElementById("uploadedImage");

    const defaultLabel =
        document.getElementById("defaultLabel");

    const previewImage =
        document.getElementById("previewImage");

    const previewDefault =
        document.getElementById("previewDefault");

    const fileStatus =
        document.getElementById("fileStatus");


    labelInput.addEventListener("change", function () {

        const file = this.files[0];

        if (!file) {
            return;
        }


        if (!file.type.startsWith("image/")) {

            alert("Please select an image file.");

            this.value = "";

            return;
        }


        const reader =
            new FileReader();


        reader.onload = function (event) {

            const image =
                event.target.result;


            /*
             * HERO BOTTLE
             */

            uploadedImage.src = image;

            uploadedImage.style.display =
                "block";

            defaultLabel.style.display =
                "none";


            /*
             * CUSTOMIZER PREVIEW
             */

            previewImage.src = image;

            previewImage.style.display =
                "block";

            previewDefault.style.display =
                "none";


            fileStatus.textContent =
                "✓ " + file.name;

        };


        reader.onerror = function () {

            alert(
                "Could not load the image."
            );

        };


        reader.readAsDataURL(file);

    });


    /* =========================
       BOTTLE ROTATION
    ========================= */

    const bottle =
        document.getElementById("premiumBottle");


    let rotating = false;

    let startX = 0;

    let rotation = 0;


    bottle.addEventListener(
        "mousedown",
        function (event) {

            rotating = true;

            startX = event.clientX;

            bottle.style.animation =
                "none";

        }
    );


    document.addEventListener(
        "mousemove",
        function (event) {

            if (!rotating) {
                return;
            }

            const movement =
                event.clientX - startX;

            rotation +=
                movement * 0.5;

            startX =
                event.clientX;


            bottle.style.transform =
                `rotateY(${rotation}deg)`;

        }
    );


    document.addEventListener(
        "mouseup",
        function () {

            if (rotating) {

                rotating = false;

                bottle.style.animation =
                    "floatBottle 5s ease-in-out infinite";

            }

        }
    );


    /* =========================
       TOUCH ROTATION
    ========================= */

    bottle.addEventListener(
        "touchstart",
        function (event) {

            rotating = true;

            startX =
                event.touches[0].clientX;

            bottle.style.animation =
                "none";

        },
        {
            passive: true
        }
    );


    bottle.addEventListener(
        "touchmove",
        function (event) {

            if (!rotating) {
                return;
            }

            const currentX =
                event.touches[0].clientX;

            const movement =
                currentX - startX;

            rotation +=
                movement * 0.5;

            startX =
                currentX;


            bottle.style.transform =
                `rotateY(${rotation}deg)`;

        },
        {
            passive: true
        }
    );


    bottle.addEventListener(
        "touchend",
        function () {

            rotating = false;

            bottle.style.animation =
                "floatBottle 5s ease-in-out infinite";

        }
    );


    /* =========================
       WHATSAPP QUOTE FORM
    ========================= */

    const quoteForm =
        document.getElementById("quoteForm");


    quoteForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const name =
                document.getElementById(
                    "customerName"
                ).value;

            const business =
                document.getElementById(
                    "businessName"
                ).value;

            const phone =
                document.getElementById(
                    "customerPhone"
                ).value;

            const type =
                document.getElementById(
                    "businessType"
                ).value;

            const message =
                document.getElementById(
                    "message"
                ).value;


            const size =
                selectedSize.textContent;

            const color =
                selectedColor.textContent;


            const whatsappMessage =

                "Hello LABELSIP!%0A%0A" +

                "Name: " +
                encodeURIComponent(name) +

                "%0ABusiness: " +
                encodeURIComponent(business) +

                "%0APhone: " +
                encodeURIComponent(phone) +

                "%0ABusiness Type: " +
                encodeURIComponent(type) +

                "%0ABottle Size: " +
                encodeURIComponent(size) +

                "%0ABottle Colour: " +
                encodeURIComponent(color) +

                "%0ARequirement: " +
                encodeURIComponent(message);


            const whatsappURL =
                "https://wa.me/917996866953?text=" +
                whatsappMessage;


            window.open(
                whatsappURL,
                "_blank"
            );

        }
    );

});
