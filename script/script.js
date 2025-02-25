const allProjectsBtn = document.querySelector('#AP');
const beBtn = document.querySelector('#BE');
const rpBtn = document.querySelector('#RP');
const jsBtn = document.querySelector('#JSP');
const lpBtn = document.querySelector('#LPP');
const clientsBtn = document.querySelector('#CPP');


let allCards = document.querySelectorAll('.cards-box');
let backendCards = document.querySelectorAll('.be-card');
let reactCards = document.querySelectorAll('.rp-card');
let jsCards = document.querySelectorAll('.js-card');
let lpCards = document.querySelectorAll('.lp-card');
let clientCards = document.querySelectorAll('.client-card');

let cardTypes = {
    backend: backendCards,
    react: reactCards,
    js: jsCards,
    landing: lpCards,
    clients: clientCards,
    all: allCards
};

const projectsTop = document.querySelector('.projects-section');

function filterDisplay(type) {
    if(type !== "all"){
        Object.values(cardTypes).forEach((cards) => {
            cards.forEach((card) => {
                card.style.display = "none";
            });
        });
    };

    if (cardTypes[type]) {
        cardTypes[type].forEach((card) => {
            card.style.display = "flex";
        });
    }
    projectsTop.scrollIntoView({ behavior: "smooth" });
};

beBtn.addEventListener('click', () => {
    filterDisplay("backend");
});
rpBtn.addEventListener('click', () => {
    filterDisplay("react");
});
jsBtn.addEventListener('click', () => {
    filterDisplay("js");
});
lpBtn.addEventListener('click', () => {
    filterDisplay("landing");
});
clientsBtn.addEventListener('click', () => {
    filterDisplay("clients");
});
allProjectsBtn.addEventListener('click', () => {
    filterDisplay("all");
});