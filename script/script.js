const allProjectsBtn = document.querySelector('#AP');
const jsBtn = document.querySelector('#JSP');
const lpBtn = document.querySelector('#LPP');
const clientsBtn = document.querySelector('#CPP');

let lpCards = document.querySelectorAll('.lp-card');
let jsCards = document.querySelectorAll('.js-card');
let clientCards = document.querySelectorAll('.client-card');

const projectsTop = document.querySelector('.projects-section');



jsBtn.addEventListener('click', () => {
    lpCards.forEach((card) => {
        card.style.display = "none";
    })
    clientCards.forEach((card) => {
        card.style.display = "none";
    })
    jsCards.forEach((card) => {
        card.style.display = "flex";
    })

    projectsTop.scrollIntoView({ behavior: "smooth" });
});

lpBtn.addEventListener('click', () => {
    jsCards.forEach((card) => {
        card.style.display = "none";
    })
    clientCards.forEach((card) => {
        card.style.display = "none";
    })
    lpCards.forEach((card) => {
        card.style.display = "flex";
    })

    projectsTop.scrollIntoView({ behavior: "smooth" });
});

clientsBtn.addEventListener('click', () => {
    jsCards.forEach((card) => {
        card.style.display = "none";
    })
    lpCards.forEach((card) => {
        card.style.display = "none";
    })
    clientCards.forEach((card) => {
        card.style.display = "flex";
    })
    
    projectsTop.scrollIntoView({behavior: "smooth"});
});

allProjectsBtn.addEventListener('click', () => {
    jsCards.forEach((card) => {
        card.style.display = "flex";
    })
    lpCards.forEach((card) => {
        card.style.display = "flex";
    })
    clientCards.forEach((card) => {
        card.style.display = "flex";
    })

    projectsTop.scrollIntoView({ behavior: "smooth" });
});