var menu = document.querySelector(".right_nav i");
var cross = document.querySelector("#full i");

var tl = gsap.timeline({ paused: true });

tl.to("#full", {
    right: 0,
    duration: 0.8
});

tl.from("#full a", {
    x: 150,
    opacity: 0,
    duration: 0.5,
    stagger: 0.2
})
tl.from("#full i", {
    opacity: 0
})


menu.addEventListener("click", function () {
    tl.play();
});

cross.addEventListener("click", function () {
    tl.reverse();
});

// close the mobile menu when a link inside it is clicked
document.querySelectorAll("#full a").forEach(function (link) {
    link.addEventListener("click", function () {
        tl.reverse();
    });
});


const buttons = document.querySelectorAll(".category");
const cards = document.querySelectorAll(".card");

function showCategory(category) {
    cards.forEach(card => {
        if (card.dataset.category === category) {
            card.style.display = "block";
        } else {
            card.style.display = "none";
        }
    });

    buttons.forEach(button => {
        button.classList.toggle("active", button.dataset.category === category);
    });
}

buttons.forEach(button => {
    button.addEventListener("click", () => {
        showCategory(button.dataset.category);
    });
});

// Show Coffee initially
showCategory("coffee");


// ----- Size selector -----
document.querySelectorAll(".cup_size").forEach(sizeGroup => {
    const sizes = sizeGroup.querySelectorAll(".size");
    sizes.forEach(size => {
        size.addEventListener("click", () => {
            sizes.forEach(s => s.classList.remove("selected"));
            size.classList.add("selected");
        });
    });
});


// ----- Quantity increment / decrement -----
document.querySelectorAll(".inc_dec_button").forEach(control => {
    const dec = control.querySelector(".dec");
    const inc = control.querySelector(".inc");
    const qty = control.querySelector(".qty");

    inc.addEventListener("click", () => {
        qty.textContent = parseInt(qty.textContent, 10) + 1;
    });

    dec.addEventListener("click", () => {
        const current = parseInt(qty.textContent, 10);
        if (current > 1) {
            qty.textContent = current - 1;
        }
    });
});


// ----- Contact form -----
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    const submitBtn = contactForm.querySelector(".contact_submit");
    const status = document.getElementById("formStatus");

    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        status.classList.remove("success", "error");
        status.textContent = "Sending your message...";
        submitBtn.disabled = true;

        const formData = new FormData(contactForm);

        // Use the visitor's own Subject field, with the café name prefixed
        // so it's easy to spot in your inbox — e.g. "Flavored Café: hello"
        const visitorSubject = formData.get("subject") || "General Inquiry";
        formData.set("subject", `Flavored Café: ${visitorSubject}`);

        fetch("https://api.web3forms.com/submit", {
            method: "POST",
            headers: { "Accept": "application/json" },
            body: formData
        })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    status.textContent = "Thanks for reaching out — we'll get back to you soon.";
                    status.classList.add("success");
                    contactForm.reset();
                } else {
                    status.textContent = "Something went wrong. Please try again.";
                    status.classList.add("error");
                }
            })
            .catch(() => {
                status.textContent = "Network error — please check your connection and try again.";
                status.classList.add("error");
            })
            .finally(() => {
                submitBtn.disabled = false;
            });
    });
}


// ----- Footer year -----
const yearEl = document.getElementById("year");
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}
