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
